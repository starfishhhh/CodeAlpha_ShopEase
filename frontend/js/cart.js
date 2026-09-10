const API_URL = "http://localhost:5000/api";

async function loadCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartContainer =
        document.getElementById("cart-container");

    const emptyCartMessage =
        document.getElementById("empty-cart-message");

    if (cart.length === 0) {

        emptyCartMessage.style.display = "block";

        return;
    }

    emptyCartMessage.style.display = "none";

    for (const item of cart) {

        try {

            const response = await fetch(
                `${API_URL}/products/${item.productId}`
            );

            if (!response.ok) {
                throw new Error("Product not found");
            }

            const product = await response.json();

            const cartItem =
                document.createElement("div");

            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    width="100"
                >

                <div>

                    <h3>${product.name}</h3>

                    <p>Price: ₹${product.price}</p>

                    <p>
                    Quantity:

                    <button onclick="decreaseQuantity('${item.productId}')">
                    −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity('${item.productId}')">
                    +
                    </button>
                    </p>

                    <p>
                    Subtotal:
                    ₹${product.price * item.quantity}
                    </p>

                    <button
                    class="btn"
                    onclick="removeFromCart('${item.productId}')"
                    >
                    Remove
                    </button>

                </div>

            `;

            cartContainer.appendChild(cartItem);
            const currentTotal =
                Number(document.getElementById("cart-total").textContent);

            document.getElementById("cart-total").textContent =
                currentTotal + (product.price * item.quantity);

        }

        catch (error) {

            console.error(
                "Error loading cart product:",
                error
            );

        }

    }

}


loadCart();
function increaseQuantity(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const product =
        cart.find(item => item.productId === productId);

    if (product) {

        product.quantity += 1;

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();

}
function decreaseQuantity(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const product =
        cart.find(item => item.productId === productId);

    if (product) {

        if (product.quantity > 1) {

            product.quantity -= 1;

        }

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();

}
function removeFromCart(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(
        item => item.productId !== productId
    );

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();

}