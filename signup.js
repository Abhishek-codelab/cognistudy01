import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEXk2QydAYGAS7bEftBTTIhkELr0cx-Bs",
  authDomain: "cognistudy-2a30a.firebaseapp.com",
  projectId: "cognistudy-2a30a",
  storageBucket: "cognistudy-2a30a.firebasestorage.app",
  messagingSenderId: "585491655217",
  appId: "1:585491655217:web:1b6dd8ec3399b538de4310"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

window.signupUser = function () {

    const name =
    document.getElementById("name").value;

    const studentClass =
    document.getElementById("class").value;

    const goal =
    document.getElementById("goal").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    if(
        name === "" ||
        studentClass === "" ||
        goal === "" ||
        email === "" ||
        password === ""
    ){
        alert("Please fill all fields");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

        const userData = {
            name,
            studentClass,
            goal,
            email
        };

        localStorage.setItem(
            "cogniUser",
            JSON.stringify(userData)
        );

        alert("✅ Account Created Successfully");

        window.location.href = "login.html";

    })

    .catch((error) => {

        alert(error.message);

    });

}