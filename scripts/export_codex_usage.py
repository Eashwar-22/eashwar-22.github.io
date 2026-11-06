#!/usr/bin/env python3
"""Aggregate local Codex token-count events without exporting session content."""
import argparse
import calendar
import datetime as dt
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile

REPOSITORY = 'Eashwar-22/eashwar-22.github.io'
DATA_FILE = 'codex-usage.json'
ROOT = Path(__file__).resolve().parent.parent


def cutoff_date(today):
    year = today.year
    month = today.month - 3
    if month <= 0:
        year -= 1
        month += 12
    return dt.date(year, month, min(today.day, calendar.monthrange(year, month)[1]))


def usage_pair(value):
    if not isinstance(value, dict):
        return None
    result = (value.get('input_tokens'), value.get('output_tokens'))
    if any(type(number) is not int or number < 0 for number in result):
        return None
    return result


def collect(codex_dir, now):
    cutoff = cutoff_date(now.date())
    sessions = {}
    files_found = 0
    incomplete = False
    for store in (codex_dir / 'sessions', codex_dir / 'archived_sessions'):
        if not store.exists():
            continue
        for path in store.rglob('*.jsonl'):
            files_found += 1
            events = []
            session_id = None
            session_started = None
            try:
                with path.open(encoding='utf-8') as handle:
                    for line in handle:
                        try:
                            record = json.loads(line)
                        except (ValueError, UnicodeError):
                            # A currently active session can have an unfinished last line.
                            continue
                        if not isinstance(record, dict):
                            continue
                        payload = record.get('payload')
                        if not isinstance(payload, dict):
                            continue
                        if record.get('type') == 'session_meta' and session_id is None:
                            session_id = payload.get('id')
                            try:
                                session_started = dt.datetime.fromisoformat(record['timestamp'].replace('Z', '+00:00'))
                                if session_started.tzinfo is None:
                                    session_started = None
                                else:
                                    session_started = session_started.astimezone(dt.timezone.utc)
                            except (KeyError, TypeError, ValueError):
                                session_started = None
                        if payload.get('type') != 'token_count':
                            continue
                        info = payload.get('info')
                        if not isinstance(info, dict):
                            continue
                        total = usage_pair(info.get('total_token_usage'))
                        last = usage_pair(info.get('last_token_usage'))
                        if total is None or last is None:
                            continue
                        try:
                            timestamp = dt.datetime.fromisoformat(record['timestamp'].replace('Z', '+00:00'))
                            if timestamp.tzinfo is None:
                                raise ValueError
                            timestamp = timestamp.astimezone(dt.timezone.utc)
                        except (KeyError, TypeError, ValueError):
                            incomplete = True
                            continue
                        if timestamp <= now:
                            events.append((timestamp, total, last))
            except (OSError, UnicodeError):
                incomplete = True
                continue
            if events:
                # Multiple files can be continuations of the same session.
                if not session_id:
                    incomplete = True
                session = sessions.setdefault(str(session_id) if session_id else str(path), {'events': [], 'started': None})
                session['events'].extend(events)
                if session_started and (session['started'] is None or session_started < session['started']):
                    session['started'] = session_started
    if not files_found:
        raise RuntimeError('No local Codex session files were found.')
    input_total = output_total = 0
    records_found = 0
    for session in sessions.values():
        events = session['events']
        events.sort(key=lambda event: event[0])
        previous = None
        previous_event = None
        for timestamp, total, last in events:
            event_key = (timestamp, total)
            if event_key == previous_event:
                continue
            previous_event = event_key
            records_found += 1
            if previous is None:
                # A file can begin after a session started; earlier usage has no reliable date.
                if any(total[i] < last[i] for i in range(2)):
                    incomplete = True
                    previous = total
                    continue
                delta = last
                if total != last and timestamp.date() >= cutoff:
                    started = session['started']
                    if started and cutoff <= started.date() <= timestamp.date():
                        delta = total
                    else:
                        incomplete = True
            else:
                delta = (total[0] - previous[0], total[1] - previous[1])
                if any(number < 0 for number in delta):
                    incomplete = True
                    previous = total
                    continue
            previous = total
            if cutoff <= timestamp.date() <= now.date():
                input_total += delta[0]
                output_total += delta[1]
    if not records_found:
        raise RuntimeError('No usable token-count records were found.')
    return {
        'generated_at': now.isoformat(timespec='seconds'),
        'period_start': cutoff.isoformat(),
        'period_end': now.date().isoformat(),
        'input_tokens': input_total,
        'output_tokens': output_total,
        'incomplete': incomplete,
    }


def write_snapshot(snapshot):
    destination = ROOT / DATA_FILE
    temporary = None
    try:
        with tempfile.NamedTemporaryFile('w', encoding='utf-8', dir=ROOT, delete=False) as handle:
            temporary = Path(handle.name)
            json.dump(snapshot, handle, separators=(',', ':'))
            handle.write('\n')
        os.replace(temporary, destination)
    finally:
        if temporary and temporary.exists():
            temporary.unlink()


def publish(snapshot):
    gh = os.environ.get('CODEX_USAGE_GH', '/opt/homebrew/bin/gh')
    # Only the aggregate goes to the workflow; session records stay on this Mac.
    result = subprocess.run([
        gh, 'workflow', 'run', 'publish-codex-usage.yml', '--repo', REPOSITORY,
        '--ref', 'main', '--raw-field', 'aggregate=' + json.dumps(snapshot, separators=(',', ':')),
    ], text=True, capture_output=True, check=False)
    if result.returncode:
        raise RuntimeError('Could not start the GitHub usage update; check workflow and gh authentication.')
    print('Started the aggregated Codex usage update.')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--publish', action='store_true', help='Publish aggregated totals to GitHub')
    args = parser.parse_args()
    snapshot = collect(Path.home() / '.codex', dt.datetime.now(dt.timezone.utc))
    if args.publish:
        publish(snapshot)
    else:
        write_snapshot(snapshot)
        print('Created a local aggregate for preview.')


if __name__ == '__main__':
    try:
        main()
    except (RuntimeError, OSError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
