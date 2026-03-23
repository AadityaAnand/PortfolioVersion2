from django.shortcuts import render

from .content import (
    CAPABILITY_AREAS,
    CONTACT_CHANNELS,
    EDUCATION_RECORDS,
    EXPERIENCE_LOG,
    HERO,
    IMPACT_METRICS,
    OPERATING_PRINCIPLES,
    PROJECT_SPOTLIGHTS,
    SITE_NAME,
    SITE_ROLE,
    build_page_paths,
    build_nav_items,
)


def home(request):
    context = {
        "site_name": SITE_NAME,
        "site_role": SITE_ROLE,
        "page_key": "home",
        "nav_items": build_nav_items("home"),
        "page_paths": build_page_paths("home"),
        "hero": HERO,
        "impact_metrics": IMPACT_METRICS,
        "operating_principles": OPERATING_PRINCIPLES,
        "experience_log": EXPERIENCE_LOG,
        "project_spotlights": PROJECT_SPOTLIGHTS,
        "capability_areas": CAPABILITY_AREAS,
        "education_records": EDUCATION_RECORDS,
        "contact_channels": CONTACT_CHANNELS,
    }
    return render(request, "core/home.html", context)
