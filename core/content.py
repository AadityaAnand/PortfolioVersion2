SITE_NAME = "Aaditya Anand"
SITE_ROLE = "Software Engineer | Backend & Cloud Systems"


def build_nav_items(page_key):
    if page_key == "home":
        return [
            {"label": "Overview", "href": "#home", "target": "home"},
            {"label": "Impact", "href": "#impact", "target": "impact"},
            {"label": "Experience", "href": "#experience", "target": "experience"},
            {"label": "Projects", "href": "#projects", "target": "projects"},
            {"label": "Toolbox", "href": "#capabilities", "target": "capabilities"},
            {"label": "Contact", "href": "#contact", "target": "contact"},
        ]

    return [
        {"label": "Overview", "href": "../#home", "target": "home"},
        {"label": "Impact", "href": "../#impact", "target": "impact"},
        {"label": "Experience", "href": "../#experience", "target": "experience"},
        {"label": "Projects", "href": "../#projects", "target": "projects"},
        {"label": "Toolbox", "href": "../#capabilities", "target": "capabilities"},
        {"label": "Contact", "href": "./", "target": "contact"},
    ]


def build_page_paths(page_key):
    if page_key == "home":
        return {
            "home": "./",
            "contact": "contact/",
            "resume": "/static/core/documents/AadityaAnandResume.pdf",
        }

    return {
        "home": "../",
        "contact": "./",
        "resume": "/static/core/documents/AadityaAnandResume.pdf",
    }


HERO = {
    "name": SITE_NAME,
    "role": SITE_ROLE,
    "statement": "Backend engineer building scalable cloud systems, distributed services, and production-grade platforms.",
    "metrics": [
        {"value": "500+", "label": "users"},
        {"value": "65%", "label": "faster releases"},
        {"value": "10K+", "label": "req/min"},
    ],
    "signal": "Platform, APIs, reliability.",
}


IMPACT_METRICS = [
    {"value": "500+", "label": "Concurrent users stabilized in production"},
    {"value": "70%", "label": "Enterprise client scale unlocked on ECS"},
    {"value": "10K+", "label": "Requests per minute through async ingestion"},
    {"value": "65%", "label": "Faster release cadence through CI/CD"},
]


OPERATING_PRINCIPLES = []


EXPERIENCE_LOG = [
    {
        "period": "2024 - Present",
        "role": "Software Engineer",
        "company": "UMBC",
        "location": "United States",
        "impact": "Improved incident resolution by 30% for workflows serving 500+ users.",
        "details": [
            "Cut dashboard load times by 50% through PostgreSQL tuning.",
            "Improved release reliability with CI-driven testing and stronger delivery checks.",
        ],
        "stack": ["Python", "PostgreSQL", "OpenAPI", "GitLab CI", "Testing"],
    },
    {
        "period": "2023",
        "role": "Software Engineer",
        "company": "Intellicus / Kyvos",
        "location": "India",
        "impact": "Scaled AWS ECS microservices and accelerated releases by 65%.",
        "details": [
            "Supported 70% more enterprise client demand on a microservices architecture.",
            "Reduced database pressure by 35% with Redis and improved throughput by 40%.",
        ],
        "stack": ["AWS ECS", "Spring Boot", "Redis", "Jenkins", "Microservices"],
    },
    {
        "period": "2022 - 2023",
        "role": "Software Engineer",
        "company": "IIT Kharagpur",
        "location": "India",
        "impact": "Built async pipelines processing 10K+ requests per minute.",
        "details": [
            "Delivered an ML inference microservice for production-style model serving.",
            "Reduced ETL runtime from hours to under 30 minutes.",
        ],
        "stack": ["Python", "Docker", "Airflow", "Pandas", "REST APIs"],
    },
]


PROJECT_SPOTLIGHTS = [
    {
        "index": "01",
        "title": "Real-Time Collaborative Code Editor",
        "summary": "Sub-200ms collaborative editing with secure sessions and live presence.",
        "details": [
            "Socket-driven sync for edits, cursors, and presence.",
            "JWT auth with role-aware access control.",
        ],
        "stack": ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
        "links": [
            {"label": "Source", "url": "https://github.com/AadityaAnand/CodeEditor"},
        ],
    },
    {
        "index": "02",
        "title": "Opportunity & Trend Detection",
        "summary": "Kafka-driven analytics pipeline processing 100K+ daily signals.",
        "details": [
            "Reduced API latency from 800ms to under 300ms.",
            "Split ingestion, clustering, and API services for independent scale.",
        ],
        "stack": ["Python", "FastAPI", "Kafka", "PostgreSQL", "Docker", "scikit-learn"],
        "links": [
            {"label": "GitHub", "url": "https://github.com/AadityaAnand"},
        ],
    },
]


CAPABILITY_AREAS = [
    {
        "title": "Backend",
        "tools": ["Python", "Java", "Spring Boot", "FastAPI", "Django"],
    },
    {
        "title": "Cloud",
        "tools": ["AWS", "ECS", "Docker", "Kubernetes", "Terraform"],
    },
    {
        "title": "Systems",
        "tools": ["Microservices", "Kafka", "Redis", "REST APIs", "CI/CD"],
    },
    {
        "title": "Data",
        "tools": ["PostgreSQL", "MongoDB", "Airflow", "Spark", "Performance"],
    },
]


EDUCATION_RECORDS = [
    {
        "degree": "Master of Science in Computer Science",
        "institution": "University of Maryland, Baltimore County",
        "detail": "2025 · GPA 3.62 / 4.0",
    },
    {
        "degree": "Bachelor of Technology in Computer Science",
        "institution": "Medi-Caps University",
        "detail": "2023 · GPA 3.6 / 4.0",
    },
]


CONTACT_CHANNELS = [
    {"label": "Email", "value": "aadityaanand.tech@gmail.com", "href": "mailto:aadityaanand.tech@gmail.com"},
    {"label": "LinkedIn", "value": "linkedin.com/in/aadityaanand29", "href": "https://www.linkedin.com/in/aadityaanand29/"},
    {"label": "GitHub", "value": "github.com/AadityaAnand", "href": "https://github.com/AadityaAnand"},
]


CONTACT_NOTES = [
    "Open to backend, platform, and cloud engineering roles.",
    "Best fit: APIs, reliability, infrastructure, and data-heavy systems.",
]
