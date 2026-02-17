# 🎓 Event Management System (MERN Stack)

A full-stack Event Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

This application supports three main roles — Admin, Vendor, and User — and follows a structured academic project architecture with role-based authentication, membership management, order tracking, reporting, and transaction modules.

---

# 📌 Project Overview

The system allows:

• Users to browse vendors, purchase products, manage cart, checkout, and track orders.  
• Vendors to manage products and update order status.  
• Admin to manage users, vendors, memberships, reports, and transactions.  

The application strictly follows:

• Role-based access control  
• JWT authentication  
• Membership auto-expiry logic  
• Structured order flow  
• Academic UI design (no UI frameworks used)  

---

# 👥 User Roles & Permissions

## 👤 User
- Register / Login
- Browse Vendors
- View Products
- Add to Cart
- Checkout (Cash / UPI)
- View Order Status
- Manage Guest List
- View Reports

## 🏪 Vendor
- Login
- Add / Update / Delete Products
- View Product Status
- Update Order Status
- View Transactions

## 👑 Admin
- Login
- Maintain Users
- Maintain Vendors
- Manage Memberships
- View Reports
- View Transactions

---

# 🔐 Authentication

• Password hashing using bcrypt  
• JWT-based authentication  
• Token stored in localStorage  
• Role-based route protection middleware  
• Unauthorized access returns 403  

---

# 🗂 Database Models

## 1️⃣ User Model
- name
- email (unique)
- password (hashed)
- role (Admin / Vendor / User)
- createdAt

## 2️⃣ Membership Model
- membershipNumber (auto-generated)
- userId (reference)
- duration (6 months default / 1 year / 2 years)
- startDate
- expiryDate (auto-calculated)
- status (Active / Cancelled)
- createdAt

## 3️⃣ Vendor Model
- name
- email
- category (Catering / Florist / Decoration / Lighting)
- membershipId

## 4️⃣ Product Model
- vendorId
- productName
- price
- image
- createdAt

## 5️⃣ Order Model
- userId
- products (productId + quantity)
- totalAmount
- paymentMethod (Cash / UPI)
- status (Received / Ready for Shipping / Out for Delivery)
- createdAt

## 6️⃣ Guest Model
- userId
- guestName
- email
- phone
- status (Invited / Confirmed)

---

# 🛠 Features

## 🔹 Membership Management (Admin Only)
- Add Membership
- Update Membership
- Auto expiry calculation
- Cancel Membership option

## 🔹 Maintenance Module (Admin)
- Add / Update Users
- Add / Update Vendors

## 🔹 Vendor Module
- Add Product
- Update Product
- Delete Product
- Update Order Status

## 🔹 User Module
- Vendor browsing
- Product listing
- Cart system
- Checkout
- Success confirmation
- Order tracking

## 🔹 Reports Module
- Total Memberships
- Active vs Cancelled Memberships
- Total Orders
- Vendor Sales
- Total Revenue

## 🔹 Transactions Module
- Order history
- Payment details
- Status tracking

---

# 🖥 Tech Stack

## Frontend
- React.js
- Vite
- Axios
- React Router DOM
- Plain CSS (No Bootstrap / Tailwind used)

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt

---

# 🚀 Installation & Setup

## Prerequisites
- Node.js installed
- MongoDB running locally

---

## 🔧 Backend Setup

cd backend  
npm install  

Create a `.env` file inside backend folder:

PORT=5000  
MONGO_URI=mongodb://localhost:27017/event_management_system  
JWT_SECRET=your_secret_key  

Run backend:

npm run dev  

---

## 🎨 Frontend Setup

cd frontend  
npm install  
npm run dev  

---

## 🌐 Access Application

Frontend:  
http://localhost:5173  

Backend:  
http://localhost:5000  

---

# 🔐 Role Access Matrix

| Module                | Admin | Vendor | User |
|------------------------|--------|--------|--------|
| Maintenance            | ✅     | ❌     | ❌     |
| Add Product            | ❌     | ✅     | ❌     |
| Cart                   | ❌     | ❌     | ✅     |
| Update Order Status    | ✅     | ✅     | ❌     |
| Reports                | ✅     | ❌     | ✅     |
| Transactions           | ✅     | ✅     | ✅     |

---

# 🧠 Order Flow

1. User adds product to cart  
2. Proceeds to checkout  
3. Chooses payment method  
4. Order created with status = "Received"  
5. Vendor/Admin updates status  
6. User tracks updated status  

---

# 📝 Validations Implemented

• Email format validation  
• Password minimum 6 characters  
• Phone numeric validation  
• Price numeric only  
• Membership duration radio selection (single select)  
• Required field validations  

---

# 📌 Important Notes

• UI strictly follows academic design (no modern UI frameworks).  
• Membership expiry is automatically calculated.  
• Order status uses controlled radio selection.  
• Role-based route protection enforced on backend.  

---

# 🎯 Project Status

✅ Fully Functional  
✅ Role-Based Authentication  
✅ Membership Logic Implemented  
✅ Order Flow Implemented  
✅ Reports & Transactions Included  
✅ Academic UI Design  

---

# 👨‍💻 Developed By

Harshit Mani Tripathi  


