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
    <div class="validation">validation form here</div>
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
    resultPrice.innerHTML = `Разом: ${price} грн`;
}