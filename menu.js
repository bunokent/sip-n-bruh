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

const flavorSelect = document.getElementById("flavor-select");

flavors.forEach((flavor, index) => {
  const option = document.createElement("option");
  option.value = index + 1;
  option.textContent = flavor;
  flavorSelect.appendChild(option);
});

flavorSelect.addEventListener("change", function () {
  document.getElementById(
    "order-img"
  ).src = `./assets/menu/coffee${flavorSelect.value}-crop.png`;
  console.log("change");
});

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

orderOptions.forEach((option) => {
  const address = document.querySelector(".address");
  option.addEventListener("click", function () {
    if (this.id === "delivery") {
      address.style.display = "block";
      address.style.pointerEvents = "auto";
    } else {
      address.style.display = "none";
      address.style.pointerEvents = "none";
    }
  });
});

orderBtn.addEventListener("click", function () {
  flavorSelect.value = currentFlavor;
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

    document.getElementById("order-quantity").value = 1;
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

let orders = {};
let ids = [];

function generateId() {
  let randomNumber;
  while (true) {
    randomNumber = Math.trunc(Math.random() * 100) + 1;
    if (!ids.includes(randomNumber)) break;
  }

  ids.push(randomNumber);
  return randomNumber;
}

const addToCartBtn = document.getElementById("add-to-cart-btn");
const cartContainer = document.querySelector(".cart-container");
addToCartBtn.addEventListener("click", function () {
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
    document.querySelector(".empty-cart-container").classList.add("hide");
    document.querySelector(".cart-count p").textContent = cartItems;

    const flavor = flavors[flavorSelect.value - 1];
    const quantity = document.getElementById("order-quantity").value;
    const sugarLevel = sugarLevelEl.value;

    const details = [flavor, quantity, sugarLevel, selectedAddOn];
    const id = generateId();
    orders[id] = details;
    console.log(orders);

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart");
    cartItem.innerHTML = `
      <div class="title">
        <img src="./assets/menu/coffee${flavorSelect.value}-crop.png" alt="coffee flavor" width="100px" style="border-radius: 50%" />
        <p>${flavor}</p>
      </div>
      <div class="cart-description">
        <p>Quantity: <span>${quantity}</span></p>
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
        delete orders[id];
        console.log(orders);

        document.querySelector(".cart-count p").textContent = cartItems;
        if (cartItems == 0) {
          document.querySelector("#checkout-btn").classList.remove("show");
          document
            .querySelector(".empty-cart-container")
            .classList.remove("hide");
        }
      });

    alert("Item added to cart!");
  }
});

let total = 0;
const checkoutContainer = document.querySelector(".checkout-container");
function checkOut() {
  document.getElementById("checkout-process").classList.add("show");
  orderOverlay.style.opacity = "1";
  orderOverlay.style.pointerEvents = "auto";
  const totalPrice = document.querySelector(".total-price");
  Object.values(orders).forEach((order) => {
    const checkoutItem = document.createElement("div");
    let flavor = order[0];
    let quantity = order[1];
    let sugarLevel = order[2];
    let addOn = order[3];
    total += quantity * 45;

    checkoutItem.innerHTML = `
    <div>
      <p>${flavor} ${quantity}pc/s</p>
      <p>₱ ${quantity * 45}.00</p>
    </div>
    <ul>
      <li>Sugar Level - ${sugarLevel}%</li>
      <li>Add On - ${addOn}</li>
    </ul>
  `;

    checkoutContainer.appendChild(checkoutItem);
  });

  totalPrice.textContent = `₱ ${total}.00`;
}

function exitCheckout() {
  document.getElementById("checkout-process").classList.remove("show");
  orderOverlay.style.opacity = "0";
  orderOverlay.style.pointerEvents = "none";
  checkoutContainer.innerHTML = "";
  total = 0;
}

function placeOrder() {
  const payment = document.getElementById("payment");
  const orderOptions = document.getElementsByName("order-option");
  isOrderOptionDelivery = false;

  document.querySelector("p.payment-error").classList.remove("show");
  document.querySelector("p.empty-payment").classList.remove("show");
  document.querySelector("p.order-option-error").classList.remove("show");
  document.querySelector("p.address-error").classList.remove("show");
  hasError = true;
  if (payment.value === "") {
    console.log("empty bitch");
    document.querySelector("p.empty-payment").classList.add("show");
  } else {
    if (payment.value < total) {
      document.querySelector("p.payment-error").classList.add("show");
    } else {
      isOrderOptionEmpty = true;
      orderOptions.forEach((option) => {
        if (option.checked) {
          if (option.id === "delivery") isOrderOptionDelivery = true;
          isOrderOptionEmpty = false;
        }
      });

      if (isOrderOptionEmpty) {
        document.querySelector(".order-option-error").classList.add("show");
      } else {
        if (isOrderOptionDelivery) {
          if (document.getElementById("address").value === "") {
            document.querySelector("p.address-error").classList.add("show");
          } else {
            console.log("no error");
            hasError = false;
          }
        } else hasError = false;
      }
    }
  }

  if (hasError) document.getElementById("checkout-process").scrollTop = 0;
  else {
    change = payment.value - total;
    document.querySelector(".total-text").textContent = `₱ ${total}`;
    document.querySelector(".payment-text").textContent = `₱ ${payment.value}`;
    document.querySelector(".change-text").textContent = `₱ ${change}`;
    payment.value = "";

    if (isOrderOptionDelivery) {
      document.querySelector(".change-text").textContent = `₱ ${change}`;
      document.querySelector(".address-text").textContent = address.value;
      document.querySelector(".address-container").classList.add("show");
    } else {
      document.querySelector(".address-container").classList.remove("show");
    }

    document.getElementById("checkout-process").classList.remove("show");
    document.getElementById("payment-success").classList.add("show");
  }
}

function formatDate(date) {
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? " PM" : " AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  const formattedDate = `${month} ${day}, ${year}`;
  const formattedTime = `${hours}:${minutesStr}${ampm}`;

  return { formattedDate, formattedTime };
}

const now = new Date();
const { formattedDate, formattedTime } = formatDate(now);

const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");

dateElement.textContent = formattedDate;
timeElement.textContent = formattedTime;

function exitPaymentSuccess() {
  document.getElementById("payment-success").classList.remove("show");
  orderOverlay.style.opacity = "0";
  orderOverlay.style.pointerEvents = "none";
  cartContainer.innerHTML = "";
  document.querySelector("#checkout-btn").classList.remove("show");
  document.querySelector(".empty-cart-container").classList.remove("hide");
  orders = {};
  ids = [];
  cartItems = 0;
  total = 0;
  document.querySelector(".cart-count p").textContent = cartItems;
  checkoutContainer.innerHTML = "";
}
