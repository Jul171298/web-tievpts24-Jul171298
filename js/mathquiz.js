// mathquiz.js
let num1, num2, correctAnswer, operation, score = 0, questionCount = 0;
const operators = ['+', '-', '*'];
const totalQuestions = 5;
let timerInterval;

document.addEventListener("DOMContentLoaded", function() {
    generateQuestion();
});

function generateQuestion() {
    if (questionCount >= totalQuestions) {
        document.querySelector(".container").innerHTML = `
            <h2>Game Over!</h2>
            <p>Your score is ${score}/${totalQuestions}</p>
            <input type="text" id="player-name" placeholder="Enter your name" style="width: 80%; padding: 10px; font-size: 18px; margin: 10px 0;">
            <button id="save-score" onclick="saveScore()">Save Score</button>
            <div id="leaderboard" style="display: none;"></div>
        `;
        return;
    }
    
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    operation = operators[Math.floor(Math.random() * operators.length)];
    
    switch (operation) {
        case '+': correctAnswer = num1 + num2; break;
        case '-': correctAnswer = num1 - num2; break;
        case '*': correctAnswer = num1 * num2; break;
    }
    
    document.getElementById("question").innerText = `How much is ${num1} ${operation} ${num2}?`;
    generateOptions();
    questionCount++;
    ensureNextQuestionButton();
}

function generateOptions() {
    let options = [correctAnswer];
    while (options.length < 3) {
        let wrongAnswer = correctAnswer + Math.floor(Math.random() * 10 - 5);
        if (!options.includes(wrongAnswer) && wrongAnswer >= 0) {
            options.push(wrongAnswer);
        }
    }
    options.sort(() => Math.random() - 0.5);
    
    document.getElementById("options").innerHTML = options.map(option => 
        `<button onclick="checkAnswer(${option})">${option}</button>`
    ).join(" ");
}

function checkAnswer(userAnswer) {
    if (timerInterval) clearInterval(timerInterval);
    let feedback = document.getElementById("feedback");
    if (userAnswer === correctAnswer) {
        feedback.innerText = "Correct!";
        feedback.className = "correct";
        score++;
    } else {
        feedback.innerText = "Wrong!";
        feedback.className = "wrong";
    }
    document.getElementById("score").innerText = `Score: ${score}`;
    let nextQuestionBtn = document.getElementById("next-question");
    nextQuestionBtn.style.display = "block";
    nextQuestionBtn.disabled = true;
    startTimer();
}

function ensureNextQuestionButton() {
    let nextQuestionBtn = document.getElementById("next-question");
    if (!nextQuestionBtn) {
        nextQuestionBtn = document.createElement("button");
        nextQuestionBtn.id = "next-question";
        nextQuestionBtn.style.display = "none";
        nextQuestionBtn.innerText = "Next Question";
        document.querySelector(".container").appendChild(nextQuestionBtn);
    }
}

function startTimer() {
    clearInterval(timerInterval);
    let timeLeft = 3;
    let nextQuestionBtn = document.getElementById("next-question");
    nextQuestionBtn.innerText = `Next question in ${timeLeft}s...`;
    nextQuestionBtn.style.display = "block";
    timerInterval = setInterval(() => {
        timeLeft--;
        nextQuestionBtn.innerText = `Next question in ${timeLeft}s...`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestionBtn.style.display = "none";
            generateQuestion();
        }
    }, 1000);
}

function saveScore() {
    let playerName = document.getElementById("player-name").value;
    if (!playerName) {
        alert("Please enter your name!");
        return;
    }
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
    if (leaderboard.length >= 10) {
        leaderboard.shift();
    }
    
    leaderboard.push({ name: playerName, score: `${score}/${totalQuestions}` });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    
    document.getElementById("leaderboard").style.display = "block";
    displayLeaderboard();
}

function displayLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardHTML = `<h2>Leaderboard</h2><table>`;
    leaderboard.forEach(entry => {
        leaderboardHTML += `<tr><td>${entry.name}</td><td>${entry.score}</td></tr>`;
    });
    leaderboardHTML += `</table><button onclick='location.reload()'>Play again</button>`;
    document.getElementById("leaderboard").innerHTML = leaderboardHTML;
}
