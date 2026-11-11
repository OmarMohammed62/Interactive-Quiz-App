let questionNumber = document.querySelector('.question-number');
let scoreElement = document.querySelector('.score');
let progress = document.querySelector('.progress');
let questionElement = document.querySelector('.question');
let answersContainer = document.querySelector('.answers');
let nextButton = document.querySelector('.next-btn');
let restartButton = document.querySelector('.restart-btn');
let previousButton = document.querySelector('.previous-btn');

let questions = [
    {
        question: "What is HTML?",
        answers: [
            "Programming Language",
            "Markup Language",
            "Styling Language",
            "Database"
        ],
        correctAnswer: "Markup Language"
    },

    {
        question: "What is CSS?",
        answers: [
            "Programming Language",
            "Database",
            "Styling Language",
            "Operating System"
        ],
        correctAnswer: "Styling Language"
    },

    {
        question: "What is JavaScript?",
        answers: [
            "Programming Language",
            "Markup Language",
            "Styling Language",
            "Database"
        ],
        correctAnswer: "Programming Language"
    }, 

    {
    question: "What is React?",
    answers: [
        "Database",
        "JavaScript Library",
        "Programming Language",
        "Operating System"
    ],
    correctAnswer: "JavaScript Library"
    },
    
    {
    question: "What is Git?",
    answers: [
        "Code Editor",
        "Programming Language",
        "Version Control System",
        "Browser"
    ],
    correctAnswer: "Version Control System"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answerSelected = false;
let userAnswers = [];

function displayQuestion() {

    let currentQuestion = questions[currentQuestionIndex];

    previousButton.style.display = currentQuestionIndex === 0 ? "none" : "block";

    selectedAnswer = userAnswers[currentQuestionIndex] || null;

    answerSelected = selectedAnswer !== null;

    questionElement.textContent = currentQuestion.question;

    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    progress.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}% `;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(function(answer) {

        let button = document.createElement("button");

        button.classList.add("answer");

        if (answer === selectedAnswer){
            button.classList.add("selected");
            if (answer === currentQuestion.correctAnswer){
                button.classList.add("correct");
            }else{
                button.classList.add("wrong");
            }
        }

        button.textContent = answer;
        button.addEventListener("click", function(){
            answersContainer.querySelectorAll(".answer").forEach(function(btn){
                btn.classList.remove("selected", "correct", "wrong");
            });
            selectedAnswer = answer;
            userAnswers[currentQuestionIndex] = answer;
            score = 0;
            userAnswers.forEach(function(userAnswer, index){
                if (userAnswer === questions[index].correctAnswer){
                    score++;
                }
            });

            button.classList.add("selected");
            answerSelected = true;
            
            if (selectedAnswer === questions[currentQuestionIndex].correctAnswer){
                
                button.classList.add("correct");
            }else{
                button.classList.add("wrong");
            }
        });

        answersContainer.appendChild(button);

    });

}
displayQuestion();

restartButton.style.display = "none";

nextButton.addEventListener("click", function(){
    if (!answerSelected) return;
    if (currentQuestionIndex < questions.length -1){
        currentQuestionIndex++;
        selectedAnswer = null;
        answerSelected = false;
        displayQuestion();
    }else{
        questionElement.textContent = "Quiz Completed!";
        restartButton.style.display = "block";
        answersContainer.innerHTML = "";
        nextButton.style.display = "none";
        scoreElement.textContent = `Score: ${score} / ${questions.length}`;
    }
    
});

previousButton.addEventListener("click", function(){
    if (currentQuestionIndex > 0){
        currentQuestionIndex--;
        displayQuestion();
    }
});

restartButton.addEventListener("click", function(){
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = "score: 0";
    userAnswers = [];
    selectedAnswer = null;
    answerSelected = false;
    displayQuestion();
    restartButton.style.display = "none";
    nextButton.style.display = "block"; 
});