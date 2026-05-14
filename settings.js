// SAVE USERNAME

function saveUsername(){

    let input =
    document.getElementById("usernameInput").value;

    if(input.trim() === "") return;

    localStorage.setItem("username", input);

    document.getElementById("usernameText").innerText = input;

    document.getElementById("profileName").innerText = input;
}

// LOAD USERNAME

window.onload = function(){

    let saved =
    localStorage.getItem("username");

    if(saved){

        document.getElementById("usernameText").innerText = saved;

        document.getElementById("profileName").innerText = saved;
    }

    // LOAD THEME

    if(localStorage.getItem("theme") === "light"){

        document.body.classList.add("light-mode");
    }
}

// DARK MODE TOGGLE

function toggleDarkMode(){

    document.body.classList.toggle("light-mode");

    // SAVE MODE

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme","light");

    }else{

        localStorage.setItem("theme","dark");
    }
}

// EXPORT DATA

function exportData(){

    const data = localStorage;

    let text = JSON.stringify(data, null, 2);

    let blob = new Blob([text], {
        type: "application/json"
    });

    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "cognistudy-data.json";

    a.click();
}


const userData =
JSON.parse(localStorage.getItem("cogniUser"));

if(userData){

    document.getElementById("settingsName")
    .innerText =
    userData.name;

    document.getElementById("settingsEmail")
    .innerText =
    userData.email;

    document.getElementById("settingsGoal")
    .innerText =
    userData.goal;
}