#!/usr/bin/env python3
"""Install the per-user daily Codex usage publisher on macOS."""
import os
from pathlib import Path
import plistlib
import shutil
import subprocess
import sys

LABEL = 'io.github.eashwar22.codex-usage'
ROOT = Path(__file__).resolve().parent.parent
PLIST = Path.home() / 'Library' / 'LaunchAgents' / f'{LABEL}.plist'


def main():
    gh = shutil.which('gh')
    if not gh:
        raise RuntimeError('GitHub CLI (gh) was not found.')
    if subprocess.run([gh, 'auth', 'status'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode:
        raise RuntimeError('GitHub CLI is not signed in.')
    PLIST.parent.mkdir(parents=True, exist_ok=True)
    python = shutil.which('python3') or sys.executable
    (Path.home() / 'Library' / 'Logs').mkdir(parents=True, exist_ok=True)
    configuration = {
        'Label': LABEL,
        'ProgramArguments': [python, str(ROOT / 'scripts' / 'export_codex_usage.py'), '--publish'],
        'EnvironmentVariables': {'CODEX_USAGE_GH': gh, 'PATH': '/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin'},
        'StartCalendarInterval': {'Hour': 9, 'Minute': 15},
        'RunAtLoad': True,
        'StandardOutPath': str(Path.home() / 'Library' / 'Logs' / 'codex-usage.log'),
        'StandardErrorPath': str(Path.home() / 'Library' / 'Logs' / 'codex-usage-error.log'),
    }
    target = f'gui/{os.getuid()}'
    if PLIST.exists():
        subprocess.run(['launchctl', 'bootout', target, str(PLIST)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False)
    with PLIST.open('wb') as handle:
        plistlib.dump(configuration, handle)
    subprocess.run(['launchctl', 'bootstrap', target, str(PLIST)], check=True)
    print('Installed the daily Codex usage publisher.')


if __name__ == '__main__':
    try:
        main()
    except (OSError, RuntimeError, subprocess.CalledProcessError) as error:
        print(f'Could not install the daily publisher: {error}', file=sys.stderr)
        sys.exit(1)
