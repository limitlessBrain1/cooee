# Cooee: Product Inventory Management System 

A full-stack **Product Inventory Management System** built using **React, Node.js, Express, and MongoDB**.  
The application supports **JWT-based authentication**, **protected inventory operations**, and full **Product CRUD** functionality with **search, filter, sorting**, and a **Low Stock Alert indicator**.

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Styling:** CSS 

---

## Features

### Authentication
- User login using email and password
- JWT token generation
- Protected routes for product operations
- Logout support

### Product Management (CRUD)
- Add new products
- View product list
- Edit existing products
- Delete products

### Search, Filter & Sort
- Search products by **name, SKU, category, description**
- Filter products by **category**
- Sort products by:
  - Newest first
  - Price: Low → High
  - Price: High → Low

### Low Stock Alert
- Products with quantity **less than 10** are marked as **Low**
- Low stock indicator updated in UI for better inventory tracking

---

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Atlas)

---

