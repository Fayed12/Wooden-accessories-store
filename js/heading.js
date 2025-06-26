import { headerFunctionalty } from './shared.js'
headerFunctionalty();

// functionalty of cartIicon
let cartIicon = document.getElementById("cartIicon");

cartIicon.addEventListener("click", () => {
    window.location.href = "../index.html";
})

// =======================================================================================

// functionalty of validation contact

let sendBtn = document.getElementById("submitBtn");
let Acceptmessage = document.querySelector(".Acceptmessage")
let overlaylayer = document.querySelector(".overlay-layer")

sendBtn.addEventListener("click", (event) => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let sub = document.getElementById("sub").value;
    let message = document.getElementById("message").value;

    event.preventDefault();
    if (name =="" || email == "" || sub == "" || message == "") {
        alert("please fill in the data !");
    } else {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;

        if (emailRegex.test(email)) {
            let nameArray = name.split(" ");
            let Finalname = nameArray[0].slice(0, 1).toUpperCase() + nameArray[0].slice(1).toLowerCase();

            Acceptmessage.style.top = "50%";
            overlaylayer.classList.toggle("overlay");

            let messageName = document.getElementById("messageName");
            messageName.textContent = Finalname

            // reset the input
            document.getElementById("name").value = ""
            document.getElementById("email").value = ""
            document.getElementById("sub").value = ""
            document.getElementById("message").value = ""

        } else {
            alert("Invalid email format !")
        }
    }
})
window.onscroll = (e) => {
    if (!Acceptmessage.contains(e.target)) {
        overlaylayer.classList.remove("overlay")
        Acceptmessage.style.top = "-100%";
    }
}
document.addEventListener("click", (e) => {
    if (!(Acceptmessage.contains(e.target)) && !(sendBtn.contains(e.target))) {
        overlaylayer.classList.remove("overlay")
        Acceptmessage.style.top = "-100%";
        }
})
// =================================================================================================

// done thw project *