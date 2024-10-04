class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {

    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
      if(!this.cartItems){
        this.cartItems = [{
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

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId){
    let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
  
      if(matchingItem){
        matchingItem.quantity ++;
      }else{
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionsId: '1' 
        });
      }
  
      this.saveToStorage();
  }

  removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  }

  calculateCartQuantity(classOfElement){
    let cartQuantity = 0;
      this.cartItems.forEach((cartItem)=>{
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

  updateQuantity(productId, newQuantity){
    if(newQuantity >=0 && newQuantity < 1000){
      this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          cartItem.quantity = newQuantity;
          document.querySelector('.quantity-label').innerHTML = newQuantity;
          this.saveToStorage();
        }
      });
    }
  }

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
  
          matchingItem.deliveryOptionsId = deliveryOptionId;
  
          this.saveToStorage();
        }
      });
  }
}

export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);
