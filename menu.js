const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const currentEl = document.querySelector("#current-flavor");
const titleEl = document.querySelector("h1");
const descriptionEl = document.getElementById("description");
const coffeeImg = document.querySelector("#coffee");
const topOverlay = document.querySelector(".top-overlay");
const bottomOverlay = document.querySelector(".bottom-overlay");
const errorMessage = document.querySelector(".empty-error");

const flavors = [
  "Cookies & Cream",
  "Iced Matcha Coffee",
  "Ice Caramel Coffee",
  "Iced Chocolate Coffee",
  "Iced Coffee Latte",
  "Strawberry Latte",
];

const descriptions = [
  "Indulge in the rich, creamy taste of cookies blended with milk and topped with chocolate crumble. A perfect balance of sweetness with less sugar!",
  "Experience the earthy flavor of premium matcha paired with the smoothness of coffee. A refreshing drink with reduced sugar for guilt-free enjoyment!",
  "Delight in the luscious caramel swirls combined with velvety coffee. Sweet yet balanced, it’s your treat with less sugar.",
  "Enjoy the decadent richness of chocolate fused with the boldness of coffee. A chocolaty indulgence with a healthier twist of less sugar!",
  "Relish the bold, aromatic taste of freshly brewed coffee blended with creamy milk. A smooth and energizing drink with less sugar!",
  "Delight in the vibrant sweetness of strawberries mixed with velvety milk. A fruity and refreshing treat with reduced sugar!",
];

let currentFlavor = 1;

prevBtn.addEventListener("click", function () {
  topOverlay.classList.add("fade-in");
  bottomOverlay.classList.add("fade-in");
  titleEl.classList.add("text-fade-out");
  descriptionEl.classList.add("fade-out");
  setTimeout(() => {
    currentFlavor = currentFlavor != 1 ? (currentFlavor -= 1) : 6;
    currentEl.textContent = `0${currentFlavor}`;
    titleEl.textContent = flavors[currentFlavor - 1];
    coffeeImg.src = `./assets/menu/coffee${currentFlavor}.png`;
    coffee.classList.remove("fade-in");
    topOverlay.classList.remove("fade-in");
    bottomOverlay.classList.remove("fade-in");
    titleEl.classList.remove("text-fade-out");
    descriptionEl.classList.remove("fade-out");
    descriptionEl.textContent = descriptions[currentFlavor - 1];
  }, 875);
});

nextBtn.addEventListener("click", function () {
  topOverlay.classList.add("fade-in");
  bottomOverlay.classList.add("fade-in");
  titleEl.classList.add("text-fade-out");
  descriptionEl.classList.add("fade-out");
  setTimeout(() => {
    currentFlavor = currentFlavor != 6 ? (currentFlavor += 1) : 1;
    currentEl.textContent = `0${currentFlavor}`;
    titleEl.textContent = flavors[currentFlavor - 1];
    coffeeImg.src = `./assets/menu/coffee${currentFlavor}.png`;
    coffee.classList.remove("fade-in");
    topOverlay.classList.remove("fade-in");
    bottomOverlay.classList.remove("fade-in");
    descriptionEl.textContent = descriptions[currentFlavor - 1];
    descriptionEl.classList.remove("fade-out");
    titleEl.classList.remove("text-fade-out");
  }, 875);
});

window.addEventListener("load", function () {
  const leftOverlay = document.querySelector(".left-overlay");
  const rightOverlay = document.querySelector(".right-overlay");
  leftOverlay.classList.add("fade-out");
  rightOverlay.classList.add("fade-out");
});

const orderBtn = document.getElementById("order-btn");
const exitOrderBtn = document.getElementById("exit-order");
const orderOverlay = document.querySelector(".order-overlay");
const sugarLevelEl = document.querySelector('input[type="range"]');
const addOns = document.getElementsByName("add-on");
const orderOptions = document.getElementsByName("order-option");

orderBtn.addEventListener("click", function () {
  document.getElementById("order-flavor").textContent = titleEl.textContent;
  document.getElementById(
    "order-img"
  ).src = `./assets/menu/coffee${currentFlavor}-crop.png`;
  document.getElementById("first-process").classList.remove("fade-out");
  orderOverlay.style.opacity = "1";
  orderOverlay.style.pointerEvents = "auto";
  document.getElementById("first-process").classList.add("fade-in");
});

exitOrderBtn.addEventListener("click", function () {
  document.getElementById("first-process").classList.remove("fade-in");

  setTimeout(() => {
    document.getElementById("first-process").classList.add("fade-out");
    orderOverlay.style.opacity = "0";
    orderOverlay.style.pointerEvents = "none";
    addOns.forEach((addOn) => {
      addOn.checked = false;
    });

    orderOptions.forEach((option) => {
      option.checked = false;
    });

    sugarLevelEl.value = 50;
    document.querySelector('label[for="sugar-level"]').textContent = "50%";
  }, 500);
});

const orderDetails = [];

sugarLevelEl.addEventListener("input", function () {
  document.querySelector(
    'label[for="sugar-level"]'
  ).textContent = `${sugarLevelEl.value}%`;
});

function showCart() {
  document.querySelector(".side-cart").classList.remove("hide-cart");
}

function hideCart() {
  document.querySelector(".side-cart").classList.add("hide-cart");
}

let cartItems = 0;

const addToCartBtn = document.getElementById("add-to-cart-btn");
addToCartBtn.addEventListener("click", function () {
  const cartContainer = document.querySelector(".cart-container");

  let isAddOnEmpty = true;
  let selectedAddOn = "";
  for (let i = 0; i < addOns.length; i++) {
    if (addOns[i].checked) {
      isAddOnEmpty = false;
      selectedAddOn = addOns[i].id;
      break;
    }
  }

  if (isAddOnEmpty) {
    errorMessage.classList.add("show-error");
  } else {
    errorMessage.classList.remove("show-error");
    cartItems++;
    document.querySelector("#checkout-btn").classList.add("show");
    document.querySelector("#empty-cart").classList.add("hide");
    document.querySelector(".cart-count p").textContent = cartItems;

    const flavor = flavors[currentFlavor - 1];
    const pieces = document.getElementById("order-pieces").value;
    const sugarLevel = sugarLevelEl.value;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart");
    cartItem.innerHTML = `
      <div class="title">
        <img src="./assets/menu/coffee${currentFlavor}-crop.png" alt="coffee flavor" width="100px" style="border-radius: 50%" />
        <p>${flavor}</p>
      </div>
      <div class="cart-description">
        <p>Quantity: <span>${pieces}</span></p>
        <p>Sugar Level: <span>${sugarLevel}</span></p>
        <p>Add On: <span>${selectedAddOn}</span></p>
      </div>
      <button class="remove-cart" style="margin-top: 0">Remove</button>
    `;

    cartContainer.appendChild(cartItem);

    cartItem
      .querySelector(".remove-cart")
      .addEventListener("click", function () {
        cartContainer.removeChild(cartItem);
        cartItems--;

        document.querySelector(".cart-count p").textContent = cartItems;
        if (cartItems == 0) {
          document.querySelector("#checkout-btn").classList.remove("show");
          document.querySelector("#empty-cart").classList.remove("hide");
        }
      });

    alert("Item added to cart!");
  }
});
