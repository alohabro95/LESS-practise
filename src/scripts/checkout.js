import { loadLayout } from "./layout.js";
import { updateCartCount } from "./lib.js";
document.addEventListener("DOMContentLoaded", function () {
  try {
    loadLayout();
    setTimeout(() => {
      updateCartCount();
    }, 100);
  } catch (error) {
    console.error("Error loading layout:", error);
  }
});
