import { appState } from "./state.js";
import { loadLayout } from "./layout.js";

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

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => changeColor(index + 1));
  });
});

function changeColor(buttonId) {
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  var button = document.getElementById("button" + buttonId);
  if (button) {
    button.classList.add("active");
  } else {
    console.error(`Button with id "button${buttonId}" not found.`);
  }
}

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
