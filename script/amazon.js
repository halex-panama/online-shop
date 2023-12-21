import {products} from "./products.js";
import {cart, addToCart} from "./cart.js";

let productsHTML = '';

// generate html using js

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
    <div class="product-image-container">
      <img src="${product.image}">
    </div>

    <div class="product-name">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img src="assets/rating/rating-${product.rating.stars * 10}.png" class="product-rating-star">
      <div class="product-rating-count">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="added-to-cart added-to-cart-${product.id}">
      <img src="assets/checkmark.png">
      Added
    </div>

    <button class="button-primary add-to-cart-button" 
      data-product-id="${product.id}">
      Add to cart
    </button>

  </div>
  `;
});

document.querySelector('.products-grid')
  .innerHTML = productsHTML;

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  }); //adding quantity to the cart

  document.querySelector('.cart-quantity')
    .innerHTML = cartQuantity;
};

const addedMessageTimeouts = {}; // add timeout to added message

function addedMessageText(productId) {
  const addedMessage = document.querySelector(
    `.added-to-cart-${productId}`
  );

  addedMessage.classList.add('added-to-cart-visible'); //add text whenever adding a product to a cart

  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible');
  }, 2000); // set timeout to the text to 2 second

  addedMessageTimeouts[productId] = timeoutId;
}

document.querySelectorAll('.add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset; // using product id to button

      addToCart(productId);

      updateCartQuantity();

      addedMessageText(productId);
    });
  });