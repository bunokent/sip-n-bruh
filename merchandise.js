const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const currentEl = document.querySelector("#current-merchandise");
const titleEl = document.querySelector("h1");
const descriptionEl = document.getElementById("description");
const merchandiseImg = document.querySelector("#merchandise");
const topOverlay = document.querySelector(".top-overlay");
const bottomOverlay = document.querySelector(".bottom-overlay");
const errorMessage = document.querySelector(".empty-error");

const merchandises = {
  1: ["BruhGutchi Hoodie", 699],
  2: ["BruhGutchi Shirt", 499],
  3: ["BruhGutchi Apron", 399],
  4: ["BruhGutchi Tote Bag", 399],
  5: ["BruhGutchi Cap", 299],
  6: ["BruhGutchi Mug", 269],
};

const descriptions = [
  "Wrap yourself in cozy vibes with our coffee-themed hoodie! Designed for caffeine enthusiasts, it features a sleek, stylish print that celebrates your love for coffee. Perfect for chilly mornings or lounging with your favorite brew",
  "Get your day started with this fuel-meets-passion combo tee! If you are a passionate coffee lover, this shirt will be able to reflect your hobby with its minimalist design and a cozy fit. This shirt makes a perfect union of style and comfort!",
  "Serve up style with our coffee-themed apron! Crafted for coffee lovers and kitchen maestros alike, this durable apron features a chic design that keeps you looking cool while protecting against spills. Perfect for brewing, baking, or barista dreams",
  "Carry your caffeine passion wherever you go with our coffee-inspired tote bag! Featuring a stylish design and spacious interior, this eco-friendly bag is perfect for coffee runs, groceries, or daily essentials. A must-have for every coffee lover on the move!",
  "Top off your look with our coffee-inspired cap! Featuring a sleek, embroidered design, this adjustable cap is perfect for coffee lovers who want to wear their passion proudly. A stylish and functional accessory for any casual outing",
  "Give your morning a perfect start with our specialized coffee mug! Perfect for real coffee lovers, this tough crafted polymer mug is modernized to give character to your beverage routine. Designed to let you relish every ounce of your drink in style!",
];

let currentMerchandise = 1;

const merchandiseSelect = document.getElementById("merchandise-select");

for (const key in merchandises) {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = merchandises[key][0];
  merchandiseSelect.appendChild(option);
}

merchandiseSelect.addEventListener("change", function () {
  document.getElementById(
    "order-img"
  ).src = `./assets/merchandise/merchandise${merchandiseSelect.value}-crop.jpg`;
  console.log("change");
});

prevBtn.addEventListener("click", function () {
  topOverlay.classList.add("fade-in");
  bottomOverlay.classList.add("fade-in");
  titleEl.classList.add("text-fade-out");
  descriptionEl.classList.add("fade-out");
  setTimeout(() => {
    currentMerchandise =
      currentMerchandise != 1 ? (currentMerchandise -= 1) : 6;
    currentEl.textContent = `0${currentMerchandise}`;
    titleEl.textContent = merchandises[currentMerchandise][0];
    merchandiseImg.src = `./assets/menu/coffee${currentMerchandise}.png`;
    topOverlay.classList.remove("fade-in");
    bottomOverlay.classList.remove("fade-in");
    titleEl.classList.remove("text-fade-out");
    descriptionEl.classList.remove("fade-out");
    descriptionEl.textContent = descriptions[currentMerchandise - 1];
  }, 875);
});

