let challenges = [
  { name: "7 Day Consistency", users: 120 },
  { name: "Deep Focus 5 Day", users: 80 }
];





function joinRoom() {
    document.getElementById("roomStatus").innerHTML = `
        <p>⏱ Timer: 25:00</p>
        <p>👤 You joined DSA Room</p>
    `;
}

function loadLeaderboard() {
    let users = [
        { name: "Abhishek", hours: 20 },
        { name: "Rahul", hours: 18 },
        { name: "Aman", hours: 15 }
    ];

    let html = "";

    users.forEach((u, i) => {
        html += `<p>${i+1}. ${u.name} 🔥 (${u.hours} hrs)</p>`;
    });

    document.getElementById("leaderboard").innerHTML = html;
}

function loadChallenges() {
    document.getElementById("challenges").innerHTML = `
        <p>🔥 7 Day Consistency (5/7)</p>
    `;
}

function loadFeed() {
    document.getElementById("feed").innerHTML = `
        <p>🎉 Abhishek completed 11h study!</p>
        <p>🔥 Rahul reached 5 day streak</p>
    `;
}

window.onload = function () {
    loadLeaderboard();
    loadChallenges();
    loadFeed();
    renderPosts();
    renderChallenges();
};


function showTab(tab) {
    document.getElementById("feedTab").style.display = "none";
    document.getElementById("leaderboardTab").style.display = "none";
    document.getElementById("roomsTab").style.display = "none";

    document.getElementById(tab + "Tab").style.display = "block";
}


function addPost() {
    let text = document.getElementById("postInput").value;

    if (!text) return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.unshift({
        id: Date.now(),
        user: "Abhishek",
        avatar: "https://i.pravatar.cc/40",
        text: text,
        likes: 0,
        likedUsers: []
});

    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("postInput").value = "";

    avatar: "https://i.pravatar.cc/40"

    renderPosts();
}




function renderPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    let html = "";

    posts.forEach(post => {
        html += `
        <div class="feed-card">

            <div class="feed-header">
                <img src="${post.avatar}" class="avatar">
                <b>${post.user}</b>
            </div>

            <p>${post.text}</p>

            <div class="feed-actions">
                <button class="like-btn" onclick="likePost(${post.id})">
                    ❤️ ${post.likes}
                </button>
            </div>

        </div>
        `;
    });

    document.getElementById("feedContainer").innerHTML = html;
}


function likePost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.map(p => {
        if (p.id === id) {

            if (!p.likedUsers) p.likedUsers = [];

            let currentUser = "Abhishek";

            // ❌ Already liked
            if (p.likedUsers.includes(currentUser)) return p;

            // ✅ Add like
            p.likedUsers.push(currentUser);
            p.likes = p.likedUsers.length;
        }
        return p;
    });

    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}



function addComment(id) {
    let input = document.getElementById("c-" + id);
    let text = input.value;

    if (!text) return;

    let posts = JSON.parse(localStorage.getItem("posts"));

    posts = posts.map(p => {
        if (p.id === id) {
            p.comments.push(text);
        }
        return p;
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    renderPosts();
}


function renderChallenges() {
    let html = "";

    challenges.forEach(c => {
        html += `
        <div class="card">
            🔥 ${c.name} <br>
            ${c.users} joined <br><br>
            <button onclick="joinChallenge('${c.name}')">Join</button>
        </div>
        `;
    });

    document.getElementById("challengeBox").innerHTML = html;
}


function joinChallenge(name) {
    alert("Joined " + name);
}




