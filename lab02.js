(function () {
    // Theme toggle setup.
    var themeToggle = document.getElementById("theme-toggle");
    var root = document.documentElement;
    var savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        root.setAttribute("data-theme", "light");
        themeToggle.textContent = "Dark Mode";
    }

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

    // Smoothly scroll  korbe jokhn noin now or view project e jabe.
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

            // jeta filter korbo ota show korbe .
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            button.classList.add("active");

            // all e thakle shob card show korbe.
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
    // click korle smoothly upore jabe.
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
