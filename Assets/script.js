const quiz = [
    {
      question: "A loop that never ends is referred to as a(n)_________",
      choices: ["A while loop", "B infinite loop", "C recursive loop", "D for loop"],
      answer: 1
    },
    {
      question: "Finding and solving errors in the source code is called what?",
      choices: ["A desk checking", "B testing", "C debugging", "D decoding"],
      answer: 2
    },
    {
      question: "What does HTML stand for?",
      choices: ["A HyperText and links Markup Language", "B HighText Machine Language", "C HyperText Markup Language", "D none of these"],
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
  

  

  

  
  submitButton.addEventListener('click', handleAnswer);
  startQuiz();
  