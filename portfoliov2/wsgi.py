"""
WSGI config for portfoliov2 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfoliov2.settings")
application = get_wsgi_application()

# Enable WhiteNoise to serve static files with gunicorn when deployed.
try:
	from whitenoise import WhiteNoise

	application = WhiteNoise(application, root=os.path.join(os.path.dirname(__file__), "..", "staticfiles"))
except Exception:
	# If whitenoise isn't installed in the environment, fall back to the plain WSGI app.
	pass
