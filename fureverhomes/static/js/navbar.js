let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        navbar.style.top = "0"; // show navbar when scrolling up
    } else {
        navbar.style.top = "-80px"; // hide navbar when scrolling down
    }
    prevScrollPos = currentScrollPos;
};

// Hamburger menu toggle for mobile
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});
