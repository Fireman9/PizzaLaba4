import {setMainPage} from "./main.js"
import {setCatalogPage} from "./catalog.js";

export const content = document.getElementById("content");

async function router() {
    let hash = window.location.hash;
    let href = window.location.href.replace(window.location.hash, '');
    let splittedHash = hash.split("/");
    if (splittedHash.length === 1) {
        if (splittedHash[0] === "") {
            window.scrollTo(0, 0);
            content.innerHTML = "<div class='loader'></div>";
            setMainPage();
        } else if (splittedHash[0] === "#catalog") {
            window.scrollTo(0, 0);
            content.innerHTML = "<div class='loader'></div>";
            setCatalogPage();
            window.location.href = href + "#catalog";
        } else if (splittedHash[0] === "#cart") {
            window.scrollTo(0, 0);
            content.innerHTML = "<div class='loader'></div>";
            // TODO: call cart page
            window.location.href = href + "#cart";
        } else {
            window.scrollTo(0, 0);
            content.innerHTML = "<div class='loader'></div>";
            setMainPage();
            window.location.href = href + "";
        }
    } else if (splittedHash.length === 2) {
        if (splittedHash[0] === "#catalog") {
            let response = await fetch('https://my-json-server.typicode.com/Fireman9/PizzaLaba4/categories');
            let categories;
            if (response.ok) {
                categories = await response.json();
            } else {
                console.log("Error fetch in router");
                return;
            }
            let exist = false;
            let index;
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].url === splittedHash[1]) {
                    exist = true;
                    index = i;
                }
            }
            if (exist) {
                window.scrollTo(0, 0);
                content.innerHTML = "<div class='loader'></div>";
                // TODO: call categories page generator with categories[index] argument
            } else {
                window.scrollTo(0, 0);
                content.innerHTML = "<div class='loader'></div>";
                setMainPage();
                window.location.href = href + "";
            }
        } else if (splittedHash[0] === "#product") {
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
                window.scrollTo(0, 0);
                content.innerHTML = "<div class='loader'></div>";
                // TODO: call products page generator with products[index] argument
            } else {
                window.scrollTo(0, 0);
                content.innerHTML = "<div class='loader'></div>";
                setMainPage();
                window.location.href = href + "";
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
                window.scrollTo(0, 0);
                content.innerHTML = "<div class='loader'></div>";
                // TODO: call discounts page generator with discounts[index] argument
            } else {
                window.scrollTo(0, 0);
                content.innerHTML = "<div class='loader'></div>";
                setMainPage();
                window.location.href = href + "";
            }
        } else if (splittedHash[0] === "#order") {
            // TODO: check to id
        } else {
            window.scrollTo(0, 0);
            content.innerHTML = "<div class='loader'></div>";
            setMainPage();
            window.location.href = href;
        }
    } else {
        window.scrollTo(0, 0);
        content.innerHTML = "<div class='loader'></div>";
        setMainPage();
        window.location.href = href + "";
    }
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);