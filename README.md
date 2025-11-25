## PortfolioVersion2

Personal portfolio built with Django. Deploy as a dynamic app (Railway) or export to static HTML for free hosting (GitHub Pages, Netlify).

### Tech Stack
* Python / Django
* Gunicorn (production WSGI server)
* WhiteNoise (static file serving)

---

## Quick Start: Static Hosting (Recommended for Free Hosting)

Export your Django site to static HTML and deploy on GitHub Pages or Netlify—no server runtime needed.

### Prerequisites
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```

### Export Static Site
```bash
python manage.py export_static --output dist
cp -r staticfiles dist/static
```

This creates `dist/index.html` and copies all CSS/JS/images to `dist/static/`.

### Deploy to GitHub Pages
1. **Create gh-pages branch** (one-time):
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r dist/* .
   git add .
   git commit -m "Initial static site"
   git push origin gh-pages
   git checkout main
   ```

2. **Enable GitHub Pages**:
   - Go to repo Settings → Pages
   - Source: Deploy from branch `gh-pages` / `root`
   - Your site will be live at `https://yourusername.github.io/PortfolioVersion2/`

3. **Update site** (after changes):
   ```bash
   git checkout main
   # make your changes, then:
   python manage.py export_static --output dist
   cp -r staticfiles dist/static
   git checkout gh-pages
   cp -r dist/* .
   git add .
   git commit -m "Update static site"
   git push origin gh-pages
   git checkout main
   ```

### Deploy to Netlify
**Option A: Drag & Drop** (easiest)
1. Build locally:
   ```bash
   python manage.py export_static --output dist
   cp -r staticfiles dist/static
   ```
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder → instant deployment

**Option B: Continuous Deployment**
1. Push code to GitHub (already done)
2. [New site from Git](https://app.netlify.com/start) → select your repo
3. Build settings:
   - **Build command**: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput && python manage.py export_static --output dist && cp -r staticfiles dist/static`
   - **Publish directory**: `dist`
4. Deploy → your site is live at `https://random-name.netlify.app` (customize domain in settings)

**Note**: Static export only includes simple routes (no dynamic URLs with parameters). Admin and auth routes are skipped.

---

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

### Static Files (Dynamic Deployment)
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
