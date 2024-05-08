const container = document.querySelector('.quiz-container');
const questionBox = document.querySelector('.questions');
const choiceBox = document.querySelector('.choices');
const nxtBtn = document.querySelector('.nxtBtn');
const scoreCard = document.querySelector('.scoreCard');
const sub_container = document.querySelector('.sub-container');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.start');
const timer = document.querySelector('.timer');
const quizImage = document.querySelector('.quiz');


// make an array of objects that stores questions,choices and answers
const quiz = [
    {
        questions: "Q.) How do you create a function in JavaScript?",
        choices: ["function = myFunction()", "function:myFunction()", "function myFunction()", "create myFunction()"],
        answer: "function myFunction()"
    },
    {
        questions: "Q.) console.log(typeof null);",
        choices: ["null", "object", "undefined", "number"],
        answer: "object"
    },
    {
        questions: "Q.) Which method is used to add an element at the end of an array?",
        choices: ["array.push(element):", "array.pop(element):", "array.unshift(element):", "array.shift(element)"],
        answer: "array.push(element):"
    },
    {
        questions: "Q.) Which operator is used to assign a value to a variable?",
        choices: ["+", "-", "*", "="],
        answer: "="
    },
    {
        questions: "Q.) Which function of an Array object calls a function for each element in the array?",
        choices: ["forEach()", "every()", "forEvery()", "each()"],
        answer: "forEach()"
    }
];

// making variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// arrow function to show questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.questions;

    choiceBox.textContent = '';
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.classList.add('choice');
        choiceDiv.textContent = currentChoice;
        choiceBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            } else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

// function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        displayAlert("Correct answer ");
        alert.style.backgroundColor = "green"
        alert.style.color = "white"
        score++;
    }
    else {
        displayAlert(`Wrong Answer !! The correct answer is "${quiz[currentQuestionIndex].answer}"`);
        alert.style.backgroundColor = "red";
        alert.style.color = "white"
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
}

// functions to show score
const showScore = () => {
    scoreCard.textContent = `You scored ${score} out of ${quiz.length}`;
    questionBox.textContent = "";
    choiceBox.textContent = "";
    nxtBtn.textContent = "Play Again";
    displayAlert("Quiz Completed");
    quizOver = true;
    timer.style.display = "none";
}

// function to show alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
}

// function to start timer
const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            const confirmUser = confirm("Time up!!!");
            if (confirmUser) {
                timeLeft = 15;
                // currentQuestionIndex++;
                startQuiz();
            }
            else {
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);

}

// function to stop timer
const stopTimer = () => {
    clearInterval(timerID);
}


const shuffleQuestions = () => {
    for(let i=(quiz.length - 1); i>0; i--){
        const j = Math.floor(Math.random()* (i+1));
        [quiz[i], quiz[j]] = [quiz[j],quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// function to start quiz
const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// adding event listener to start button
startBtn.addEventListener('click', () => {
    container.style.display = "block";
    startBtn.style.display = "none";
    quizImage.style.display = "none";
    showQuestions();
    startQuiz();
});

nxtBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected')
    if (!selectedChoice && nxtBtn.textContent === "Next") {
        displayAlert("Select your answer");
        alert.style.backgroundColor = "#B0E0E6";
        alert.style.color = "#000"
        return;
    }
    if (quizOver) {
        currentQuestionIndex = 0;
        nxtBtn.textContent = "Next";
        scoreCard.textContent = '';
        quizOver = false;
        score = 0;
        alert.style.display = "none";
        startQuiz();
    }
    else {
        checkAnswer();
    }

});

