async function getProducts() {
    try {

        const response = await fetch(
            `${API_URL}/products`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        displayProducts(products);

    } catch (error) {

        console.error(error);

        const container =
            document.getElementById("featured-products");

        if (container) {
            container.innerHTML =
                "<p>Unable to load products.</p>";
        }
    }
}


function displayProducts(products) {

    const container =
        document.getElementById("featured-products");

    if (!container) return;

    container.innerHTML = "";

    products.slice(0, 6).forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="product-price">
                    ₹${product.price}
                </p>

                <a
                    href="product.html?id=${product._id}"
                    class="btn"
                >
                    View Product
                </a>

            </div>
        `;

        container.appendChild(card);
    });
}


getProducts();
