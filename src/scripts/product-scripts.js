function changeColor(buttonId) {
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  var button = document.getElementById("button" + buttonId);
  button.classList.add("active");
}

// function changeCircle(color) {
//   var clickedCircle = event.target;
//   var circles = document.querySelectorAll(".circle");
//   circles.forEach(function (circle) {
//     circle.style.borderColor = "transparent";
//   });

//   clickedCircle.style.borderColor = color;
// }

// function changeCircleColor(event) {
//     const el =
// }

const circles = document.querySelectorAll(".circle");

circles.forEach((circle) => {
  circle.addEventListener("click", function () {
    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    const element = this;
    const elementBgColor = window
      .getComputedStyle(element, "::after")
      .getPropertyValue("background-color");

    element.style.setProperty("--border-color", elementBgColor);
    element.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const numberElement = document.querySelector(".number");
  const minusButton = document.querySelector(".minus-btn");
  const plusButton = document.querySelector(".plus-btn");

  let numberValue = 1;

  function updateNumber(value) {
    numberElement.textContent = value;
  }

  function decrementNumber() {
    numberValue--;
    updateNumber(numberValue);
  }

  function incrementNumber() {
    numberValue++;
    updateNumber(numberValue);
  }

  minusButton.addEventListener("click", decrementNumber);
  plusButton.addEventListener("click", incrementNumber);
});

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
