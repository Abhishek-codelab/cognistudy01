function goBack(){
    window.location.href = "dashboard.html";
}

function generatePlan(){

    const goal =
        document.getElementById("goalInput").value;

    const hours =
        document.getElementById("hoursInput").value;

    const days =
        document.getElementById("daysInput").value;

    const container =
        document.getElementById("planContainer");

    if(goal === "" || hours === "" || days === ""){
        alert("Please fill all fields");
        return;
    }

    container.innerHTML = "";

    const topics = [

        "Introduction",
        "Core Concepts",
        "Practice Problems",
        "Revision",
        "Advanced Concepts",
        "Mock Test",
        "Weak Topics",
        "Final Revision"

    ];

    for(let i=1; i<=days; i++){

        const card = document.createElement("div");

        card.className = "day-card";

        card.innerHTML = `

            <div class="day-title">
                📅 Day ${i}
            </div>

            <div class="topic">
                📘 ${goal} - ${topics[i % topics.length]}
            </div>

            <div class="topic">
                ⏰ Study Duration: ${hours} Hours
            </div>

            <div class="topic">
                🎯 AI Focus: Smart Revision + Practice
            </div>

        `;

        container.appendChild(card);

    }

    // UPDATE STATS

    document.getElementById("topicsCount").innerText =
        days * 2;

    document.getElementById("hoursCount").innerText =
        (hours * days) + "h";

    document.getElementById("daysCount").innerText =
        days;

    document.getElementById("productivityScore").innerText =
        "92%";
}