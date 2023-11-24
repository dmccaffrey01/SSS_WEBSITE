const pMenuWrapper = document.querySelector(".projects-menu-wrapper");
const headerEl = document.querySelector("header");
const pMenuLogo = document.querySelector(".inner-logo-container");

let animationRunning = false;

const openProjectMenu = () => {

    if (animationRunning) {
        return;
    } else {
        animationRunning = true;

        pMenuWrapper.classList.add("square");
        headerEl.classList.add("hide");
        window.setTimeout(() => {
            pMenuWrapper.classList.add("circle");

            window.setTimeout(() => {
                pMenuLogo.classList.add("show");
            }, 400);
        }, 400);
    }
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

const displayLogos = () => {
    
    const logos = document.querySelectorAll(".plogo");

    let logosWidth = logos[0].offsetWidth;
    
    window.setTimeout(() => {
        let roots = findIntersectionPoints(logosWidth);
        
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

        const delay = logos.length * 800;

        window.setTimeout(() => {
            let logoContainer = document.querySelector(".projects-logo-container");

            logoContainer.classList.add("rotate");
        }, delay);
    }, 1200);
}

window.addEventListener("wheel", () => {
    openProjectMenu();

    displayLogos();
});