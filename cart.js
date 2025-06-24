// functionalty of scroller

let element = document.querySelector(".scroller")

window.addEventListener("scroll", () => {
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scrolltop = document.documentElement.scrollTop
    element.style.width = `${(((scrolltop / height) * 100))}%`
})
// ===============================================================================================

// functionalty of to top button

let button = document.querySelector(".to-top-button");

window.addEventListener("scroll", () => {
    if (window.scrollY >= 100) {
        button.style.opacity = 1;
    } else {
        button.style.opacity = 0;
    }
});

button.addEventListener("click", () => {
    document.querySelector(".home").scrollIntoView({ behavior: "smooth" });
});
// ===============================================================================================

// functionalty of bar Content

let barContent = document.getElementById("barContent")
let spanOne = document.getElementById("spanOne")
let spanTwo = document.getElementById("spanTwo")
let spanThree = document.getElementById("spanThree")
let menu = document.getElementById("menu");
let overlaylayer = document.querySelector(".overlay-layer")

barContent.addEventListener("click", () => {
    spanOne.classList.toggle("left");
    spanTwo.classList.toggle("hide");
    spanThree.classList.toggle("right");
    menu.classList.toggle("display");
    overlaylayer.classList.toggle("overlay");
})

document.addEventListener("click", (e) => {
    if (menu.classList.contains("display")) {
        // Check if click is outside the navbar and button
        if (!barContent.contains(e.target) && (!menu.contains(e.target))) {
            menu.classList.toggle("display");
            spanOne.classList.toggle("left");
            spanTwo.classList.toggle("hide");
            spanThree.classList.toggle("right");
            overlaylayer.classList.remove("overlay")
        }
    };
})

window.onscroll = (e) => {
    if (menu.classList.contains("display")) {
        // Check if click is outside the navbar and button
        if (!barContent.contains(e.target) && (!menu.contains(e.target))) {
            menu.classList.toggle("display")
            spanOne.classList.toggle("left");
            spanTwo.classList.toggle("hide");
            spanThree.classList.toggle("right");
            overlaylayer.classList.remove("overlay")
        }
    };
}
// ===============================================================================================

// functionalty of cartIicon
let cartIicon = document.getElementById("cartIicon");

cartIicon.addEventListener("click", () => {
    window.location.href = "../index.html";
})
// ===============================================================================================

// functionalty of cart

// get data from json file
let products;

async function productsFromJson() {
    let respons = await fetch(".././main.json");
    let onlineProducts = await respons.json();
    products = onlineProducts

    // load products id from localstorage 
    // let amount = [];
    onlineProducts.forEach(e => {
        let productId = e.id;
        
        if (window.localStorage.getItem(`item${productId}`) && window.localStorage.getItem(`amountOfProduct${productId}`) ){
            
            // select the box of product added to cart
            let boxTable = document.getElementById("tableBody");

            // amount when add to cart
            let amount = (window.localStorage.getItem(`amountOfProduct${productId}`));

            let total = amount * (e.price)

            // the tr html structur

            let row = document.createElement("tr");
            row.innerHTML = `<td id="product">
                                    <div class="product-content d-flex g-20 align-center">
                                        <div class="image">
                                            <img src=".${e.image}" alt="product">
                                        </div>
                                        <div class="product-content-dec f-center f-d-column">
                                            <h3 id="tableProductTitle">${e.title}</h3>
                                            <span class="d-block">Color : Black</span>
                                            <span class="d-block">Size : SL</span>
                                        </div>
                                    </div>
                                </td>
                                <td id="Price">
                                    <div class="f-center">
                                        <span id="MainPrice">$ ${e.price}</span>
                                    </div>
                                </td>
                                <td id="quantity">
                                    <div class="f-center">
                                        <button type="button" title="minus" class="minus">
                                            <i class="fa-solid fa-minus"></i>
                                        </button>
                                        <span class="quantityAmount">${amount}</span>
                                        <button type="button" title="minus" class="plus">
                                            <i class="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </td>
                                <td id="Total">
                                    <div class="f-center">
                                        <span id="TotalPrice">$ ${total}</span>
                                    </div>
                                </td>
                                <td id="Remove">
                                    <div class="f-center">
                                        <button type="button" title="remove" class="remove">
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                </td>`
            
            boxTable.appendChild(row)

            // blus and minus button
            const plusBtn = row.querySelector(".plus");
            let minusBtn = row.querySelector(".minus")
            const quantitySpan = row.querySelector(".quantityAmount");
            const priceSpan = row.querySelector("#MainPrice");
            const totalSpan = row.querySelector("#TotalPrice");

            let quantity = parseInt(quantitySpan.textContent);
            let price = parseFloat(priceSpan.textContent.replace("$", ""));

            plusBtn.addEventListener("click", () => {
                quantity++;
                quantitySpan.textContent = quantity;
                totalSpan.textContent = `$ ${quantity * price}`;

                // let productTitle = row.querySelector("#tableProductTitle").textContent;
                // let product = products.find(p => p.title === productTitle);
                // if (product) {
                    localStorage.setItem(`amountOfProduct${productId}`, quantity);
                // }
            });
            minusBtn.addEventListener("click", () => {
                quantity--;
                quantitySpan.textContent = quantity;
                if (quantity >=0) {
                    totalSpan.textContent = `$ ${quantity * price}`;

                    // let productTitle = row.querySelector("#tableProductTitle").textContent;
                    // let product = products.find(p => p.title === productTitle);
                    // if (product) {
                        localStorage.setItem(`amountOfProduct${product.id}`, quantity);
                    // }
                } else {
                    alert("You cannot select a quantity less than specified.");
                    quantity = 0;
                    quantitySpan.textContent = quantity;
                }
            })

            // remove button 
            let removeBtn = row.querySelector(".remove")
            removeBtn.addEventListener("click", () => {
                if (confirm("are you sure you want to delete this item !!")) {
                    row.remove();
                    window.localStorage.removeItem(`item${productId}`);
                    window.localStorage.removeItem(`amountOfProduct${productId}`)
                }
            })
        }
    });
}

productsFromJson();