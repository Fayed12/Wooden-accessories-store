import { headerFunctionalty } from './shared.js'
headerFunctionalty();

// functionalty of cartIicon
let cartIicon = document.getElementById("cartIicon");

cartIicon.addEventListener("click", () => {
    window.location.href = "../index.html";
})