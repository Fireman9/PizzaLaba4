import {content} from "./router.js";

let mainHtml = "<div>Catalog Page</div>";

export function setCatalogPage() {
    content.innerHTML = mainHtml;
}