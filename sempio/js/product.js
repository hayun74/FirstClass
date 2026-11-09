(() => {
    const tabButtons = [...document.querySelectorAll(".catalog-tab")];
    const panels = [...document.querySelectorAll(".catalog-panel")];

    function activateTab(name) {
        tabButtons.forEach((button) => {
            const active = button.dataset.tab === name;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", String(active));
            button.tabIndex = active ? 0 : -1;
        });

        panels.forEach((panel) => {
            const active = panel.dataset.panel === name;
            panel.classList.toggle("is-active", active);
            panel.hidden = !active;
        });

        if (name === "new" && window.productSwiper) {
            window.productSwiper.update();
        }
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener("click", () => activateTab(button.dataset.tab));
        button.addEventListener("keydown", (event) => {
            if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            let nextIndex = index;
            if (event.key === "ArrowRight") nextIndex = (index + 1) % tabButtons.length;
            if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            if (event.key === "Home") nextIndex = 0;
            if (event.key === "End") nextIndex = tabButtons.length - 1;
            tabButtons[nextIndex].focus();
            activateTab(tabButtons[nextIndex].dataset.tab);
        });
    });

    document.querySelectorAll("[data-jump-tab]").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const name = link.dataset.jumpTab;
            activateTab(name);
            document.querySelector(".product-catalog").scrollIntoView({ behavior: "smooth" });
        });
    });

    document.querySelectorAll(".filter-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            chip.parentElement.querySelectorAll(".filter-chip").forEach((item) => {
                const active = item === chip;
                item.classList.toggle("is-active", active);
                item.setAttribute("aria-pressed", String(active));
            });
        });
    });

    document.querySelectorAll(".brand-option").forEach((option) => {
        option.addEventListener("click", () => {
            option.parentElement.querySelectorAll(".brand-option").forEach((item) => {
                const active = item === option;
                item.classList.toggle("is-active", active);
                item.setAttribute("aria-pressed", String(active));
            });
        });
    });

    if (typeof Swiper !== "undefined") {
        window.productSwiper = new Swiper(".new-product-swiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 600,
            loop: false,
            watchOverflow: true,
            navigation: {
                prevEl: ".new-product-prev",
                nextEl: ".new-product-next"
            },
            pagination: {
                el: ".new-product-pagination",
                clickable: true
            },
            breakpoints: {
                769: { slidesPerView: 1, spaceBetween: 24 }
            }
        });
    }
})();
