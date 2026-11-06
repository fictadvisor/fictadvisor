#!/usr/bin/env python3
"""Daily check that last night's Postgres backup really reached Backblaze B2.

Runs on the prod host from the ubuntu user's crontab, three hours after the 00:00 UTC
backup:

    0 3 * * * /home/ubuntu/deployment/monitoring/backup-check/check-backup.py >> /home/ubuntu/backup-check.log 2>&1

It looks at the bucket itself instead of the backup job's exit status, which cannot be
trusted: from 2026-09-11 to 2026-11-06 every upload stopped after 128 KiB because the free
10 GB was full, and the job still reported success every night.

B2 is queried through the backup-postgres container, which already has the aws CLI and a
key limited to the bucket. A problem is posted to the same Telegram channel as HTTP 500s
and cron failures, through the bot's /broadcast/error. The bot is reached on its
deployment_default IP, so an alert still goes out when backup-postgres itself is down.

Silent when everything is fine. Exit code: 0 ok, 1 problems reported, 2 could not report.

Testing: CHECK_DATE=2026-01-01 pretends it is a day without a backup, LABEL=TEST marks the
message, DRY_RUN=1 prints the message instead of sending it.
"""

import datetime as dt
import html
import json
import os
import subprocess
import sys
import urllib.request

CONTAINER = 'backup-postgres'
BOT_CONTAINER = 'fictadvisor-bot'
BOT_NETWORK = 'deployment_default'
API_ENV_FILE = os.path.expanduser('~/deployment/env/fictadvisor-api.env')

BUCKET = 'FA-backup'
PROD_PREFIX = 'postgres-prod/'
LATEST_KEY = 'postgres-latest/all.sql.gz.enc'

MIN_SIZE = 5 * 1024 ** 2
# A backup less than half the size of the one before it is a broken dump, not a smaller DB.
MIN_RATIO_TO_PREVIOUS = 0.5
# The free plan is 10 GB, counted in decimal units and including hidden versions.
BUCKET_WARN_BYTES = 8 * 1000 ** 3
LATEST_MAX_AGE = dt.timedelta(hours=26)

AWS_IN_CONTAINER = (
  'AWS_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY" '
  'AWS_DEFAULT_REGION="$S3_REGION" AWS_REQUEST_CHECKSUM_CALCULATION=when_required '
  'AWS_RESPONSE_CHECKSUM_VALIDATION=when_required HOME=/tmp '
  'exec aws --endpoint-url "$S3_ENDPOINT" --output json "$@"'
)


class CheckError(Exception):
  pass


def aws(*args):
  result = subprocess.run(
    ['docker', 'exec', CONTAINER, 'sh', '-c', AWS_IN_CONTAINER, 'aws', *args],
    capture_output=True, text=True, timeout=180,
  )
  if result.returncode != 0:
    raise CheckError(result.stderr.strip() or f'aws exited with {result.returncode}')
  return json.loads(result.stdout) if result.stdout.strip() else {}


def mib(size):
  return f'{size / 1024 ** 2:.1f} MiB'


