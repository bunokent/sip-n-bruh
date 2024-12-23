const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const currentEl = document.querySelector("#current-flavor");
const titleEl = document.querySelector("h1");
const descriptionEl = document.getElementById("description");
const coffeeImg = document.querySelector("#coffee");
const topOverlay = document.querySelector(".top-overlay");
const bottomOverlay = document.querySelector(".bottom-overlay");

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

// handle order

const orderBtn = document.getElementById("order-btn");
const buyBtn = document.getElementById("buy-btn");
const exitOrderBtn = document.getElementById("exit-order");
const orderOverlay = document.querySelector(".order-overlay");
const sugarLevelEl = document.querySelector('input[type="range"]');
const addOns = document.getElementsByName("add-on");
const orderOptions = document.getElementsByName("order-option");
const address = document.getElementById("address");

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

    address.value = "";
    address.style.display = "none";

    sugarLevelEl.value = 50;
    document.querySelector('label[for="sugar-level"]').textContent = "50%";
  }, 500);
});

buyBtn.addEventListener("click", function () {
  orderAddOn = "";
  isAddOnEmpty = true;
  for (let i = 0; i < addOns.length; i++) {
    if (addOns[i].checked) {
      orderAddOn = addOns[i].id;
      isAddOnEmpty = false;
      break;
    }
  }

  isOrderOptionsEmpty = true;
  isOrderOptionAddress = false;
  for (let i = 0; i < orderOptions.length; i++) {
    if (orderOptions[i].checked) {
      if (orderOptions[i].id == "delivery") {
        if (address.value === "") break;
        else {
          isOrderOptionsEmpty = false;
          isOrderOptionAddress = true;
        }
      } else {
        isOrderOptionsEmpty = false;
        break;
      }
    }
  }

  if (isAddOnEmpty || isOrderOptionsEmpty)
    document.querySelector("p.empty-error").classList.add("show-error");
  else {
    document.querySelector("p.empty-error").classList.remove("show-error");
    const pieces = document.getElementById("order-pieces").value;
    const priceTotal = 45 * pieces;

    document.getElementById("checkout-flavor").textContent = `${
      flavors[currentFlavor - 1]
    } ${pieces}pc/s`;
    document.getElementById(
      "checkout-sugar-level"
    ).textContent = `${sugarLevelEl.value}%`;
    document.getElementById("checkout-add-on").textContent = `${orderAddOn}`;
    document.getElementById("total-price").textContent = `₱ ${priceTotal}.00`;

    if (isOrderOptionAddress) {
      document.getElementById("checkout-address").textContent = address.value;
      document.querySelector(".address-container").classList.remove("hide");
      document.querySelector(".note").classList.remove("hide");
    } else {
      document.querySelector(".address-container").classList.add("hide");
      document.querySelector(".note").classList.add("hide");
    }

    document.getElementById("first-process").style.display = "none";
    document.getElementById("second-process").classList.remove("hide");
  }
});

const orderDetails = [];

sugarLevelEl.addEventListener("input", function () {
  document.querySelector(
    'label[for="sugar-level"]'
  ).textContent = `${sugarLevelEl.value}%`;
});

orderOptions.forEach((option) => {
  option.addEventListener("input", function () {
    if (option.id === "delivery") {
      address.style.display = "block";
      address.style.pointerEvents = "auto";
    } else {
      address.style.display = "none";
      address.style.pointerEvents = "none";
    }
  });
});

document.getElementById("back-to-first").addEventListener("click", function () {
  document.getElementById("second-process").classList.add("hide");
  document.getElementById("first-process").style.display = "flex";
});
