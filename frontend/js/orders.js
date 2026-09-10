const API_URL = "http://localhost:5000/api";

async function loadOrders() {

    const ordersContainer =
        document.getElementById("orders-container");

    const token = localStorage.getItem("token");

    if (!token) {

        ordersContainer.innerHTML = `
            <p>Please login to view your orders.</p>
            <a href="login.html" class="btn">
                Login
            </a>
        `;

        return;
    }

    try {

        const response = await fetch(`${API_URL}/orders`, {

            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }

        });

        const orders = await response.json();

        if (!response.ok) {
            throw new Error(
                orders.message || "Failed to load orders"
            );
        }


        if (orders.length === 0) {

            ordersContainer.innerHTML = `
                <p>You have no orders yet.</p>

                <a href="products.html" class="btn">
                    Start Shopping
                </a>
            `;

            return;
        }


        ordersContainer.innerHTML = "";


        orders.forEach(order => {

            const orderElement =
                document.createElement("div");

            orderElement.innerHTML = `

                <h3>
                    Order ID: ${order._id}
                </h3>

                <p>
                    Date:
                    ${new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p>
                    Total: ₹${order.totalAmount}
                </p>

                <p>
                    Status: ${order.status}
                </p>

                <h4>Products:</h4>

                <ul>

                    ${order.items.map(item => `

                        <li>
                            ${item.product.name}
                            -
                            ₹${item.price}
                            ×
                            ${item.quantity}
                        </li>

                    `).join("")}

                </ul>

                <hr>

            `;

            ordersContainer.appendChild(orderElement);

        });

    }

    catch (error) {

        console.error(
            "Error loading orders:",
            error
        );

        ordersContainer.innerHTML = `
            <p>Unable to load your orders.</p>
        `;

    }

}


loadOrders();
