import { appState } from "./state.js";
import { loadLayout } from "./layout.js";

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
  const cart = appState.getCart();
  const cartContainer = document.querySelector(".grocery-list__roster");
  cartContainer.innerHTML = "";

  cart.forEach((product, index) => {
    const subTotalPrice = product.price * product.quantity;
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
        <div class="first-img">
          <img class="product__image" src="${product.image}" alt="${
      product.name
    }">
        </div>
        <div>
          <span class="product__name product__name--grey el">${
            product.name
          }</span>
        </div>
        <div>
          <span class="product__price product__name--grey el" id="product-price-${
            product.id
          }">
            ${product.currency}${product.price}
          </span>
        </div>
        <div class="quantity">
          <div class="in-quantity">
            <input type="number" class="product__quantity-input el" id="product-quantity-${
              product.id
            }" value="${product.quantity}" min="1">
          </div>
        </div>
        <div>
          <span class="product__subtotal el" id="product-subtotal-${
            product.id
          }">
            ${product.currency}${subTotalPrice.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}
          </span>
        </div>
        <div class="last-img">
          <img class="product-bin" src="/src/assets/images/basket__images/Vector.png" alt="" onclick="removeFromCart(${
            product.id
          })">
        </div>
      `;
    cartContainer.appendChild(productElement);

    const quantityInput = document.getElementById(
      `product-quantity-${product.id}`
    );
    quantityInput.addEventListener("change", () => {
      updateSubtotal(product.id);
    });
  });

  updateTotal();
}

function removeFromCart(productId) {
  let cart = appState.getState().cart || [];
  cart = cart.filter((item) => item.id !== productId);
  appState.setCart(cart);
  localStorage.removeItem(`quantity-${productId}`);
  displayCart();
  updateTotal();
}

function updateSubtotal(productId) {
  const priceElement = document.getElementById(`product-price-${productId}`);
  const quantityInput = document.getElementById(
    `product-quantity-${productId}`
  );
  const subtotalElement = document.getElementById(
    `product-subtotal-${productId}`
  );

  let quantity = parseInt(quantityInput.value);
  const price = parseFloat(
    priceElement.textContent.replace(/[^\d.-]/g, "").replace(",", ".")
  );

  if (quantity < 1) {
    quantity = 1;
    quantityInput.value = quantity;
  }

  const cart = appState.getCart();
  const updatedCart = cart.map((item) => {
    if (item.id === productId) {
      item.quantity = quantity;
      return item;
    }

    return item;
  });
  appState.setCart(updatedCart);

  const totalPrice = price * quantity;
  if (subtotalElement) {
    subtotalElement.textContent = `$ ${totalPrice}`;
  }

  updateTotal();
}

function updateTotal() {
  const total = appState.getCartTotal();
  const totalElement = document.getElementById("total");
  if (totalElement) {
    totalElement.textContent = `$ ${total}`;
  }
}

window.removeFromCart = removeFromCart;
