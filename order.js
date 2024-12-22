const orderBtn = document.getElementById("order-btn");
const buyBtn = document.getElementById("buy-btn");
const exitOrderBtn = document.getElementById("exit-order");
const orderOverlay = document.querySelector(".order-overlay");
const sugarLevelEl = document.querySelector('input[type="range"]');
const addOns = document.getElementsByName("add-on");
const orderOptions = document.getElementsByName("order-option");
const address = document.getElementById("address");

orderBtn.addEventListener("click", function () {
  const coffeeFlavor = document.querySelector("h1").textContent;
  document.getElementById("order-flavor").textContent = coffeeFlavor;
  document.getElementById("order-img").textContent = coffeeFlavor;
  document.querySelector(".order-overlay main").classList.remove("fade-out");
  setTimeout(() => {
    orderOverlay.style.opacity = "1";
    orderOverlay.style.pointerEvents = "auto";
    document.querySelector(".order-overlay main").classList.add("fade-in");
  }, 500);
});

exitOrderBtn.addEventListener("click", function () {
  document.querySelector(".order-overlay main").classList.remove("fade-in");

  setTimeout(() => {
    document.querySelector(".order-overlay main").classList.add("fade-out");
    orderOverlay.style.opacity = "0";
    orderOverlay.style.pointerEvents = "none";
  }, 500);
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
    } else {
      address.style.display = "none";
      address.style.pointerEvents = "auto";
    }
  });
});
