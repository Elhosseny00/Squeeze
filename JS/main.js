let allLinks = document.querySelectorAll(".navlinks .mainlinks li a");
let btn = document.querySelector("nav .btn");
let navLinks = document.querySelector(".navlinks");
allLinks.forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector(".active")?.classList.remove("active");
    this.classList.add("active");
    navLinks.classList.remove("open");
    btn.classList.remove("change");
  });
});
btn.addEventListener("click", () => {
  btn.classList.contains("change")
    ? btn.classList.remove("change")
    : btn.classList.add("change");
  navLinks.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !btn.contains(e.target)) {
    navLinks.classList.remove("open");
    btn.classList.remove("change");
  }
});
let body = document.querySelector("body");
let icon = document.querySelector(".shopIcon");
let quantity = document.querySelector(".quantity");
let cards = document.querySelector(".cards");
let newList = document.querySelector(".newlist");
let total = document.querySelector(".total");
let shop = document.querySelector(".shop");
let cart = document.querySelector(".cart");

let products = [
  {
    id: 0,
    img: "../IMGS/apple.jpg",
    name: " Apple Juice",
    description: "Fresh Apple Juice",
    price: 4,
  },
  {
    id: 1,
    img: "../IMGS/grapes.jpg",
    name: "Grapes Juice",
    description: "Fresh Grapes Juice",
    price: 5.5,
  },
  {
    id: 2,
    img: "../IMGS/kiwi.jpg",
    name: "Kiwi Juice",
    description: "Fresh Kiwi Juice",
    price: 8,
  },
  {
    id: 3,
    img: "../IMGS/pineapple.jpg",
    name: "Pineapple Juice",
    description: "Fresh Pineapple Juice",
    price: 10,
  },
  {
    id: 4,
    img: "../IMGS/pomegranate.jpg",
    name: "Pomegranate Juice",
    description: "Fresh Pomegranate ",
    price: 7.5,
  },
  {
    id: 5,
    img: "../IMGS/orange.png",
    name: "Orange Juice",
    description: "Fresh Orange Juice",
    price: 5,
  },
  {
    id: 6,
    img: "../IMGS/strawberry.jpg",
    name: "Strawberry Juice",
    description: "Fresh Strawberry Juice",
    price: 8,
  },
  {
    id: 7,
    img: "../IMGS/lemon.jpg",
    name: "Lemon Juice",
    description: "Fresh Lemon Juice",
    price: 8,
  },
  {
    id: 8,
    img: "../IMGS/apple.jpg",
    name: " Apple Juice",
    description: "Fresh Apple Juice",
    price: 4,
  },
];
let listCards = [];

function gitProducts() {
  products.forEach((value, key) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="info">
        <img src="IMGS/${value.img}" alt="Photo"/>
        <div class="sub-info">
          <h4>${value.name}</h4>
          <p>${value.description}</p>
          <span>$${value.price}</span>
        </div>
      </div>
      <div class="style">
        <span>SQUEEZE</span>
        <i onClick="addToCart(${key})" class="fa-solid fa-bag-shopping"></i>
      </div>
    `;
    cards.appendChild(card);
  });
}
gitProducts();

function addToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = { ...products[key], quantity: 1 };
  } else {
    listCards[key].quantity++;
  }
  reloadCard();
}
function changeQuantity(key, newQuantity) {
  if (newQuantity >= 0) {
    listCards[key].quantity = newQuantity;
    reloadCard();
  }
}
function reloadCard() {
  newList.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice += value.price * value.quantity;
    count += value.quantity;
    if (value != null) {
      let newDiv = document.createElement("div");
      newDiv.className = "newDiv-card";
      newDiv.innerHTML = `
      <div class="info">
      <img src="IMGS/${value.img}" alt="Photo"/>
      <div class="btns"><button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button></div>
      </div>
      <div class="sub-info">
      <h4>${value.name}</h4>
      <span>$${value.price}</span>
      <div onclick="clearit(${key})" class="rmovebtn">X</div>
      </div>
      `;
      newList.appendChild(newDiv);
    }
  });
  total.innerText = "$" + totalPrice;
  quantity.innerText = count;
}

function clearit(key) {
  listCards.splice(key, 1);
  reloadCard();
}
icon.addEventListener("click", () => {
  let overLay = document.createElement("div");
  overLay.className = "overlay";
  let popUp = document.createElement("div");
  popUp.className = "popup-box";
  popUp.appendChild(cart);
  cart.style.dispaly = "block";
  let closePopBtn = document.createElement("div");
  closePopBtn.className = "closePopUp";
  closePopBtn.innerText = "X";
  popUp.appendChild(closePopBtn);
  shop.appendChild(popUp);
  body.appendChild(overLay);
});

document.addEventListener("click", function (e) {
  if (e.target.className === "closePopUp") {
    document.querySelector(".popup-box").remove();
    document.querySelector(".overlay").remove();
  }
});
