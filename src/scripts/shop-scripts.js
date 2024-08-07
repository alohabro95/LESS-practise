import { appState } from "./state.js";
import { loadLayout } from "./layout.js";

document.addEventListener("DOMContentLoaded", function () {
  try {
    loadLayout()
      .then(() => {
        appState.updateCartCount();

        const params = new URLSearchParams(window.location.search);
        const filterParam = params.get("filter");

        if (filterParam) {
          applyFilter(filterParam);
        } else {
          displayProducts(currentPage);
          setupPagination();
        }
      })
      .catch((error) => {
        console.error("Error loading layout:", error);
      });
  } catch (error) {
    console.error("Error:", error);
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

function applyFilter(filterParam) {
  const queryFilterMap = {
    filter1: { key: "place", value: "dining" },
    filter2: { key: "place", value: "living" },
    filter3: { key: "place", value: "bedroom" },
  };

  const filter = queryFilterMap[filterParam];
  if (filter) {
    filterProducts(filter.key, filter.value);
  } else {
    displayProducts(currentPage);
    setupPagination();
  }
}

function filterProducts(key, value) {
  filteredProductsArray = products.filter((product) => product[key] === value);
  currentPage = 1;
  displayProducts(currentPage);
  setupPagination();
}

filters.addEventListener("click", () => {
  dropdownMenu.classList.toggle("visible");
});

dropdownMenu.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    const filterKey = item.id;
    applyDropdownFilter(filterKey);
  });
});

function applyDropdownFilter(filterKey) {
  switch (filterKey) {
    case "all":
      filteredProductsArray = [...products];
      break;
    case "large":
      filteredProductsArray = products.filter(
        (product) => product.type === "large"
      );
      break;
    case "small":
      filteredProductsArray = products.filter(
        (product) => product.type === "small"
      );
      break;
    case "other":
      filteredProductsArray = products.filter(
        (product) => product.type === "other"
      );
      break;
    default:
      filteredProductsArray = [...products];
  }
  currentPage = 1;
  displayProducts(currentPage);
  setupPagination();
}
