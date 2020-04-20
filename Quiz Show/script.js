const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Which Japanese record label does NOT have a US Counterpart?",
    answers: [
      { text: "Avex Inc", correct: true },
      { text: "Sony Music", correct: false },
      { text: "Universal Music Group", correct: false },
      { text: "Warner Music Group", correct: false },
    ],
  },
  {
    question: "When making ochazuke, what type of tea is most commonly used?",
    answers: [
      { text: "barley tea", correct: false },
      { text: "green tea", correct: true },
      { text: "kelp tea", correct: false },
      { text: "burdock tea", correct: false },
    ],
  },
  {
    question:
      "Which professional baseball team is the winner of the most titles?",
    answers: [
      { text: "Chunichi Dragons", correct: false },
      { text: "Hanshin Tigers", correct: false },
      { text: "Yomiuri Giants", correct: true },
      { text: "Orix Buffaloes", correct: false },
    ],
  },
  {
    question: "It's customer to gift the newly-wed bride and groom how much?",
    answers: [
      { text: "$700", correct: false },
      { text: "$400", correct: false },
      { text: "$300", correct: true },
      { text: "$200", correct: false },
    ],
  },
  {
    question: "Often, who is the best man at a Japanese wedding?",
    answers: [
      { text: "no one", correct: true },
      { text: "the future father-in-law", correct: false },
      { text: "the groom's father", correct: false },
      { text: "the groom's boss", correct: true },
    ],
  },
  {
    question:
      "One of these Japanese idioms isn't real. Can you identify which one?",
    answers: [
      { text: "monkey laughing at someone's buttocks", correct: false },
      { text: "dog and monkey relationship", correct: false },
      { text: "as fast as a monkey swing", correct: true },
      { text: "even monkeys fall from trees", correct: false },
    ],
  },
];
