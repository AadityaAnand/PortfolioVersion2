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
    "eyebrow": "Backend / Cloud / Distributed Systems",
    "headline": "Engineering backend systems that stay fast, observable, and reliable in production.",
    "summary": (
        "Backend engineer focused on scalable distributed systems, cloud-native applications, "
        "performance tuning, and production-grade delivery across data-heavy platforms."
    ),
    "pills": [
        "Distributed systems",
        "Microservices",
        "Cloud infrastructure",
        "Performance engineering",
    ],
    "status": [
        {"label": "Focus", "value": "Platform, API, and infrastructure-heavy builds"},
        {"label": "Strength", "value": "Throughput, release quality, and service reliability"},
        {"label": "Mode", "value": "Hands-on engineer with strong systems and delivery bias"},
    ],
}


IMPACT_METRICS = [
    {"value": "500+", "label": "Concurrent users stabilized in production"},
    {"value": "70%", "label": "Enterprise client scale unlocked on ECS"},
    {"value": "10K+", "label": "Requests per minute through async ingestion"},
    {"value": "65%", "label": "Faster release cadence through CI/CD"},
]


OPERATING_PRINCIPLES = [
    {
        "title": "Architecture with restraint",
        "description": (
            "Clear service boundaries, deliberate interfaces, and systems that stay understandable "
            "as they grow."
        ),
    },
    {
        "title": "Reliability as a product feature",
        "description": (
            "CI, tests, observability, and operational feedback loops are built in early, not patched on later."
        ),
    },
    {
        "title": "Performance with evidence",
        "description": (
            "Caching, query design, concurrency strategy, and profiling decisions tied to measurable outcomes."
        ),
    },
]


EXPERIENCE_LOG = [
    {
        "period": "2024 - Present",
        "role": "Software Engineer",
        "company": "University of Maryland, Baltimore County",
        "location": "United States",
        "summary": (
            "Redesigned academic workflow backends and analytics tooling to make internal systems faster, "
            "more reliable, and easier to operate under sustained usage."
        ),
        "outcomes": [
            "Reworked backend workflows for 500+ concurrent users, cutting incident resolution time by 30%.",
            "Reduced dashboard load times by 50% through PostgreSQL query tuning and API response shaping.",
            "Improved release reliability with CI-driven testing, review discipline, and stronger delivery checks.",
        ],
        "metrics": ["500+ users", "30% faster incident resolution", "50% faster dashboards"],
        "stack": ["Python", "PostgreSQL", "OpenAPI", "GitLab CI", "Testing"],
    },
    {
        "period": "2023",
        "role": "Software Engineer",
        "company": "Intellicus Technologies / Kyvos",
        "location": "India",
        "summary": (
            "Built AWS-hosted microservices and delivery pipelines for analytics infrastructure serving "
            "enterprise workloads at increasing scale."
        ),
        "outcomes": [
            "Scaled microservices on AWS ECS to support 70% more enterprise client demand.",
            "Accelerated release cycles by 65% with CI/CD improvements across build and deployment workflows.",
            "Reduced database pressure by 35% with Redis caching and drove 40% throughput improvement.",
        ],
        "metrics": ["70% client scale", "65% faster releases", "40% throughput gain"],
        "stack": ["AWS ECS", "Spring Boot", "Redis", "Jenkins", "Microservices"],
    },
    {
        "period": "2022 - 2023",
        "role": "Software Engineer",
        "company": "Indian Institute of Technology, Kharagpur",
        "location": "India",
        "summary": (
            "Delivered research-grade ingestion, ML-serving, and ETL systems that turned high-volume data "
            "collection into reliable operational pipelines."
        ),
        "outcomes": [
            "Scaled asynchronous scraping infrastructure to 10K+ requests per minute.",
            "Built an ML inference microservice with REST endpoints for production-style model serving.",
            "Compressed ETL runtimes from hours to under 30 minutes through pipeline redesign.",
        ],
        "metrics": ["10K+ req/min", "<30 min ETL", "ML inference service"],
        "stack": ["Python", "Docker", "Airflow", "Pandas", "REST APIs"],
    },
]


