const form = document.getElementById("registerForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const user = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        phone: document.getElementById("phone").value
    };

    try{

        const response = await fetch(
            "http://localhost:8080/api/auth/register",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            }
        );

        const data = await response.json();

        alert("Registration Successful");

        window.location.href = "login.html";

    }catch(error){

        alert("Backend Not Running");
    }

});