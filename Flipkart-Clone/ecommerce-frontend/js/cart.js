// ==========================================
// CART.JS
// ==========================================

const CART_API = "http://localhost:8081/api/cart";

// Load cart when page opens
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

// ==========================================
// LOAD CART ITEMS
// ==========================================

async function loadCart() {

    const cartContainer =
        document.getElementById("cart-container");

    try {

        const response =
            await fetch(CART_API);

        if (!response.ok) {
            throw new Error("Failed to load cart");
        }

        const cartItems =
            await response.json();

        displayCart(cartItems);

    } catch (error) {

        console.error(error);

        cartContainer.innerHTML =
            "<h2>Your cart is empty</h2>";
    }
}

// ==========================================
// DISPLAY CART
// ==========================================

function displayCart(cartItems) {

    const cartContainer =
        document.getElementById("cart-container");

    const totalElement =
        document.getElementById("cart-total");

    cartContainer.innerHTML = "";

    let total = 0;

    cartItems.forEach(item => {

        total += item.price;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <img
                    src="${item.imageUrl}"
                    alt="${item.name}"
                    width="120"
                >

                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <h4>₹${item.price}</h4>

                    <button
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>

            </div>
        `;
    });

    totalElement.innerHTML =
        `Total: ₹${total}`;
}

// ==========================================
// REMOVE ITEM
// ==========================================

async function removeFromCart(productId) {

    try {

        const response =
            await fetch(
                `${CART_API}/remove/${productId}`,
                {
                    method: "DELETE"
                }
            );

        if (!response.ok) {
            throw new Error("Remove failed");
        }

        loadCart();

    } catch (error) {

        console.error(error);

        alert("Unable to remove product");
    }
}

// ==========================================
// CLEAR CART
// ==========================================

async function clearCart() {

    try {

        const response =
            await fetch(
                `${CART_API}/clear`,
                {
                    method: "DELETE"
                }
            );

        if (!response.ok) {
            throw new Error("Failed");
        }

        loadCart();

        alert("Cart Cleared");

    } catch (error) {

        console.error(error);
    }
}

// ==========================================
// CHECKOUT
// ==========================================

function proceedToCheckout() {

    window.location.href =
        "checkout.html";
}