// main.js

const quizData = [
    {
        image: 'https://cdnlogo.com/logo/arsenal-fc_5988.svg',
        question: 'Which team does this emblem belong to?',
        options: ['Arsenal', 'Chelsea', 'Manchester United', 'Liverpool'],
        answer: 'Arsenal'
    },
    {
        image: 'https://cdnlogo.com/logo/chelsea-fc_5994.svg',
        question: 'Which team does this emblem belong to?',
        options: ['Tottenham Hotspur', 'Chelsea', 'Manchester City', 'Everton'],
        answer: 'Chelsea'
    },
    {
        image: 'https://cdnlogo.com/logo/manchester-united-fc_6030.svg',
        question: 'Which team does this emblem belong to?',
        options: ['Liverpool', 'Manchester City', 'Manchester United', 'Newcastle United'],
        answer: 'Manchester United'
    },
    {
        image: 'https://cdnlogo.com/logo/liverpool-fc_6025.svg',
        question: 'Which team does this emblem belong to?',
        options: ['Aston Villa', 'Liverpool', 'West Ham United', 'Leicester City'],
        answer: 'Liverpool'
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answeredThisQuestion = false;

const mascotImage = document.getElementById('mascot-image');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const quizSection = document.getElementById('quiz');
const resultSection = document.getElementById('result-section');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-button');

function loadQuestion() {
    answeredThisQuestion = false;
    feedbackElement.textContent = '';
    nextButton.classList.add('hidden'); // Hide next button until answered

    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        mascotImage.src = currentQuestion.image;
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ''; // Clear previous options

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-button');
            button.addEventListener('click', () => selectAnswer(button, option, currentQuestion.answer));
            optionsContainer.appendChild(button);
        });
    } else {
        showResults();
    }
}

function selectAnswer(selectedButton, selectedOption, correctAnswer) {
    if (answeredThisQuestion) return; // Prevent multiple answers per question
    answeredThisQuestion = true;

    // Disable all option buttons
    Array.from(optionsContainer.children).forEach(button => {
        button.classList.add('disabled');
    });

    if (selectedOption === correctAnswer) {
        score++;
        selectedButton.classList.add('correct');
        feedbackElement.textContent = 'Correct!';
        feedbackElement.style.color = '#2ecc71';
    } else {
        selectedButton.classList.add('incorrect');
        feedbackElement.textContent = `Wrong! The correct answer is '${correctAnswer}'.`;
        feedbackElement.style.color = '#e74c3c';

        // Highlight the correct answer
        Array.from(optionsContainer.children).forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }
    nextButton.classList.remove('hidden'); // Show next button
}

function showResults() {
    quizSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    scoreText.textContent = `You scored ${score} out of ${quizData.length}!`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    quizSection.classList.remove('hidden');
    resultSection.classList.add('hidden');
    loadQuestion();
});

// Initial load
loadQuestion();
