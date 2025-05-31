document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');

    if (hamburgerIcon && mobileNavLinks) {
        hamburgerIcon.addEventListener('click', function () {
            mobileNavLinks.classList.toggle('active');
        });
    }
}); 