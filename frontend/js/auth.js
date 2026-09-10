const API_URL = "http://localhost:5000/api";


// =============================
// LOGIN
// =============================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        try {

            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message || "Login failed"
                );

            }

            // Save JWT
            localStorage.setItem(
                "token",
                data.token
            );

            alert("Login successful!");

            window.location.href =
                "products.html";

        }

        catch (error) {

            console.error(
                "Login error:",
                error
            );

            alert(error.message);

        }

    });

}


// =============================
// REGISTER
// =============================

const registerForm =
    document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const name =
                document.getElementById("name").value;

            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;

            try {

                const response = await fetch(
                    `${API_URL}/auth/register`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                        })
                    }
                );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Registration failed"
                    );

                }

                alert(
                    "Registration successful! Please login."
                );

                window.location.href =
                    "login.html";

            }

            catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                alert(error.message);

            }

        }
    );

}

