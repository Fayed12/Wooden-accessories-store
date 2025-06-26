// ===============================================================================================

// functionalty of silder Content

let cards = document.querySelectorAll(".card");
let leftButton = document.querySelector(".lefticon");
let rightButton = document.querySelector(".righticon");
let spans = document.querySelectorAll(".dots span");
let shopNow = document.querySelectorAll(".SHOPNow");

shopNow.forEach((e) => {
    e.addEventListener("click", () => {
        document.querySelector(".purchase").scrollIntoView({ behavior: "smooth" });
    })
})

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
let swiperslideBox = document.querySelectorAll(".swiper-slide");

swiperslideBox.forEach((e) => {
    e.addEventListener("click", () => {
        document.querySelector(".purchase").scrollIntoView({ behavior: "smooth" });
    })
})

// fetch the json file to website
fetch("./main.json").then((x) => {
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
    let title = [];
    slidetilte.forEach((element, i) => {
        element.textContent = slidearray[i].title;
        title.push(element.textContent.toLowerCase());
    })
    
    document.querySelectorAll(".parent").forEach((e, index) => {
        const titleInParent = e.querySelector(".name");
        let rate = e.querySelectorAll(".rate");
        if (titleInParent && titleInParent.textContent.toLowerCase() === slidearray[index].title.toLowerCase()) {
            // Get the rating value 
            let rating = (slidearray[index].stars || 0);

            // Generate stars
            let stars = "";
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    stars += `<i class="fa-solid fa-star"></i>`;
                } else {
                    stars += `<i class="fa-regular fa-star"></i>`;
                }
            }
            rate.forEach((e) => {
                e.innerHTML = stars;
            })
        }
    });
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

import { headerFunctionalty, loadCartFromLocalStorage } from './js/shared.js'
headerFunctionalty();
loadCartFromLocalStorage();