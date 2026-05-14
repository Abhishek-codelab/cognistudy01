console.log("JS Loaded");

// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (!email || !password) {
                alert("Please enter email and password");
                return;
            }

            localStorage.setItem("user", JSON.stringify({ email }));

            window.location.href = "dashboard.html";
        });
    }
});


// Dashboard Auth Check
if (window.location.pathname.includes("dashboard.html")) {
    const user = localStorage.getItem("user");

    if (!user) {
        window.location.href = "login.html";
    } else {
        const data = JSON.parse(user);
        const el = document.getElementById("user-email");

        if (el) {
            el.innerText = "Logged in as: " + data.email;
        }
    }
}


// Logout
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}