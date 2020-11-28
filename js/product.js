import {content} from "./router.js";


let productHtml;

export function setProductPage(product) {
    productHtml = "";
    createProduct(product, function (productHtml) {
        content.innerHTML = productHtml;
    })
}

export function createProduct(product, callback) {
    let ingredientsHtml = `<ul class='ulIngredients'><b>Інгредієнти:</b>`;
    let ingredients = product.description.split(",");
    for (let i = 0; i < ingredients.length; i++) {
        ingredientsHtml += `<li class='liIngredients'>${ingredients[i]}</li>`;
    }
    productHtml += `<div class='productImageAndDescription'>
        <img class='productImage' src='${product.image}' alt>
        <div class='productFullDesc'>
        <div class='productFullName'> ${product.name}</div>
        ${ingredientsHtml}</ul>
        <div class='productFullPriceAndAddToCart'>
        <div class='productFullPrice'>${product.price} грн</div>
        <button class='addToCart' value="${product.url}">В Кошик</button>
        </div>
        </div>
        </div>`;
    callback(productHtml);
}