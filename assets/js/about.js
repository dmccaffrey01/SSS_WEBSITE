const blobs = document.querySelectorAll(".blob-container");

const returnBack = () => {
    blobs.forEach(blob => {
        if (blob.classList.contains("active")) {
            blob.classList.remove("active");
        }

        let hiddenElements = document.querySelectorAll(".hide");

        hiddenElements.forEach(hiddenElement => {
            hiddenElement.classList.remove("hide");
        });

        let showElements = document.querySelectorAll(".show");

        showElements.forEach(showElement => {
            showElement.classList.remove("show");
        });

        
    })
}

const hideElements = (oppName) => {
    let oppBlob = document.querySelector(`.${oppName}-blob-container`);

    oppBlob.classList.add("hide");

    let introText = document.querySelector(".intro-text-container");

    introText.classList.add("hide");
}

const showElements = (name) => {
    let nameText = document.querySelector(`.${name}-text-container`);

    nameText.classList.add("show");

    let returnBtn = nameText.querySelector(".return-btn");

    returnBtn.addEventListener("click", () => {
        returnBack();
    });
}

blobs.forEach((blob) => {
    let oppName = blob.getAttribute("data-opp-name");
    let name = blob.getAttribute("data-name");
    
    blob.addEventListener("click", () => {
        blob.classList.add("active");

        hideElements(oppName);

        showElements(name);
    });

    blob.addEventListener("mouseenter", () => {
        let oppBlob = document.querySelector(`.${oppName}-blob-container`);

        oppBlob.classList.add("highlight");
    })

    blob.addEventListener("mouseleave", () => {
        let oppBlob = document.querySelector(`.${oppName}-blob-container`);

        oppBlob.classList.remove("highlight");
    })
});