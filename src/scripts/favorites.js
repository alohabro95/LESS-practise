import { loadLayout } from "./layout.js";
import { appState } from "./state.js";

document.addEventListener("DOMContentLoaded", function () {
  try {
    loadLayout()
      .then(() => {
        appState.updateCartCount();
        displayFavorites();
      })
      .catch((error) => {
        console.error("Error loading layout:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
});

function displayFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesContainer = document.querySelector(".favorites-list");
  favoritesContainer.innerHTML = "";

  favorites.forEach((product, index) => {
    const favoriteElement = document.createElement("div");
    favoriteElement.classList.add("product");
    favoriteElement.innerHTML = `
        <div class="first-img">
          <img class="product__image" src="${product.image}" alt="${product.name}">
        </div>
        <div class="second-info">
          <div>
            <span class="product__name product__name--grey el">${product.name}</span>
          </div>
          <div>
            <span class="product__price product__name--grey el" id="product-price-${index}">${product.price}</span>
          </div>
          <div class="add-cart"><button class="add" data-index="${product.id}">Add to cart</button></div>
          <div class="last-img">
            <img class="product-bin" src="/src/assets/images/basket__images/Vector.png" alt="">
          </div>
        </div>
      `;

    favoriteElement
      .querySelector(".product-bin")
      .addEventListener("click", () => {
        removeFromFavorites(product.id);
      });
    favoritesContainer.appendChild(favoriteElement);
  });
  const addButtons = document.querySelectorAll(".add");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-index"), 10);
      appState.addToCart(productId);
    });
  });
}

function removeFromFavorites(productId) {
  let favorites = appState.getState().favorites || [];
  favorites = favorites.filter((product) => product.id !== productId);
  appState.setFavorites(favorites);
  displayFavorites();
}
