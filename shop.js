const PRODUCTS = {
  apple: { name: "Apple", emoji: "🍏" },
  banana: { name: "Banana", emoji: "🍌" },
  lemon: { name: "Lemon", emoji: "🍋" },
  orange: { name: "Orange", emoji: "🍊" },
  strawberry: { name: "Strawberry", emoji: "🍓" }
};

const BUNDLES = {
  healthy_mix: {
    name: "Healthy Mix",
    products: ["apple", "banana"],
    emoji: "🍏🍌"
  },
  citrus_lovers: {
    name: "Citrus Lovers",
    products: ["lemon", "apple"],
    emoji: "🍋🍏"
  },
  tropical_party: {
    name: "Tropical Party",
    products: ["banana", "lemon"],
    emoji: "🍌🍋"
  },
  fruit_feast: {
    name: "Fruit Feast",
    products: ["apple", "banana", "lemon"],
    emoji: "🍏🍌🍋"
  }
};

function getBasket() {
  const basket = localStorage.getItem("basket");
  return basket ? JSON.parse(basket) : [];
}

function addToBasket(product) {
  const basket = getBasket();
  basket.push(product);
  localStorage.setItem("basket", JSON.stringify(basket));
}

function clearBasket() {
  localStorage.removeItem("basket");
}

function addBundle(bundleId) {
  const bundle = BUNDLES[bundleId];
  if (bundle) {
    const basket = getBasket();
    basket.push(`bundle_${bundleId}`);
    localStorage.setItem("basket", JSON.stringify(basket));
    renderBasketIndicator();
  }
}

function renderBasket() {
  const basket = getBasket();
  const basketList = document.getElementById("basketList");
  const cartButtonsRow = document.querySelector(".cart-buttons-row");
  const basketTotalDiv = document.getElementById("basketTotal");
  if (!basketList) return;
  basketList.innerHTML = "";
  let total = 0;
  if (basket.length === 0) {
    basketList.innerHTML = "<li>No products in basket.</li>";
    if (cartButtonsRow) cartButtonsRow.style.display = "none";
    if (basketTotalDiv) basketTotalDiv.textContent = "Total: €0.00";
    return;
  }
  basket.forEach((item) => {
    if (item.startsWith("bundle_")) {
      const bundleId = item.replace("bundle_", "");
      const bundle = BUNDLES[bundleId];
      if (bundle) {
        const li = document.createElement("li");
        li.innerHTML = `<span class='basket-emoji'>${bundle.emoji}</span> <span>${bundle.name} Bundle</span>`;
        basketList.appendChild(li);
        bundle.products.forEach(prod => {
          if (window.FRUIT_FACTS && window.FRUIT_FACTS[prod]) {
            total += window.FRUIT_FACTS[prod].price;
          }
        });
      }
    } else {
      const product = PRODUCTS[item];
      if (product) {
        const li = document.createElement("li");
        li.innerHTML = `<span class='basket-emoji'>${product.emoji}</span> <span>${product.name}</span>`;
        basketList.appendChild(li);
        if (window.FRUIT_FACTS && window.FRUIT_FACTS[item]) {
          total += window.FRUIT_FACTS[item].price;
        }
      }
    }
  });
  if (cartButtonsRow) cartButtonsRow.style.display = "flex";
  if (basketTotalDiv) basketTotalDiv.textContent = `Total: €${total.toFixed(2)}`;
}

function renderBasketIndicator() {
  const basket = getBasket();
  let indicator = document.querySelector(".basket-indicator");
  if (!indicator) {
    const basketLink = document.querySelector(".basket-link");
    if (!basketLink) return;
    indicator = document.createElement("span");
    indicator.className = "basket-indicator";
    basketLink.appendChild(indicator);
  }
  if (basket.length > 0) {
    indicator.textContent = basket.length;
    indicator.style.display = "flex";
  } else {
    indicator.style.display = "none";
  }
}

// Call this on page load and after basket changes
if (document.readyState !== "loading") {
  renderBasketIndicator();
} else {
  document.addEventListener("DOMContentLoaded", renderBasketIndicator);
}

// Patch basket functions to update indicator
const origAddToBasket = window.addToBasket;
window.addToBasket = function (product) {
  origAddToBasket(product);
  renderBasketIndicator();
};
const origClearBasket = window.clearBasket;
window.clearBasket = function () {
  origClearBasket();
  renderBasketIndicator();
};
