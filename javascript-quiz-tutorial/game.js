const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('#Question'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const ProgressBarFull = document.querySelector('#ProgressBarFull');

let currentQuestion = {};
let acceptingAsnwers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let question = [{
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'Is London a country or an city?',
        choice1: 'City',
        choice2: 'Country',
        choice3: 'A mix of the Two',
        choice4: 'Its an empire of course!',
        answer: 1,
    }, {
        question: 'Is Bichon havanis a dog from Spain?',
        choice1: 'No, its from Madagascar',
        choice2: 'Its a nordic sled dog',
        choice3: 'No, its a dog breed from Cuba',
        choice4: 'Yes',
        answer: 3,
    }, {
        question: 'Is santa real?',
        choice1: 'No dummy',
        choice2: 'It depends on what you believe in',
        choice3: 'Yes',
        choice4: 'I do not know',
        answer: 1,
    },
]
const SCORE_POINTS = 100
const MAX_QUESTIONS = 2

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)


        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    ProgressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions, splice(questionsIndex, 1)
    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const SelectedChoice = e.target
        const SelectedAnswer = SelectedChoice.dataset['number']

        let classToApply = SelectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        SelectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            SelectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()