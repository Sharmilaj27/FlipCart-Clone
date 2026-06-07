// ==========================================
// API CONFIG
// ==========================================

const BASE_URL = "http://localhost:8081/api";

// ==========================================
// COMMON REQUEST METHODS
// ==========================================

async function getRequest(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error(`GET Error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

async function postRequest(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`POST Error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

async function putRequest(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`PUT Error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

async function deleteRequest(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`DELETE Error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

// ==========================================
// AUTH API
// ==========================================

async function login(userData) {
    return await postRequest("/auth/login", userData);
}

async function register(userData) {
    return await postRequest("/auth/register", userData);
}

// ==========================================
// PRODUCTS API
// ==========================================

async function getAllProducts() {
    return await getRequest("/products");
}

async function getProductById(id) {
    return await getRequest(`/products/${id}`);
}

async function searchProducts(keyword) {
    return await getRequest(`/products/search/${keyword}`);
}

// ==========================================
// CART API
// ==========================================

async function getCartItems() {
    return await getRequest("/cart");
}

async function addToCart(productId) {
    return await postRequest(`/cart/add/${productId}`, {});
}

async function removeFromCart(productId) {
    return await deleteRequest(`/cart/remove/${productId}`);
}

async function clearCart() {
    return await deleteRequest("/cart/clear");
}

// ==========================================
// CHECKOUT API
// ==========================================

async function checkout(orderData) {
    return await postRequest("/checkout", orderData);
}

// ==========================================
// ORDERS API
// ==========================================

async function getOrders() {
    return await getRequest("/orders");
}

async function getOrderById(orderId) {
    return await getRequest(`/orders/${orderId}`);
}

// ==========================================
// PROFILE API
// ==========================================

async function getProfile() {
    return await getRequest("/profile");
}

async function updateProfile(profileData) {
    return await putRequest("/profile/update", profileData);
}

// ==========================================
// LOCAL STORAGE HELPERS
// ==========================================

function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}