# 🏥 E-Hospital Management System

A full-stack **E-Hospital Management System** built using the **MERN Stack** that digitizes hospital operations and provides an easy-to-use platform for patients, doctors, pharmacists, and administrators.

The system allows patients to register, book doctor appointments, manage prescriptions, purchase medicines online, and interact with a virtual assistant. Doctors and administrators can manage appointments, patients, prescriptions, medicines, and other hospital-related activities.

---

## 🚀 Live Demo

🌐 **Live Website:** (https://e-hospital-management-system-2mwu.vercel.app/)

📦 **GitHub Repository:**
https://github.com/CHUNCHUNKUMARSINGH9693/E-Hospital-Management-System

---

## ✨ Features

### 👨‍⚕️ Patient Features

* Patient registration and login
* Secure authentication
* Patient profile management
* Search and view doctors
* Book doctor appointments
* View appointment details
* View prescriptions
* Manage medical information
* Online medicine ordering
* View medicine details
* Virtual hospital assistant
* Voice-based interaction
* Responsive user interface

### 🩺 Doctor Features

* Doctor registration/login
* Doctor dashboard
* View assigned appointments
* Manage patient appointments
* View patient information
* Create and manage prescriptions
* Add medicines to prescriptions
* Update appointment status
* Manage doctor profile

### 💊 Pharmacy Features

* View available medicines
* Medicine search
* Medicine details
* Manage medicine requests
* Online medicine ordering
* Track medicine requests

### 👨‍💼 Admin Features

* Admin authentication
* Admin dashboard
* Manage patients
* Manage doctors
* Manage appointments
* Manage medicines
* Manage prescriptions
* Manage users
* Monitor hospital activities

### 🤖 Virtual Assistant

* Hospital-related assistance
* Voice-based interaction
* User-friendly conversational interface
* Helps users navigate hospital services

---

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* Bootstrap
* React Bootstrap
* Axios
* React Icons
* Font Awesome
* Styled Components
* React Datepicker
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST APIs
* JWT Authentication
* bcrypt
* CORS
* dotenv

### Tools & Deployment

* Git
* GitHub
* npm
* VS Code
* MongoDB Atlas
* Vercel / Netlify

---

## 📁 Project Structure

```text
E-Hospital-Management-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── images/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   │
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/CHUNCHUNKUMARSINGH9693/E-Hospital-Management-System.git
```

Navigate into the project:

```bash
cd E-Hospital-Management-System
```

---

# 🎨 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The frontend will normally run at:

```text
http://localhost:3000
```

---

# ⚙️ Backend Setup

Open another terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

Or, if the project uses nodemon:

```bash
npm run dev
```

The backend will normally run at:

```text
http://localhost:5000
```

---

## 🔐 Environment Variables

### Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital
JWT_SECRET=your_secret_key
```

### Frontend

If your frontend communicates with a deployed backend, configure the API URL according to your project setup.

For Vite projects, this usually looks like:

```env
VITE_API_URL=https://your-backend-url.com
```

For Create React App projects:

```env
REACT_APP_API_URL=https://your-backend-url.com
```

> ⚠️ Never upload your `.env` file or database credentials to GitHub.

---

## 🔄 Application Flow

```text
                ┌─────────────────────┐
                │      Patient        │
                └──────────┬──────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │ Register / Login  │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │ Patient Dashboard │
                 └─────────┬─────────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
       Appointments    Prescription   Pharmacy
             │             │             │
             ▼             ▼             ▼
          Doctor       Medicines      Orders
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                  ┌─────────────────┐
                  │     Backend     │
                  │ Node + Express  │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    MongoDB      │
                  └─────────────────┘
```

---

## 🔒 Security

The application implements several security mechanisms:

* JWT-based authentication
* Password hashing using bcrypt
* Protected API routes
* Environment variables for sensitive configuration
* Role-based access control
* CORS configuration
* Secure database connection

---

## 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

---

## 📸 Screenshots

Add screenshots of your project here.

Example:

```markdown
## 🏠 Home Page

![Home Page](screenshots/home.png)

## 👨‍⚕️ Doctor Dashboard

![Doctor Dashboard](screenshots/doctor-dashboard.png)

## 👤 Patient Dashboard

![Patient Dashboard](screenshots/patient-dashboard.png)

## 💊 Pharmacy

![Pharmacy](screenshots/pharmacy.png)
```

---

## 🧪 Build for Production

To create an optimized production build:

```bash
cd frontend
npm run build
```

The production files will be generated inside:

```text
frontend/build/
```

---

## 🚀 Deployment

### Frontend

The React frontend can be deployed using platforms such as:

* Vercel
* Netlify

For Vercel, if your React application is inside the `frontend` directory, set the project **Root Directory** to:

```text
frontend
```

Build command:

```text
npm run build
```

Output directory:

```text
build
```

### Backend

The Node.js/Express backend can be deployed using services such as:

* Render
* Railway
* Cyclic
* AWS

After deploying the backend, update the frontend API URL to point to the deployed backend.

---

## 🧑‍💻 Author

### Chunchun Kumar Singh

**Full Stack Developer | MERN Stack Developer**

* GitHub: https://github.com/CHUNCHUNKUMARSINGH9693
* Portfolio: Add your portfolio URL
* LinkedIn: Add your LinkedIn URL

---

## 🎯 Future Improvements

The project can be further enhanced with:

* Online payment integration
* Video consultation
* Real-time doctor-patient chat
* Email notifications
* SMS notifications
* Advanced medical reports
* Appointment reminders
* Hospital analytics dashboard
* AI-powered medical assistance
* Docker deployment
* Cloud storage for medical documents

---

## 📄 License

This project is developed for educational and portfolio purposes.

You may modify and improve the project according to your requirements.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Thank you for checking out the E-Hospital Management System! 🏥**

```
```

