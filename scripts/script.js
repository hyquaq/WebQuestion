let formSelect = document.querySelector(".select-form"),
    sections = document.querySelectorAll(".list-item"),
    formQuestion = document.querySelector(".question-form"),
    title = document.querySelector(".question-title"),
    a = document.querySelector(".question-answer>.a"),
    b = document.querySelector(".question-answer>.b"),
    c = document.querySelector(".question-answer>.c"),
    d = document.querySelector(".question-answer>.d"),
    goBack = document.querySelector(".go-back"),
    nextQuestion = document.querySelector(".next-question"),
    autoNext = document.querySelector(".auto-next"),
    help = document.querySelector(".help");

let list = [],
    questionCurrent,
    isNext = false;

async function fetchApi(url) {
    list = await (await fetch(url)).json().catch((err) => {
        console.warn(err);
        return;
    });
    console.log(list);
    if (list !== undefined && list.length != 0) {
        formSelect.classList.remove("active");
        formQuestion.classList.add("active");

        //remove class answer
        removeClassAnswer();
        loadQuestion();
    }
}

function chooseQuestion() {
    let choose = list[Math.floor(Math.random() * list.length)];
    // remove question
    list = list.filter((value) => {
        if (value != choose) {
            return value;
        }
    });
    return choose;
}

function loadQuestion() {
    questionCurrent = chooseQuestion();
    if (questionCurrent !== undefined) {
        title.textContent = questionCurrent.question;
        a.textContent = questionCurrent.a;
        b.textContent = questionCurrent.b;
        c.textContent = questionCurrent.c;
        d.textContent = questionCurrent.d;
    } else {
        formSelect.classList.add("active");
        formQuestion.classList.remove("active");
    }
}

function disableUserChoose(status = "none") {
    // disable all answer
    [a, b, c, d].forEach((v) => {
        v.style.pointerEvents = status;
    });
}

function fadeAnswer() {
    [a, b, c, d].forEach((v) => {
        if (
            !v.classList.contains("correct") &&
            !v.classList.contains("failed")
        ) {
            v.classList.add("fade");
        }
    });
}

function showCorrectAnswer() {
    let correct = document.querySelector(
        `div[name='${questionCurrent.correctAnswer}']`
    );
    correct.classList.add("correct");
}

async function useChoose(e) {
    console.log(e.target.getAttribute("name"));

    // check user answer
    if (e.target.getAttribute("name") == questionCurrent.correctAnswer) {
        e.target.classList.add("correct");
    } else {
        e.target.classList.add("failed");
        // show correct answer
        showCorrectAnswer();
    }
    fadeAnswer();

    // console.log(e.target);

    disableUserChoose();

    if (isNext) {
        // after 5s next question
        await new Promise((r) => setTimeout(r, 5000));
        removeClassAnswer();
        loadQuestion();
    }
}

function removeClassAnswer() {
    disableUserChoose("auto");
    [a, b, c, d].forEach((v) => {
        v.classList.remove("fade", "correct", "failed");
    });
}

sections.forEach((e) => {
    e.addEventListener("mouseover", (e) => {
        // console.log(e.target.querySelector("i"));
        console.log(e.target);
        e.target.querySelector("i").classList.add("bx-tada");
    });
    e.addEventListener("mouseleave", (e) => {
        console.log(e.target);
        e.target.querySelector("i").classList.remove("bx-tada");
    });
});

// function click
goBack.addEventListener("click", (e) => {
    formSelect.classList.add("active");
    formQuestion.classList.remove("active");
    // reset all
    todo = [];
});

nextQuestion.addEventListener("click", (e) => {
    loadQuestion();
    removeClassAnswer();
});

autoNext.addEventListener("click", (e) => {
    isNext = !isNext;
    autoNext.classList.toggle("bx-spin");
    autoNext.classList.toggle("bx-border-circle");
});

help.addEventListener("click", (e) => {
    help.classList.add("bx-border-circle");
    document.querySelector(".help-content").classList.add("active");
});

// out help
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("help-content", "active")) {
        // console.log(e.target);
        e.target.classList.remove("active");
        // remove class
        help.classList.remove("bx-border-circle");
        document.querySelector(".help-content").classList.remove("active");
    }
});

a.addEventListener("click", useChoose);
b.addEventListener("click", useChoose);
c.addEventListener("click", useChoose);
d.addEventListener("click", useChoose);
