function startQ(){
  // Show the submit button and hide the start button
  document.getElementById("submit").style.display = "block";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("paraText").style.display = "none";
  
  // Show the question and choices elements
  document.getElementById("question").style.display = "block";
  document.getElementById("choices").style.display = "inline-block";
}

function submitAnswer() {
  document.getElementById("submit").style.display = "block";
  
}

const quiz = [
    {
      question: "A loop that never ends is referred to as a(n)_________",
      choices: ["A. while loop", "B. infinite loop", "C. recursive loop", "D. for loop"],
      answer: 1
    },
    {
      question: "Finding and solving errors in the source code is called what?",
      choices: ["A. desk checking", "B. testing", "C. debugging", "D. decoding"],
      answer: 2
    },
    {
      question: "What does HTML stand for?",
      choices: ["A. HyperText and links Markup Language", "B. HighText Machine Language", "C. HyperText Markup Language", "D. none of these"],
      answer: 2
    }
  ];


  const quizContainer = document.getElementById('quiz-container');
  const questionElement = document.getElementById('question');
  const choicesElement = document.getElementById('choices');
  const submitButton = document.getElementById('submit');
  const timeElement = document.getElementById('time');
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  
  function showQuestion() {
    const currentQuestion = quiz[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';
    for (let i = 0; i < currentQuestion.choices.length; i++) {
      const choice = document.createElement('div');
      choice.className = 'choice';
      choice.textContent = currentQuestion.choices[i];
      choice.addEventListener('click', handleAnswer);
      choicesElement.appendChild(choice);
    }
  }
  
  function handleAnswer() {
    const currentQuestion = quiz[currentQuestionIndex];
    const selectedAnswer = currentQuestion.choices.indexOf(this.textContent);
    if (selectedAnswer === currentQuestion.answer) {
      score++;
    } else {
      timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === quiz.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
  
  function startQuiz() {
    quizContainer.style.display = 'block';
    showQuestion();
    setInterval(updateTime, 1000);
  }
  

  function endQuiz() {
    quizContainer.style.display = 'none';
    const name = prompt('Enter your name:');
    // If there is a highScores value, it will parse it as a JSON object. Otherwise, it will output an empty array
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ name, score });
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    showHighScores();
  }
  

  
  submitButton.addEventListener('click', handleAnswer);
  startQuiz();
  