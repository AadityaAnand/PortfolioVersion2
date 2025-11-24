import os
from pathlib import Path
from urllib.parse import urljoin

from django.core.management.base import BaseCommand
from django.test import Client
from django.urls import get_resolver


class Command(BaseCommand):
    help = "Export simple non-parameter URL patterns to a static 'dist' directory as index.html files."

    def add_arguments(self, parser):
        parser.add_argument(
            "--output", "-o", default="dist", help="Directory to write exported static site (default: dist)"
        )
        parser.add_argument(
            "--base-url", default="/", help="Base URL to prefix when building absolute links (optional)"
        )

    def handle(self, *args, **options):
        output_dir = Path(options["output"]).resolve()
        base_url = options["base_url"].rstrip("/") + "/"
        client = Client()

        resolver = get_resolver()
        patterns = resolver.url_patterns

        # Ensure output directory exists
        output_dir.mkdir(parents=True, exist_ok=True)

        exported = []
        skipped = []

        for pattern in patterns:
            # Only handle simple path (no kwargs, no converters) included via include or direct view.
            try:
                raw = getattr(pattern, "pattern", None)
                pattern_str = getattr(raw, "_route", "") if raw else ""
            except Exception:
                pattern_str = ""

            if hasattr(pattern, "url_patterns"):
                # Included sub-urls; descend one level.
                for sub in pattern.url_patterns:
                    sub_raw = getattr(sub, "pattern", None)
                    sub_route = getattr(sub_raw, "_route", "") if sub_raw else ""
                    if self._is_simple(sub_route):
                        self._export_route(client, sub_route, output_dir, base_url, exported, skipped)
                    else:
                        skipped.append(sub_route)
            else:
                if self._is_simple(pattern_str):
                    self._export_route(client, pattern_str, output_dir, base_url, exported, skipped)
                else:
                    skipped.append(pattern_str)

        self.stdout.write(self.style.SUCCESS(f"Exported {len(exported)} pages to {output_dir}"))
        if skipped:
            self.stdout.write(self.style.WARNING(f"Skipped {len(skipped)} patterns (dynamic or empty): {skipped}"))

    def _is_simple(self, route: str) -> bool:
        # Treat empty route as root path '/' so the homepage can be exported.
        if route == "":
            return True
        if "<" in route:
            return False
        return True

    def _export_route(self, client: Client, route: str, output_dir: Path, base_url: str, exported: list, skipped: list):
        path = "/" + route if not route.startswith("/") else route
        if path == "//":
            path = "/"
        response = client.get(path)
        if response.status_code != 200:
            skipped.append(route)
            return
        # Build folder structure; root -> dist/index.html, other -> dist/route/index.html
        if path == "/":
            target_dir = output_dir
        else:
            target_dir = output_dir / route
        target_dir.mkdir(parents=True, exist_ok=True)
        target_file = target_dir / "index.html"
        html = response.content.decode("utf-8")
        # Optionally adjust relative links if a base_url other than / is provided.
        if base_url != "/":
            html = html.replace('href="/', f'href="{base_url}')
            html = html.replace('src="/', f'src="{base_url}')
        target_file.write_text(html, encoding="utf-8")
        exported.append(route)