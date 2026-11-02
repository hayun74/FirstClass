// 로그인 페이지 테마 선택 기능
const themeSelect = document.querySelector("#theme-select");
const themeStylesheet = document.querySelector("#theme-stylesheet");

const themes = {
    neo: "login_neo.css",
    isometric: "login_isometric.css",
    clay: "login_clay.css",
    pop: "login_pop.css",
    pixel: "login_pixel.css"
};

themeSelect.addEventListener("change", () => {
    const selectedTheme = themeSelect.value;
    const stylesheet = themes[selectedTheme];

    if (stylesheet) {
        themeStylesheet.href = stylesheet;
        localStorage.setItem("melon-login-theme", selectedTheme);
    }
});

// 마지막으로 선택한 테마를 기억하고, 저장된 값이 없으면 Isometric을 사용
const savedTheme = localStorage.getItem("melon-login-theme");
if (savedTheme && themes[savedTheme]) {
    themeSelect.value = savedTheme;
    themeStylesheet.href = themes[savedTheme];
}