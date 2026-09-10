# 🛍️ ShopEase — Online E-Commerce Store

ShopEase is a full-stack online e-commerce store developed as part of a CodeAlpha internship project. It allows users to browse products, view product details, manage their shopping cart, securely log in/register, place orders, and view their order history.

The project uses a JavaScript-based frontend with a Node.js/Express backend and MongoDB for data storage.

---

## ✨ Features

### 👤 User Authentication

* User registration and login
* Password hashing using bcryptjs
* JWT-based authentication
* Protected order and checkout operations
* Logout functionality

### 🛍️ Product Management

* View all available products
* View individual product details
* Product categories
* Product descriptions, prices, images, and stock information
* Backend APIs for adding, updating, and deleting products

### 🛒 Shopping Cart

* Add products to cart
* Increase/decrease product quantity
* Remove products from cart
* Multiple products supported
* Automatic subtotal and total calculation
* Cart persistence using browser localStorage
* Empty-cart handling

### 💳 Checkout

* Login-protected checkout
* Shipping information form
* Order summary
* Stock validation
* Order creation through the backend API
* Cart automatically cleared after successful order placement

### 📦 Order Management

* Users can view their orders
* Order ID and order date
* Ordered products and quantities
* Product prices and total amount
* Order status
* Orders are associated with the authenticated user

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Browser LocalStorage
* Live Server

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* CORS
* dotenv

### Development Tools

* Visual Studio Code
* Thunder Client
* Git
* GitHub

---

## 📁 Project Structure

```text
CodeAlpha_EcommerceStore/
│
├── .gitignore
├── README.md
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── html/
    │   ├── index.html
    │   ├── products.html
    │   ├── product.html
    │   ├── cart.html
    │   ├── login.html
    │   ├── register.html
    │   ├── orders.html
    │   └── checkout.html
    │
    ├── css/
    │   └── style.css
    │
    └── js/
        ├── api.js
        ├── auth.js
        ├── products.js
        ├── cart.js
        ├── orders.js
        ├── checkout.js
        └── navbar.js
```

---

## 🔐 Authentication

ShopEase uses JWT-based authentication.

When a user logs in successfully:

1. The backend verifies the user's credentials.
2. A JWT token is generated.
3. The frontend stores the token in browser localStorage.
4. Protected requests send the token using the `Authorization` header.
5. The backend verifies the token before allowing access to protected resources.

Passwords are securely hashed using bcryptjs before being stored in the database.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Products

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/products`     | Get all products     |
| GET    | `/api/products/:id` | Get a single product |
| POST   | `/api/products`     | Add a product        |
| PUT    | `/api/products/:id` | Update a product     |
| DELETE | `/api/products/:id` | Delete a product     |

### Orders

| Method | Endpoint      | Description                 |
| ------ | ------------- | --------------------------- |
| POST   | `/api/orders` | Create an order             |
| GET    | `/api/orders` | Get logged-in user's orders |

Protected endpoints require a valid JWT token.

---

## ⚙️ How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/starfishhhh/CodeAlpha_ShopEase.git
```

### 2. Open the project

```bash
cd CodeAlpha_ShopEase
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` folder.

PORT=5000
MONGO_URI=mongodb://singhjiya1472_db_user:3EMgWOruWqx8LEeXV@ac-kgqwors-shard-00-00.rwef1td.mongodb.net:27017,ac-kgqwors-shard-00-01.rwef1td.mongodb.net:27017,ac-kgqwors-shard-00-02.rwef1td.mongodb.net:27017/?ssl=true&replicaSet=atlas-mvdfnw-shard-0&authSource=admin&appName=Cluster0
JWT_SECRET=your_super_secret_keys


**Do not upload the `.env` file to GitHub.**

### 5. Start the backend

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Start the frontend

Open the `frontend` folder using VS Code and run the HTML files using the **Live Server** extension.

The frontend communicates with the backend through:

```text
http://localhost:5000/api
```

---

## 🗄️ Database

ShopEase uses **MongoDB** as its database and **Mongoose** as the ODM.

The main collections/models are:

* User
* Product
* Order

Orders are connected to the authenticated user and contain the purchased products, quantities, prices, shipping information, total amount, and order status.

---

## 🎨 User Interface

The frontend is designed with a clean and modern e-commerce interface featuring:

* Responsive layouts
* Product cards
* Product detail pages
* Shopping cart
* Checkout page
* Login and registration pages
* Order history
* Consistent navigation
* Soft, modern visual styling

---

## 🚀 Future Improvements

Possible future improvements include:

* Online payment integration
* Admin dashboard
* Product search and advanced filtering
* Product reviews and ratings
* Wishlist functionality
* Pagination
* Image upload functionality
* Deployment with a live frontend and backend
* Improved inventory management

---

## 🎓 Project Information

**Project:** ShopEase — Online E-Commerce Store
**Internship:** CodeAlpha
**Domain:** Full Stack Web Development

This project demonstrates the implementation of a full-stack e-commerce application using frontend technologies, REST APIs, authentication, database integration, and Git/GitHub version control.

---

## 👩‍💻 Author

**Jiya**

BTech Computer Science Engineering Student

---

## 📌 Repository

GitHub:
https://github.com/starfishhhh/CodeAlpha_ShopEase
