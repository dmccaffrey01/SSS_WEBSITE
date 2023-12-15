/* Home Intro */

const introSvgContainer = document.querySelector(".svg-logo-container");
const introContainer = document.querySelector(".home-intro-container");
const header = document.querySelector("header");
let animationRunning = true;

document.addEventListener("DOMContentLoaded", () => {
    introSvgContainer.classList.add("show");

    window.setTimeout(() => {
        introContainer.classList.add("hide");

        window.setTimeout(() => {
            introContainer.style.display = "none";
            animationRunning = false;
        }, 1500);
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

/* Slider */

const sliderElements = document.querySelectorAll(".section");

const getCurrentSliderIndex = () => {
    let currentIndex;

    sliderElements.forEach((el, i) => {
        if (el.classList.contains("current")) {
            currentIndex = i;
        }
    });

    return currentIndex;
}

const changeCurrentSliderIndex = (posOrNeg) => {
    let currentIndex;

    sliderElements.forEach((el, i) => {
        if (el.classList.contains("current")) {
            currentIndex = i;
            el.classList.remove("current");
        }
    });

    if (currentIndex == 1 && posOrNeg == -1) {
        header.style.display = "flex";
    } else {
        header.style.display = "none";
    }

    sliderElements[currentIndex + posOrNeg].classList.add("current");
}

const slideSections = (posOrNeg) => {
    let currentIndex = getCurrentSliderIndex();

    if (currentIndex == 0 && posOrNeg == -1) {
        return;
    } else if (currentIndex == sliderElements.length - 1 && posOrNeg == 1) {
        return;
    } else {
        let multiple = currentIndex + posOrNeg;

        sliderElements.forEach((el, i) => {
            el.style.translate = `0 ${-multiple * 100}%`;
        });

        changeCurrentSliderIndex(posOrNeg);
    }
}

window.addEventListener("wheel", (e) => {
    if (animationRunning) {
        return;
    } else {
        if (e.deltaY > 0) {
            slideSections(1);
        } else {
            slideSections(-1);
        }
        animationRunning = true;

        window.setTimeout(() => {
            animationRunning = false;
        }, 800);
    }
});

/* Category Container */

const categories = document.querySelectorAll(".category-container");

categories.forEach((category )=> {
    category.addEventListener("click", () => {
        let link = category.getAttribute("data-link");
        let url = new URL(window.location.href);

        url.pathname = url.pathname + link;
        window.location.href = url.href;
    });
})