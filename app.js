import {
    renderDashboard
} from "./view-dashboard.js";
import {
    renderDetail
} from "./view-detail.js";


const themeToggle = document.querySelector("#toggle-mode");
let isDarkMode = localStorage.getItem('darkMode') === 'enabled';

const enableDarkMode = () => {
    document.documentElement.classList.add('darkmode');
    localStorage.setItem('darkMode', 'enabled');
    isDarkMode = true;
    updateButtonLabel();
};

const disableDarkMode = () => {
    document.documentElement.classList.remove('darkmode');
    localStorage.setItem('darkMode', 'disabled');
    isDarkMode = false;
    updateButtonLabel();
};

const toggleTheme = () => {
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
};

const updateButtonLabel = () => {
    themeToggle.innerText = isDarkMode ? "Light Theme" : "Dark Theme";
};

themeToggle.addEventListener('click', toggleTheme);

// Initialize the theme based on localStorage
if (isDarkMode) {
    enableDarkMode();
} else {
    disableDarkMode();
}

if (window.location.search.includes("?country=")) {
    renderDetail();
} else {
    document.querySelector(".filters").classList.add("active");
    renderDashboard();
}