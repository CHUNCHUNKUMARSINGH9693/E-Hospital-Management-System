# E-Hospital Management System

A modern, full-stack Hospital Management System built with **React** (Frontend) and **Node.js/Express** (Backend), using **MongoDB** as the database.

---

## 🛠️ Technology Stack

* **Frontend**: React.js, React Router, React Bootstrap, Axios
* **Backend**: Node.js, Express.js, JWT Authentication, Bcrypt Password Hashing, PDFKit (Report Generation)
* **Database**: MongoDB (Mongoose ODM)

---

## 📂 Project Structure

```
E-Hospital-Management-System/
├── backend/                  # Node.js API Server
│   ├── config/              # Database connection configuration
│   ├── middleware/          # Custom auth middlewares
│   ├── models/              # Mongoose Schemas & Models
│   ├── routes/              # Modular Express Route Routers
│   ├── utils/               # Shared utilities & states
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Entry point
│
└── frontend/                 # React SPA Client
    ├── public/
    ├── src/
    │   ├── Components/      # User Interfaces & Modals
    │   ├── App.js
    │   └── index.js         # Entry point
    ├── .env                 # Frontend environment configs
    ├── vercel.json          # Vercel routing configurations
    └── package.json
```

---

## ⚙️ Configuration & Environment Variables

### 🔑 Backend Configuration (`backend/.env`)
Create a `.env` file inside the `backend` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/Ehospital
JWT_SECRET=your_jwt_secret
```

### 🔑 Frontend Configuration (`frontend/.env`)
Create a `.env` file inside the `frontend` folder:
```env
REACT_APP_API_URL=http://localhost:5000
DISABLE_ESLINT_PLUGIN=true
```

---

## 🚀 Running Locally

### 1. Prerequisite
* Ensure **MongoDB** is running locally (e.g. via MongoDB Compass at `mongodb://localhost:27017`).

### 2. Start the Backend Server
```bash
cd backend
npm install
npm start
```
The server will run on `http://localhost:5000`.

### 3. Start the Frontend Application
```bash
cd ../frontend
npm install
npm start
```
The React app will run on `http://localhost:3000`.

---

## ☁️ Deployment Guide

### 1. Backend (Deployed on Render)
* Deploy the `backend` folder to **Render** as a Web Service.
* Set the environment variables in your Render Dashboard:
  * `MONGODB_URI`: Your MongoDB Atlas URI (or hosted instance).
  * `JWT_SECRET`: A secure signing key.

### 2. Frontend (Deployed on Vercel)
* Deploy the `frontend` folder to **Vercel**.
* Configure the following Environment Variables in the **Vercel Settings Dashboard** before deploying:
  * `CI`: `false` (Bypasses ESLint warning blocks during compilation)
  * `REACT_APP_API_URL`: `https://your-backend-render-url.onrender.com` (Your deployed Render backend URL)
