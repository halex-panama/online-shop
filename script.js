import {products} from "./products.js";
import {cart} from "./cart.js";

let productsHTML = '';

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
      <select>
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

    <div class="added-to-cart">
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

document.querySelectorAll('.add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      let matchingItem;

      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push ({
          productId: productId,
          quantity: 1
        });
      }

      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.cart-quantity')
        .innerHTML = cartQuantity

    });
  });