var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerEl = document.getElementById
('question-container');
var score = 0
var scoreEl = document.getElementById('score');
var highscores = document.getElementById('scores');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
            score++
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild){
        answerButtonsEl.removeChild
        (answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button=> {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        questionContainerEl.classList.add('hide')
        highscores.classList.remove('hide')
        formInput.classList.remove('hide')
        submitForm.classList.remove('hide')
        scoreEl.innerHTML = "Your score is " + score + "!!"
}
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
    
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is CSS?', 
        answers: [
           {text: 'Hyper-Text Markup Language.', correct: false}, 
           { text: 'Cascading Style-Sheet.', correct: true}
        ]
    },
    {
        question: 'In CSS, what is symbol is used when selecting class, and id selectors?', 
                answers: [
                   { text: 'A class selector uses a ., and an id uses a #.', correct: true},
                   {text: 'A class selector uses (), and an id uses a .', correct: false} 
                ]
    },
    {
        question: 'What is a querySelector?', 
            answers: [
        { text: 'A method to find a CSS selector.', correct: true},
        {text: 'A parent Object.', correct: false} 
                    ]
    },
    {
        question: 'What is a Window Object?', 
        answers: [
           {text: 'A parent object typically found within the body of code.', correct: false}, 
            { text: 'A parent object of the whole code.', correct: true}
        ]
    }
]

var formInput =  document.getElementById('form');
var submitForm = document.getElementById('submit');
var nameInput = document.getElementById('name')

submitForm.addEventListener("click",
    function (params) {
    params.preventDefault()
    document.querySelector(".column").innerHTML = nameInput.value
    localStorage.setItem(nameInput.value, score)
    })