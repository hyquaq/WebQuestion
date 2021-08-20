var questions = [];
// jQuery.getJSON("/triet.json", function (json) {
//     console.log("hi");
//     console.log(json);
//     questions = json;
// });

// funciton

function readData(json) {
    jQuery.getJSON(json, function (data) {
        console.log("hi");
        console.log(data);
        questions = data;
        nextQuestion();
        totalQuestionAnswered = 0;
    });
}

function userChoice(e) {
    e.classList.add("disabled");

    // when user choice
    // updateProgress();

    if (key() === e.innerText) {
        showMess("right", "congratulations");
        disableAll();
    } else {
        showMess("wrong", key());
    }
}

function disableAll() {
    var btn = document.querySelectorAll(".btn.btn-info.col-12.mt-3.p-2");
    // console.log(btn);
    btn.forEach((e) => {
        // console.log(e);
        e.classList.add("disabled");
    });
}

function showMess(status, content) {
    var areaToast = document.querySelector(".area-toast");
    var toastMess = `<div class="mess">
                        <div class="message message-${status}">
                            ${content}
                        </div>
                    </div>`;

    console.log(toastMess);
    console.log(typeof toastMess);

    areaToast.insertAdjacentHTML("beforeend", toastMess);
    setTimeout(() => {}, 3000);
    // console.log(mess);
}

// function updateProgress() {
//     totalQuestionAnswered++;
//     var progress = document.querySelector(".progress > .progress-bar");
//     // progress.style.width = `${parseInt(progress.style.width) + 1}%`;
//     progress.style.width = `${(
//         (totalQuestionAnswered / questions.length) *
//         100
//     ).toFixed(2)}%`;
//     progress.innerText = progress.style.width;
//     console.log(progress.style.width);
// }

function key() {
    if (currentQuestion.correctAnswer === "1") {
        return currentQuestion.a;
    }
    if (currentQuestion.correctAnswer === "2") {
        return currentQuestion.b;
    }
    if (currentQuestion.correctAnswer === "3") {
        return currentQuestion.c;
    }
    if (currentQuestion.correctAnswer === "4") {
        return currentQuestion.d;
    }
}

function nextQuestion() {
    // get Element
    var question = document.querySelector("#ques");
    var a = document.querySelector("#a");
    var b = document.querySelector("#b");
    var c = document.querySelector("#c");
    var d = document.querySelector("#d");
    // random question
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    // update text
    // question.innerHTML = `<p>${currentQuestion.question}</p>`;
    question.innerText = currentQuestion.question;
    a.innerText = currentQuestion.a;
    b.innerText = currentQuestion.b;
    c.innerText = currentQuestion.c;
    d.innerText = currentQuestion.d;
    a.classList.remove("disabled");
    b.classList.remove("disabled");
    c.classList.remove("disabled");
    d.classList.remove("disabled");
}

// var questions = data.responseJSON;
var totalQuestionAnswered = 0;
var currentQuestion = null;
// nextQuestion();
