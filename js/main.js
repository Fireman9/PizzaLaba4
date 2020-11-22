import {content} from "./router.js";

let discBlockHtml = "<div class='list'>" +
    "<div class='listItems'>" +
    "<img src='https://media.dominos.ua/slider/slide_image/2020/09/23/-20_slider_ukr.jpg' alt class='listImg'>" +
    "<div class='listText'></div>" +
    "</div>" +
    "<div class='listItems'>" +
    "<img src='https://media.dominos.ua/slider/slide_image/2020/11/13/weekend-pizza_slider_ukr.jpg' alt class='listImg' '>" +
    "<div class='listText'><br></div>" +
    "</div>" +
    "<div class='listItems'>" +
    "<img src='https://media.dominos.ua/slider/slide_image/2020/09/11/woweekend_slider_ukr.jpg' alt class='listImg' '>" +
    "<div class='listText'><br></div>" +
    "</div>" +
    "<div class='listItems'>" +
    "<img src='https://media.dominos.ua/slider/slide_image/2019/06/20/-30_1920x736-min.JPG' alt class='listImg' '>" +
    "<div class='listText'>Знижка з 24.00 до 7.00<br>-15%</div>" +
    "</div>" +
    "</div>" +
    "<div class='scroller'>" +
    "<ul class='scrollerButtons'>" +
    "<li><button class='scrollerBut selectedScrollerBut'>0</button></li>" +
    "<li><button class='scrollerBut'>1</button></li>" +
    "<li><button class='scrollerBut'>2</button></li>" +
    "<li><button class='scrollerBut'>3</button></li>" +
    "</ul>" +
    "</div>";


export function setMainPage() {
    content.addEventListener("click", toggleDone);
    content.innerHTML = discBlockHtml;
    setInterval(timeAnim, 5000);
    createProducts(function (recommendedHtml) {
        content.innerHTML += recommendedHtml;
    })
}

function toggleDone(event) {
    if (!event.target.classList.contains("scrollerBut")) return;
    changeSelectedScrollerBut(event.target);
}

function changeSelectedScrollerBut(clicked) {
    let selected = document.querySelectorAll('.scrollerBut');
    for (let elem of selected) {
        elem.classList.remove("selectedScrollerBut");
    }
    clicked.classList.add("selectedScrollerBut")
    let list = document.querySelectorAll('.list')[0];
    list.style.transform = "translateX(" + (parseInt(clicked.innerText) * -25) + "%)"
}

function timeAnim() {
    let selected = document.querySelectorAll('.scrollerBut');
    for (let elem of selected) {
        if (elem.classList.contains("selectedScrollerBut")) {
            if (elem.innerText === "3") {
                selected[0].click();
                break;
            } else {
                selected[parseInt(elem.innerText) + 1].click();
                break;
            }
        }
    }
}

async function createProducts(callback) {
    let recommendedHtml = "<div class='productsContainer'>";
    let response = await fetch('https://my-json-server.typicode.com/Fireman9/PizzaLaba4/products');
    let products;
    if (response.ok) {
        products = await response.json();
    } else {
        console.log("Error fetch");
        return;
    }
    for (let i = 0; i < products.length; i++) {
        if (products[i].recommended) {
            let productHtml = "<div class='product'>" +
                "<div class='productName'>" + products[i].name + "</div> " +
                "<div class='productImageDiv'><img class='productImage' src='" + products[i].image + "' alt></div> " +
                "<div class='productDesc'>" + products[i].description + "</div> " +
                "<div class='productPrice'>" + products[i].price + "грн</div> " +
                "<div class='productWeight'>" + products[i].weight + "</div> " +
                "</div>";
            recommendedHtml += productHtml;
        }
    }
    recommendedHtml += "</div>"
    callback(recommendedHtml);
}