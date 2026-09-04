# To-Do-List
# MERN To-Do List Application

A full-stack To-Do List web application built using the MERN stack. Users can create an account, log in securely, and manage their daily tasks.

## 🚀 Live Demo

* **Frontend:** https://to-do-list-sigma-lilac.vercel.app
* **Backend API:** https://to-do-list-backend-b0pk.onrender.com

## 📌 Features

* User Registration (Signup)
* User Login
* JWT Authentication
* Protected Routes
* Create Tasks
* View Tasks
* Update Tasks
* Mark Tasks as Completed
* Delete Tasks
* Filter Tasks
* Persistent Data Storage
* Responsive User Interface

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT (JSON Web Token)
* bcryptjs
* CORS

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## 🏗️ Project Architecture

```text
                    USER
                      │
                      ▼
        ┌─────────────────────────┐
        │        Vercel           │
        │    React + Vite App     │
        └────────────┬────────────┘
                     │
                     │ API Requests
                     ▼
        ┌─────────────────────────┐
        │        Render           │
        │   Node.js + Express     │
        └────────────┬────────────┘
                     │
                     │ Mongoose
                     ▼
        ┌─────────────────────────┐
        │      MongoDB Atlas      │
        │        Database         │
        └─────────────────────────┘
```

## 📂 Project Structure

```text
To-Do-List/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskItem.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <https://github.com/ROHITH9031/To-Do-List>
```

Navigate to the project:

```bash
cd To-Do-List
```

## 🔧 Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

## 💻 Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will usually run on:

```text
http://localhost:5173
```

## 🔐 Environment Variables

### Backend

| Variable     | Description                            |
| ------------ | -------------------------------------- |
| `MONGO_URI`  | MongoDB Atlas connection string        |
| `JWT_SECRET` | Secret key used for JWT authentication |
| `PORT`       | Backend server port                    |

### Frontend

| Variable       | Description     |
| -------------- | --------------- |
| `VITE_API_URL` | Backend API URL |

## 🌐 API Endpoints

### Authentication

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | `/api/auth/signup` | Register a new user    |
| POST   | `/api/auth/login`  | Login an existing user |

### Tasks

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | Get all tasks     |
| POST   | `/api/tasks`     | Create a new task |
| PUT    | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

## 🔒 Authentication

The application uses **JWT (JSON Web Token)** for authentication.

After a successful login:

1. The backend generates a JWT token.
2. The token is stored in the browser's local storage.
3. Axios automatically sends the token with protected API requests.
4. The backend verifies the token before allowing access to task-related routes.

## 🗄️ Database

MongoDB Atlas is used as the cloud database.

The application contains two main collections:

### Users

Stores:

* Name
* Email
* Encrypted Password

### Tasks

Stores:

* Task Title
* Task Description
* Completion Status
* User Reference
* Creation Date

## 🚀 Deployment

The application is deployed using:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

### Production Environment Variables

#### Vercel

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

#### Render

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> Never upload `.env` files or secret credentials to GitHub.

## 📸 Screenshots

You can add screenshots of your application here.

Suggested screenshots:

* Login Page
* Signup Page
* Dashboard
* Add Task
* Completed Tasks


## 🎯 Learning Outcomes

Through this project, I learned:

* Building a full-stack MERN application
* Connecting React with Express APIs
* Creating REST APIs
* Using MongoDB Atlas
* Working with Mongoose
* Implementing JWT authentication
* Password hashing using bcryptjs
* Managing protected routes
* Performing CRUD operations
* Using Axios for API communication
* Deploying frontend and backend applications
* Managing environment variables
* Configuring CORS for production

## 🔮 Future Improvements

Possible improvements include:

* Task categories
* Task priority levels
* Due dates
* Task search functionality
* Dark mode
* Email verification
* Forgot password functionality
* User profile management
* Drag-and-drop task organization
* Improved mobile responsiveness

## 👨‍💻 Author

**Atyam Rohith**

## 📄 License

This project is created for educational and learning purposes.

---

⭐ If you found this project helpful, consider giving the repository a star!
