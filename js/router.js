import {setMainPage} from "./main.js"
import {setCatalogPage} from "./catalog.js";
import {setCategoryPage} from "./category.js";
import {setProductPage} from "./product.js";
import {setDiscountPage} from "./discount.js";
import {setCartPage} from "./cart.js";
import {updateCartProductsAndPrice} from "./cart.js";


export const content = document.getElementById("content");
export const header = document.getElementById("header");
export const footer = document.getElementById("footer");

function addToCart(value) {
    console.log(value);
    if (localStorage.getItem("cart") === null) {
        let cart = [];
        cart.push({
            name: value,
            count: 1
        })
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let exist = false;
        let index;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === value) {
                exist = true;
                index = i;
            }
        }
        if (exist) {
            cart[index].count++;
        } else {
            cart.push({
                name: value,
                count: 1
            })
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }
}

function updateCartCount() {
    if (localStorage.getItem("cart") === null) return;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let count = document.getElementById("count");
    let cartCount = 0;
    for (let i = 0; i < cart.length; i++) {
        cartCount += cart[i].count;
    }
    if (cartCount > 9) {
        count.innerText = cartCount.toString();
    } else {
        count.innerText = "0" + cartCount;
    }
    showPrice();
}

async function router() {
    let hash = window.location.hash;
    let href = window.location.href.replace(window.location.hash, '');
    let splittedHash = hash.split("/");
    if (splittedHash.length === 1) {
        if (splittedHash[0] === "") {
            setMainPage();
        } else if (splittedHash[0] === "#catalog") {
            setCatalogPage();
        } else if (splittedHash[0] === "#cart") {
            if (localStorage.getItem("cart") === null) {
                setMainPage();
                window.location.href = href;
                return;
            }
            let cart = JSON.parse(localStorage.getItem("cart"));
            if (cart.length === 0) {
                setMainPage();
                window.location.href = href;
                return;
            }
            setCartPage();
        } else {
            setMainPage();
            window.location.href = href;
        }
    } else if (splittedHash.length === 2) {
        if (splittedHash[0] === "#catalog") {
            window.scrollTo(0, 0);
            content.innerHTML = "<div class='loader'></div>";
            let response = await fetch('https://my-json-server.typicode.com/Fireman9/PizzaLaba4/db');
            let db;
            if (response.ok) {
                db = await response.json();
            } else {
                console.log("Error fetch in router");
                return;
            }
            let exist = false;
            let index;
            for (let i = 0; i < db.categories.length; i++) {
                if (db.categories[i].url === splittedHash[1]) {
                    exist = true;
                    index = i;
                }
            }
            if (exist) {
                setCategoryPage(db, index);
            } else {
                setMainPage();
                window.location.href = href;
            }
        } else if (splittedHash[0] === "#product") {
            window.scrollTo(0, 0);
            content.innerHTML = "<div class='loader'></div>";
            let response = await fetch('https://my-json-server.typicode.com/Fireman9/PizzaLaba4/products');
            let products;
            if (response.ok) {
                products = await response.json();
            } else {
                console.log("Error fetch in router");
                return;
            }
            let exist = false;
            let index;
            for (let i = 0; i < products.length; i++) {
                if (products[i].url === splittedHash[1]) {
                    exist = true;
                    index = i;
                }
            }
            if (exist) {
                setProductPage(products[index]);
            } else {
                setMainPage();
                window.location.href = href;
            }
        } else if (splittedHash[0] === "#discount") {
            window.scrollTo(0, 0);
            content.innerHTML = "<div class='loader'></div>";
            let response = await fetch('https://my-json-server.typicode.com/Fireman9/PizzaLaba4/discounts');
            let discounts;
            if (response.ok) {
                discounts = await response.json();
            } else {
                console.log("Error fetch in router");
                return;
            }
            let exist = false;
            let index;
            for (let i = 0; i < discounts.length; i++) {
                if (discounts[i].url === splittedHash[1]) {
                    exist = true;
                    index = i;
                }
            }
            if (exist) {
                setDiscountPage(discounts[index]);
            } else {
                setMainPage();
                window.location.href = href;
            }
        } else if (splittedHash[0] === "#order") {
            // TODO: check to id
        } else {
            setMainPage();
            window.location.href = href;
        }
    } else {
        setMainPage();
        window.location.href = href;
    }
}

function sizeFit() {
    // TODO: check for bot limit
    if (window.innerWidth <= 1350) {
        content.style.marginLeft = "1%";
        content.style.marginRight = "1%";
    } else if (window.innerWidth <= 1920 && window.innerWidth > 1300) {
        let margin = (window.innerWidth - 1350) / 31;
        content.style.marginLeft = margin + "%";
        content.style.marginRight = margin + "%";
    } else {
        content.style.marginLeft = "16%";
        content.style.marginRight = "16%";
    }
}

async function showPrice() {
    if (localStorage.getItem("cart") === null) return;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = document.getElementById("totalPrice");
    if (cart.length === 0) {
        totalPrice.innerText = "";
        totalPrice.style.padding = "0";
        return;
    }
    let products = await fetch('https://my-json-server.typicode.com/Fireman9/PizzaLaba4/products')
        .then(products => products.json());
    let price = 0;
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (products[j].url === cart[i].name) {
                price += products[j].price * cart[i].count;
            }
        }
    }
    totalPrice.innerText = `${price.toFixed(2)} грн`;
    totalPrice.style.paddingLeft = "10px";
    totalPrice.style.paddingRight = "10px";
}

content.style.minHeight = window.innerHeight - header.offsetHeight - footer.offsetHeight - 50 + "px";
footer.style.opacity = "1";

window.addEventListener("resize", sizeFit);
window.addEventListener("load", sizeFit);
window.addEventListener("load", router);
window.addEventListener("load", updateCartCount);
window.addEventListener("hashchange", router);
content.addEventListener("click", function (event) {
    if (event.target.classList.contains("addToCart")) {
        addToCart(event.target.value);
    } else if (event.target.classList.contains("cartPlusMinusBut")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (event.target.innerText === "+") {
            let index;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].name === event.target.value) {
                    index = i;
                }
            }
            cart[index].count++;
        } else {
            let index;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].name === event.target.value) {
                    index = i;
                }
            }
            cart[index].count--;
            if (cart[index].count === 0) {
                cart.splice(index, 1);
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        updateCartProductsAndPrice();
    }
})