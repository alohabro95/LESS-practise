export const stateFeatures = {
  cart: "cart",
  favorites: "favorites",
  products: "products",
};
class State {
  constructor() {
    this.state = {
      cart: JSON.parse(localStorage.getItem(stateFeatures.cart)) || [],
      favorites:
        JSON.parse(localStorage.getItem(stateFeatures.favorites)) || [],
      products: JSON.parse(localStorage.getItem(stateFeatures.products)) || [],
    };
  }

  getState() {
    return this.state;
  }

  getCart() {
    return this.state.cart;
  }

  getCartTotal() {
    const total = this.state.cart.reduce((acc, curr) => {
      const result = curr.price * curr.quantity;
      acc += result;
      return acc;
    }, 0);
    return total;
  }

  getProducts() {
    return this.state.products;
  }

  setCart(items) {
    this.state.cart = items;
    localStorage.setItem("cart", JSON.stringify(items));
    this.updateCartCount();
  }

  addToCart(productIndex, quantity) {
    const products = this.state.products || [];
    if (productIndex >= 0 && productIndex < products.length) {
      const productToAdd = products[productIndex];

      const isProductInCart = this.state.cart.some(
        (product) => product.id === productToAdd.id
      );

      if (!isProductInCart) {
        productToAdd.quantity = quantity || 1;
        this.state.cart.push(productToAdd);
        this.setCart(this.state.cart);
        this.updateCartCount();
      } else {
        console.log("Товар уже добавлен в корзину.");
      }
    } else {
      console.error("Неверный индекс товара.");
    }
  }

  addToProductCard(productIndex) {
    const products = this.state.products || [];
    if (productIndex >= 0 && productIndex < products.length) {
      const productToView = products[productIndex];
      localStorage.setItem("selectedProduct", JSON.stringify(productToView));
      window.location.href = `/src/html/product.html?id=${productToView.id}`;
    } else {
      console.error("Неверный индекс товара.");
    }
  }

  updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = this.state.cart.length;
      localStorage.setItem("cartCount", this.state.cart.length);
    } else {
      console.error("Element with id 'cart-count' not found.");
    }
  }

  setFavorites(items) {
    this.state.favorites = items;
    localStorage.setItem("favorites", JSON.stringify(items));
  }

  addToFavorites(productIndex) {
    const products = this.state.products || [];

    if (productIndex >= 0 && productIndex < products.length) {
      const productToAdd = products[productIndex];

      const isProductInFavorites = this.state.favorites.some(
        (product) => product.id === productToAdd.id
      );

      if (!isProductInFavorites) {
        this.state.favorites.push(productToAdd);
        this.setFavorites(this.state.favorites);
      } else {
        console.log("Товар уже добавлен в избранное.");
      }
    } else {
      console.error("Неверный индекс товара.");
    }
  }

  removeFromFavorites(itemId) {
    this.state.favorites = this.state.favorites.filter(
      (item) => item.id !== itemId
    );
    this.setFavorites(this.state.favorites);
  }
}

export const appState = new State();
