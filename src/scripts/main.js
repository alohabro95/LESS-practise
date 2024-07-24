var slickSettings = {
  dots: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  prevArrow:
    "<button class='prev slider__btn'><img src='images/products__images/right.svg'></button>",
  nextArrow:
    "<button class='next slider__btn'><img src='images/products__images/right.svg'></button>",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        variableWidth: false,
      },
    },
  ],
};
$(".rooms__slider").slick(slickSettings);

var scrollBtn = document.getElementById("down");
var scrollElement = document.getElementById("section-products");

function scroll() {
  scrollElement.scrollIntoView({ block: "center", behavior: "smooth" });
}

scrollBtn.addEventListener("click", scroll);

const products = [
  {
    name: "Syltherine",
    description: "Stylish cafe chair",
    price: "$ 250",
    discount: "$ 35",
    image: "/images/products__images/Syltherine.png",
    type: "small",
  },
  {
    name: "Leviosa",
    description: "Stylish cafe chair",
    price: "$ 100",
    discount: "",
    image: "/images/products__images/Leviosa.png",
    type: "small",
  },
  {
    name: "Lolito",
    description: "Luxury big sofa",
    price: "$ 700",
    discount: "$ 140",
    image: "/images/products__images/Lolito.png",
    type: "large",
  },
  {
    name: "Respira",
    description: "Outdoor bar table and stool",
    price: "$ 500",
    discount: "",
    image: "/images/products__images/Respira.png",
    type: "large",
  },
  {
    name: "Grifo",
    description: "Night lamp",
    price: "$ 50",
    discount: "",
    image: "/images/products__images/Grifo.png",
    type: "other",
  },
  {
    name: "Muggo",
    description: "Small mug",
    price: "$ 350",
    discount: "",
    image: "/images/products__images/Muggo.png",
    type: "large",
  },
  {
    name: "Pingky",
    description: "Cute bed set",
    price: "$ 700",
    discount: "$ 140",
    image: "/images/products__images/Pingky.png",
    type: "large",
  },
  {
    name: "Potty",
    description: "Minimalist flower pot",
    price: "$ 500",
    discount: "",
    image: "/images/products__images/Lolito.png",
    type: "large",
  },
  {
    name: "Potty",
    description: "Minimalist flower pot",
    price: "$ 500",
    discount: "",
    image: "/images/products__images/Lolito.png",
  },
];

const localProducts = localStorage.setItem(
  "localProducts",
  JSON.stringify(products)
);
const showMoreBtn = document.getElementById("products__btn");
const productsPerPage = 4;
let startIndex = 0;

function displayProducts(startIndex, count) {
  const container = document.getElementById("product-container");
  for (let i = startIndex; i < startIndex + count && i < products.length; i++) {
    const product = products[i];
    const productElement = document.createElement("div");
    productElement.classList.add("cards__el");
    productElement.innerHTML = `
      <img class="cards__el-img" src="${product.image}" alt="${product.name}">
      <div class="cards__el-content">
        <h3 class="cards__el-caption">${product.name}</h3>
        <span class="cards__el-text">${product.description}</span>
        <div class="cards__el-prices">
          <span class="prices__price">${product.price}</span>
          <span class="prices__discount"><strike>${product.discount}</strike></span>
        </div>
      </div>
      <div class="hover-container">
        <div class="buttons">
          <div class="buttons__first">
            <button class="add" onclick="addToCart(${i})">Add to cart</button>
          </div>
          <div class="buttons__second">
            <button class="el-btn"><img class="logo-btn" src="/images/products__images/img__buttons/shire.svg" alt=""><span class="text-btn">Share</span></button>
            <button class="el-btn"><img class="logo-btn" src="/images/products__images/img__buttons/compire.svg" alt=""><span class="text-btn">Compire</span></button>
            <button class="el-btn"><img class="logo-btn" src="/images/products__images/img__buttons/like.svg" alt=""><span class="text-btn">Like</span></button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(productElement);
  }

  if (startIndex + count < products.length) {
    showMoreBtn.style.display = "block";
  } else {
    showMoreBtn.style.display = "none";
  }
}

showMoreBtn.addEventListener("click", function () {
  startIndex += productsPerPage;
  displayProducts(startIndex, productsPerPage);
});

displayProducts(startIndex, productsPerPage);

function addToCart(productIndex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(products[productIndex]);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cart.length;
  localStorage.setItem("cartCount", cart.length);
}

window.onload = function () {
  updateCartCount();
};
