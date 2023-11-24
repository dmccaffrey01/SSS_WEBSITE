/* Home Intro */

const introSvgContainer = document.querySelector(".svg-logo-container");
const introContainer = document.querySelector(".home-intro-container");

document.addEventListener("DOMContentLoaded", () => {
    introSvgContainer.classList.add("show");

    window.setTimeout(() => {
        introContainer.classList.add("hide");

        window.setTimeout(() => {
            introContainer.style.display = "none";
        }, 1550);
    }, 3500);
});

/* Scroll Animations */

let observerCounter = 0;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            observer.unobserve(entry.target);
        } 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));
});
