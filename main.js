// functionalty of scroller

let element = document.querySelector(".scroller")
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight

window.addEventListener("scroll", () => {
    let scrolltop = document.documentElement.scrollTop
    element.style.height = `${(scrolltop / height) * 100}%`
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
        delay: 3000,
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
        delay: 3000,
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
