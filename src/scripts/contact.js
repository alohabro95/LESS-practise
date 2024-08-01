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
