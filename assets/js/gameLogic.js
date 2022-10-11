var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl =document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function beginQuiz() {
    
    //Hide home screen
    var kickOffScreenEl = document.getElementById("home-screen");
    kickOffScreenEl.setAttribute("class", "hide");

    // Show question section
    questionsEl.removeAttribute("class");

    //Begin timer
    timerId = setInterval(clockTick, 2000);

    // Show start time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {

    // Get current question object from array
    var currentQuestion = questions[currentQuestionIndex];

    //Update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    //Remove any option from previous questions
    choicesEl.innerHTML = "";

    //Iterate through the options //
    currentQuestion.choices.forEach(function(choice, i) {
        //Create new button for each option
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        //Adjuntar oyente del evento de click a cada opción. 
        choiceNode.onclick = questionClick;

        //Mostrar en la pagina
        choicesEl.appendChild(choiceNode);
    });
}

function questionClick() {
    // Check if the answer is correct
    if(this.value !== questions[currentQuestionIndex].answer) {
        //Time penalty
        time -= 15;

        if(time < 0) {
            time = 0;
        }

        //New tiem update on screen
        timerEl.textContent = time;

        feedbackEl.textContent = "Wrong!";
    } else {
        feedbackEl.textContent = "Correct!";
    }

    //Intermittent feedback right/wrong answer for 1 second.
    feedbackEl.setAttribute("class", "feedback");
        setTimeout(function() {
            feedbackEl.setAttribute("class", "feedback hide");
        },
        1000
    );

    //Next question
    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    //Stop timer
    clearInterval(timerId);

    //Show final screen
    var endScreenEl = document.getElementById("final-screen");
    endScreenEl.removeAttribute("class");

    //Show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    //Hide question section 
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    //Update time
    time--;
    timerEl.textContent = time;

    //Check if user is ran out of time
    if(time <= 0) {
        quizEnd();
    }
}

function saveHighScore() {
    //Get value from de entry box
    var initials = initialsEl.value.trim();

    //Make sure the value is not empty
    if(initials !== "") {
        //Get save scores on local storage, if there is none, establish empty array
        var highscores = JSON.parse(window.localStorage.getItem("highScores")) || [];

        var newScore = {
            score: time,
            initials : initials
        };

        //Save on local storage
        highscores.push(newScore);
        window.localStorage.setItem("highScores", JSON.stringify(highscores));

        //Redireccionar a la siguiente pagina
        window.location.href = "highScores.html";
    }
}

function checkForEnter(event) {
    if(event.key === "Enter") {
        saveHighScore();
    }
}

submitBtn.onclick = saveHighScore;

startBtn.onclick = beginQuiz;

initialsEl.onkeyup = checkForEnter;