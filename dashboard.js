const isLoggedIn =
localStorage.getItem("loggedIn");

if(isLoggedIn !== "true"){

    window.location.href =
    "login.html";
}



// ================= USER =================

let user =
JSON.parse(localStorage.getItem("cogniUser"));

if(!user){

    user = {

        name: "Student",

        email: "student@cognistudy.com"
    };
}


// SHOW USER INFO

const welcomeText =
document.getElementById("welcomeText");

const profileName =
document.getElementById("profileName");

const profileEmail =
document.getElementById("profileEmail");


if (welcomeText) {

    welcomeText.innerText =
    `Welcome back, ${user.name} 👋`;
}


if (profileName) {

    profileName.innerText =
    user.name;
}


if (profileEmail) {

    profileEmail.innerText =
    user.email;
}



// ================= TIMER =================

let time = 1500;

let interval = null;

let currentMode = "pomodoro";


function updateDisplay() {

    let minutes =
    Math.floor(time / 60);

    let seconds =
    time % 60;

    seconds =
    seconds < 10
    ? "0" + seconds
    : seconds;

    document.getElementById("timer")
    .innerText =
    `${minutes}:${seconds}`;
}


// START TIMER

function startTimer() {

    if (interval !== null) return;

    interval = setInterval(() => {

        if (time > 0) {

            time--;

            updateDisplay();

        }

        else {

            clearInterval(interval);

            interval = null;

            alert("⏰ Time's up!");
        }

    }, 1000);
}


// PAUSE TIMER

function pauseTimer() {

    clearInterval(interval);

    interval = null;
}


// RESET TIMER

function resetTimer() {

    clearInterval(interval);

    interval = null;

    if (currentMode === "pomodoro") {

        time = 1500;
    }

    if (currentMode === "short") {

        time = 300;
    }

    if (currentMode === "long") {

        time = 900;
    }

    updateDisplay();
}


// CHANGE MODE

function setMode(minutes, modeName, btn) {

    clearInterval(interval);

    interval = null;

    time = minutes * 60;

    currentMode = modeName;

    updateDisplay();

    document.querySelectorAll(".mode")

    .forEach(button => {

        button.classList.remove("active");

    });

    btn.classList.add("active");
}


// CUSTOM TIMER PAGE

function openCustomTimer() {

    window.location.href =
    "custom-timer.html";
}



// ================= DEADLINES =================

function goToAddDeadline() {

    window.location.href =
    "add-deadline.html";
}


function renderDeadlines() {

    const list =
    document.getElementById("deadlineList");

    if (!list) return;

    let data =

    JSON.parse(
        localStorage.getItem("deadlines")
    )

    || [];

    list.innerHTML = "";

    if (data.length === 0) {

        list.innerHTML =

        "<p class='empty'>No deadlines yet</p>";

        return;
    }

    data.slice().reverse().forEach((item, i) => {

        const realIndex =
        data.length - 1 - i;

        const today =
        new Date();

        const due =
        new Date(item.date);

        const diff =

        Math.ceil(

            (due - today)

            /

            (1000 * 60 * 60 * 24)

        );

        const div =
        document.createElement("div");

        div.className =
        "deadline-item";

        div.innerHTML = `

        <div>

            <strong>${item.name}</strong><br>

            <small>${item.date}</small>

        </div>

        <div class="right">

            <span>${diff}d</span>

            <button onclick="deleteDeadline(${realIndex})">

                ✕

            </button>

        </div>
        `;

        list.appendChild(div);
    });
}


function deleteDeadline(index) {

    let data =

    JSON.parse(
        localStorage.getItem("deadlines")
    )

    || [];

    data.splice(index, 1);

    localStorage.setItem(

        "deadlines",

        JSON.stringify(data)
    );

    renderDeadlines();
}



// ================= STUDY POPUP =================

function openStudyPopup() {

    document.getElementById("studyPopup")

    .classList.remove("hidden");
}


function closePopup() {

    document.getElementById("studyPopup")

    .classList.add("hidden");
}



// CHECK ENTRY

function checkTodayEntry() {

    let today =
    new Date();

    let key =

    today.toISOString().split("T")[0];

    let data =

    JSON.parse(
        localStorage.getItem("studyData")
    )

    || {};

    if (!data[key]) {

        setTimeout(() => {

            openStudyPopup();

        }, 500);

    }

    else {

        loadStudyData();
    }
}



// SAVE STUDY

function saveStudy() {

    const subject =

    document.getElementById("subject").value;

    const hours =

    document.getElementById("hours").value;

    const target =

    document.getElementById("todayTarget").value;

    if (!subject || !hours || !target) {

        alert("⚠️ Fill all fields");

        return;
    }

    let today =
    new Date();

    let key =

    today.toISOString().split("T")[0];

    let data =

    JSON.parse(
        localStorage.getItem("studyData")
    )

    || {};

    data[key] = {

        subject: subject,

        hours: Number(hours),

        target: Number(target)
    };

    localStorage.setItem(

        "studyData",

        JSON.stringify(data)
    );

    alert("✅ Saved Successfully");

    document.getElementById("subject").value = "";

    document.getElementById("hours").value = "";

    document.getElementById("todayTarget").value = "";

    closePopup();

    loadStudyData();
}



// ================= LOAD DASHBOARD =================

function loadStudyData() {

    let today =
    new Date();

    let key =

    today.toISOString().split("T")[0];

    let data =

    JSON.parse(
        localStorage.getItem("studyData")
    )

    || {};

    let done =
    data[key]?.hours || 0;

    let target =
    data[key]?.target || 0;

    let subject =
    data[key]?.subject || "No Subject";



    // TARGET CARD

    document.querySelector(".card:nth-child(1) h2")

    .innerText =

    `${done} / ${target} hrs`;



    // FOCUS CARD

    document.querySelector(".card:nth-child(2) h2")

    .innerText =

    `${done}h`;



    // PRODUCTIVITY

    let percent = 0;

    if (target > 0) {

        percent =

        Math.round((done / target) * 100);
    }

    if (percent > 100) {

        percent = 100;
    }

    document.querySelector(".card:nth-child(3) h2")

    .innerText =

    percent + "%";



    // BADGES

    let badges = [];

    if (done > 0) {

        badges.push("Beginner");
    }

    if (done >= 5) {

        badges.push("Focus Master");
    }

    if (done >= target && target > 0) {

        badges.push("Target Achiever");
    }



    localStorage.setItem(

        "badges",

        JSON.stringify(badges)
    );



    document.getElementById("badgeCount")

    .innerText =

    badges.length + " Badges";



    const badgeList =

    document.getElementById("badgeList");

    if (badgeList) {

        badgeList.innerHTML = "";

        badges.forEach(badge => {

            let span =
            document.createElement("span");

            span.className =
            "badge";

            span.innerText =
            badge;

            badgeList.appendChild(span);
        });
    }



    const mainSubject =

    document.getElementById("mainSubject");

    if (mainSubject) {

        mainSubject.innerText =
        subject;
    }
}



// ================= WINDOW LOAD =================

window.onload = function () {

    updateDisplay();

    renderDeadlines();

    checkTodayEntry();

    loadStudyData();

    let custom =

    localStorage.getItem("customTime");

    if (custom) {

        time = custom * 60;

        updateDisplay();

        localStorage.removeItem("customTime");
    }
};



function logout() {
    alert("Logged out successfully");
    window.location.href = "login.html";
}