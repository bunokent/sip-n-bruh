const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const currentEl = document.querySelector("#current-flavor");
const titleEl = document.querySelector("h1");
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

let currentFlavor = 1;

prevBtn.addEventListener("click", function () {
  topOverlay.classList.add("fade-in");
  bottomOverlay.classList.add("fade-in");
  titleEl.classList.add("text-fade-out");
  setTimeout(() => {
    currentFlavor = currentFlavor != 1 ? (currentFlavor -= 1) : 6;
    currentEl.textContent = `0${currentFlavor}`;
    titleEl.textContent = flavors[currentFlavor - 1];
    coffeeImg.src = `./assets/menu/coffee${currentFlavor}.png`;
    coffee.classList.remove("fade-in");
    topOverlay.classList.remove("fade-in");
    bottomOverlay.classList.remove("fade-in");
    titleEl.classList.remove("text-fade-out");
  }, 850);
});

nextBtn.addEventListener("click", function () {
  currentFlavor = currentFlavor != 6 ? (currentFlavor += 1) : 1;
  currentEl.textContent = `0${currentFlavor}`;
  titleEl.textContent = flavors[currentFlavor - 1];
  coffeeImg.src = `./assets/menu/coffee${currentFlavor}.png`;
});

window.addEventListener("load", function () {
  const introOverlay = document.querySelector(".intro-overlay");
  const introImg = document.querySelector(".intro-overlay img");
  const leftOverlay = document.querySelector(".left-overlay");
  const rightOverlay = document.querySelector(".right-overlay");
  leftOverlay.classList.add("fade-out");
  rightOverlay.classList.add("fade-out");
  introImg.classList.add("fade-out");
  this.setTimeout(() => {
    introOverlay.classList.add("fade-out");
  }, 1000);
});
