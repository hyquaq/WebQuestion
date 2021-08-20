let path =
    "https://raw.githubusercontent.com/hyquaq/WebQuestion/master/data/qp1.json";
let questions = [];
let currentQues = undefined;
let outQuestion = document.querySelector(".form-study__body .body__question");
let outAnswers = document.querySelectorAll(
    ".form-study__body .body__answers > li"
);
let btnNext = document.querySelector(".form-study__body .next");
let yourScore = 0;
let totalScore = 0;
let score = document.querySelector(
    ".main .form-study__title .title__total-score "
);
let divShowScore = document.querySelector(".show-score");

function loadQuestion(path) {
    fetch(path)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            questions = data;
        })
        .catch(() => console.log("error"));
    yourScore = 0;
    totalScore = 0;
}

function updateScore() {
    let html = `${yourScore}/${totalScore} points`;
    score.innerText = html;
}

outAnswers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
        // console.log(e.target.value);
        console.log(e.target.value == currentQues.correctAnswer);
        if (e.target.value == currentQues.correctAnswer) {
            // console.log(e.target.classList);
            e.target.classList.add("answer--right");
            yourScore++;

            // update score
            updateScore();
        } else {
            e.target.classList.add("answer--wrong");

            // show right-answer
            console.log(outAnswers[parseInt(currentQues.correctAnswer) - 1]);
            outAnswers[parseInt(currentQues.correctAnswer) - 1].classList.add(
                "answer--right"
            );
        }
        outAnswers.forEach((answer) => {
            answer.classList.add("disable");
        });
        // if(e.value)
    });
});

function clearClass() {
    outAnswers.forEach((answer) => {
        answer.classList.remove("answer--right");
        answer.classList.remove("answer--wrong");
    });
    outAnswers.forEach((answer) => {
        answer.classList.remove("disable");
    });
}

btnNext.addEventListener("click", () => {
    nextQuestion();
});

function continueStudy() {
    divShowScore.classList.add("disabled");
}

function nextQuestion() {
    if (questions !== undefined && questions.length !== 0) {
        currentQues = questions[Math.floor(Math.random() * questions.length)];
        // clear class
        clearClass();
        // update score
        totalScore++;
        updateScore();
        // remove question
        questions = questions.filter((value) => {
            if (value != currentQues) {
                return value;
            }
        });

        console.log(questions.length);
    } else if (questions.length === 0) {
        let html = `${yourScore}/${totalScore} points`;
        if (yourScore === 0 && totalScore === 0) {
            html = "Chọn bài bên phải kìa thấy hog dị -.- ";
        }

        if ((yourScore / totalScore) * 100 < 50) {
            html = "kkk tạch rồi đấy";
        }
        if (
            (yourScore / totalScore) * 100 >= 50 &&
            (yourScore / totalScore) * 100 < 60
        ) {
            html = "Qua môn rồi đó -.-";
        }
        if ((yourScore / totalScore) * 100 >= 70) {
            html = "Cũng oke á :))";
        }
        if ((yourScore / totalScore) * 100 >= 90) {
            html = "Tuyệt vời yeah!! :))";
        }

        divShowScore.innerHTML = `${html}
        <button onclick="continueStudy()">Continue</button>`;
        divShowScore.classList.remove("disabled");
    }
    console.log(currentQues);

    // out data
    if (currentQues !== undefined) {
        outQuestion.innerText = currentQues.question;
        outAnswers[0].innerText = currentQues.a;
        outAnswers[1].innerText = currentQues.b;
        outAnswers[2].innerText = currentQues.c;
        outAnswers[3].innerText = currentQues.d;
    }
}
