import {setMainPage} from "./main.js"
import {setCatalogPage} from "./catalog.js";

export const content = document.getElementById("content");

function router() {
    let hash = window.location.hash;
    let href = window.location.href.replace(window.location.hash, '');
    if (hash === "") {
        setMainPage()
    } else if (hash === "#catalog") {
        setCatalogPage();
        window.location.href = href + "#catalog";
    }
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);