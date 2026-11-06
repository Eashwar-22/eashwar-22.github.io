#!/usr/bin/env python3
"""Export daily OpenAI model-request counts for one project, in UTC."""
import datetime as dt
import json
import os
from pathlib import Path
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request

API_URL = 'https://api.openai.com/v1/organization/usage/completions'
OUTPUT = Path(__file__).resolve().parent.parent / 'openai-usage.json'


def collect(key, project_id, now):
    today = now.date()
    first = today - dt.timedelta(days=364)
    first_time = dt.datetime.combine(first, dt.time.min, tzinfo=dt.timezone.utc)
    counts = {(first + dt.timedelta(days=i)).isoformat(): None for i in range(365)}
    query = {
        'start_time': int(first_time.timestamp()),
        'end_time': int(now.timestamp()),
        'bucket_width': '1d',
        'limit': 31,
        'project_ids[]': project_id,
    }
    visited = set()
    while True:
        url = API_URL + '?' + urllib.parse.urlencode(query)
        request = urllib.request.Request(url, headers={
            'Authorization': 'Bearer ' + key,
            'Accept': 'application/json',
        })
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                data = json.load(response)
        except urllib.error.HTTPError as error:
            raise RuntimeError(f'OpenAI usage request failed (HTTP {error.code}).') from None
        except (urllib.error.URLError, TimeoutError, ValueError) as error:
            raise RuntimeError(f'OpenAI usage request failed: {type(error).__name__}.') from None
        if not isinstance(data.get('data'), list):
            raise RuntimeError('OpenAI returned an unexpected usage response.')
        for bucket in data['data']:
            try:
                day = dt.datetime.fromtimestamp(bucket['start_time'], dt.timezone.utc).date().isoformat()
                values = [result['num_model_requests'] for result in bucket['results']]
                if any(not isinstance(value, int) or isinstance(value, bool) or value < 0 for value in values):
                    raise ValueError
            except (KeyError, TypeError, ValueError, OverflowError):
                raise RuntimeError('OpenAI returned an invalid usage bucket.') from None
            if day in counts:
                counts[day] = sum(values)
        if not data.get('has_more'):
            break
        cursor = data.get('next_page')
        if not isinstance(cursor, str) or not cursor or cursor in visited:
            raise RuntimeError('OpenAI returned an invalid pagination cursor.')
        visited.add(cursor)
        query['page'] = cursor
    return {
        'generated_at': now.isoformat(timespec='seconds'),
        'days': [{'date': day, 'requests': value} for day, value in counts.items()],
    }


def main():
    key = os.environ.get('OPENAI_ADMIN_KEY', '').strip()
    project_id = os.environ.get('OPENAI_PROJECT_ID', '').strip()
    if not key or not project_id:
        raise RuntimeError('Set OPENAI_ADMIN_KEY and OPENAI_PROJECT_ID before fetching usage.')
    data = collect(key, project_id, dt.datetime.now(dt.timezone.utc))
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=OUTPUT.parent, delete=False) as handle:
            temporary = Path(handle.name)
            json.dump(data, handle, separators=(',', ':'))
            handle.write('\n')
        os.replace(temporary, OUTPUT)
    finally:
        if temporary and temporary.exists():
            temporary.unlink()
    print('Updated daily OpenAI request counts.')


if __name__ == '__main__':
    try:
        main()
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
