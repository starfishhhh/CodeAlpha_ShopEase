const token = localStorage.getItem("token");

if (!token) {

    alert("Please login before checkout.");

    window.location.href = "login.html";

}
const API_URL = "https://codealpha-shopease1.onrender.com/api";

async function loadCheckoutSummary() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");

    let total = 0;

    if (cart.length === 0) {

    checkoutItems.innerHTML = `
        <p>Your cart is empty.</p>
        <a href="products.html" class="btn">
            Continue Shopping
        </a>
    `;

    checkoutTotal.textContent = "0";

    return;
}

    for (const item of cart) {

        try {

            const response = await fetch(
                `${API_URL}/products/${item.productId}`
            );

            if (!response.ok) {
                throw new Error("Product not found");
            }

            const product = await response.json();

            const subtotal =
                product.price * item.quantity;

            total += subtotal;

            const itemElement =
                document.createElement("div");

            itemElement.innerHTML = `
                <p>
                    <strong>${product.name}</strong>
                </p>

                <p>
                    Price: ₹${product.price}
                </p>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <p>
                    Subtotal: ₹${subtotal}
                </p>

                <hr>
            `;

            checkoutItems.appendChild(itemElement);

        }

        catch (error) {

            console.error(
                "Error loading checkout product:",
                error
            );

        }

    }

    checkoutTotal.textContent = total;

}


loadCheckoutSummary();
document.getElementById("checkout-form").addEventListener("submit", async function(event) {

    event.preventDefault();

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const shippingAddress = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        pincode: document.getElementById("pincode").value
    };

    const orderItems = cart.map(item => ({
        product: item.productId,
        quantity: item.quantity
    }));

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login before placing an order.");
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(`${API_URL}/orders`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                items: orderItems,
                shippingAddress: shippingAddress
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to place order");
        }

        alert("Order placed successfully!");

        localStorage.removeItem("cart");

        window.location.href = "orders.html";

    } catch (error) {

        console.error("Order placement error:", error);

        alert(error.message);
    }

});
