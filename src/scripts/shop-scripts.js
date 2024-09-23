import { appState } from "./state.js";
import { loadLayout } from "./layout.js";
document.addEventListener("DOMContentLoaded", function () {
  try {
    loadLayout()
      .then(() => {
        appState.updateCartCount();
        const params = new URLSearchParams(window.location.search);
        const filterParam = params.get("filter");
        applyFilter(filterParam);
      })
      .catch((error) => {
        console.error("Error loading layout:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
});

const products = appState.getProducts();
let productsPerPage = 8;
let currentPage = 1;

const container = document.getElementById("product-container");
const paginationContainer = document.getElementById("pagination-container");
const infoElement = document.querySelector(".left__info");
const filters = document.querySelector(".filters");
const dropdownMenu = filters.querySelector(".dropdown-menu");
const productCountInput = document.getElementById("show-sort");
const applyCountButton = document.getElementById("input-value__btn");

let filteredProductsArray = [...products];

const queryFilterMap = {
  dining: { key: "place", value: "dining" },
  living: { key: "place", value: "living" },
  bedroom: { key: "place", value: "bedroom" },
  large: { key: "type", value: "large" },
  small: { key: "type", value: "small" },
  other: { key: "type", value: "other" },
  all: { key: null, value: null },
};

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
        <span class="prices__price">${product.price} $</span>
        <span class="prices__discount"><strike>${
          product.discount ? product.discount + "$" : ""
        }</strike></span>
      </div>
    </div>
    <div class="hover-container">
      <div class="buttons">
        <div class="buttons__first">
          <button class="add" data-index="${product.id}">Add to cart</button>
        </div>
        <div class="buttons__second">
          <button id="share-btn" class="el-btn"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/shire.svg" alt=""><span class="text-btn">Share</span></button>
          <button id="compire-btn" class="compare el-btn" data-index="${
            product.id
          }"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/compire.svg" alt=""><span class="text-btn">Compare</span></button>
          <button class="like el-btn" data-index="${
            product.id
          }"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/like.svg" alt=""><span class="text-btn">Like</span></button>
        </div>
      </div>
    </div>
  `;
  return productElement;
}

function setupAddToCartListeners() {
  container.addEventListener("click", (event) => {
    const { target } = event;
    const productId = parseInt(target.getAttribute("data-index"), 10);

    if (target.classList.contains("add")) {
      appState.addToCart(productId);
    }

    if (target.closest(".like")) {
      const button = target.closest(".like");
      const productIndex = parseInt(button.getAttribute("data-index"), 10);
      appState.addToFavorites(productIndex);
    }
    if (target.closest(".compare")) {
      const compareButton = target.closest(".compare");
      const comp = parseInt(compareButton.getAttribute("data-index"), 10);
      appState.addToProductCard(comp);
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

function applyFilter(filterParam) {
  const filter = queryFilterMap[filterParam] || queryFilterMap["all"];
  if (filter.key) {
    filteredProductsArray = products.filter(
      (product) => product[filter.key] === filter.value
    );
  } else {
    filteredProductsArray = [...products];
  }
  currentPage = 1;
  displayProducts(currentPage);
  setupPagination();

  const newUrl = new URL(window.location);
  newUrl.searchParams.set("filter", filterParam || "all");
  window.history.pushState({}, "", newUrl);
}

function applyDropdownFilter(filterKey) {
  applyFilter(filterKey);
}

function handleProductCountInput() {
  const count = parseInt(productCountInput.value, 10);
  if (Number.isInteger(count) && count > 0) {
    productsPerPage = count;
    currentPage = 1;
    displayProducts(currentPage);
    setupPagination();
  } else {
    alert("Выбрано 0 товаров");
  }
}

function parsePrice(price) {
  return parseFloat(String(price).replace(/[^0-9.]/g, ""));
}

function sortProducts(criteria) {
  switch (criteria) {
    case "alphabet":
      filteredProductsArray.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "cheap":
      filteredProductsArray.sort(
        (a, b) => parsePrice(a.price) - parsePrice(b.price)
      );
      break;
    case "expensive":
      filteredProductsArray.sort(
        (a, b) => parsePrice(b.price) - parsePrice(a.price)
      );
      break;
    default:
      filteredProductsArray = [...products];
  }
  currentPage = 1;
  displayProducts(currentPage);
  setupPagination();
}

document
  .querySelector(".custom-dropdown")
  .addEventListener("change", function () {
    const sortCriteria = this.value;
    sortProducts(sortCriteria);
  });

window.addEventListener("popstate", () => {
  const params = new URLSearchParams(window.location.search);
  const filterParam = params.get("filter");
  applyFilter(filterParam);
});

filters.addEventListener("click", () => {
  dropdownMenu.classList.toggle("visible");
});

dropdownMenu.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    const filterKey = item.id;
    applyDropdownFilter(filterKey);
  });
});

applyCountButton.addEventListener("click", handleProductCountInput);
