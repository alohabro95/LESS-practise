import { loadLayout } from "./layout.js";
import { appState } from "./state.js";
document.addEventListener("DOMContentLoaded", function () {
  try {
    loadLayout()
      .then(() => {
        appState.updateCartCount();
      })
      .catch((error) => {
        console.error("Error loading layout:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
});

const products = JSON.parse(localStorage.getItem("localProducts")) || [];
const container = document.getElementById("table");
const cart = appState.getCart();

function createProductCheckout(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("table__row");
  productElement.innerHTML = `
      <span class="table__cell table__cell--grey">${product.name}</span>
      <span class="table__cell table__cell--light">${product.price}</span>
  `;
  return productElement;
}

cart.forEach((cartItem) => {
  const product = products.find((p) => p.id === cartItem.id);

  if (product) {
    const productElement = createProductCheckout(product);
    container.appendChild(productElement);
  }
});

const total = cart.reduce((sum, cartItem) => {
  const product = products.find((p) => p.id === cartItem.id);
  return sum + (product ? product.price : 0);
}, 0);

const totalElement = document.createElement("div");
totalElement.classList.add("table__row");
totalElement.innerHTML = `
  <span class="table__cell">Total</span>
  <span class="table__cell table__cell--bold table__cell--gold">Rs. ${total.toLocaleString()}</span>
`;

container.appendChild(totalElement);
