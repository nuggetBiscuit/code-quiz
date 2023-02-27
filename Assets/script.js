const quiz = [
  {
      question: "A loop that never ends is referred to as a(n)_________",
      choices: [
      "A. while loop", 
      "B. infinite loop", 
      "C. recursive loop", 
      "D. for loop"
  ],
      answer: "B. infinite loop"
    },
    {
      question: "Finding and solving errors in the source code is called what?",
      choices: [
      "A. desk checking", 
      "B. testing", 
      "C. debugging", 
      "D. decoding"
  ],
      answer: "C. debugging"
    },
  {
      question: "What does HTML stand for?",
      choices: [
      "A. Hyperlinks and Text Markup Language",
      "B. Hyper Text Markup Language",
      "C. Home Tool Markup Language",
      "D. None of the above"
    ],
      answer: "B. Hyper Text Markup Language"
  },
  {
      question: "What does CSS stand for?",
      choices: [
      "A. Computer Style Sheets",
      "B. Cascading Style Sheets",
      "C. Colorful Style Sheets",
      "D. None of the above"
    ],
      answer: "B. Cascading Style Sheets"
  },
  {
      question: "What does JavaScript do?",
      choices: [
      "A. Allows the creation of dynamic websites",
      "B. Allows the creation of static websites",
      "C. Allows the creation of 3D graphics",
      "D. None of the above"
    ],
      answer: "A. Allows the creation of dynamic websites"
  },
  {
      question: "Arrays in JavaScript can be used to store?",
      choices: [
      "A. Numbers and strings",
      "B. Other arrays",
      "C. Booleans",
      "D. All of the above"
    ],
      answer: "D. All of the above"
  }
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const highscoresContainer = document.getElementById("highscores");
const startButton = document.getElementById("startButton");
const timeElement = document.getElementById('time');

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

function startQuiz() {
  // Starts the timer if the quiz has started
  timer = setInterval(function() {
    timeLeft--;
    // Updates timer to page
    timeElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);

  quizContainer.innerHTML = generateQuestion();
  // Hides the start button
document.getElementById("startButton").style.display = "none";
document.getElementById("paraText").style.display = "none";
  // Event listener for answer buttons
  quizContainer.addEventListener("click", function(event) {
    if (event.target.nodeName === "BUTTON") {
      checkAnswer(event.target.innerText);
    }
  });
}

function generateQuestion() {
  const question = quiz[currentQuestion];
  let questionHTML = `<p>${question.question}</p>`;

  for (let i = 0; i < question.choices.length; i++) {
    questionHTML += `<button>${question.choices[i]}</button>`;
  }

  return questionHTML;
}

function checkAnswer(answer) {
  const question = quiz[currentQuestion];
  if (answer === question.answer) {
    score++;
    // Shows previous questions answer was correct
    resultContainer.innerHTML = `<p>Correct :()</p>`;
  } 
  else {
    timeLeft -= 10;
    // Shows previous questions answer was incorrect
    resultContainer.innerHTML = `<p>Incorrect :(</p>`;
}

// Move to next question or end quiz if all questions have been answered
currentQuestion++;
if (currentQuestion < quiz.length) {
  quizContainer.innerHTML = generateQuestion();
} 
else {
  clearInterval(timer);
  endQuiz();
}
}

function endQuiz() {
quizContainer.innerHTML = "";
resultContainer.innerHTML = "";
highscoresContainer.innerHTML = `
  <p>Your score: ${score}</p>
  <form>
    <label for="initials">Enter your initials:</label>
    <input type="text" id="initials" name="initials" maxlength="3">
    <button type="submit">Submit</button>
  </form>
`;

// Event listener for high scores form submission
const highscoresForm = document.querySelector("form");
highscoresForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value.toUpperCase();
  saveHighscore(initials, score);
});
}

function saveHighscore(initials, score) {
// If there is a highScores value, it will parse it as a JSON object. Otherwise, it will output an empty array
let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
highscores.push({ initials: initials, score: score });
highscores.sort(function(a, b) {
  return b.score - a.score;
});
localStorage.setItem("highscores", JSON.stringify(highscores));
displayHighscores();
}

function displayHighscores() {
let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
let highscoresHTML = "<ul>";
for (let i = 0; i < highscores.length; i++) {
  highscoresHTML += `<li>${highscores[i].initials} - ${highscores[i].score}</li>`;
}
highscoresHTML += "</ul>";
highscoresContainer.innerHTML = highscoresHTML;
}

// Event listener for start button
startButton.addEventListener("click", function() {
startQuiz();
});

