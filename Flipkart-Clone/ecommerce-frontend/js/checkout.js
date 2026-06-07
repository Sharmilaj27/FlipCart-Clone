// ==========================================
// CHECKOUT.JS
// ==========================================

const CHECKOUT_API = "http://localhost:8081/api/checkout";
const CART_API = "http://localhost:8081/api/cart";

// ==========================================
// LOAD CHECKOUT DATA
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    loadCheckoutSummary();
});

// ==========================================
// LOAD CART SUMMARY
// ==========================================

async function loadCheckoutSummary() {

    const summaryContainer =
        document.getElementById("order-summary");

    try {

        const response =
            await fetch(CART_API);

        if (!response.ok) {
            throw new Error("Failed to load cart");
        }

        const cartItems =
            await response.json();

        let total = 0;

        summaryContainer.innerHTML = "";

        cartItems.forEach(item => {

            total += item.price;

            summaryContainer.innerHTML += `
                <div class="checkout-item">
                    <p>${item.name}</p>
                    <p>₹${item.price}</p>
                </div>
            `;
        });

        document.getElementById("total-amount")
            .innerText = `₹${total}`;

    } catch (error) {

        console.error(error);

        summaryContainer.innerHTML =
            "<p>Unable to load order summary</p>";
    }
}

// ==========================================
// PLACE ORDER
// ==========================================

async function placeOrder(event) {

    event.preventDefault();

    const fullName =
        document.getElementById("fullName").value;

    const email =
        document.getElementById("email").value;

    const phone =
        document.getElementById("phone").value;

    const address =
        document.getElementById("address").value;

    const paymentMethod =
        document.getElementById("paymentMethod").value;

    const orderData = {
        fullName,
        email,
        phone,
        address,
        paymentMethod
    };

    try {

        const response =
            await fetch(CHECKOUT_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

        if (!response.ok) {
            throw new Error("Order Failed");
        }

        const result =
            await response.json();

        alert(
            "Order Placed Successfully!\nOrder ID: "
            + result.id
        );

        window.location.href =
            "orders.html";

    } catch (error) {

        console.error(error);

        alert("Unable to place order");
    }
}

// ==========================================
// CALCULATE DELIVERY CHARGE
// ==========================================

function calculateTotal() {

    const subtotal =
        parseFloat(
            document.getElementById("subtotal")
            ?.innerText || 0
        );

    const deliveryCharge = 50;

    const total =
        subtotal + deliveryCharge;

    document.getElementById("delivery-charge")
        .innerText = "₹" + deliveryCharge;

    document.getElementById("total-amount")
        .innerText = "₹" + total;
}