import {content} from "./router.js";


let categoryHtml;

export function setCategoryPage(db, index) {
    categoryHtml = "";
    createCategory(db, index, function (categoryHtml) {
        content.innerHTML = categoryHtml;
    })
}

export function createCategory(db, index, callback) {
    categoryHtml += `<div class='category'>Піца: ${db.categories[index].name}</div>`;
    categoryHtml += "<div class='productsContainer'>";
    for (let i = 0; i < db.products.length; i++) {
        if (db.products[i].categoryID === index) {
            let productHtml = `<div class='product'>
                <div class='productImageDiv'>
                <img class='productImage' src='${db.products[i].image}' alt>
                <div class='productWeight'>${db.products[i].weight} г</div>
                </div>
                <a href='#product/${db.products[i].url}'><div class='productName'>${db.products[i].name}</div></a>
                <div class='productDesc'><b>Індгредієнти:</b><br>${db.products[i].description}</div>
                <div class='priceAndAddToCart'>
                <div class='productPrice'>${db.products[i].price} грн</div>
                <button class='addToCart' value="${db.products[i].url}">В кошик</button>
                </div>
                </div>`;
            categoryHtml += productHtml;
        }
    }
    categoryHtml += "</div>";
    callback(categoryHtml);
}