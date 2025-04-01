document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const darkModeToggle = document.querySelector('#toggle_left_sidebar_skin');

    function applyDarkModeStyles() {
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark-skin");
            document.querySelectorAll('span, p, a').forEach(el => {
                el.style.color = "#ffffff";
            });
            if (darkModeToggle) darkModeToggle.checked = true;
        } else {
            document.querySelectorAll('span, p, a').forEach(el => {
                el.style.color = "";
            });
        }
    }
    applyDarkModeStyles();
    if (darkModeToggle) {
        darkModeToggle.addEventListener("change", function () {
            if (this.checked) {
                localStorage.setItem("darkMode", "enabled");
            } else {
                localStorage.setItem("darkMode", "disabled");
            }
            applyDarkModeStyles();
        });
    }
});
