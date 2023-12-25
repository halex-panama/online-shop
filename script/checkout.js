import {
  cart, 
  removeFormCart, 
  calculateCartQuantity, 
  updateQuantity,
  updateDeliveryOption
  } 
  from "./cart.js";

import {products} from "./products.js";

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import {deliveryOptions} from "./deliveryOptions.js";

function renderOrderSummary() {

  let cartSummaryHTML = '';

  //search product from product.js
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    // if the productId matching with product that we have in product.js, 
    // we save it to mathcingProduct variable
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    )
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML +=`
      <div class="cart-item-container 
      cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
          src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${(matchingProduct.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">
                ${cartItem.quantity}
                </span>
              </span>

              <span class="update-quantity-link link-primary" 
              data-product-id="${matchingProduct.id}">
                Update
              </span>

              <input class="quantity-input quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary" 
              data-product-id="${matchingProduct.id}">
                Save
              </span>

              <span class="delete-quantity-link link-primary" 
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery options:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      )
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE -'
        : `$${(deliveryOption.priceCents / 100).toFixed(2)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html +=`
        <div class="delivery-option" data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''} 
          class="delivery-option-input" 
          name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }

  document.querySelector('.order-summary')
    .innerHTML = cartSummaryHTML;

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
  };
    
  //add data productId to delete button
  document.querySelectorAll('.delete-quantity-link')
    .forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;
      
      removeFormCart(productId);

      const container = document.querySelector(
        `.cart-item-container-${productId}`
        );
      container.remove();
      updateCartQuantity();
    });
  });

  updateCartQuantity();

  document.querySelectorAll('.update-quantity-link')
    .forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;
      
      const container = document.querySelector(
        `.cart-item-container-${productId}`
        );

      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.save-quantity-link')
    .forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;
      
      const container = document.querySelector(
        `.cart-item-container-${productId}`
        );

      container.classList.remove('is-editing-quantity');

      const quantityInput = document.querySelector(
        `.quantity-input-${productId}`
        );

      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return
      }

      updateQuantity(productId,newQuantity);

      const quantityLabel = document.querySelector(
        `.quantity-label-${productId}`
        );
      
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
    });
  });

  document.querySelectorAll('.delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;

        updateDeliveryOption(productId, deliveryOptionId);

        renderOrderSummary();
      });
    });
}

renderOrderSummary();