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
    help = document.querySelector(".help"),
    clearCatch = document.querySelector(".clear-catch");

let list = [],
    currentQuestion,
    isNext = false,
    wrongQuestion;

async function fetchApi(url) {
    list = await (await fetch(url)).json().catch((err) => {
        console.warn(err);
        return;
    });
    console.log(list);
    if (list !== undefined && list.length != 0) {
        formSelect.classList.remove("active");
        formQuestion.classList.add("active");

        changeTitle("loading...");
        //remove class answer
        removeClassAnswer();
        loadQuestion();
    }
}

function changeTitle(str) {
    document.title = str;
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
    changeTitle("Studying...");
    currentQuestion = chooseQuestion();
    if (currentQuestion !== undefined) {
        title.textContent = currentQuestion.question;
        a.textContent = currentQuestion.a;
        b.textContent = currentQuestion.b;
        c.textContent = currentQuestion.c;
        d.textContent = currentQuestion.d;
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
        `div[name='${currentQuestion.correctAnswer}']`
    );
    correct.classList.add("correct");
}

function addToLocalStorage() {
    wrongQuestion.push(currentQuestion);
    localStorage.setItem("wrongQuestion", JSON.stringify(wrongQuestion));
}

async function useChoose(e) {
    console.log(e.target.getAttribute("name"));

    // check user answer
    if (e.target.getAttribute("name") == currentQuestion.correctAnswer) {
        e.target.classList.add("correct");
    } else {
        e.target.classList.add("failed");
        // show correct answer
        showCorrectAnswer();
        // add to local storage
        addToLocalStorage();
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

function showSectionWrongQuestion() {
    console.log("hi");
    wrongQuestion = JSON.parse(localStorage.getItem("wrongQuestion"));
    if (wrongQuestion === undefined || wrongQuestion === null) {
        console.log("don't visit");
        wrongQuestion = [];
    } else {
        console.log("visited");
        // add section
        let sectionWrongQuestion = document.createElement("div");
        sectionWrongQuestion.classList.add("list-item", "list-item--wrong");
        sectionWrongQuestion.innerHTML =
            "<i class='bx bxs-bookmark bx-tada bx-lg' ></i>";
        formSelect.appendChild(sectionWrongQuestion);
        console.log(sectionWrongQuestion);
        sectionWrongQuestion.addEventListener("click", (e) => {
            formSelect.classList.remove("active");
            formQuestion.classList.add("active");
            list = wrongQuestion;
            removeClassAnswer();
            loadQuestion();
        });
    }
}

sections.forEach((e) => {
    e.addEventListener("mouseover", (e) => {
        // console.log(e.target.querySelector("i"));
        // console.log(e.target);
        e.target.querySelector("i").classList.add("bx-tada");
    });
    e.addEventListener("mouseleave", (e) => {
        // console.log(e.target);
        e.target.querySelector("i").classList.remove("bx-tada");
    });
});

// function click
goBack.addEventListener("click", (e) => {
    changeTitle("Q&A");
    formSelect.classList.add("active");
    formQuestion.classList.remove("active");
    // reset all
    todo = [];
    showSectionWrongQuestion();
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

clearCatch.addEventListener("click", (e) => {
    console.log(e.target);
    let empty = null;
    localStorage.setItem("wrongQuestion", null);
});

// close help content
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("help-content", "active")) {
        // console.log(e.target);
        e.target.classList.remove("active");
        // remove class
        help.classList.remove("bx-border-circle");
        document.querySelector(".help-content").classList.remove("active");
    }
});

// check local storage has do it
document.addEventListener("load", showSectionWrongQuestion());

a.addEventListener("click", useChoose);
b.addEventListener("click", useChoose);
c.addEventListener("click", useChoose);
d.addEventListener("click", useChoose);
