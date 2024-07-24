const productsArray = JSON.parse(localStorage.getItem("localProducts")) || [];
const productsPerPage = 8;
let currentPage = 1;

const container = document.getElementById("product-container");
const paginationContainer = document.getElementById("pagination-container");
const infoElement = document.querySelector(".left__info");

let filteredProductsArray = [...productsArray];

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

  for (let i = startIndex; i < endIndex; i++) {
    const product = filteredProductsArray[i];
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
            <button class="add" onclick="addToCart(${i})">Add to cart</button>
          </div>
          <div class="buttons__second">
            <button class="el-btn"><img class="logo-btn" src="/images/products__images/img__buttons/shire.svg" alt=""><span class="text-btn">Share</span></button>
            <button class="el-btn"><img class="logo-btn" src="/images/products__images/img__buttons/compire.svg" alt=""><span class="text-btn">Compire</span></button>
            <button class="el-btn"><img class="logo-btn" src="/images/products__images/img__buttons/like.svg" alt=""><span class="text-btn">Like</span></button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(productElement);
  }
}

function setupPagination() {
  paginationContainer.innerHTML = "";
  const pageCount = Math.ceil(filteredProductsArray.length / productsPerPage);

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
}

function addToCart(productIndex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(filteredProductsArray[productIndex]);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cart.length;
  localStorage.setItem("cartCount", cart.length);
}

function filterProducts(type) {
  if (type === "all") {
    filteredProductsArray = [...productsArray];
  } else {
    filteredProductsArray = productsArray.filter(
      (product) => product.type === type
    );
  }
  currentPage = 1;
  displayProducts(currentPage);
  setupPagination();
}

window.onload = function () {
  updateCartCount();
  displayProducts(currentPage);
  setupPagination();
};

const filters = document.querySelector(".filters");
const dropdownMenu = filters.querySelector(".dropdown-menu");

filters.addEventListener("click", () => {
  dropdownMenu.classList.toggle("visible");
});

const filterItems = dropdownMenu.querySelectorAll("li");
filterItems.forEach((item) => {
  item.addEventListener("click", () => {
    const filterType = item.id;
    filterProducts(filterType);
  });
});
