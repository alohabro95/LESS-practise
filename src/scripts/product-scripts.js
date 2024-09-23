import { appState } from "./state.js";
import { loadLayout } from "./layout.js";

document.addEventListener("DOMContentLoaded", function () {
  try {
    loadLayout()
      .then(() => {
        appState.updateCartCount();
      })
      .catch((error) => {
        console.error("Error loading layout:", error);
      });
    renderProduct();
  } catch (error) {
    console.error("Error:", error);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => changeColor(index + 1));
  });
});

let productElement = JSON.parse(localStorage.getItem("selectedProduct")) || [];

function renderProduct() {
  const cardContainer = document.getElementById("dynamic-container");

  cardContainer.innerHTML = `
      <div class="navigation_product">
        <div class=" nav__el nav__first"><span>Home</span><img
                src="/src/assets/images/products__images/product__arrow.png" alt="">
        </div>
        <div class="nav__el nav__second"><span>Shop</span><img
                src="/src/assets/images/products__images/product__arrow.png" alt="">
        </div>
        <div class="nav__el nav__third"><span>${productElement.name}</span></div>
    </div>
    <section class="section-card">
        <div class="card-product">
            <div class="card-product__images">
                <div class="images-group">
                    <img src="/src/assets/images/card__images/first.png" alt="">
                    <img src="/src/assets/images/card__images/second.png" alt="">
                    <img src="/src/assets/images/card__images/third.png" alt="">
                    <img src="/src/assets/images/card__images/fourth.png" alt="">
                </div>
                <div class="big-image"><img src="${productElement.image}" alt=""></div>
            </div>
            <div class="card-product__info">
                <div class="content">
                    <div>
                        <h1 class="content__caption">${productElement.name}</h1>
                        <span class="content__price">Rs. ${productElement.price} $</span>
                    </div>
                    <div class="content__rating">
                        <span class="stars"><img src="/src/assets/images/card__images/stars.png" alt=""></span>
                        <hr class="line">
                        <span class="reviews">5 Customer Review</span>
                    </div>
                    <p class="content__description">Setting the bar as one of the loudest speakers in its class, the
                        Kilburn
                        is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and
                        extended highs for a sound.
                    </p>
                </div>
                <div class="size">
            <span class="size__caption">Size</span>
            <div class="size__container">
                <button id="button1" class="button">L</button>
                <button id="button2" class="button">XL</button>
                <button id="button3" class="button">XS</button>
            </div>
        </div>
        <div class="color">
            <span class="color__caption">Color</span>
            <div class="color__container">
                <button id="circle1" class="circle circle--blue"></button>
                <button id="circle2" class="circle circle--black"></button>
                <button id="circle3" class="circle circle--gold"></button>
            </div>
        </div>
        <div class="buttons">
            <div class="counter">
                <button class="minus-btn">-</button>
                <span class="number">1</span>
                <button class="plus-btn">+</button>
            </div>
            <button class="add-to-cart">Add To Cart</button>
            <button class="compare">+ Compare</button>
        </div>
        <hr class="hr">
        <div class="information">
            <div class="information__column">
                <span>SKU</span>
                <span>Category</span>
                <span>Tags</span>
                <span>Share</span>
            </div>
            <div class="information__column information__column2">
                <div class="col"> <span>:</span><span>00${productElement.id}</span></div>
                <div class="col"> <span>:</span><span>${productElement.name}</span></div>
                <div class="col"> <span>:</span><span>${productElement.name}, Chair, Home, Shop</span></div>
                <div class="col">
                    <span>:</span>
                    <div class="col__logos">
                        <img src="/src/assets/images/footer__images/facebook.png" alt="">
                        <img src="/src/assets/images/footer__images/instagram.png" alt="">
                        <img src="/src/assets/images/footer__images/twitter.png" alt="">
                    </div>
                </div>
            </div>
        </div>
  `;
}

function changeColor(buttonId) {
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  var button = document.getElementById("button" + buttonId);
  if (button) {
    button.classList.add("active");
  } else {
    console.error(`Button with id "button${buttonId}" not found.`);
  }
}

const circles = document.querySelectorAll(".circle");

circles.forEach((circle) => {
  circle.addEventListener("click", function () {
    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    const element = this;
    const elementBgColor = window
      .getComputedStyle(element, "::after")
      .getPropertyValue("background-color");

    element.style.setProperty("--border-color", elementBgColor);
    element.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const numberElement = document.querySelector(".number");
  const minusButton = document.querySelector(".minus-btn");
  const plusButton = document.querySelector(".plus-btn");

  let numberValue = 1;

  function updateNumber(value) {
    numberElement.textContent = value;
  }

  function decrementNumber() {
    numberValue--;
    updateNumber(numberValue);
  }

  function incrementNumber() {
    numberValue++;
    updateNumber(numberValue);
  }
  minusButton.addEventListener("click", decrementNumber);
  plusButton.addEventListener("click", incrementNumber);

  const addButton = document.querySelector(".add-to-cart");
  addButton.addEventListener("click", () => {
    const products = appState.state.products || [];

    const productIndex = products.findIndex(
      (product) => product.id === productElement.id
    );

    if (productIndex !== -1) {
      const quantity = numberValue;
      appState.addToCart(productIndex, quantity);
    } else {
      console.error("Товар не найден в списке продуктов.");
    }
  });
});
