// functionalty of scroller

let element = document.querySelector(".scroller")
// let height = document.documentElement.scrollHeight

window.addEventListener("scroll", () => {
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scrolltop = document.documentElement.scrollTop
    element.style.width = `${(((scrolltop / height) * 100) )}%`
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

barContent.addEventListener("click", () => {
    spanOne.classList.toggle("left");
    spanTwo.classList.toggle("hide");
    spanThree.classList.toggle("right");
    menu.classList.toggle("display")
})

document.addEventListener("click", (e) => {
    if (menu.classList.contains("display")) {
        // Check if click is outside the navbar and button
        if (!barContent.contains(e.target) && (!menu.contains(e.target))) {
            menu.classList.toggle("display")
            spanOne.classList.toggle("left");
            spanTwo.classList.toggle("hide");
            spanThree.classList.toggle("right");
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
        }
    };
}
// ===============================================================================================

// functionalty of silder Content

let cards = document.querySelectorAll(".card");
let leftButton = document.querySelector(".lefticon");
let rightButton = document.querySelector(".righticon");
let spans = document.querySelectorAll(".dots span");

function leftbutton() {
    // Find the current active card and remove active
    let currentIndex = Array.from(cards).findIndex(card => card.classList.contains("active-slide"));
    cards[currentIndex].classList.remove("active-slide");
    spans[currentIndex].classList.remove("active")
    // Calculate next index and add active
    let prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    cards[prevIndex].classList.add("active-slide");
    spans[prevIndex].classList.add("active")
}

function rightbutton() {
    // Find the current active card and remove active
    let currentIndex = Array.from(cards).findIndex(card => card.classList.contains("active-slide"));
    cards[currentIndex].classList.remove("active-slide");
    spans[currentIndex].classList.remove("active")
    // Calculate next index and add active
    let nextIndex = (currentIndex + 1) % cards.length;
    cards[nextIndex].classList.add("active-slide");
    spans[nextIndex].classList.add("active")
} 
// handle the rightButton
rightButton.addEventListener("click", () => {
    rightbutton();
});

// handle the leftButton
leftButton.addEventListener("click", () => {
    leftbutton();
});

// add time to slider to make it daynamic
window.setInterval(() => {
    rightbutton();
}, 5000)

// ===============================================================================================

// functionalty of swiper

var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-custom-next",
        prevEl: ".swiper-button-custom-prev",
    },
    loop: true,
    spaceBetween: 20,
    slidesPerView: 4,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    // Responsive design
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        },
        1024: {
            slidesPerView: 4 
        }
    }
});

var swiper = new Swiper(".mySwiperTwo", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    loop: true,
});

// ===============================================================================================

// functionalty of JSON file

let swiperSlides = document.querySelectorAll(".swiper-slide .slide-content .image img")
let slideprice = document.querySelectorAll(".swiper-slide .slide-content .slide-header .price")
let slidetilte = document.querySelectorAll(".swiper-slide .slide-content .slide-footer .title .name")

// fetch the json file to website
fetch("main.json").then((x) => {
    let y = x.json()
    return y;
}).then((y) => {

    // selcet the only first 5 products
    y.length = 5;
    let slidearray = [...y]

    // add image src to product slide
    swiperSlides.forEach((element, i) => {
        element.setAttribute("src", slidearray[i].image)
    })

    // add price to product slide
    slideprice.forEach((element, i) => {
        element.textContent = "$ " + slidearray[i].price
    })

    // add price to product slide
    slidetilte.forEach((element, i) => {
        element.textContent = slidearray[i].title;
    })
})


// ===============================================================================================

// functionalty of date in Indoor Furniture

let days = document.getElementById("days")
let hour = document.getElementById("hour")
let min = document.getElementById("min")
let second = document.getElementById("second")

let timeover = setInterval(() => {
    let s = Number(second.textContent);
    let m = Number(min.textContent);
    let h = Number(hour.textContent);
    let d = Number(days.textContent);
    if (d === 0 && h === 0 && m === 0 && s === 0) {
        clearInterval(timeover);
        return;
    }
    
    if (s> 0 ) {
        s--;
    } else {
        s = 59;
        
        if (m > 0) {
            m--;

        } else {
            m = 59;
            
            if (h> 0) {
                h--;

            } else {
                h = 23;
                
                if (d> 0) {
                    d--;

                } else if(d == 0){
                    second.textContent = 59;
                    min.textContent = 59;
                    hour.textContent = 23;

                } else if(d< 0 ){
                    clearInterval(timeover);
                }
            }
        }
    }

    // Update DOM
    second.textContent = s;
    min.textContent = m;
    hour.textContent = h;
    days.textContent = d;

    // Update localStorage

    localStorage.setItem("second", s);
    localStorage.setItem("min", m);
    localStorage.setItem("hour", h);
    localStorage.setItem("days", d);
}, 1000)

// Load from localStorage or set defaults

let d = localStorage.getItem("days");
let h = localStorage.getItem("hour");
let m = localStorage.getItem("min");
let s = localStorage.getItem("second");

// Check if any value is null or undefined, and set default if so
if (d === null || h === null || m === null || s === null) {
    d = 10;
    h = 23;
    m = 59;
    s = 59;
} else {
    d = Number(d);
    h = Number(h);
    m = Number(m);
    s = Number(s);
}

// Update the DOM
days.textContent = d;
hour.textContent = h;
min.textContent = m;
second.textContent = s;

// ===============================================================================================

// functionalty of online products categories

// fetch the products form json file and make it out of block of code
// this code i make to display all status in json file to manage it in categories buttons

let cardContainer = document.getElementById("cardContainer")
let products;

async function loadproducts() {
    let respons = await fetch("main.json");
    let onlineProducts = await respons.json();
    products = onlineProducts;

    // display the first 8 products 
    onlineProducts.length = 8;
    onlineProducts.forEach((e) => {

        // create the box div 
        let box = document.createElement("div");
        box.className = "grid-item"
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
                                        <img src="${e.image}" alt="images">
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
                                                    <i class="fa-regular fa-heart"></i>
                                                </a>
                                            </div>
                                            <div class="view">
                                                <i class="fa-solid fa-magnifying-glass-plus" title="overview"></i>
                                            </div>
                                            <div class="compare">
                                                <i class="fa-solid fa-rotate" title="compare"></i>
                                            </div>
                                            <div class="add-cart">
                                                <a href="#" title="addcart">
                                                    <i class="fa-solid fa-cart-plus"></i>
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

// execute the functoin loadproducts to display all products in page and execute the categories buttons
// execute all the the code in top loadproducts first and button code finnaly
data()

// ===============================================================================================

// functionalty of 