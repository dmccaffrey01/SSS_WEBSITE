const pMenuWrapper = document.querySelector(".projects-menu-wrapper");
const headerEl = document.querySelector("header");
const pMenuLogo = document.querySelector(".inner-logo-container");

let animationRunning = false;

const openProjectMenu = () => {

    animationRunning = true;

    pMenuWrapper.classList.add("square");
    headerEl.classList.add("hide");
    window.setTimeout(() => {
        pMenuWrapper.classList.add("circle");

        window.setTimeout(() => {
            pMenuLogo.classList.add("show");
        }, 300);
    }, 300);
}

const closeProjectMenu = () => {
    pMenuLogo.classList.remove("show");
    window.setTimeout(() => {
        pMenuWrapper.classList.remove("circle");

        window.setTimeout(() => {
            pMenuWrapper.classList.remove("square");
            headerEl.classList.remove("hide");
        }, 300);
    }, 300);

    animationRunning = false;
}

function solveQuadratic(a, b, c) {
    let discriminant = (b * b) - (4 * a * c);

    let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    return [Math.round(-root1), Math.round(-root2)];
}

function findIntersectionPoints(size) {
    const a = 2;
    const b = size * 2;
    const c = (size * size) / 4;

    let roots = solveQuadratic(a, b, c);

    return roots;
}

const pSliders = document.querySelectorAll(".pslider");

const showSlider = (i) => {
    pSliders[i].classList.add("slide");

    window.setTimeout(() => {
        pSliders[i].classList.add("border");
    }, 300);
}

const hideSlider = (i) => {
    pSliders[i].classList.remove("border");

    window.setTimeout(() => {
        pSliders[i].classList.remove("slide");
    }, 300);
}

const logos = document.querySelectorAll(".plogo");
const logoContainer = document.querySelector(".projects-logo-container");
let rotateStop = false;
let rotatingContainer = false;

const rotateDeg = (element, targetDegree, time, start) => {
    let style = window.getComputedStyle(element);
    let degree;
    if (start) {
        degree = start;
        element.style.rotate = `${degree}deg`;
    } else {
        degree = parseFloat(style.getPropertyValue("rotate").split("deg")[0]);
    }
    
    let delay = 10;
    let diff = targetDegree - degree;
    let amount = (diff / time) * delay;
    let counter = 0;

    let rotateDegInterval = window.setInterval(() => {
        if (counter >= time) {
            clearInterval(rotateDegInterval);
        } else {
            degree += amount;
            element.style.rotate = `${degree}deg`;

            logos.forEach(logo => {
                let image = logo.querySelector(".img-100a");
                image.style.rotate = `${-degree}deg`;
            });

            counter += delay;
        }
    }, delay);
}

const rotateContainer = () => {

    if (rotatingContainer) {
        return;
    } else {
        let style = window.getComputedStyle(logoContainer);
        let degree = parseFloat(style.getPropertyValue("rotate").split("deg")[0]);
        rotatingContainer = true;
        let rotateInterval = window.setInterval(() => {
            if (rotateStop) {
                clearInterval(rotateInterval);
            } else {
                degree += 0.03;
                logoContainer.style.rotate = `${degree}deg`;
                logos.forEach(logo => {
                    let image = logo.querySelector(".img-100a");
                    image.style.rotate = `${-degree}deg`;
                });

                if (degree >= 360) {
                    degree = 0;
                }
            }
        }, 10);
    }
}

const menuItems = document.querySelectorAll(".projects-menu-item");

const displayMenuItem = (index) => {

    let selectedIndex = index + 1;

    menuItems.forEach((item, i) => {
        if (i == selectedIndex) {
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

let logoClicked = false;

logos.forEach((logo, i) => {
    logo.addEventListener("mouseenter", () => {
        rotateStop = true;
        rotatingContainer = false;

        showSlider(i);
    });
});

logos.forEach((logo, i) => {
    logo.addEventListener("mouseleave", () => {
        if (logoClicked) {
            return;
        } else {
            rotateStop = false;
            
            rotateContainer();
            hideSlider(i);
        }
    });
});

const hideLogos = () => {
    rotateStop = true;
    rotatingContainer = false;

    logos.forEach((logo, i) => {
        logo.style.transform = "translate(-50%, -50%)";
    });


    window.setTimeout(() => {
        logoContainer.classList.remove("show");
        closeProjectMenu();
    }, 300);
}

logos.forEach((logo, i) => {
    logo.addEventListener("click", () => {
        rotateStop = true;
        logoClicked = true;
        rotatingContainer = false;
        hideSlider(i);
        displayMenuItem(i);
        hideLogos();
        this.blur();
    });
});


const displayLogos = () => {

    logoClicked = false;
    rotateStop = false;
    rotatingContainer = false;

    let logosWidth = logos[0].offsetWidth;

    window.setTimeout(() => {

        let roots = findIntersectionPoints(logosWidth);

        logoContainer.classList.add("show");

        rotateDeg(logoContainer, 359, 300, 357);
        
        logos.forEach((logo, i) => {
            if (i == 0) {
                logo.style.transform = `translate(-50%, -250px)`;
            } else if (i == 1) {
                logo.style.transform = `translate(calc(217px - ${roots[1]}px), calc(125px - ${roots[1]}px))`;
            } else if (i == 2) {
                logo.style.transform = `translate(calc(-217px - ${roots[0]}px), calc(125px - ${roots[1]}px))`;
            }
            logo.style.opacity = "1";
        });

        window.setTimeout(() => {
            logoContainer.classList.add("rotate");
            rotateContainer();
        }, 300);
    }, 1000);
}

window.addEventListener("wheel", () => {
    if (animationRunning) {
        return;
    } else {
        openProjectMenu();

        displayLogos();
    }
});