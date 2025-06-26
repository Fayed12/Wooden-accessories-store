// functionalty of all header function like cart icon and nav bar

export function headerFunctionalty() {
    // functionalty of scroller

    let element = document.querySelector(".scroller")

    window.addEventListener("scroll", () => {
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        let scrolltop = document.documentElement.scrollTop
        element.style.width = `${(((scrolltop / height) * 100))}%`
    })
    // ===============================================================================================

    // functionalty of update date to current year

    let span = document.querySelectorAll("#yeardate");

    let date = new Date();
    let currentYear = date.getFullYear()

    span.forEach((e) => {
        e.textContent = currentYear;
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
        window.location.href = "../html/cart.html";
    })
}

// ===============================================================================================

// functionalty of online products categories

// fetch the products form json file and make it out of block of code
// this code i make to display all status in json file to manage it in categories buttons

let cardContainer = document.getElementById("cardContainer")
let products;

async function loadproducts() {
    let respons = await fetch("../main.json");
    let onlineProducts = await respons.json();
    products = onlineProducts;

    // display the first 8 products 
    onlineProducts.length = 8;
    onlineProducts.forEach((e) => {

        // create the box div 
        let box = document.createElement("div");
        box.className = "grid-item parent"

        // set the id to the all card box
        box.setAttribute("id-data", e.id)

        // set the status as class name
        if (e.status) {
            let statusValues = Object.values(e.status);
            statusValues.forEach((val) => {
                let className = val.toLowerCase().replace(/\s+/g, '-'); // "New Arrivals" => "new-arrivals"
                box.classList.add(className);
            });
        }

        // Get the rating value 
        let rating = (e.stars || 0);

        // Generate stars
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += `<i class="fa-solid fa-star"></i>`;
            } else {
                stars += `<i class="fa-regular fa-star"></i>`;
            }
        }

        // create the box content
        box.innerHTML = `<div class="slide-content">
                                    <div class="slide-header d-flex j-between align-center">
                                        <span class="d-block new">New</span>
                                        <div>
                                            <span class="price">$ ${e.price}</span>
                                            <span class="price"><del>$ ${e.mainprice}</del></span>
                                        </div>
                                    </div>
                                    <div class="image">
                                        <img src=".${e.image}" alt="images">
                                    </div>
                                    <div class="slide-footer">
                                        <div class="title f-center f-d-column">
                                            <p class="name">${e.title}</p>
                                            <div class="rate">
                                                ${stars}
                                            </div>
                                        </div>
                                        <div class="services d-flex">
                                            <div class="wishlist">
                                                <a href="#" title="wishlist">
                                                    <i class="fa-regular fa-heart faviocn" ></i>
                                                </a>
                                            </div>
                                            <div class="view">
                                                <i class="fa-solid fa-magnifying-glass-plus" id="overview" title="overview"></i>
                                            </div>
                                            <div class="compare">
                                                <i class="fa-solid fa-rotate" title="compare"></i>
                                            </div>
                                            <div class="add-cart">
                                                <a href="#" title="addcart">
                                                    <i class="fa-solid fa-cart-plus AddToCart"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                        </div>`

        // append box to main card container 
        cardContainer.append(box)
    })
}

