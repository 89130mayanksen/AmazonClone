export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart){
      cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionsId: '1'
      },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionsId: '2'
      }];
    }
}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;

    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity ++;
    }else{
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionsId: '1' 
      });
    }

    saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity(classOfElement){
  let cartQuantity = 0;
    cart.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
  });

  if(cartQuantity > 0){
    document.querySelector(`.${classOfElement}`).
      innerHTML = cartQuantity;
  }
  else{
    document.querySelector(`.${classOfElement}`).
      innerHTML = '';
  }  
}

export function updateQuantity(productId, newQuantity){
  if(newQuantity >=0 && newQuantity < 1000){
    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        cartItem.quantity = newQuantity;
        document.querySelector('.quantity-label').innerHTML = newQuantity;
        saveToStorage();
      }
    });
  }
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;

        matchingItem.deliveryOptionsId = deliveryOptionId;

        saveToStorage();
      }
    });
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',() => {
    console.log(xhr.response);
    
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();

  console.log(text);
  return text;
}