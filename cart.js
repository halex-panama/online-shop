export const cart = [];

export function addToCart(productId) {
  let matchingItem; 

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  }); // search if there is same product

  const quantitySelector = document.querySelector(
    `.quantity-selector-${productId}`
  ); // using html selector to increase the quantity

  const quantity = Number(quantitySelector.value); //convert the quantity from string to number

  if (matchingItem) {
    matchingItem.quantity += quantity; // if there is a same product, increase quantity 
  } else {
    cart.push ({
      productId,
      quantity
    }); // if the product is not in the cart, push to cart array
  }
};