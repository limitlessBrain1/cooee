## 🛍️ Cooee – Full Stack Product Management System

A production-ready inventory management application built with the MERN stack. 
Features real-time product management, advanced search/filtering, and secure 
JWT authentication.

🔗 **[Live Demo](https://cooee-zeta.vercel.app/)** | 📚 **[API Docs](https://cooee.onrender.com/)**

---

## 🧪 Demo Credentials

For quick testing, use:
- **Email:** `demo@cooee.com`
- **Password:** `Demo@123`

Or create your own account via the signup page.

---

## 📌 Features

### 🔐 Authentication
- ✅ User Registration & Login
- ✅ JWT-based authentication with secure token storage
- ✅ Protected routes (Products page accessible only after login)
- ✅ Automatic token refresh
- ✅ Secure logout functionality

### 📦 Product Management
- ✅ Add new products with validation
- ✅ Edit existing products
- ✅ Delete products with confirmation
- ✅ View products in responsive table format
- ✅ Form validation and error handling



---

## 🛠️ Tech Stack

### Frontend
- **React 18** (with Vite for fast builds)
- **Axios** for API communication
- **React Hooks** (useState, useEffect, useContext)
- **React Router** for navigation
- **CSS3** with custom styling
- **Responsive Design** (mobile-first approach)

### Backend
- **Node.js** (v18+)
- **Express.js** for REST API
- **MongoDB** with **Mongoose** ODM
- **JWT** (jsonwebtoken) for authentication
- **bcrypt** for password hashing
- **CORS** configuration for secure cross-origin requests
- **dotenv** for environment management


---

## 📂 Project Structure

cooee/
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Products.jsx
│   │   ├── services/            # API integration
│   │   │   └── api.js          # Axios instance & endpoints
│   │   ├── context/             # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/
│   ├── vercel.json              # Vercel deployment config
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/         # Business logic
│   │   │   ├── authController.js
│   │   │   └── productController.js
│   │   ├── models/              # MongoDB schemas
│   │   │   ├── User.js
│   │   │   └── Product.js
│   │   ├── routes/              # API routes
│   │   │   ├── auth.js
│   │   │   └── products.js
│   │   ├── middleware/          # Custom middleware
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── config/              # Configuration
│   │   │   └── db.js           # MongoDB connection
│   │   └── app.js               # Express app setup
│   ├── .env                     # Environment variables
│   ├── server.js                # Server entry point
│   └── package.json
│
├── screenshots/                 # App screenshots
├── .gitignore
└── README.md
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Create new user account | ❌ |
| POST | `/api/v1/auth/login` | Login existing user | ❌ |
| GET | `/api/v1/auth/me` | Get current user info | ✅ |
| POST | `/api/v1/auth/logout` | Logout user | ✅ |


### Products
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/products` | Get all products (with pagination, search, filter) | ✅ |
| GET | `/api/v1/products/:id` | Get single product by ID | ✅ |
| POST | `/api/v1/products` | Create new product | ✅ |
| PUT | `/api/v1/products/:id` | Update existing product | ✅ |
| DELETE | `/api/v1/products/:id` | Delete product | ✅ |

```
## 👩‍💻 Author

**Sanika Menkudale**


