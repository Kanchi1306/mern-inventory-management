# 📦 MERN Inventory Management System

A full-stack Inventory Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

This system allows users to securely manage products, track stock levels, visualize analytics, and monitor low-stock alerts in real time.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Role-based User Model (Admin / User)

### 📦 Product Management
- Create Product
- View Products (User-specific)
- Update Product
- Delete Product
- Ownership-based Authorization

### 📊 Dashboard Analytics
- Stock Quantity Bar Chart
- Price Distribution Pie Chart
- Real-time Inventory Overview

### ⚠️ Low Stock Alert
- Automatically highlights products with low quantity
- Helps prevent stock shortages

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Recharts
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Bcrypt

---

## 📂 Project Structure

inventory_management/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── components/
│ └── App.js
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Kanchi1306/mern-inventory-management.git
cd mern-inventory-management
2️⃣ Backend Setup
cd backend
npm install
Create a .env file inside backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start backend:

npm run dev
Backend runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm start
Frontend runs on:

http://localhost:3000
📈 Future Improvements
Admin dashboard with advanced controls

Export inventory reports (CSV / PDF)

Dark mode UI

Cloud deployment (Render / Vercel)

Advanced analytics & reporting

👩‍💻 Author
Kanchi Sinha
3rd Year, JIIT Noida
Aspiring Software Engineer

⭐ Support
If you like this project, give it a ⭐ on GitHub!


---

# ✅ STEP 3 — Save & Push to GitHub

Run:

```bash
git add README.md
git commit -m "Added professional README"
git push
