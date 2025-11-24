#!/usr/bin/env bash
set -euo pipefail

# start.sh - simple Railway start script for a Django app
# It installs dependencies, runs migrations, collects static files, and starts gunicorn.

echo "Running start.sh"
if [ -f requirements.txt ]; then
  echo "Installing Python dependencies from requirements.txt"
  python -m pip install --upgrade pip
  python -m pip install -r requirements.txt
fi

echo "Collecting static files"
python manage.py collectstatic --noinput || true

echo "Applying database migrations"
python manage.py migrate --noinput || true

PORT=${PORT:-8000}
echo "Starting gunicorn on 0.0.0.0:${PORT}"
exec gunicorn portfoliov2.wsgi:application --bind 0.0.0.0:${PORT} --workers 3
