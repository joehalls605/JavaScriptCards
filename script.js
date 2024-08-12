const topicData = [
    // Non-code General Questions
    {
        topic: "Non-code General Questions",
        question: "What is JavaScript?",
        answer: "JavaScript is a versatile programming language primarily used for creating dynamic and interactive content on websites."
    },
    {
        topic: "Non-code General Questions",
        question: "What are the main features of JavaScript?",
        answer: "JavaScript supports dynamic typing, first-class functions, object-oriented programming, asynchronous programming, and more."
    },

    // Variables and Data Types
    {
        topic: "Variables and Data Types",
        question: "What is a variable in JavaScript?",
        answer: "A variable is a container for storing data values. JavaScript uses var, let, and const to declare variables."
    },
    {
        topic: "Variables and Data Types",
        question: "What are the different data types in JavaScript?",
        answer: "JavaScript has several data types, including Number, String, Boolean, Object, Undefined, Null, and Symbol."
    },
    {
        topic: "Variables and Data Types",
        question: "What is an array in JavaScript?",
        answer: "An array is a special type of object that is used to store multiple values in a single variable."
    },

    // Control Flow
    {
        topic: "Control Flow",
        question: "What is control flow in JavaScript?",
        answer: "Control flow refers to the order in which individual statements, instructions, or function calls are executed or evaluated in a script."
    },
    {
        topic: "Control Flow",
        question: "How does an if statement work?",
        answer: "An if statement executes a block of code if a specified condition is true."
    },
    {
        topic: "Control Flow",
        question: "What is a switch statement?",
        answer: "A switch statement evaluates an expression, matching the expression's value to a case clause, and executes statements associated with that case."
    },

    // Functions
    {
        topic: "Functions",
        question: "What is a function in JavaScript?",
        answer: "A function is a block of code designed to perform a particular task. It is executed when it is called."
    },
    {
        topic: "Functions",
        question: "What is the difference between function declarations and function expressions?",
        answer: "Function declarations are hoisted and can be used before they are defined, while function expressions are not hoisted."
    },
    {
        topic: "Functions",
        question: "What are arrow functions in JavaScript?",
        answer: "Arrow functions are a shorthand syntax for writing functions in JavaScript. They are anonymous and do not have their own `this` context."
    }
];

// DOM Elements
const dropdown = document.getElementById("dropdown");
const selectedOption = document.getElementById("selectedOption");
const startGameBtn = document.getElementById("startGameBtn");
const gameElement = document.getElementById("game");
gameElement.classList.add("hidden");
const menuElement = document.getElementById("menu");
const revealAnswerElement = document.getElementById("revealAnswer");
const questionElement = document.getElementById("question");
const nextBtn = document.getElementById("nxtBtn");
const emojiElement = document.getElementById("emoji");

// GLOBAL VARIABLES
let currentQuestionIndex = 0;
let filteredQuestions = [];

// Set up event listeners
startGameBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);



document.addEventListener("DOMContentLoaded", function(){
    renderEmoji();

});

function startGame() {
    gameElement.classList.remove("hidden");
    nextBtn.style.display = "block";
    revealAnswerElement.style.display = "block";
    console.log("start game!");
    filterQuestionsByTopic();
    currentQuestionIndex = 0; // Reset to first question
    showCard(currentQuestionIndex);

    // Set up the reveal answer event listener once
    revealAnswerElement.addEventListener("click", function() {
        if (filteredQuestions.length > 0) {
            revealAnswerElement.textContent = filteredQuestions[currentQuestionIndex].answer;
            revealAnswerElement.classList.add("animate-shake");
        }

        setTimeout(()=>{
            revealAnswerElement.classList.remove("animate-shake");
        }, 500)
    });
}


function renderEmoji(){
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    let emoji = "";
    switch(randomNumber){
     case 1:
         emoji = "😊";
         break;
     case 2:
         emoji = "😁";
         break;
     case 3:
         emoji = "😅";
         default:
         emoji = "😇";
         break;
     }
 
     emojiElement.textContent += "" + emoji;
    
}
    

function filterQuestionsByTopic() {
    const selectedValue = dropdown.value;
    console.log('Selected Value:', selectedValue);

    filteredQuestions = topicData.filter(item => item.topic === selectedValue);
    shuffleQuestions(filteredQuestions);

    if (filteredQuestions.length > 0) {
        showCard(currentQuestionIndex);
    } else {
        console.log("No more questions for this topic.");
    }
}

// Shuffling the questions generally
function shuffleQuestions(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    console.log("Randomized questions: " + questions);
    return questions;
}

function showCard(index) {
    if (index < filteredQuestions.length) {
        const question = filteredQuestions[index].question;
        console.log("This is the question: " + question);

        questionElement.textContent = question;

        // Prepare the answer for revealing
        revealAnswerElement.textContent = "Reveal Answer";
    } else {
        console.log("No more questions");
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < filteredQuestions.length) {
        showCard(currentQuestionIndex);
    } else {
        location.reload();
    }
}


