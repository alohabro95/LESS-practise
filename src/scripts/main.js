import { scrollTo } from "./lib.js";
import { loadLayout } from "./layout.js";
import { appState } from "./state.js";

document.addEventListener("DOMContentLoaded", function () {
  try {
    loadLayout()
      .then(() => {
        appState.updateCartCount();
        displayProducts(startIndex, productsPerPage);
      })
      .catch((error) => {
        console.error("Error loading layout:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
});

const productsPerPage = 4;
let startIndex = 0;

const products = appState.getProducts();

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
          <span class="prices__price">${product.price} $</span>
          <span class="prices__discount"><strike>${
            product.discount ? product.discount + "$" : ""
          }</strike></span>
        </div>
      </div>
      <div class="hover-container">
        <div class="buttons">
          <div class="buttons__first">
            <button class="add" data-index="${i}">Add to cart</button>
          </div>
          <div class="buttons__second">
            <button class="el-btn"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/shire.svg" alt=""><span class="text-btn">Share</span></button>
            <button class="compare el-btn" data-index="${i}"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/compire.svg" alt=""><span class="text-btn">Compare</span></button>
            <button class="like el-btn" data-index="${i}"><img class="logo-btn" src="/src/assets/images/products__images/img__buttons/like.svg" alt=""><span class="text-btn">Like</span></button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(productElement);
  }

  const compareButtons = container.querySelectorAll(".compare");
  compareButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productIndex = parseInt(button.getAttribute("data-index"), 10);
      appState.addToProductCard(productIndex);
    });
  });

  const addButtons = container.querySelectorAll(".add");
  const likeButtons = container.querySelectorAll(".like");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productIndex = parseInt(button.getAttribute("data-index"), 10);
      appState.addToCart(productIndex);
    });
  });
  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productIndex = parseInt(button.getAttribute("data-index"), 10);
      appState.addToFavorites(productIndex);
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

document.addEventListener("DOMContentLoaded", () => {
  const image1 = document.getElementById("image_one");
  const image2 = document.getElementById("image_two");
  const image3 = document.getElementById("image_three");

  const redirectToCatalog = (filter) => {
    window.location.href = `src/html/shop.html?filter=${filter}`;
  };

  image1.addEventListener("click", () => redirectToCatalog("dining"));
  image2.addEventListener("click", () => redirectToCatalog("living"));
  image3.addEventListener("click", () => redirectToCatalog("bedroom"));
});

var slickSettings = {
  dots: true,
  speed: 800,
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
