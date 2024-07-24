function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".grocery-list__roster");
  cartContainer.innerHTML = "";

  cart.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
        <div class="first-img">
          <img class="product__image" src="${product.image}" alt="${product.name}">
        </div>
        <div>
          <span class="product__name product__name--grey el">${product.name}</span>
        </div>
        <div>
          <span class="product__price product__name--grey el" id="product-price-${index}">${product.price}</span>
        </div>
        <div class="quantity">
          <div class="in-quantity">
            <input type="number" class="product__quantity-input el" id="product-quantity-${index}" value="1" min="1">
          </div>
        </div>
        <div>
          <span class="product__subtotal el" id="product-subtotal-${index}">${product.price}</span>
        </div>
        <div class="last-img">
          <img class="product-bin" src="/images/basket__images/Vector.png" alt="" onclick="removeFromCart(${index})">
        </div>
      `;
    cartContainer.appendChild(productElement);
  });

  const quantityInputs = document.querySelectorAll(".product__quantity-input");
  quantityInputs.forEach((input, index) => {
    input.addEventListener("change", () => {
      updateSubtotal(index);
    });
  });

  updateTotal();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
    localStorage.setItem("cartCount", cart.length);
  }
}

function removeFromCart(productIndex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(productIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
  updateTotal();
}

function updateSubtotal(index) {
  const quantityInput = document.getElementById(`product-quantity-${index}`);
  const priceElement = document.getElementById(`product-price-${index}`);
  const subtotalElement = document.getElementById(`product-subtotal-${index}`);

  let quantity = parseInt(quantityInput.value);
  const price = parseFloat(
    priceElement.textContent.replace(/[^\d.-]/g, "").replace(",", ".")
  );

  if (quantity < 1) {
    quantity = 1;
    quantityInput.value = quantity;
  }

  const totalPrice = price * quantity;

  subtotalElement.textContent = `$ ${totalPrice.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
  updateTotal();
}

function updateTotal() {
  let total = 0;
  const subtotalElements = document.querySelectorAll(
    "[id^='product-subtotal-']"
  );

  subtotalElements.forEach((subtotalElement) => {
    const subtotal = parseFloat(
      subtotalElement.textContent.replace(/[^\d.-]/g, "").replace(",", ".")
    );
    total += isNaN(subtotal) ? 0 : subtotal;
  });

  const totalElement = document.getElementById("summa");
  totalElement.textContent = `$ ${total.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

window.onload = function () {
  displayCart();
  updateCartCount();
  updateTotal();
};
