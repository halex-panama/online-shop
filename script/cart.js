export let cart = [
  {
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];

export function addToCart(productId) {
  let matchingItem; 

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
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

export function removeFormCart(productId) {
  const newCart = [];

  //contain all item that dont match 
  //with the productId that we have
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}