const productsBtn = document.querySelector(".products-nav-btn");
const productsContainer = document.querySelector(".products-nav-container");

productsBtn.addEventListener("click", () => {
    productsContainer.classList.toggle("active");
});