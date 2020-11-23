import {content} from "./router.js";

let catalogHtml = "";

export function setCatalogPage() {
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
        catalogHtml += "<div class='category'>Піца: " + db.categories[i].name + "</div>";
        catalogHtml += "<div class='productsContainer'>";
        for (let j = 0; j < db.products.length; j++) {
            if (db.products[j].categoryID === i) {
                let productHtml = "<div class='product'>" +
                    "<div class='productImageDiv'>" +
                    "<img class='productImage' src='" + db.products[j].image + "' alt>" +
                    "<div class='productWeight'>" + db.products[j].weight + " г</div>" +
                    "</div> " +
                    "<div class='productName'>" + db.products[j].name + "</div> " +
                    "<div class='productDesc'><b>Індгредієнти:</b><br>" + db.products[j].description + "</div> " +
                    "<div class='priceAndAddToCart'>" +
                    "<div class='productPrice'>" + db.products[j].price + " грн</div>" +
                    "<button class='addToCart'>В кошик</button>" +
                    "</div> " +
                    "</div>";
                catalogHtml += productHtml;
            }
        }
        catalogHtml += "</div>";
    }
    callback(catalogHtml);
}