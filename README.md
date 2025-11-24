## PortfolioVersion2

Personal portfolio built with Django. This README covers local development and free deployment on Railway.

### Tech Stack
* Python / Django
* Gunicorn (production WSGI server)
* WhiteNoise (static file serving)

### Local Development
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Environment Variables
Set these in your Railway project (Dashboard > Variables):

| Variable | Required | Description |
|----------|----------|-------------|
| DJANGO_SECRET_KEY | yes | A long random string; do NOT use the default dev key. |
| DJANGO_DEBUG | recommended | Set to `False` in production. Defaults to `True` locally. |
| ALLOWED_HOSTS | yes | Your Railway domain, e.g. `your-app.up.railway.app` (comma-separated if multiple). |
| DATABASE_URL | if using Postgres | Provided automatically after adding Railway Postgres plugin. |

### Deployment on Railway
1. Push code to GitHub (already done).
2. Create a new Railway project and link the GitHub repo.
3. Add the Postgres plugin (optional – only if you need a database beyond sqlite).
4. Set environment variables listed above.
5. Trigger a deploy (Railway builds using `requirements.txt`, then runs `Procfile`).
6. Confirm logs show:
   * `Collecting static files`
   * `Applying database migrations`
   * `Starting gunicorn ...`
7. Visit the generated domain (shown in Railway) or map a custom domain.

### Static Files
* `start.sh` runs `collectstatic`. WhiteNoise serves versioned, compressed assets.
* To change a static file, edit under `core/static/...` then commit and redeploy.

### Database
* Default: sqlite for simplicity.
* Production: set `DATABASE_URL` (Railway Postgres) to auto-switch using `dj-database-url`.

### Health Check / Quick Diagnostics
```bash
python manage.py check
python manage.py collectstatic --noinput --dry-run
gunicorn portfoliov2.wsgi:application --bind 127.0.0.1:8000
```

### CI (GitHub Actions)
Workflow runs Django checks and ensures static collection succeeds before deploy.

### Security Checklist
* DJANGO_DEBUG=False
* Unique DJANGO_SECRET_KEY
* ALLOWED_HOSTS set to exact domain(s)
* Use HTTPS (Railway provides TLS)

### Troubleshooting
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| 500 error on / | Missing env vars or migration | Confirm env vars; run `manage.py migrate`. |
| Static 404 | collectstatic not run | Ensure deployment logs show collectstatic; redeploy. |
| DisallowedHost | ALLOWED_HOSTS mismatch | Set ALLOWED_HOSTS to Railway domain. |

### License
Add a license of your choice (MIT recommended) if you plan to share publicly.
