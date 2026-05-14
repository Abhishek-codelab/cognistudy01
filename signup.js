function signupUser(){

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

    const userData = {
        name,
        studentClass,
        goal,
        email,
        password
    };

    localStorage.setItem(
        "cogniUser",
        JSON.stringify(userData)
    );

    alert("Account Created Successfully");

    window.location.href = "login.html";
}