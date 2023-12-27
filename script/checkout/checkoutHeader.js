import {cart} from "../cart.js";

export function renderCheckoutHeader() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const checkoutHeaderHTML = `
    <div class="header-content">
      <div class="left-section">
        <a href="index.html" class="header-link">
          <img class="logo" src="assets/amazon-logo.png">
          <img class="logo-mobile" src="assets/amazon-mobile-logo.png" alt="">
        </a>
      </div>
  
      <div class="middle-section">
        Checkout (<a class="return-to-home-link" href="index.html">${cartQuantity} Items</a>)
      </div>
  
      <div class="right-section">
        <img src="assets/checkout-lock-icon.png">
      </div>
    </div>
  `;

  document.querySelector('header').innerHTML = checkoutHeaderHTML;
}