import {content} from "./router.js";


let catalogHtml = "";

export function setCatalogPage() {
    window.scrollTo(0, 0);
    content.innerHTML = "<div class='loader'></div>";
    catalogHtml = "";
    createCatalog(function (catalogHtml) {
        content.innerHTML = catalogHtml;
    })
}

async function createCatalog(callback) {
    let response = await fetch('https://my-json-server.typicode.com/Fireman9/PizzaLaba4/db');
    let db;
    if (response.ok) {
        db = await response.json();
    } else {
        console.log("Error fetch in catalog");
        return;
    }
    for (let i = 0; i < db.categories.length; i++) {
        catalogHtml += `<a href='#catalog/${db.categories[i].url}'><div class='category'>Піца: ${db.categories[i].name}</div></a>`;
        catalogHtml += "<div class='productsContainer'>";
        for (let j = 0; j < db.products.length; j++) {
            if (db.products[j].categoryID === i) {
                let productHtml = `<div class='product'>
                    <div class='productImageDiv'>
                    <img class='productImage' src='${db.products[j].image}' alt>
                    <div class='productWeight'>${db.products[j].weight} г</div>
                    </div>
                    <a href='#product/${db.products[j].url}'><div class='productName'>${db.products[j].name}</div></a>
                    <div class='productDesc'><b>Індгредієнти:</b><br>${db.products[j].description}</div>
                    <div class='priceAndAddToCart'>
                    <div class='productPrice'>${db.products[j].price} грн</div>
                    <button class='addToCart' value="${db.products[j].url}">В кошик</button>
                    </div>
                    </div>`;
                catalogHtml += productHtml;
            }
        }
        catalogHtml += "</div>";
    }
    callback(catalogHtml);
}