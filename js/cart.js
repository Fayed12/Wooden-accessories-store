// functionalty of header like cart icon and nav bar

import { headerFunctionalty} from './shared.js'
headerFunctionalty();

// ===============================================================================================

// functionalty of cart

// get data from json file
let products;

async function productsFromJson() {
    let respons = await fetch(".././main.json");
    let onlineProducts = await respons.json();
    products = onlineProducts

    
    // edit the NumberOfPieces
    let NumberOfPieces = document.getElementById("NumberOfPieces");
    
    // load products id from localstorage 
    // let count = 0;
    onlineProducts.forEach(e => {

        
        let productId = e.id;

        
        if (window.localStorage.getItem(`item${productId}`) && window.localStorage.getItem(`amountOfProduct${productId}`)) {
            // count++;
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
                localStorage.setItem(`amountOfProduct${productId}`, quantity);
            });
            minusBtn.addEventListener("click", () => {
                quantity--;
                quantitySpan.textContent = quantity;
                if (quantity >= 1) {
                    totalSpan.textContent = `$ ${quantity * price}`;
                    localStorage.setItem(`amountOfProduct${productId}`, quantity);
                } else {
                    alert("You cannot select a quantity less than specified.");
                    quantity = 1;
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
                    // --count;
                    let remainingRows = boxTable.querySelectorAll("tr").length;
                    NumberOfPieces.textContent = remainingRows;
                }
            })
            let remainingRows = boxTable.querySelectorAll("tr").length;
            NumberOfPieces.textContent = remainingRows;
            // NumberOfPieces.textContent = count;
        }
    });
}

// functionalty of check out




async function invoiceCart() {
    await productsFromJson();

    let checkBtn = document.getElementById("checkBtn");

    checkBtn.addEventListener("click", (event) => {
        event.preventDefault();
        let username = document.getElementById("username").value;
        let address = document.getElementById("address").value.trim();
        let number = document.getElementById("number").value.trim();

        if (username == "" || address == "" || number == "") {
            alert("Please fill in the data !");
        } else {
            let dataObject = {
                address: address,
            };
            // hundel the name before send it

            let usernameAfterEdit = username.trim().split(" ");
            if (usernameAfterEdit.length < 2) {
                alert("please enter a correct name !")
            } else {
                let usernameArray = [];
                let FinalName;
                for (let i = 0; i < usernameAfterEdit.length; i++) {
                    usernameArray.push(usernameAfterEdit[i].slice(0, 1).toUpperCase() + usernameAfterEdit[i].slice(1));
                }
                FinalName = usernameArray[0] + " " + usernameArray[usernameArray.length - 1]
                dataObject.name = FinalName;
            }

            // handel the number

            function isValidEgyptianNumber(number) {
                const egyptPhoneRegex = /^(?:\+20|0020|0)?1[0125]\d{8}$/;
                return egyptPhoneRegex.test(number);
            }
            if (isValidEgyptianNumber(number)) {
                dataObject.number = number;
            } else {
                alert("please enter a correct phone number !")
            }
            if (Object.keys(dataObject).length == 3) {
                localStorage.setItem("UserData", JSON.stringify(dataObject))
                document.getElementById("username").value = "";
                document.getElementById("address").value = "";
                document.getElementById("number").value = "";

                // invoice functionalty

                if (window.localStorage.getItem("UserData")) {
                    let invoicebox = document.querySelector(".invoice-box");

                    invoicebox.style.top = "50%"
                    document.querySelector(".overlay-layer").classList.add("overlay")


                    let closeinvice = document.getElementById("closeinvice");
                    closeinvice.addEventListener("click", () => {
                        invoicebox.style.top = "-100%"
                        document.querySelector(".overlay-layer").classList.remove("overlay")
                    })

                    // get data 
                    let data = JSON.parse(window.localStorage.getItem("UserData"))

                    // user-detail 
                    let name = document.getElementById("userName");
                    let address = document.getElementById("userAddress");
                    let number = document.getElementById("userNumber");

                    name.textContent = data.name;
                    address.textContent = data.address;
                    number.textContent = data.number;

                    // invoice - detail
                    let today = new Date();
                    let fullDate = today.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });

                    document.getElementById("invoiceDate").textContent = fullDate;

                    let futureDate = new Date();
                    futureDate.setDate(today.getDate() + 5);

                    let formatted = futureDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });

                    document.getElementById("invoicepay").textContent = formatted;

                    // functionalty of products invoice

                    let totalPriceArray = [];
                    products.forEach((e) => {
                        let productId = e.id;
                        if (e.id == window.localStorage.getItem(`item${productId}`)) {

                            let amount = window.localStorage.getItem(`amountOfProduct${productId}`);
                            let totalprice = (e.price) * amount;
                            totalPriceArray.push(totalprice);

                            let redusePrice = totalPriceArray.reduce((accumulator, currentValue) => {
                                return accumulator + currentValue;
                            })

                            let finaltotalprice = redusePrice;

                            let bodyOfInvoiceProducts = document.getElementById("bodyOfInvoiceProducts");

                            let rowInBody = document.createElement("tr");
                            rowInBody.innerHTML = `<td>${e.title}</td>
                                <td>${amount}</td>
                                <td>$${e.price}</td>
                                <td>$${totalprice}</td>`
                            bodyOfInvoiceProducts.append(rowInBody)

                            // set the footer of the invoice

                            document.getElementById("totalPrice").textContent = "$" + finaltotalprice;
                            let tax = finaltotalprice * 0.05;
                            document.getElementById("Tax").textContent = "$" + tax

                            let finaltotal = finaltotalprice - tax
                            document.getElementById("totalAfterTax").textContent = "$" + finaltotal
                        }
                    })
                }
            }
        };
    })
}


// excute all cart code
// first await productsFromJson
// then excute the checkout code
invoiceCart()