let animationRunning = false;
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
            el.style.translate = `${-multiple * 100}% 0`;
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