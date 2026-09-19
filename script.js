```javascript
/* =====================================================
   AI MOCK INTERVIEW PLATFORM
   Frontend JavaScript
===================================================== */


/* =========================
   GLOBAL VARIABLES
========================= */

let profile = {};

let selectedInterview = "";

let currentQuestion = 0;

let totalScore = 0;

let questions = [];


/* =========================
   SAMPLE QUESTIONS
========================= */

const questionBank = {

    Technical: [

        "What is the difference between supervised and unsupervised learning?",

        "What is the difference between a list and a tuple in Python?",

        "What is SQL and why is it used?",

        "What is overfitting in machine learning?",

        "What is the difference between AI, Machine Learning and Deep Learning?"

    ],


    HR: [

        "Tell me about yourself.",

        "Why do you want to join our company?",

        "What are your strengths and weaknesses?",

        "Where do you see yourself in five years?",

        "Why should we hire you?"

    ],


    Behavioral: [

        "Tell me about a challenging project you worked on.",

        "Describe a situation where you worked in a team.",

        "Tell me about a mistake you made and what you learned from it.",

        "How do you handle pressure or deadlines?",

        "Describe a situation where you solved a difficult problem."

    ],


    Mixed: [

        "Tell me about yourself.",

        "What is overfitting in machine learning?",

        "Describe a challenging project you worked on.",

        "What is the difference between supervised and unsupervised learning?",

        "Why should we hire you?"

    ]

};


/* =========================
   START INTERVIEW
========================= */

function startInterview() {

    scrollToSection("interview");

    showScreen("profile-screen");

}


/* =========================
   SCROLL FUNCTION
========================= */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================
   SCREEN MANAGEMENT
========================= */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".interview-screen");

    screens.forEach(function(screen) {

        screen.classList.remove("active");

    });


    const selectedScreen =
        document.getElementById(screenId);

    if (selectedScreen) {

        selectedScreen.classList.add("active");

    }

}


/* =========================
   SAVE PROFILE
========================= */

function saveProfile() {

    const name =
        document.getElementById("name").value.trim();

    const role =
        document.getElementById("role").value.trim();

    const experience =
        document.getElementById("experience").value;

    const skills =
        document.getElementById("skills").value.trim();


    if (
        name === "" ||
        role === "" ||
        experience === "" ||
        skills === ""
    ) {

        alert("Please fill all profile fields.");

        return;

    }


    profile = {

        name: name,

        role: role,

        experience: experience,

        skills: skills

    };


    /* Save profile in browser */

    localStorage.setItem(
        "interviewProfile",
        JSON.stringify(profile)
    );


    showScreen("selection-screen");

}


/* =========================
   SELECT INTERVIEW
========================= */

function selectInterview(type, element) {

    selectedInterview = type;


    const cards =
        document.querySelectorAll(".interview-type");


    cards.forEach(function(card) {

        card.classList.remove("selected");

    });


    element.classList.add("selected");

}


/* =========================
   BEGIN INTERVIEW
========================= */

function beginInterview() {

    if (selectedInterview === "") {

        alert("Please select an interview type.");

        return;

    }


    questions =
        questionBank[selectedInterview];


    currentQuestion = 0;

    totalScore = 0;


    document.getElementById("candidate-name").textContent =
        profile.name;

    document.getElementById("candidate-role").textContent =
        profile.role + " - " + selectedInterview;


    showScreen("question-screen");


    loadQuestion();

}


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

    const question =
        questions[currentQuestion];


    document.getElementById("question-text")
        .textContent = question;


    document.getElementById("question-count")
        .textContent =
        "Question " +
        (currentQuestion + 1) +
        " / " +
        questions.length;


    const progress =
        ((currentQuestion + 1) /
            questions.length) * 100;


    document.getElementById("question-progress")
        .style.width = progress + "%";


    document.getElementById("answer").value = "";


    document.getElementById("char-count")
        .textContent = "0 characters";


    document.getElementById("feedback-box")
        .classList.remove("show");

}


/* =========================
   CHARACTER COUNTER
========================= */

document
    .getElementById("answer")
    .addEventListener("input", function() {

        const count = this.value.length;

        document.getElementById("char-count")
            .textContent =
            count + " characters";

    });


/* =========================
   SUBMIT ANSWER
========================= */

function submitAnswer() {

    const answer =
        document.getElementById("answer")
            .value.trim();


    if (answer === "") {

        alert("Please write your answer first.");

        return;

    }


    /*
       Demo AI evaluation.

       In the future this section can be
       connected to a real AI API.
    */

    let score = 6;


    if (answer.length > 100) {

        score = 8;

    }

    if (answer.length > 200) {

        score = 9;

    }


    totalScore += score;


    document.getElementById("answer-score")
        .textContent = score;


    if (score >= 8) {

        document.getElementById("strength")
            .textContent =
            "Your answer shows good understanding and provides useful information.";

        document.getElementById("improvement")
            .textContent =
            "Try adding a practical real-world example to make your answer even stronger.";

    }

    else {

        document.getElementById("strength")
            .textContent =
            "You have identified some important points.";

        document.getElementById("improvement")
            .textContent =
            "Try giving a more detailed explanation with an example.";

    }


    document.getElementById("feedback-box")
        .classList.add("show");


    /*
       Scroll to feedback
    */

    document.getElementById("feedback-box")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

    currentQuestion++;


    if (currentQuestion >= questions.length) {

        showReport();

        return;

    }


    loadQuestion();


    document.getElementById("question-screen")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   SHOW REPORT
========================= */

function showReport() {

    const averageScore =
        totalScore / questions.length;


    const finalScore =
        averageScore.toFixed(1);


    document.getElementById("report-name")
        .textContent = profile.name;


    document.getElementById("overall-score")
        .textContent = finalScore;


    showScreen("report-screen");


    document.getElementById("report-screen")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   RESTART INTERVIEW
========================= */

function restartInterview() {

    selectedInterview = "";

    currentQuestion = 0;

    totalScore = 0;

    questions = [];


    document.querySelectorAll(".interview-type")
        .forEach(function(card) {

            card.classList.remove("selected");

        });


    showScreen("selection-screen");


    document.getElementById("selection-screen")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   LOAD SAVED PROFILE
========================= */

window.addEventListener("DOMContentLoaded", function() {

    const savedProfile =
        localStorage.getItem("interviewProfile");


    if (savedProfile) {

        profile =
            JSON.parse(savedProfile);

    }

});
```
