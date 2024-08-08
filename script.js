// Define the topic data
const topicData = [
    // General Questions
    {
        topic: "General Questions",
        question: "What is JavaScript?",
        answer: "JavaScript is a versatile programming language primarily used for creating dynamic and interactive content on websites."
    },
    {
        topic: "General Questions",
        question: "What are the main features of JavaScript?",
        answer: "JavaScript supports dynamic typing, first-class functions, object-oriented programming, asynchronous programming, and more."
    },

    // JavaScript Basics
    {
        topic: "JavaScript Basics",
        question: "What is a variable in JavaScript?",
        answer: "A variable is a container for storing data values. JavaScript uses var, let, and const to declare variables."
    },
    {
        topic: "JavaScript Basics",
        question: "What are the different data types in JavaScript?",
        answer: "JavaScript has several data types, including Number, String, Boolean, Object, Undefined, Null, and Symbol."
    },
    {
        topic: "JavaScript Basics",
        question: "What is an array in JavaScript?",
        answer: "An array is a special type of object that is used to store multiple values in a single variable."
    },

    // JavaScript Functions
    {
        topic: "JavaScript Functions",
        question: "What is a function in JavaScript?",
        answer: "A function is a block of code designed to perform a particular task. It is executed when it is called."
    },
    {
        topic: "JavaScript Functions",
        question: "What is the difference between function declarations and function expressions?",
        answer: "Function declarations are hoisted and can be used before they are defined, while function expressions are not hoisted."
    },
    {
        topic: "JavaScript Functions",
        question: "What are arrow functions in JavaScript?",
        answer: "Arrow functions are a shorthand syntax for writing functions in JavaScript. They are anonymous and do not have their own `this` context."
    },

    // JavaScript Objects and Classes
    {
        topic: "JavaScript Objects and Classes",
        question: "What is an object in JavaScript?",
        answer: "An object is a collection of properties, where each property is defined as a key-value pair."
    },
    {
        topic: "JavaScript Objects and Classes",
        question: "What is a class in JavaScript?",
        answer: "A class in JavaScript is a blueprint for creating objects with predefined properties and methods."
    },
    {
        topic: "JavaScript Objects and Classes",
        question: "What is the difference between prototypal inheritance and classical inheritance?",
        answer: "JavaScript uses prototypal inheritance, where objects inherit directly from other objects, rather than inheriting from classes as in classical inheritance."
    },

    // Advanced JavaScript Concepts
    {
        topic: "Advanced JavaScript Concepts",
        question: "What is closure in JavaScript?",
        answer: "A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope."
    },
    {
        topic: "Advanced JavaScript Concepts",
        question: "What is the event loop in JavaScript?",
        answer: "The event loop is a mechanism in JavaScript that allows for non-blocking asynchronous operations, handling events, and executing callback functions."
    },
    {
        topic: "Advanced JavaScript Concepts",
        question: "What are promises in JavaScript?",
        answer: "Promises are objects that represent the eventual completion (or failure) of an asynchronous operation and its resulting value."
    }
];


// DOM Elements
const dropdown = document.getElementById("dropdown");
const selectedOption = document.getElementById("selectedOption");
const startGameBtn = document.getElementById("startGameBtn");
const nxtBtnElement = document.getElementById("nxtBtn");
nxtBtnElement.classList.add("hidden");
const gameElement = document.getElementById("game");
const menuElement = document.getElementById("menu");

let currentQuestionIndex = 0;

startGameBtn.addEventListener("click", startGame);

function startGame() {
    console.log("start game!");
    currentQuestionIndex = 0; // Reset to first question
    showCard(currentQuestionIndex);
    nxtBtnElement.classList.remove("hidden");
    menuElement.classList.add("hidden");

}

function showCard(index) {
    if (index >= topicData.length) {
        console.error("Index out of bounds");
        return;
    }
    
    console.log(index);

    const { topic, question, answer } = topicData[index];

    // Clear previous content
    gameElement.innerHTML = "";

    // Create a container div for the flashcard
    const flashCard = document.createElement('div');
    gameElement.appendChild(flashCard);

    // Display topic and question
    const topicElement = document.createElement('h3');
    topicElement.textContent = `Topic: ${topic}`;
    
    const questionElement = document.createElement('h3');
    questionElement.textContent = `Question: ${question}`;
    
    flashCard.append(topicElement, questionElement);

    const revealBtn = document.createElement("button");
    revealBtn.textContent = "Reveal";
    flashCard.appendChild(revealBtn);

    // Event listener to reveal the answer
    revealBtn.addEventListener("click", () => {
        const answerElement = document.createElement('p');
        answerElement.textContent = `Answer: ${answer}`;
        flashCard.appendChild(answerElement);
    });
}

// Event listener for "Next" button
nxtBtnElement.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < topicData.length) {
        showCard(currentQuestionIndex);
    } else {
        console.log("No more questions available.");
        gameElement.innerHTML = "<p>No more questions available.</p>";
    }
});
