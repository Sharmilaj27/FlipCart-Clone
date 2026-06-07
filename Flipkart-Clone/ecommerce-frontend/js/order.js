// ==========================================
// ORDERS.JS
// ==========================================

const ORDERS_API = "http://localhost:8081/api/orders";

// Load orders when page opens
document.addEventListener("DOMContentLoaded", () => {
    loadOrders();
});

// ==========================================
// LOAD ALL ORDERS
// ==========================================

async function loadOrders() {

    const ordersContainer =
        document.getElementById("orders-container");

    try {

        const response =
            await fetch(ORDERS_API);

        if (!response.ok) {
            throw new Error("Failed to load orders");
        }

        const orders =
            await response.json();

        displayOrders(orders);

    } catch (error) {

        console.error(error);

        ordersContainer.innerHTML =
            "<h2>No Orders Found</h2>";
    }
}

// ==========================================
// DISPLAY ORDERS
// ==========================================

function displayOrders(orders) {

    const ordersContainer =
        document.getElementById("orders-container");

    ordersContainer.innerHTML = "";

    if (orders.length === 0) {

        ordersContainer.innerHTML =
            "<h2>No Orders Available</h2>";

        return;
    }

    orders.forEach(order => {

        ordersContainer.innerHTML += `
            <div class="order-card">

                <h3>Order #${order.id}</h3>

                <p>
                    <strong>Date:</strong>
                    ${order.orderDate}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${order.status}
                </p>

                <p>
                    <strong>Total:</strong>
                    ₹${order.totalAmount}
                </p>

                <button
                    onclick="viewOrder(${order.id})">
                    View Details
                </button>

            </div>
        `;
    });
}

// ==========================================
// VIEW SINGLE ORDER
// ==========================================

async function viewOrder(orderId) {

    try {

        const response =
            await fetch(
                `${ORDERS_API}/${orderId}`
            );

        if (!response.ok) {
            throw new Error("Order not found");
        }

        const order =
            await response.json();

        alert(
            `Order ID: ${order.id}
Status: ${order.status}
Total: ₹${order.totalAmount}`
        );

    } catch (error) {

        console.error(error);

        alert("Unable to load order");
    }
}

// ==========================================
// CANCEL ORDER
// ==========================================

async function cancelOrder(orderId) {

    try {

        const response =
            await fetch(
                `${ORDERS_API}/cancel/${orderId}`,
                {
                    method: "PUT"
                }
            );

        if (!response.ok) {
            throw new Error("Cancel failed");
        }

        alert("Order Cancelled");

        loadOrders();

    } catch (error) {

        console.error(error);

        alert("Unable to cancel order");
    }
}