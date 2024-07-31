export function scrollTo(elementId) {
  let scrollElement = document.getElementById(elementId);
  scrollElement.scrollIntoView({ block: "center", behavior: "smooth" });
}

export const updateCartCount = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
    localStorage.setItem("cartCount", cart.length);
  } else {
    console.error("Element with id 'cart-count' not found.");
  }
};

export const addToCart = (productIndex) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = JSON.parse(localStorage.getItem("localProducts")) || [];
  if (productIndex >= 0 && productIndex < products.length) {
    cart.push(products[productIndex]);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  } else {
    console.error("Invalid product index.");
  }
};
