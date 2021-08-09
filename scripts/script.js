let path = "../data/qp10.json";
let questions = [];
let currentQues = "";
let outQuestion = document.querySelector(".form-study__body .body__question");
let outAnswers = document.querySelectorAll(
    ".form-study__body .body__answers > li"
);
let btnNext = document.querySelector(".form-study__body .next");

fetch(path)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        questions = data;
    })
    .catch(() => console.log("error"));

outAnswers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
        // console.log(e.target.value);
        console.log(e.target.value == currentQues.correctAnswer);
        if (e.target.value == currentQues.correctAnswer) {
            // console.log(e.target.classList);
            e.target.classList.add("answer--right");
        } else {
            e.target.classList.add("answer--wrong");
        }
        // if(e.value)
    });
});

function clearClass() {
    outAnswers.forEach((answer) => {
        answer.classList.remove("answer--right");
        answer.classList.remove("answer--wrong");
    });
}

btnNext.addEventListener("click", () => {
    nextQuestion();
});

function nextQuestion() {
    // clear class
    clearClass();

    currentQues = questions[Math.floor(Math.random() * questions.length)];
    console.log(currentQues);

    // out data
    outQuestion.innerText = currentQues.question;
    outAnswers[0].innerText = currentQues.a;
    outAnswers[1].innerText = currentQues.b;
    outAnswers[2].innerText = currentQues.c;
    outAnswers[3].innerText = currentQues.d;
}
