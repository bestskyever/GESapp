//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "1" ,
        question: "___________ are motivated by government incentives, concessions and benefits" ,
        options: ["Pure entrepreneur", "Induced Entrepreneur", " Modern entrepreneur", " Growth entrepreneur"] ,
        correct: "Induced Entrepreneur",
  },
    {
        id: "2" ,
        question: "The flow of entrepreneurial development in Nigeria was disrupted by all but one of these" ,
        options: ["Trading practices of colonial masters", "Introduction of formal education", "Employment opportunities in the civil service", "Importation of goods and services"] ,
        correct: "Importation of goods and services",
  },
    {
        id: "3" ,
        question: "The ultimate goal of the entrepreneurs is to_________________" ,
        options: ["Make profit", "Sell goods/services", "Identify limitations", "Please costumers"] ,
        correct: "Make profit",
  },
    {
        id: "4" ,
        question: "Most business ideas come from the needs and demands of" ,
        options: ["Research", "Customers", "Business firms", "Entrepreneurs"] ,
        correct: "Customers",
  },
    {
        id: "5" ,
        question: "Joseph Schumpeter identified the following as factors that inhibit the expression of entrepreneurial activities, except." ,
        options: ["Fear of social sanctioning", "Inward reluctance & tendency to resist change", "Difficult nature of innovative tasks", "Corruption level in society"] ,
        correct: "Corruption level in society",
  },
    {
        id: "6" ,
        question: "Competencies commonly reported among all entrepreneurs are these, except" ,
        options: ["Proactivity", "Autonomy and Monopoly", "Achievement orientation", "Customer Satisfaction Commitment"] ,
        correct: "Autonomy and Monopoly",
  },
    {
        id: "7" ,
        question: "Outsourcing of business to a nearby country is known as _____________" ,
        options: ["Near shore outsourcing", "Hinterland outsourcing", "Onshore outsourcing", "Offshore outsourcing"] ,
        correct: "Near shore outsourcing",
  },
    {
        id: "8" ,
        question: "According to Mills (1848), what is the differentiating factor between Entrepreneurs and Managers?" ,
        options: ["Competitive marketing", "Combination of production means", "Capital Allotment", "Risk-bearing role"] ,
        correct: "Risk-bearing role",
  },
    {
        id: "9" ,
        question: "Which of these risks is not considered when exploring business opportunities?" ,
        options: ["Company risks", "Market risks", "Insurance risks", "Financial risks"] ,
        correct: "Insurance risks",
    },
] ;  


//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};