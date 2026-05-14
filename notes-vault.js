// ===============================
// NOTES VAULT FINAL JS
// ===============================

// ELEMENTS
const noteCards = document.querySelectorAll(".note-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");

const totalNotes = document.getElementById("totalNotes");
const totalSubjects = document.getElementById("totalSubjects");
const totalPdf = document.getElementById("totalPdf");

const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");

const backBtn = document.getElementById("backBtn");


// ===============================
// REMOVE THREE DOTS
// ===============================

document.querySelectorAll(".three-dot").forEach(dot => {
    dot.style.display = "none";
});


// ===============================
// REAL DATA COUNTER
// ===============================

function updateStats() {

    // TOTAL NOTES
    totalNotes.innerText = noteCards.length;

    // TOTAL PDF
    let pdfCount = 0;

    // SUBJECTS
    let subjectSet = new Set();

    noteCards.forEach(card => {

        // PDF COUNT
        if (card.dataset.category === "pdf") {
            pdfCount++;
        }

        // SUBJECT TAGS
        const tags = card.querySelectorAll(".tag");

        tags.forEach(tag => {
            subjectSet.add(tag.innerText);
        });

    });

    totalPdf.innerText = pdfCount;

    totalSubjects.innerText = subjectSet.size;

}

updateStats();


// ===============================
// FILTER BUTTONS WORKING
// ===============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // ACTIVE BUTTON
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        noteCards.forEach(card => {

            if (filter === "all") {

                card.style.display = "block";

            } else {

                if (card.dataset.category === filter) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            }

        });

    });

});


// ===============================
// SEARCH NOTES
// ===============================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    noteCards.forEach(card => {

        const title =
            card.querySelector("h2").innerText.toLowerCase();

        const desc =
            card.querySelector("p").innerText.toLowerCase();

        if (
            title.includes(value) ||
            desc.includes(value)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// ===============================
// OPEN BUTTONS
// ===============================

document.querySelectorAll(".open-btn").forEach(button => {

    button.addEventListener("click", () => {

        const noteName =
            button.closest(".note-card")
            .querySelector("h2")
            .innerText;

        // YOUTUBE LINKS

        if (noteName.includes("DSA")) {

            window.open(
                "https://www.youtube.com/results?search_query=dsa+revision",
                "_blank"
            );

        }

        else if (noteName.includes("Physics")) {

            window.open(
                "https://www.youtube.com/results?search_query=physics+formula+revision",
                "_blank"
            );

        }

        else {

            window.open(
                "https://www.youtube.com/results?search_query=ai+productivity+prompts",
                "_blank"
            );

        }

    });

});


// ===============================
// UPLOAD NOTES
// ===============================

uploadBtn.addEventListener("click", () => {

    fileInput.click();

});

fileInput.addEventListener("change", () => {

    if (fileInput.files.length > 0) {

        const file = fileInput.files[0];

        alert(file.name + " uploaded successfully 🚀");

    }

});


// ===============================
// AI MINDMAP BUTTON
// ===============================

const aiMindmapBtn = document.getElementById("aiMindmapBtn");

if (aiMindmapBtn) {

    aiMindmapBtn.addEventListener("click", () => {

        window.open(
            "https://www.youtube.com/results?search_query=ai+mindmap+tool",
            "_blank"
        );

    });

}


// ===============================
// BACK BUTTON FIXED
// ===============================

if (backBtn) {

    backBtn.addEventListener("click", () => {

        window.location.href = "dashboard.html";

    });

}


// ===============================
// HOVER EFFECT
// ===============================

noteCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";
        card.style.transition = "0.3s";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});