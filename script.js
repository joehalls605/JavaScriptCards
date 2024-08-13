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
const scoreElement = document.getElementById("score");
const rememberedElement = document.getElementById("remembered");
const flashcardQuotesElement = document.getElementById("flashcardQuotes");
const headerElement = document.getElementById("header");


// GLOBAL VARIABLES
let currentQuestionIndex = 0;
let filteredQuestions = [];
let score = 0;
let rememberedClicked = false;

const flashCardQuotes = [
    "Flashcards turn study sessions into a game, making learning both effective and enjoyable.",
    "With flashcards, repetition becomes a strategy for mastery rather than a chore.",
    "Flashcards help reinforce memory through active recall, transforming information into lasting knowledge.",
    "Harness the power of flashcards: they turn fragmented information into a cohesive understanding.",
    "Flashcards are a simple yet powerful tool for making complex concepts more accessible and memorable.",
    "Using flashcards regularly builds confidence and deepens comprehension, one card at a time.",
    "Flashcards transform study time into active engagement, making learning more dynamic and effective.",
    "The beauty of flashcards lies in their simplicity, offering a versatile approach to mastering any subject."
  ];

const learningBenefitsQuotes = [
    "Learning fuels personal growth and opens doors to new opportunities and experiences.",
    "Knowledge is power; the more you learn, the more you can achieve and influence the world around you.",
    "Every new skill you acquire builds confidence and enhances your ability to adapt to new challenges.",
    "Learning encourages curiosity and fosters a lifelong love of discovery and exploration.",
    "The process of learning strengthens your brain, improves memory, and boosts cognitive abilities.",
    "Continuous learning helps you stay relevant in a rapidly changing world and keeps you ahead of the curve.",
    "Learning new things can be a source of joy and fulfillment, bringing a sense of accomplishment and pride.",
    "The more you learn, the more you understand, and the better you become at solving problems and making informed decisions."
];

const secondEmoji = ["📕", "📘", "📙"]

// Set up event listeners
startGameBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);



document.addEventListener("DOMContentLoaded", function(){
    renderEmoji(secondEmoji);
    flashCardQuotesRender();
    rememberedElement.addEventListener("click", calculateScore);
    renderScore(score);

});

 // Set up the reveal answer event listener once
 revealAnswerElement.addEventListener("click", function() {
    if (filteredQuestions.length > 0) {
        revealAnswerElement.textContent = filteredQuestions[currentQuestionIndex].answer;
        revealAnswerElement.classList.add("shake");
    }

    setTimeout(()=>{
        revealAnswerElement.classList.remove("shake");
    }, 500)
});

function flashCardQuotesRender() {
    // Clear existing content in flashcardQuotesElement
    flashcardQuotesElement.innerHTML = "";

    const quotes = [...flashCardQuotes, ...learningBenefitsQuotes]

    // Create and append a new element for each quote
    quotes.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.textContent = quote;
        flashcardQuotesElement.appendChild(quoteElement); // Append each quote to the container
    });
}


function startGame() {
    gameElement.classList.remove("hidden");
    headerElement.classList.add("hidden");
    nextBtn.style.display = "block";
    revealAnswerElement.style.display = "block";
    console.log("start game!");
    filterQuestionsByTopic();
    currentQuestionIndex = 0; // Reset to first question
    showCard(currentQuestionIndex);

   
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
        rememberedClicked = false;
        rememberedClicked.disabled = false;
    } else {
        console.log("No more questions");
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < filteredQuestions.length) {
        showCard(currentQuestionIndex);

        rememberedClicked = false;
        rememberedElement.disabled = false;
    } else {
        location.reload();
    }
}


function renderEmoji(...additionalEmojis){
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

     additionalEmojis.forEach(e => {
        emojiElement.append(e);
     });

     const welcomeBack = function(){
        const welcomeBackElement = document.createElement("div");
        welcomeBackElement.textContent = "Welcome back Joe!"
        emojiElement.append(welcomeBackElement);

        const practiceMessage = () => {
            const message = "  Let's practice!"
            welcomeBackElement.append(message);
        }
        practiceMessage();
     }

     welcomeBack();
    
}

// Using high order function to double the score.

function calculateScore(){
    score++;
    console.log(score);

    function double(x){
        return x * 2;
    }
    
    function applyTwice(fn, value){
        return fn(fn(value));
    }

    const result = applyTwice(double, score);

    renderScore(result);

    rememberedClicked = true;
    rememberedElement.disabled = true;
}

function renderScore(score) {
    scoreElement.textContent = `Score: ${score}`;
}

