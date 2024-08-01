import { appState } from "./state.js";
import { loadLayout } from "./layout.js";

document.addEventListener("DOMContentLoaded", function () {
  try {
    loadLayout();
    setTimeout(() => {
      appState.updateCartCount();
    }, 100);
    displayProducts(currentPage);
    setupPagination();
  } catch (error) {
    console.error("Error loading layout:", error);
  }
});

const products = JSON.parse(localStorage.getItem("localProducts")) || [];
const productsPerPage = 8;
let currentPage = 1;

const container = document.getElementById("product-container");
const paginationContainer = document.getElementById("pagination-container");
const infoElement = document.querySelector(".left__info");
const filters = document.querySelector(".filters");
const dropdownMenu = filters.querySelector(".dropdown-menu");

let filteredProductsArray = [...products];

function displayProducts(page) {
  container.innerHTML = "";
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = Math.min(
    startIndex + productsPerPage,
    filteredProductsArray.length
  );

  infoElement.textContent = `Showing ${startIndex + 1}–${endIndex} of ${
    filteredProductsArray.length
  } results`;

  filteredProductsArray.slice(startIndex, endIndex).forEach((product, i) => {
    const productElement = createProductElement(product, startIndex + i);
    container.appendChild(productElement);
  });

  setupAddToCartListeners();
}

function createProductElement(product, index) {
  const productElement = document.createElement("div");
  productElement.classList.add("cards__el");
  productElement.innerHTML = `
    <img class="cards__el-img" src="${product.image}" alt="${product.name}">
    <div class="cards__el-content">
      <h3 class="cards__el-caption">${product.name}</h3>
      <span class="cards__el-text">${product.description}</span>
      <div class="cards__el-prices">
        <span class="prices__price">${product.price}</span>
        <span class="prices__discount"><strike>${product.discount}</strike></span>
      </div>
    </div>
    <div class="hover-container">
      <div class="buttons">
        <div class="buttons__first">
          <button class="add" data-index="${index}">Add to cart</button>
        </div>
        <div class="buttons__second">
          <button class="el-btn"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/shire.svg" alt=""><span class="text-btn">Share</span></button>
          <button class="el-btn"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/compire.svg" alt=""><span class="text-btn">Compire</span></button>
          <button class="el-btn"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/like.svg" alt=""><span class="text-btn">Like</span></button>
        </div>
      </div>
    </div>
  `;
  return productElement;
}

function setupAddToCartListeners() {
  container.addEventListener("click", (event) => {
    const { target } = event;
    if (target.classList.contains("add")) {
      const productIndex = parseInt(target.getAttribute("data-index"), 10);
      appState.addToCart(productIndex);
    }
  });
}

function setupPagination() {
  paginationContainer.innerHTML = "";
  const pageCount = Math.ceil(filteredProductsArray.length / productsPerPage);
  if (pageCount <= 1) {
    paginationContainer.style.display = "none";
    return;
  }

  paginationContainer.style.display = "flex";

  for (let i = 1; i <= pageCount; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.classList.add("page-button");

    if (i === currentPage) {
      pageButton.classList.add("active");
    }

    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayProducts(currentPage);
      setupPagination();
    });

    paginationContainer.appendChild(pageButton);
  }
  if (currentPage < pageCount) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.add("page-button", "next-button");

    nextButton.addEventListener("click", () => {
      currentPage++;
      displayProducts(currentPage);
      setupPagination();
    });

    paginationContainer.appendChild(nextButton);
  }
}

function filterProducts(type) {
  filteredProductsArray =
    type === "all"
      ? [...products]
      : products.filter((product) => product.type === type);

  currentPage = 1;
  displayProducts(currentPage);
  setupPagination();
}

filters.addEventListener("click", () => {
  dropdownMenu.classList.toggle("visible");
});

dropdownMenu.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    filterProducts(item.id);
  });
});
console.log(paginationContainer);
