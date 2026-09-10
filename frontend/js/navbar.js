function updateNavigation() {

    const token = localStorage.getItem("token");

    const nav = document.querySelector(".navbar nav");

    if (!nav) {
        return;
    }

    if (token) {

        nav.innerHTML = `
            <a href="index.html">Home</a>
            <a href="products.html">Products</a>
            <a href="cart.html">Cart</a>
            <a href="orders.html">My Orders</a>
            <a href="#" id="logout-link">Logout</a>
        `;

        document
            .getElementById("logout-link")
            .addEventListener("click", function(event) {

                event.preventDefault();

                localStorage.removeItem("token");

                alert("Logged out successfully!");

                window.location.href = "login.html";

            });

    }

}

updateNavigation();
