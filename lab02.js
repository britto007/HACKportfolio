(function () {
    // php theke join success ba error shoho redirect korar por URL query 
    // parameter check kore message show kora, tarpor URL clean kora.
    var joinParams = new URLSearchParams(window.location.search);
    if (joinParams.get("join_success") === "1") {
        var successEl = document.getElementById("join-success-msg");
        if (successEl) {
            successEl.hidden = false;
        }
        var joinSection = document.getElementById("join");
        if (joinSection) {
            joinSection.scrollIntoView({behavior: "smooth", block: "start"});
        }
        joinParams.delete("join_success");
        var clean=window.location.pathname +(joinParams.toString() ? "?" + joinParams.toString() : "") + "#join";
        history.replaceState(null, "",clean);
    } else if (joinParams.get("join_error") ==="1") {
        var errorEl = document.getElementById("join-error-msg");
        if (errorEl) {
            errorEl.hidden=false;
        }
        var joinErrSection = document.getElementById("join");
        if (joinErrSection) {
            joinErrSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        joinParams.delete("join_error");
        var cleanErr = window.location.pathname + (joinParams.toString() ? "?" + joinParams.toString() : "") + "#join";
        history.replaceState(null, "", cleanErr);
    }

    // Theme toggle setup.
    var themeToggle = document.getElementById("theme-toggle");
    var root = document.documentElement;
    var savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        root.setAttribute("data-theme", "light");
        if (themeToggle) {
            themeToggle.textContent = "Dark Mode";
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            var isLight = root.getAttribute("data-theme") === "light";
            if (isLight) {
                root.removeAttribute("data-theme");
                localStorage.setItem("theme", "dark");
                themeToggle.textContent = "Light Mode";
            } else {
                root.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
                themeToggle.textContent = "Dark Mode";
            }
        });
    }

    // Smoothly scroll to in-page sections when clicking links like #projects or #join.
    var sectionLinks = document.querySelectorAll('a[href^="#"]');
    sectionLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            var targetId = link.getAttribute("href");

            // Skip empty hashes or invalid targets.
            if (!targetId || targetId === "#") {
                return;
            }

            var targetSection = document.querySelector(targetId);
            if (!targetSection) {
                return;
            }

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Keep the URL hash updated after scrolling for shareability/back navigation.
            history.pushState(null, "", targetId);
        });
    });

    // Project filter setup.
    // Buttons decide which category is visible, and cards are shown/hidden accordingly.
    var filterButtons = document.querySelectorAll(".filter-btn");
    var projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var selectedFilter = button.getAttribute("data-filter");

            // Update visual active state on filter buttons.
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            button.classList.add("active");

            // Show all cards for "all", otherwise show cards matching selected category.
            projectCards.forEach(function (card) {
                var categories = card.getAttribute("data-categories");
                var categoryList = categories ? categories.split(",") : [];
                var isMatch = selectedFilter === "all" || categoryList.indexOf(selectedFilter) !== -1;

                if (isMatch) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    // Back-to-top setup.
    // Show button after scrolling down, and smoothly return to top when clicked.
    var backToTopButton = document.getElementById("back-to-top");

    function updateBackToTopVisibility() {
        if (!backToTopButton) {
            return;
        }

        if (window.scrollY > 250) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", updateBackToTopVisibility);
    updateBackToTopVisibility();

    if (backToTopButton) {
        backToTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
}());
