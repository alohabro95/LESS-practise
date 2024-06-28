document.addEventListener("DOMContentLoaded", function () {
  fetch("layout/header.html")
    .then((response) => response.text())
    .then((data) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = data;

      // Вставка стилей
      const styles = tempDiv.querySelectorAll('link[rel="stylesheet"]');
      styles.forEach((style) => document.head.appendChild(style));

      // Вставка header
      document.getElementById("header-placeholder").innerHTML =
        tempDiv.querySelector(".header").outerHTML;
    })
    .catch((error) => console.error("Error loading header:", error));
});
