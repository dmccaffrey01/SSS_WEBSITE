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




const testimonialSwipeLeft = document.querySelector(".testimonial-swipe-left");
const testimonialSwipeRight = document.querySelector(".testimonial-swipe-right");
const testimonialCards = document.querySelectorAll(".testimonial-card-container");

const getCardData = () => {
    let cardData = {};
    testimonialCards.forEach((card) => {
        if (card.classList.contains('center')) {
            cardData.center = testimonialCards.indexOf(card);
        } else if (card.classList.contains('left')) {
            cardData.center = testimonialCards.indexOf(card);
        }
    });
}

const swipeCardsRight = () => {
    let cardData = getCardData();
}

testimonialSwipeRight.addEventListener("click", () => {
    swipeCardsRight();
});