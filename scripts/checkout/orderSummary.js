import{cart} from '../../data/cart-class.js';
import{products, getProduct} from '../../data/products.js'
import{formatCurrency} from '../utils/money.js' 
import { calculateCartQuantity } from '../../data/cart.js'; 
import { updateQuantity } from '../../data/cart.js'; 
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js'; 
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';
import { calculateDeliveryDate } from '../../data/deliveryOptions.js';


export function renderOrderSummary(){

  let cartSummaryHTML = '';

  cart.cartItems.forEach((cartItem)=> {
    const productId = cartItem.productId;

    const matchingProducts =getProduct (productId);

    const deliveryOptionId = cartItem.deliveryOptionsId;

    const deliveryOption= getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    // const today = dayjs();
    // const deliveryDate = today.add(
    //   deliveryOption.deliveryDays,
    //   'days'
    // );

    // const dateString = deliveryDate.format(
    //   'dddd, MMMM D'
    // );

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProducts.id}">
      <div class="delivery-date">
        Delivery date:${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProducts.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProducts.id}">
            ${matchingProducts.name}
          </div>
          <div class="product-price js-product-price">
            ${matchingProducts.getPrice()}
          </div>
          <div class="product-quantity
            js-product-quantity-${matchingProducts.id}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-update-id="${matchingProducts.id}">
              Update
            </span>
            <span>
              <input type="number" class="quantity-input">
            </span>
            <span class="save-quantity-link link-primary js-save-quantity-link"
            data-product-update-id="${matchingProducts.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProducts.id}" data-product-id="${matchingProducts.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProducts, cartItem)}                      
        </div>
      </div>
    </div>
    `;
  });

  function deliveryOptionsHTML(matchingProducts, cartItem){

    let html = '';
    deliveryOptions.forEach((deliveryOption)=>{

      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );

      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

      html += `
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingProducts.id}-${deliveryOption.id}"
          data-product-id="${matchingProducts.id}"
          data-delivery-options-id = "${deliveryOption.id}">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input js-delivery-option-input-${matchingProducts.id}-${deliveryOption.id}"
              name="delivery-option-${matchingProducts.id}">
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

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  //this part is providing TypeError: NULL innnerHTML (correct the fuction with perhaps MVC model)

    let classOfElement = 'js-checkout-middle-section';
    // calculateCartQuantity(classOfElement);



  document.querySelectorAll('.js-delete-link').
    forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        cart.removeFromCart(productId);

        renderOrderSummary();
        // calculateCartQuantity(classOfElement);
        // renderPaymentSummary();
        // renderCheckoutHeader();      // comment back these lines its only commented out for the testing 
      });
    });

  document.querySelectorAll(`.js-update-quantity-link`)
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      // const productId = link.dataset.productUpdateId;
      // const container = document.querySelector(`.js-cart-item-container-${productId}`);        updation using DOM
      renderOrderSummary();                // updation  using MVC
      container.classList.add("is-editing-quantity");
    });
  });

    document.querySelectorAll(`.js-save-quantity-link`)
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productUpdateId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove("is-editing-quantity");
      const updatedValue = Number(document.querySelector('.quantity-input').value);

      updateQuantity(productId,updatedValue);
      calculateCartQuantity(classOfElement);
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionsId} = element.dataset;

        cart.updateDeliveryOption(productId, deliveryOptionsId);

        renderOrderSummary();
        renderPaymentSummary();
      });
    });

    const calculateDate = dayjs();
    const calculateDate5 = calculateDate.subtract(1,'month');
    console.log(calculateDate5.format('dddd, MMMM D'));
}

let practiceDate = dayjs();
function isWeekend(date){
  let nextDate = date.add(4,'days');
  let weekDay = nextDate.format('dddd');
  console.log(weekDay);
  if(weekDay === 'Sunday' || weekDay === 'Saturday'){
    console.log(weekDay);
  }
}
isWeekend(practiceDate);