nextBtn.addEventListener("click", function () {
  topOverlay.classList.add("fade-in");
  bottomOverlay.classList.add("fade-in");
  titleEl.classList.add("text-fade-out");
  descriptionEl.classList.add("fade-out");
  setTimeout(() => {
    currentMerchandise =
      currentMerchandise != 6 ? (currentMerchandise += 1) : 1;
    currentEl.textContent = `0${currentMerchandise}`;
    titleEl.textContent = merchandises[currentMerchandise][0];
    merchandiseImg.src = `./assets/merchandise/merchandise${currentMerchandise}.png`;
    topOverlay.classList.remove("fade-in");
    bottomOverlay.classList.remove("fade-in");
    descriptionEl.textContent = descriptions[currentMerchandise - 1];
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
const orderOptions = document.getElementsByName("order-option");

orderOptions.forEach((option) => {
  const address = document.querySelector(".address-input-container");
  option.addEventListener("click", function () {
    if (this.id === "delivery") {
      address.classList.add("show");
    } else {
      address.classList.remove("show");
    }
  });
});

orderBtn.addEventListener("click", function () {
  merchandiseSelect.value = currentMerchandise;
  document.getElementById(
    "order-img"
  ).src = `./assets/merchandise/merchandise${currentMerchandise}-crop.jpg`;
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

    orderOptions.forEach((option) => {
      option.checked = false;
    });
  }, 500);
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

const addToCartBtn = document.getElementById("add-to-cart-btn");
const cartContainer = document.querySelector(".cart-container");
addToCartBtn.addEventListener("click", function () {
  document.querySelector(".empty-cart-container").classList.add("hide");
  document.querySelector("#checkout-btn").classList.add("show");
  const quantity = parseInt(document.getElementById("order-quantity").value);

  if (orders[merchandiseSelect.value] === undefined) {
    cartItems++;
    document.querySelector(".cart-count p").textContent = cartItems;

    const merchandise = merchandises[merchandiseSelect.value][0];
    orders[merchandiseSelect.value] = quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart");
    cartItem.innerHTML = `
      <div class="title">
        <img src="./assets/merchandise/merchandise${merchandiseSelect.value}-crop.jpg" alt="merchandise" width="100px" style="border-radius: 50%" />
        <p>${merchandise}</p>
      </div>
      <div class="cart-description">
        <p>Quantity: <span id="cart-${merchandiseSelect.value}">${quantity}</span></p>
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
  } else {
    orders[merchandiseSelect.value] += quantity;
    document.getElementById(`cart-${merchandiseSelect.value}`).textContent =
      orders[merchandiseSelect.value];
  }

  alert("Item added to cart!");
});

let total = 0;
const checkoutContainer = document.querySelector(".checkout-container");
function checkOut() {
  document.getElementById("checkout-first-process").classList.add("show");
  document.getElementById("checkout-process").classList.add("show");
  orderOverlay.style.opacity = "1";
  orderOverlay.style.pointerEvents = "auto";
  const totalPrice = document.querySelector(".total-price");
  for (const key in orders) {
    const checkoutItem = document.createElement("div");
    let merchandise = merchandises[key][0];
    let quantity = orders[key];
    total += quantity * merchandises[key][1];
    price = quantity * merchandises[key][1];
    checkoutItem.innerHTML = `
    <div>
      <p>${merchandise} ${quantity}pc/s</p>
      <p>₱ ${price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</p>
    </div>
    </ul>
  `;

    checkoutContainer.appendChild(checkoutItem);
  }

  totalPrice.textContent = `₱ ${total.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function exitCheckout() {
  document.getElementById("checkout-process").classList.remove("show");
  setTimeout(() => {
    orderOverlay.style.opacity = "0";
    orderOverlay.style.pointerEvents = "none";
    checkoutContainer.innerHTML = "";
    total = 0;
  }, 500);
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
      document.querySelector(".address-text-container").classList.add("show");
    } else {
      document
        .querySelector(".address-text-container")
        .classList.remove("show");
    }

    document.getElementById("checkout-first-process").classList.remove("show");
    document.getElementById("payment-success").classList.add("show");

    const now = new Date();
    const { formattedDate, formattedTime } = formatDate(now);

    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");

    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
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

function exitPaymentSuccess() {
  document.getElementById("checkout-process").classList.remove("show");

  setTimeout(() => {
    document.querySelector(".address-input-container").classList.remove("show");
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
  }, 500);
}