PROJECT_SPOTLIGHTS = [
    {
        "index": "01",
        "title": "Real-Time Collaborative Code Editor",
        "tagline": "Low-latency multi-user editing with permissions, presence, and production-minded session control.",
        "challenge": (
            "Design a collaborative editing system that feels immediate under concurrent activity while "
            "preserving role control, session security, and interface responsiveness."
        ),
        "architecture": [
            "Socket-driven synchronization for shared editing, presence, and cursor updates.",
            "JWT-based authentication and role-aware access controls for secure collaboration.",
            "Mongo-backed session state with rendering optimizations aimed at 60fps interaction.",
        ],
        "outcome": (
            "Delivered sub-200ms collaborative editing with real-time presence indicators and a workflow "
            "that behaves more like an engineering tool than a demo."
        ),
        "stack": ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
        "links": [
            {"label": "Source", "url": "https://github.com/AadityaAnand/CodeEditor"},
        ],
    },
    {
        "index": "02",
        "title": "Opportunity & Trend Detection",
        "tagline": "Event-driven analytics pipeline for surfacing emerging signals from large social datasets.",
        "challenge": (
            "Process high-volume social data fast enough to detect clusters and opportunities while keeping "
            "API latency low for downstream consumers."
        ),
        "architecture": [
            "Kafka-based ingestion and ETL pipeline handling 100K+ daily social data points.",
            "FastAPI services split across ingestion, clustering, and query responsibilities.",
            "DBSCAN-based clustering with Dockerized services for isolated scaling and deployment.",
        ],
        "outcome": (
            "Reduced response times from 800ms to under 300ms and created a service layout that can scale "
            "each stage independently as usage grows."
        ),
        "stack": ["Python", "FastAPI", "Kafka", "PostgreSQL", "Docker", "scikit-learn"],
        "links": [
            {"label": "GitHub", "url": "https://github.com/AadityaAnand"},
        ],
    },
]


CAPABILITY_AREAS = [
    {
        "title": "Distributed systems",
        "summary": "Service boundaries, async workflows, queue-backed processing, and stable system behavior under load.",
        "tools": ["Microservices", "Kafka", "Redis", "gRPC / REST", "Concurrency design"],
    },
    {
        "title": "Cloud infrastructure",
        "summary": "Cloud-native deployment and delivery workflows built for repeatability, scale, and clean operations.",
        "tools": ["AWS", "ECS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
    },
    {
        "title": "Backend delivery",
        "summary": "API design, schema decisions, integration layers, and CI systems that keep shipping predictable.",
        "tools": ["Python", "Java", "Spring Boot", "FastAPI", "Django", "OpenAPI"],
    },
    {
        "title": "Data and performance",
        "summary": "Query tuning, cache strategy, ETL design, and throughput work that improves real production outcomes.",
        "tools": ["PostgreSQL", "MongoDB", "Redis", "Spark", "Airflow", "Profiling"],
    },
]


EDUCATION_RECORDS = [
    {
        "degree": "Master of Science in Computer Science",
        "institution": "University of Maryland, Baltimore County",
        "detail": "Graduated May 2025 · GPA 3.62 / 4.0",
    },
    {
        "degree": "Bachelor of Technology in Computer Science",
        "institution": "Medi-Caps University",
        "detail": "Graduated May 2023 · GPA 3.6 / 4.0",
    },
]


CONTACT_CHANNELS = [
    {"label": "Email", "value": "aadityaanand.tech@gmail.com", "href": "mailto:aadityaanand.tech@gmail.com"},
    {"label": "LinkedIn", "value": "linkedin.com/in/aadityaanand29", "href": "https://www.linkedin.com/in/aadityaanand29/"},
    {"label": "GitHub", "value": "github.com/AadityaAnand", "href": "https://github.com/AadityaAnand"},
]


CONTACT_NOTES = [
    "Best fit: backend, platform, distributed systems, or cloud-infrastructure roles.",
    "Open to technical discussions around APIs, performance engineering, and production architecture.",
    "Available for full-time opportunities and serious project collaborations.",
]
