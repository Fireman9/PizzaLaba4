import {setMainPage} from "./main.js"
import {setCatalogPage} from "./catalog.js";
import {setCategoryPage} from "./category.js";
import {setProductPage} from "./product.js";


export const content = document.getElementById("content");
export const header = document.getElementById("header");
export const footer = document.getElementById("footer");

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
            // TODO: call cart page
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
                // TODO: call discounts page generator with discounts[index] argument
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
    if (window.innerWidth <= 1300) {
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

content.style.minHeight = window.innerHeight - header.offsetHeight - footer.offsetHeight - 50 + "px";
footer.style.opacity = "1";

window.addEventListener("resize", sizeFit);
window.addEventListener("load", sizeFit);
window.addEventListener("load", router);
window.addEventListener("hashchange", router);