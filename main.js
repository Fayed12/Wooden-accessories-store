// functionalty of barContent
let barContent = document.getElementById("barContent")
let spanOne = document.getElementById("spanOne")
let spanTwo = document.getElementById("spanTwo")
let spanThree = document.getElementById("spanThree")

barContent.addEventListener("click", () => {
    spanOne.classList.toggle("left");
    spanTwo.classList.toggle("hide");
    spanThree.classList.toggle("right");
})