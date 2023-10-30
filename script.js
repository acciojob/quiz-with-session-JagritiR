// Your JS code here.
let userAnswers = JSON.parse(sessionStorage.getItem('userAnswers')) || Array(questions.length).fill(null);

function saveAnswer(questionIndex, choice) {
  userAnswers[questionIndex] = choice;
  sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}

function submitQuiz() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  localStorage.setItem('score', score);
  alert('Your score is ' + score + ' out of ' + questions.length + '.');
}

const questionsElement = document.getElementById('questions');
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      choiceElement.addEventListener('change', function() {
        saveAnswer(i, choice);
      });
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

document.getElementById('submit').addEventListener('click', submitQuiz);
