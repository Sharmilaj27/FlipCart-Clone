// ==========================================
// AUTH.JS
// ==========================================

// LOGIN
async function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8081/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        if (!response.ok) {
            throw new Error("Invalid Credentials");
        }

        const user = await response.json();

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        alert("Login Successful");

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);
        alert("Login Failed");
    }
}

// REGISTER
async function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8081/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );

        if (!response.ok) {
            throw new Error("Registration Failed");
        }

        alert("Registration Successful");

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);
        alert("Registration Failed");
    }
}

// LOGOUT
function logoutUser() {

    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    window.location.href = "login.html";
}

// CHECK LOGIN
function isLoggedIn() {

    return localStorage.getItem("user") !== null;
}

// GET CURRENT USER
function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("user")
    );
}

// PROTECT PAGE
function requireLogin() {

    if (!isLoggedIn()) {

        alert("Please Login First");

        window.location.href = "login.html";
    }
}