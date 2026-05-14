function goBack() {
    window.location.href = "dashboard.html";
}

function sendMessage() {

    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim();

    if(message === "") return;

    // USER MESSAGE

    const userDiv = document.createElement("div");

    userDiv.classList.add("user-message");

    userDiv.innerText = message;

    chatBox.appendChild(userDiv);

    // AI REPLY

    const aiDiv = document.createElement("div");

    aiDiv.classList.add("ai-message");

    aiDiv.innerHTML =
        "🤖 AI Tutor is thinking...<br><br>" +
        "This feature will connect with Gemini/OpenAI API soon.";

    setTimeout(() => {
        chatBox.appendChild(aiDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    input.value = "";
}