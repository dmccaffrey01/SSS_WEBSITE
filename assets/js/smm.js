const pMenuWrapper = document.querySelector(".projects-menu-wrapper");
const headerEl = document.querySelector("header");
const pMenuLogo = document.querySelector(".inner-logo-container");

let animationRunning = false;

let leftOrRight;

const openProjectMenu = () => {

    animationRunning = true;

    //pMenuWrapper.classList.add("square");
    headerEl.classList.add("hide");
    window.setTimeout(() => {
        pMenuWrapper.classList.add(`swipe-${leftOrRight}`);
    }, 300);
}

const closeProjectMenu = () => {
    window.setTimeout(() => {
        if (pMenuWrapper.classList.contains("swipe-left")) {
            pMenuWrapper.classList.remove(`swipe-left`);
        }

        if (pMenuWrapper.classList.contains("swipe-right")) {
            pMenuWrapper.classList.remove(`swipe-right`);
        }
        
        window.setTimeout(() => {
            //pMenuWrapper.classList.remove("square");
            headerEl.classList.remove("hide");
            animationRunning = false;
        }, 300);
    }, 300);
}

const pMenuItems = document.querySelectorAll(".projects-menu-item");

const getCurrentItemIndex = () => {
    let currentIndex;

    pMenuItems.forEach((item, i) => {
        
        
        if (!item.classList.contains("hide")) {
            currentIndex = i;
        }

    });

    return currentIndex;
}

const getNextItemIndex = (nextOrPrev) => {
    let currentIndex = getCurrentItemIndex();

    let nextIndex;

    let itemsTotal = pMenuItems.length - 1;

    if (currentIndex == 0 && nextOrPrev == -1) {
        nextIndex = itemsTotal;
    } else if (currentIndex == itemsTotal && nextOrPrev == 1) {
        nextIndex = 0;
    } else {
        nextIndex = currentIndex + nextOrPrev;
    }

    return nextIndex;
}

const openNextProject = (posOrNeg) => {
    let nextIndex = getNextItemIndex(posOrNeg);

    pMenuItems.forEach((item, i) => {
        if (i == nextIndex) {
            if (item.classList.contains("hide")) {
                item.classList.remove("hide");
            }
        } else {
            if (!item.classList.contains("hide")) {
                item.classList.add("hide");
            }
        }
    });
}


window.addEventListener("wheel", (e) => {
    if (animationRunning) {
        return;
    } else {
        if (e.deltaY > 0) {
            leftOrRight = "right";
        } else {
            leftOrRight = "left";
        }
        openProjectMenu();

        window.setTimeout(() => {
            if (e.deltaY > 0) {
                openNextProject(1);
            } else {
                openNextProject(-1);
            }
        
            window.setTimeout(() => {
                closeProjectMenu();
            }, 50)
        }, 600)
    }
});