def run_checks(today):
  problems = []

  objects = aws('s3api', 'list-objects-v2', '--bucket', BUCKET, '--prefix', PROD_PREFIX)
  backups = sorted(
    (o for o in objects.get('Contents', []) if o['Key'].startswith(PROD_PREFIX + 'all_')),
    key=lambda o: o['Key'],
  )
  todays = [o for o in backups if o['Key'].startswith(f'{PROD_PREFIX}all_{today}T')]

  if backups:
    last = backups[-1]
    footer = f"Last backup: {last['Key']} ({mib(last['Size'])}, uploaded {last['LastModified']})"
  else:
    footer = f'There are no backups at all under {PROD_PREFIX}'

  newest = todays[-1] if todays else None
  if newest is None:
    problems.append(f'No backup for {today} under {PROD_PREFIX}')
  else:
    if newest['Size'] < MIN_SIZE:
      problems.append(f"{newest['Key']} is only {mib(newest['Size'])}")
    previous = backups[backups.index(newest) - 1] if backups.index(newest) > 0 else None
    if previous and newest['Size'] < previous['Size'] * MIN_RATIO_TO_PREVIOUS:
      problems.append(
        f"{newest['Key']} is {mib(newest['Size'])}, "
        f"less than half of the previous one ({mib(previous['Size'])})",
      )

  try:
    latest = aws('s3api', 'head-object', '--bucket', BUCKET, '--key', LATEST_KEY)
  except CheckError as error:
    problems.append(f'{LATEST_KEY} is missing: {error}')
  else:
    # aws CLI v2 prints it as ISO 8601 with an offset, e.g. 2026-11-06T18:53:19+00:00
    modified = dt.datetime.fromisoformat(latest['LastModified'])
    age = dt.datetime.now(dt.timezone.utc) - modified
    if age > LATEST_MAX_AGE:
      problems.append(f'{LATEST_KEY} was last refreshed {age.days}d {age.seconds // 3600}h ago')
    elif newest and latest['ContentLength'] != newest['Size']:
      problems.append(
        f"{LATEST_KEY} ({mib(latest['ContentLength'])}) does not match "
        f"{newest['Key']} ({mib(newest['Size'])})",
      )

  versions = aws('s3api', 'list-object-versions', '--bucket', BUCKET)
  stored = sum(v['Size'] for v in versions.get('Versions', []))
  if stored > BUCKET_WARN_BYTES:
    problems.append(
      f'Bucket holds {stored / 1000 ** 3:.2f} GB of the free 10 GB, uploads fail once it is full',
    )

  return problems, footer


def read_env(path):
  values = {}
  with open(path, encoding='utf-8') as env_file:
    for line in env_file:
      key, sep, value = line.strip().partition('=')
      if sep and not key.startswith('#'):
        values[key] = value.strip().strip('"').strip("'")
  return values


def send(text):
  env = read_env(API_ENV_FILE)
  api_url, token = env['TELEGRAM_BOT_API_URL'], env['TELEGRAM_BOT_TOKEN']

  # The env file names the bot by its compose hostname, which only resolves inside docker.
  ip = subprocess.run(
    ['docker', 'inspect', '-f',
     f'{{{{(index .NetworkSettings.Networks "{BOT_NETWORK}").IPAddress}}}}', BOT_CONTAINER],
    capture_output=True, text=True, check=True,
  ).stdout.strip()
  api_url = api_url.replace(f'//{BOT_CONTAINER}:', f'//{ip}:', 1)

  request = urllib.request.Request(
    f'{api_url}/broadcast/error?parse_mode=HTML',
    data=json.dumps({'text': text}).encode(),
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    method='POST',
  )
  with urllib.request.urlopen(request, timeout=20) as response:
    response.read()


def main():
  today = os.environ.get('CHECK_DATE') or dt.datetime.now(dt.timezone.utc).date().isoformat()
  label = os.environ.get('LABEL')
  stamp = dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%d %H:%M:%SZ')

  try:
    problems, footer = run_checks(today)
  except Exception as error:  # noqa: BLE001 -- any failure to look is itself the alert
    problems, footer = [f'Could not query B2 through {CONTAINER}: {error}'], ''

  if not problems:
    print(f'{stamp} ok: backup for {today} is in B2')
    return 0

  message = ''
  if label:
    message += f'[{html.escape(label)}] '
  message += '🚨🚨🚨 FICTADVISOR BACKUP ERROR 🚨🚨🚨\n'
  message += '⚙️ Environment: PRODUCTION\n'
  message += f'📅 Checked: {today}\n\n'
  message += '\n'.join(f'• {html.escape(problem)}' for problem in problems)
  if footer:
    message += f'\n\n💾 {html.escape(footer)}'

  print(f'{stamp} PROBLEMS: {problems}')
  if os.environ.get('DRY_RUN'):
    print(message)
    return 1

  try:
    send(message)
  except Exception as error:  # noqa: BLE001
    print(f'{stamp} could not report to Telegram: {error}', file=sys.stderr)
    return 2
  return 1


if __name__ == '__main__':
  sys.exit(main())
