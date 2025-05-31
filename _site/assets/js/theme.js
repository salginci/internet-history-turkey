// Theme toggle logic for all pages
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    function setTheme(isLight) {
        if (isLight) {
            document.body.classList.add('light-theme');
            icon.classList.remove('ri-moon-line');
            icon.classList.add('ri-sun-line');
        } else {
            document.body.classList.remove('light-theme');
            icon.classList.remove('ri-sun-line');
            icon.classList.add('ri-moon-line');
        }
    }
    // Load from localStorage
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'light');
    themeToggle.addEventListener('click', () => {
        const isLight = !document.body.classList.contains('light-theme');
        setTheme(isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

document.addEventListener('DOMContentLoaded', initializeThemeToggle); 