import {cart} from "./cart.js";

export function renderAmazonHeader() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const amazonHeaderHTML = `
    <div class="left-section">
      <a href="index.html" class="header-link">
        <img class="logo" src="assets/amazon-logo-white.png">
        <img class="logo-mobile" src="assets/amazon-mobile-logo-white.png">
      </a>
    </div>

    <div class="middle-section">
      <input type="text" placeholder="Search">
      <button>
        <img src="assets/search-icon.png">
      </button>
    </div>

    <div class="right-section">
      <a href="#" class="order-link header-link">
        Orders
      </a>

      <a href="checkout.html" class="cart-link header-link">
        <img src="assets/cart-icon.png">
        <div class="cart-quantity">${cartQuantity}</div>
        <div>Cart</div>
      </a>
    </div>
  `;

  document.querySelector('header').innerHTML = amazonHeaderHTML;

}