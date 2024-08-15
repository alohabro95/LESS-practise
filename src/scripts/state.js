class State {
  constructor() {
    this.state = {
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    };
  }

  getState() {
    return this.state;
  }

  getCart() {
    return this.state.cart;
  }

  setCart(items) {
    this.state.cart = items;
    localStorage.setItem("cart", JSON.stringify(items));
    this.updateCartCount();
  }

  addToCart(productIndex) {
    const products = JSON.parse(localStorage.getItem("localProducts")) || [];
    if (productIndex >= 0 && productIndex < products.length) {
      const productToAdd = products[productIndex];

      const isProductInCart = this.state.cart.some(
        (product) => product.id === productToAdd.id
      );

      if (!isProductInCart) {
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
    console.log("Favorites saved:", items);
  }

  addToFavorites(productIndex) {
    const products = JSON.parse(localStorage.getItem("localProducts")) || [];

    if (productIndex >= 0 && productIndex < products.length) {
      const productToAdd = products[productIndex];

      const isProductInFavorites = this.state.favorites.some(
        (product) => product.id === productToAdd.id
      );

      if (!isProductInFavorites) {
        this.state.favorites.push(productToAdd);
        this.setFavorites(this.state.favorites);
        console.log("ti 4ert");
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
