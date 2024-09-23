import { loadLayout } from "./layout.js";
import { appState } from "./state.js";

document.addEventListener("DOMContentLoaded", function () {
  try {
    loadLayout()
      .then(() => {
        appState.updateCartCount();
        displayCart();
      })
      .catch((error) => {
        console.error("Error loading layout:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
});

function displayCart() {
  const products = appState.getProducts();
  const cart = appState.getCart();
  const container = document.getElementById("table");

  cart.forEach((product) => {
    const productElement = createProductCheckout(product);
    container.appendChild(productElement);
  });

  const total = appState.getCartTotal();

  const totalElement = document.createElement("div");
  totalElement.classList.add("table__row");
  totalElement.innerHTML = `
    <span class="table__cell">Total</span>
    <span class="table__cell table__cell--bold table__cell--gold">${total.toLocaleString()} $</span>
  `;

  container.appendChild(totalElement);
}

function createProductCheckout(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("table__row");
  const subTotal = product.price * product.quantity;
  productElement.innerHTML = `
    <span class="table__cell table__cell--grey product-name">${product.name}</span>
    <span class="table__cell table__cell--grey product-quantity">${product.quantity}</span>
    <span class="table__cell table__cell--light product-subtotal">${subTotal} $</span>
  `;
  return productElement;
}
