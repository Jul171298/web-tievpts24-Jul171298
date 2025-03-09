let firstCard = null, secondCard = null, lockBoard = false;

function handleBoxClick(event) {
    if (lockBoard) return;
    const box = event.target.closest(".box");
    if (box.classList.contains("revealed")) return;

    box.querySelector("img").style.visibility = "visible";
    box.classList.add("revealed");

    if (!firstCard) {
        firstCard = box;
    } else {
        secondCard = box;
        lockBoard = true;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        setTimeout(() => {
            firstCard.style.opacity = "0";
            secondCard.style.opacity = "0";
            firstCard.style.pointerEvents = "none";
            secondCard.style.pointerEvents = "none";
            resetCards();
            checkGameEnd();
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.querySelector("img").style.visibility = "hidden";
            secondCard.querySelector("img").style.visibility = "hidden";
            firstCard.classList.remove("revealed");
            secondCard.classList.remove("revealed");
            resetCards();
        }, 500);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkGameEnd() {
    if (document.querySelectorAll(".box").length === document.querySelectorAll(".box[style*='opacity: 0']").length) {
        document.getElementById("message").innerText = "The End!";
    }
}

function generateImages() {
    const images = [
        "./images/img1.jpg", "./images/img2.jpg", "./images/img3.jpg", "./images/img4.jpg", 
        "./images/img5.jpg", "./images/img6.jpg", "./images/img7.jpg", "./images/img8.jpg"
    ];
    return [...images, ...images].sort(() => Math.random() - 0.5);
}

function initializeGame() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    const images = generateImages();
    images.forEach((image, index) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.dataset.image = image;
        box.onclick = handleBoxClick;
        
        const img = document.createElement("img");
        img.src = image;
        img.style.visibility = "hidden";
        
        box.appendChild(img);
        grid.appendChild(box);
    });
}

function resetGame() {
    document.getElementById("message").innerText = "";
    initializeGame();
}

document.addEventListener("DOMContentLoaded", initializeGame);