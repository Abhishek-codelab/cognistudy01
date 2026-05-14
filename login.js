import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
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

window.loginUser = function () {

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

    const user = userCredential.user;

    const userData = {

        name: user.email.split("@")[0],

        email: user.email
    };

    localStorage.setItem(
        "cogniUser",
        JSON.stringify(userData)
    );

    localStorage.setItem(
        "loggedIn",
        "true"
    );

    alert("✅ Login Successful");

    window.location.href =
    "dashboard.html";

})

    .catch((error) => {

        alert(error.message);

    });

}