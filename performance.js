


function getYesterdayHours() {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let key = d.toISOString().split("T")[0];

    let data = JSON.parse(localStorage.getItem("studyData")) || {};
    return data[key]?.hours || 0;
}

function getYesterdayTarget() {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let key = d.toISOString().split("T")[0];

    let data = JSON.parse(localStorage.getItem("studyData")) || {};
    return data[key]?.target || 0;
}

function renderChart(data) {
    let labels = [];
    let values = [];

    for (let i = 6; i >= 0; i--) {
        let d = new Date();
        d.setDate(d.getDate() - i);

        let key = d.toISOString().split("T")[0];

        labels.push(d.toLocaleDateString("en-US", { weekday: "short" }));
        values.push(data[key]?.hours || 0);
    }

    const ctx = document.getElementById("studyChart").getContext("2d");

    // 🔥 Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, "rgba(139,92,246,0.6)");
    gradient.addColorStop(1, "rgba(139,92,246,0)");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Study Hours",
                data: values,

                borderColor: "#8b5cf6",
                backgroundColor: gradient,

                fill: true,
                tension: 0.45,

                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: "#8b5cf6",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,

                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            animation: {
                duration: 1200,
                easing: "easeInOutQuart"
            },

            plugins: {
                legend: {
                    display: false   // 🔥 cleaner look
                },
                tooltip: {
                    backgroundColor: "#111827",
                    borderColor: "#8b5cf6",
                    borderWidth: 1,
                    padding: 10,
                    titleColor: "#fff",
                    bodyColor: "#aaa",
                    displayColors: false
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: "#94a3b8",
                        font: { size: 12 }
                    },
                    grid: {
                        color: "rgba(255,255,255,0.05)"
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#94a3b8",
                        font: { size: 12 }
                    },
                    grid: {
                        color: "rgba(255,255,255,0.05)"
                    }
                }
            }
        }
    });
}

function renderSubjectChart(data) {
    let subjects = {};

    for (let key in data) {
        let item = data[key];
        if (!subjects[item.subject]) subjects[item.subject] = 0;
        subjects[item.subject] += item.hours;
    }

    new Chart(document.getElementById("subjectChart"), {
        type: "doughnut",
        data: {
            labels: Object.keys(subjects),
            datasets: [{
                data: Object.values(subjects),
                backgroundColor: ["#8b5cf6", "#10b981", "#3b82f6"]
            }]
        }
    });
}

function updateStats(data) {
    let total = 0;
    let days = 0;

    for (let key in data) {
        total += data[key].hours;
        days++;
    }

    let avg = days ? (total / days).toFixed(1) : 0;
    animateValue("avgStudy", 0, avg, 800);
    document.getElementById("avgStudy").innerText += "h/day";

    let focus = days ? Math.round((total / days) * 100) : 0;
    animateValue("focusRatio", 0, focus, 800);
    document.getElementById("focusRatio").innerText += "%";

    let consistency = Math.min(100, days * 10);
    animateValue("consistency", 0, consistency, 800);
    document.getElementById("consistency").innerText += "/100";
}

window.onload = function () {
    let data = JSON.parse(localStorage.getItem("studyData")) || {};

    renderChart(data);
    renderSubjectChart(data);
    updateStats(data);
    updateInsight(data);
};


function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);

        let value = Math.floor(progress * range + start);

        obj.innerText = value;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}


function updateInsight(data) {
    let y = getYesterdayHours();
    let t = getYesterdayTarget();

    let msg = "";

    if (y === 0) {
        msg = "⚠️ No study yesterday — let's bounce back today!";
    } else if (y < t) {
        msg = `📉 You studied ${y}h — try to reach your ${t}h target!`;
    } else {
        msg = `🔥 Great job! ${y}h completed — target achieved!`;
    }

    document.getElementById("insightText").innerText = msg;
}


