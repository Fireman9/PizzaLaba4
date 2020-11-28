import {content} from "./router.js";


let discountHtml;

export function setDiscountPage(discount) {
    discountHtml = "";
    createDiscount(discount, function (discountHtml) {
        content.innerHTML = discountHtml;
    })
}

export function createDiscount(discount, callback) {
    discountHtml += `<div class='discountImageAndDescription'>
        <img class='discountImage' src='${discount.image}' alt>
        <div class='discountFullNameAndDesc'>
        <div class="discountFullName">${discount.name}</div>
        <div class="discountFullDesc">${discount.description}</div>
        </div>
        </div>`;
    callback(discountHtml);
}