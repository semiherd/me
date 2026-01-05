import { createDOMElement } from "../../util/createDOMElm.js";
import { createFooter } from "../../component/footer.js";
import { createHeader } from "../../component/header.js";

const app= document.querySelector("#app");
createHeader('app');
createFooter('app');