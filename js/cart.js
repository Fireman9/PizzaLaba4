import {content} from "./router.js";

let cartHtml;

export function setCartPage() {
    window.scrollTo(0, 0);
    content.innerHTML = "<div class='loader'></div>";
    cartHtml = "";
    createCart(function (cartHtml) {
        content.innerHTML = cartHtml;
        updateCartProductsAndPrice();
    });
}

export function createCart(callback) {
    cartHtml += `<div class="cartListAndValidationContainer">
    <div class="allCart">
    <div class="cartList"></div>
    <div class="resultPrice"></div>
    </div>
    <div class="validation">
    <div class="clientContactInfo">
    <div class="contactName">
    <div class="placeholder">Ім'я</div>
    <input id="nameInput" placeholder="Ім'я">
    </div>
    <div class="contactPhone">
    <div class="placeholder">Телефон</div>
    <input id="phoneInput" value="+380" type="tel" pattern="[+]380[0-9]{9}" placeholder="Телефон">
    </div>
    <div class="contactEmail">
    <div class="placeholder">Email</div>
    <input id="emailInput" type="email" placeholder="Email">
    </div>
    </div>
    <div class="clientAddress">
    <div class="clientHouse">
    <div class="placeholder">Вулиця, дім</div>
    <input id="houseInput" placeholder="Вулиця, дім">
    </div>
    <div class="clientFlatN">
    <div class="placeholder">Квартира</div>
    <input id="FlatNInput" type="number" placeholder="Квартира">
    </div>
    </div>
    <div class="deliveryAndPayout">
    <div class="deliveryDate">
    <div class="placeholder">Дата</div>
    <input id="deliveryDateInput" type="date" placeholder="Дата">
    </div>
    <div class="deliveryTime">
    <div class="placeholder">Час</div>
    <input id="deliveryTimeInput" type="time" placeholder="Час">
    </div>
    <div class="payout">
    <div class="placeholder">Оплата</div>
    <select id="payoutInput">
    <option class="option">Карткою онлайн</option>
    <option class="option">Карткою на місці</option>
    <option class="option">Готівкою на місці</option>
    </select>
    </div>
    </div>
    <div class="buy">
    <button class="buyBut">Замовити</button>
    </div>
    </div>
    </div>`;
    callback(cartHtml);
}

export async function updateCartProductsAndPrice() {
    let cartList = document.querySelectorAll(".cartList")[0];
    let resultPrice = document.querySelectorAll(".resultPrice")[0];
    let productsInCart = "";
    let cart = JSON.parse(localStorage.getItem("cart"));
    let products = await fetch('https://my-json-server.typicode.com/Fireman9/PizzaLaba4/products')
        .then(products => products.json());
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (cart[i].name === products[j].url) {
                productsInCart += `<div class="imgAndProductContainer">
                <img class="cartProductImg" src="${products[j].image}">
                <div class="productInCartContainer">
                <div class="productInCartName"><b>${products[j].name}</b></div>
                <div class="productInCartDesc">${products[j].description}</div>
                <div class="productInCartPrice"><b>${products[j].price} грн</b></div>
                <div class="productInCartButAndDelBut">
                <div class="delProduct"></div>
                <div class="productInCartBut">
                <button value="${products[j].url}" class="cartPlusMinusBut">-</button>
                <div class="countProduct">${cart[i].count}</div>
                <button value="${products[j].url}" class="cartPlusMinusBut">+</button>
                </div>
                </div>
                </div>
                </div>`
            }
        }
    }
    cartList.innerHTML = productsInCart;
    let price = 0;
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (products[j].url === cart[i].name) {
                price += products[j].price * cart[i].count;
            }
        }
    }
    resultPrice.innerHTML = `Разом: ${price.toFixed(2)} грн`;
}