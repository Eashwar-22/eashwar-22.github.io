#!/usr/bin/env python3
"""Validate a public aggregate received by the GitHub workflow."""
import datetime as dt
import json
import os
from pathlib import Path
import sys

FIELDS = {'generated_at', 'period_start', 'period_end', 'input_tokens', 'output_tokens', 'incomplete'}


def main():
    try:
        data = json.loads(os.environ['CODEX_USAGE_AGGREGATE'])
        if not isinstance(data, dict) or set(data) != FIELDS:
            raise ValueError
        for field in ('input_tokens', 'output_tokens'):
            if type(data[field]) is not int or not 0 <= data[field] <= 2**53 - 1:
                raise ValueError
        if type(data['incomplete']) is not bool:
            raise ValueError
        start = dt.date.fromisoformat(data['period_start'])
        end = dt.date.fromisoformat(data['period_end'])
        generated = dt.datetime.fromisoformat(data['generated_at'])
        if start > end or generated.tzinfo is None or generated.astimezone(dt.timezone.utc).date() != end:
            raise ValueError
    except (KeyError, TypeError, ValueError):
        raise RuntimeError('Invalid aggregated Codex usage data.') from None
    Path('codex-usage.json').write_text(json.dumps(data, separators=(',', ':')) + '\n', encoding='utf-8')
    print('Validated aggregate.')


if __name__ == '__main__':
    try:
        main()
    except (RuntimeError, OSError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