// execute the loadproducts function first and then execute the categories button
async function data() {
    // merge the loadproducts function in data function
    await loadproducts();

    let cards = document.querySelectorAll(".grid-item")
    let statusValues = [];
    products.forEach((x) => {
        if (x.status) {
            let status = Object.values(x.status).map((val) =>
                val.toLowerCase().replace(/\s+/g, '-')
            );
            statusValues.push(status)
        }
    });

    // Flatten statusValues into one array
    let flattenedStatus = statusValues.flat();

    let categoriesSpan = document.querySelectorAll(".categories ul li span")
    // function to remove all active class from all elements before any process
    function removeAllActive() {
        let spanarray = [...categoriesSpan]
        for (let i = 0; i < spanarray.length; i++) {
            if (spanarray[i].classList.contains("active")) {
                spanarray[i].classList.remove("active")
            }
        }
    }

    // go through all categoriesSpan and handel it 
    categoriesSpan.forEach((e) => {

        // the button textcontent it will be id
        let buttonId = e.textContent.toLowerCase().replace(/\s+/g, "-");

        // load from localstorage
        let textFromlocalstorage = window.localStorage.getItem("activespan")
        if (e.textContent.toLowerCase().replace(/\s+/g, "-") == textFromlocalstorage) {
            removeAllActive();
            e.classList.add("active")
        }

        // add active to element when user press
        e.addEventListener("click", () => {
            removeAllActive();
            e.classList.add("active")
            window.localStorage.setItem("activespan", buttonId)

            if (flattenedStatus.includes(buttonId)) {
                cards.forEach((card) => {
                    if (card.classList.contains(buttonId)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        })

        // load from localstorage
        if (flattenedStatus.includes(textFromlocalstorage)) {
            cards.forEach((card) => {
                if (card.classList.contains(textFromlocalstorage)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });
}

// ===============================================================================================

// functionalty of cart section

// wait data function to execute and then run function of cart
async function cart() {
    await data()

    // add to cart icon 
    let addToCartIcon = document.querySelectorAll(".AddToCart");
    let NumberOfPieces = document.getElementById("NumberOfPieces");

    addToCartIcon.forEach((e) => {
        let clickCount = 0;

        e.addEventListener("click", function (event) {
            event.preventDefault();
            clickCount++;

            // the parent of Purchase and parent id

            let parentbox = e.closest(".parent");
            let parentId = +parentbox.getAttribute("id-data");

            if (clickCount === 1) {
                this.style.color = "#c87065"; // First click: change color
                let number = +NumberOfPieces.textContent;
                // NumberOfPieces.textContent = number + 1;

                if (localStorage.getItem(`item${parentId}`)) {
                    // Style the icon
                    NumberOfPieces.textContent;
                    // clickCount ++;
                } else {
                    NumberOfPieces.textContent = number + 1;

                }

                // set the id to local storage
                window.localStorage.setItem(`item${parentId}`, parentId)

                // set default amount to local storage
                if (window.localStorage.getItem(`amountOfProduct${parentId}`)) {
                    return true;
                } else {
                    window.localStorage.setItem(`amountOfProduct${parentId}`, 1)
                }

            } else if (clickCount === 2) {
                if (confirm("are you sure to delete")) {
                    this.style.color = "#666666";
                    let number = +NumberOfPieces.textContent;
                    NumberOfPieces.textContent = number - 1;

                    // reset the clickCount ; 
                    clickCount = 0;

                    // delete from localstorage
                    localStorage.removeItem(`item${parentId}`);

                    // remove amount from localstorage

                    window.localStorage.removeItem(`amountOfProduct${parentId}`)
                } else {
                    clickCount
                }
            }
        });
    })

    // faviocn functionalty
    let faviocns = document.querySelectorAll(".faviocn")

    faviocns.forEach((e) => {
        let clickCount = 0;

        let parentbox = e.closest(".parent");
        let parentId = +parentbox.getAttribute("id-data")

        e.addEventListener("click", (event) => {
            clickCount++;
            event.preventDefault();

            if (clickCount === 1) {
                e.classList.add("fa-solid")
                e.classList.add("color")

                // set localstorage
                window.localStorage.setItem(`favItem${parentId}`, parentId)

            } else if (clickCount === 2) {
                if (confirm("are you sure to delete from favorite")) {
                    e.classList.remove("fa-solid")
                    e.classList.remove("color")

                    // reset the counter
                    clickCount = 0;

                    // delete from localstorage
                    // set localstorage
                    window.localStorage.removeItem(`favItem${parentId}`)
                }
            }

        })
    })
}

export async function loadCartFromLocalStorage() {

    // first execute the functoin loadproducts from data function to display all products in page and execute the categories buttons
    // execute all the the code in top loadproducts first and button code finnaly
    await cart();

    // the localstorage content

    let addToCartIcon = document.querySelectorAll(".AddToCart");
    let faviocns = document.querySelectorAll(".faviocn")
    let NumberOfPieces = document.getElementById("NumberOfPieces");

    let count = 0;

    // add to cart icon localstorage
    addToCartIcon.forEach((icon) => {
        let parentbox = icon.closest(".parent");
        let parentId = +parentbox.getAttribute("id-data");

        // Check if item exists in localStorage

        if (localStorage.getItem(`item${parentId}`)) {
            // Style the icon
            icon.classList.toggle("color");
            count++;
        }
    });

    // Set total number of items
    NumberOfPieces.textContent = count;

    // favicon localstorage
    faviocns.forEach((e) => {
        let parentbox = e.closest(".parent");
        let parentId = +parentbox.getAttribute("id-data");

        // On page load: style icons that are already favorites
        if (localStorage.getItem(`favItem${parentId}`)) {
            e.classList.add("fa-solid");
            e.classList.add("color");
        }
    });

    // functionalty of overview button

    let overview = document.querySelectorAll("#overview");
    let floatingbox = document.querySelector(".floating-box");
    let overlaylayer = document.querySelector(".overlay-layer")

    overview.forEach((e) => {
        e.addEventListener("click", () => {
            e.style.color = "#c87065"
            floatingbox.style.opacity = "1";
            floatingbox.style.zIndex = "2000";
            floatingbox.style.top = "150px";
            overlaylayer.classList.add("overlay");
            document.body.classList.add("no-scroll");
            // functionalty of overview box

            // get json products
            let JsonProducts = products;

            // get the id of the product i select

            let parentBox = e.closest(".grid-item");
            let clickedId = +parentBox.getAttribute("id-data");

            JsonProducts.forEach((product) => {
                if (product.id === clickedId) {
                    document.getElementById("overviewImage").setAttribute("src", `../${product.image}`);
                    document.getElementById("overviewtitle").textContent = product.title;
                    document.getElementById("overviewdiscountPrice").textContent = "$ " + product.price;
                    document.getElementById("overviewoldPrice").textContent = "$ " + product.mainprice;
                    document.getElementById("overviewdesc").textContent = product.description;

                    // overviewAddCart button
                    let overviewAddCart = document.getElementById("overviewAddCart");

                    let overviewclickCount = 0;
                    overviewAddCart.addEventListener("click", () => {
                        overviewclickCount++;

                        let amount = document.getElementById("amount").value;

                        if (overviewclickCount === 1) {
                            // add amount value to localsotrage to use in cart page
                            window.localStorage.setItem(`amountOfProduct${product.id}`, amount)

                            // add product to cart

                            let addToCartIcon = document.querySelectorAll(".AddToCart");
                            let NumberOfPieces = document.getElementById("NumberOfPieces");

                            addToCartIcon.forEach((e) => {
                                let clickCount = 0;

                                clickCount++;

                                // the parent of Purchase and parent id

                                let parentbox = e.closest(".parent");
                                let parentId = +parentbox.getAttribute("id-data");
                                if (parentId == product.id) {
                                    e.style.color = "#c87065";
                                    let number = +NumberOfPieces.textContent;
                                    // NumberOfPieces.textContent = number + 1;

                                    if (localStorage.getItem(`item${parentId}`)) {
                                        // Style the icon
                                        NumberOfPieces.textContent;
                                    } else {
                                        NumberOfPieces.textContent = number + 1;
                                    }

                                    // set the id to local storage
                                    window.localStorage.setItem(`item${parentId}`, parentId)
                                }
                            })
                        } else if (overviewclickCount === 2) {
                            alert("the item just added to cart!")
                            overviewclickCount == 0
                        }
                    })
                }
            });
        })

    })

    // cancel button to remove overview
    let cancelButton = document.getElementById("cancel");

    cancelButton.addEventListener("click", () => {
        floatingbox.style.opacity = "0";
        floatingbox.style.zIndex = "-10";
        floatingbox.style.top = "-100%";
        overlaylayer.classList.remove("overlay");
        document.body.classList.remove("no-scroll");
        overview.forEach((e) => {
            e.style.color = "#666666";
        })
    })
}