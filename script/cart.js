export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
      quantity,
      deliveryOptionId: '1'
    }); // if the product is not in the cart, push to cart array
  }
  saveToStorage();
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
  
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem; 

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  }); // search if there is same product

  matchingItem.deliveryOptionId = deliveryOptionId;
  
  saveToStorage();
}