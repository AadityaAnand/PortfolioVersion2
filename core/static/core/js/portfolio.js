(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var topbar = document.querySelector(".topbar");
    var navToggle = document.querySelector(".nav-toggle");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));

    function closeNav() {
        if (!topbar || !navToggle) {
            return;
        }

        topbar.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
    }

    if (navToggle && topbar) {
        navToggle.addEventListener("click", function () {
            var isOpen = topbar.classList.toggle("nav-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", closeNav);
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 980) {
                closeNav();
            }
        });
    }

    if (revealItems.length) {
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            revealItems.forEach(function (item) {
                item.classList.add("is-visible");
            });
        } else {
            var revealObserver = new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.16,
                    rootMargin: "0px 0px -8% 0px",
                }
            );

            revealItems.forEach(function (item) {
                revealObserver.observe(item);
            });
        }
    }

    if (sections.length && "IntersectionObserver" in window) {
        var linkMap = {};

        navLinks.forEach(function (link) {
            var target = link.getAttribute("data-nav-target");
            if (target) {
                linkMap[target] = link;
            }
        });

        var activeObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    var targetId = entry.target.id;
                    var link = linkMap[targetId];

                    if (!link) {
                        return;
                    }

                    if (entry.isIntersecting) {
                        navLinks.forEach(function (item) {
                            item.classList.remove("is-active");
                        });
                        link.classList.add("is-active");
                    }
                });
            },
            {
                threshold: 0.45,
                rootMargin: "-30% 0px -45% 0px",
            }
        );

        sections.forEach(function (section) {
            activeObserver.observe(section);
        });
    }
})();
