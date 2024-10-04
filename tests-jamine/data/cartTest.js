import { cart } from "../../data/cart-class.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";


describe('test suite: addToCart',()=>{
  beforeEach(() => {
    spyOn(localStorage,'setItem');
  });


  it('adds an existing product to the cart', ()=>{

    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }]));
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);

  });

  it('adds a new product to the cart', ()=>{

    cart.cartItems = [];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '1'
    }]));
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
  });
});

describe('test suite:removeFromCart', ()=>{
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    // spyOn(localStorage, 'getItem').and.callFake(()=>{
    //   return JSON.stringify([{
    //     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //     quantity: 1,
    //     deliveryOptionsId: '1'
    //   }]);
    // });

    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '1'
    }];
    // loadFromStorage();
  });

  it('removes a productId that is present in the cart',()=>{
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems.length).toEqual(0);
  });

  it('removes a productId that is not present in the cart', ()=>{
    cart.removeFromCart('randomProductid');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems.length).toEqual(1);
  });

});

describe('update delivery option',()=>{

  it('update delivery option',()=>{
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    document.querySelector('.js-test-container').innerHTML = 
        `
          <div class = "js-order-summary"></div>
          <div class = "js-order-summary"></div>
          <div class = "js-payment-summary"></div>
          <div class = "js-test-container"></div>
        `;

    spyOn(localStorage,'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionsId: '1'
      },{
        productId: productId2,
        quantity: 1,
        deliveryOptionsId: '2'
      }]);
    }); 
    // loadFromStorage();
  
    renderOrderSummary();

    document.querySelector(`.js-delivery-option-${productId1}-1`).click();
    expect(document.querySelector(`.js-delivery-option-input-${productId1}-1`).checked
  ).toEqual(true);

  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
});

  it('edge case for update delivery option', ()=>{

    spyOn(localStorage,'setItem');
    
    cart.updateDeliveryOption('edgeCaseProductId','1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});