import {cart, removeFormCart} from "./cart.js";
import {products} from "./products.js";

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

  cartSummaryHTML +=`
    <div class="cart-item-container 
    cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
              Quantity: <span class="quantity-label">
              ${cartItem.quantity}
              </span>
            </span>

            <span class="update-quantity-link link-primary">
              Update
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
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" 
            name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" 
            name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" 
            name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.order-summary')
  .innerHTML = cartSummaryHTML;


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
  });
});