import { scrollTo } from "./lib.js";
import { loadLayout } from "./layout.js";
import { appState } from "./state.js";

document.addEventListener("DOMContentLoaded", function () {
  try {
    loadLayout();
    setTimeout(() => {
      appState.updateCartCount();
    }, 100);
    displayProducts(startIndex, productsPerPage);
  } catch (error) {
    console.error("Error loading layout:", error);
  }
});

const productsPerPage = 4;
let startIndex = 0;

const products = JSON.parse(localStorage.getItem("localProducts")) || [];

function displayProducts(startIndex, count) {
  const container = document.getElementById("product-container");
  for (let i = startIndex; i < startIndex + count && i < products.length; i++) {
    const product = products[i];
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
            <button class="add" data-index="${i}">Add to cart</button>
          </div>
          <div class="buttons__second">
            <button class="el-btn"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/shire.svg" alt=""><span class="text-btn">Share</span></button>
            <button class="el-btn"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/compire.svg" alt=""><span class="text-btn">Compire</span></button>
            <button class="el-btn"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/like.svg" alt=""><span class="text-btn">Like</span></button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(productElement);
  }

  const addButtons = container.querySelectorAll(".add");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productIndex = parseInt(button.getAttribute("data-index"), 10);
      appState.addToCart(productIndex);
    });
  });

  showMoreBtn.style.display =
    startIndex + count < products.length ? "block" : "none";
}

const showMoreBtn = document.getElementById("products__btn");

showMoreBtn.addEventListener("click", function () {
  startIndex += productsPerPage;
  displayProducts(startIndex, productsPerPage);
});

let scrollBtn = document.getElementById("down");
scrollBtn.addEventListener("click", () => {
  scrollTo("section-products");
});

var slickSettings = {
  dots: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  prevArrow:
    "<button class='prev slider__btn'><img src='/src/assets/images/products__images/right.svg'></button>",
  nextArrow:
    "<button class='next slider__btn'><img src='/src/assets/images/products__images/right.svg'></button>",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        variableWidth: false,
      },
    },
  ],
};
$(".rooms__slider").slick(slickSettings);
