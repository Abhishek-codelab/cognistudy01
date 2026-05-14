// const email = document.querySelector('input[type="email"]').value;

// // store ONLY username (not full object)
// localStorage.setItem("username", email.split("@")[0]);



function loginUser(){

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const savedUser =
        JSON.parse(localStorage.getItem("cogniUser"));

    if(!savedUser){
        alert("No account found");
        return;
    }

    if(
        email === savedUser.email &&
        password === savedUser.password
    ){

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        window.location.href =
            "dashboard.html";

    }else{

        alert("Wrong Email or Password");
    }
}