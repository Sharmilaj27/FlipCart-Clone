// ==========================================
// PROFILE.JS
// ==========================================

const PROFILE_API = "http://localhost:8081/api/profile";

// ==========================================
// LOAD PROFILE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
});

// ==========================================
// GET USER PROFILE
// ==========================================

async function loadProfile() {

    try {

        const response = await fetch(PROFILE_API);

        if (!response.ok) {
            throw new Error("Failed to load profile");
        }

        const user = await response.json();

        document.getElementById("name").value =
            user.name || "";

        document.getElementById("email").value =
            user.email || "";

        document.getElementById("phone").value =
            user.phone || "";

        document.getElementById("address").value =
            user.address || "";

    } catch (error) {

        console.error(error);

        alert("Unable to load profile");
    }
}

// ==========================================
// UPDATE PROFILE
// ==========================================

async function updateProfile(event) {

    event.preventDefault();

    const userData = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value
    };

    try {

        const response = await fetch(PROFILE_API, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Update Failed");
        }

        const updatedUser =
            await response.json();

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        alert("Profile Updated Successfully");

    } catch (error) {

        console.error(error);

        alert("Unable To Update Profile");
    }
}

// ==========================================
// RESET FORM
// ==========================================

function resetProfile() {

    loadProfile();
}

// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    window.location.href = "login.html";
}