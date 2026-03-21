# JobTracker — Frontend

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)
![Recharts](https://img.shields.io/badge/Recharts-2.x-22b5bf?style=flat-square)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat-square)

A modern React frontend for JobTracker — a personal job application tracking system. Built with React, Vite, React Router, Recharts, and Axios. Connects to a separate Spring Boot REST API backend.

> Backend repo: [Job_Tracker_Backend](https://github.com/harshYadav0013/Job_Tracker_backend)

---

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### My Applications
![Jobs List](screenshots/jobs.png)

### Login Page
![Login](screenshots/login.png)

### Swagger API Docs
![Swagger](screenshots/swagger.png)

---

## Features

- Session-based login and registration connected to Spring Boot backend
- Dashboard with live stat cards — total, interviews, offers, rejections
- Donut chart and bar chart showing application status breakdown
- Full jobs table with company, role, location, date and color-coded status badges
- Filter applications by status with one click
- Add, edit and delete job applications
- Clean sidebar navigation with active state highlighting
- Responsive and minimal UI design

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Charts | Recharts |
| Styling | Plain CSS (custom design system) |

---

## Project Structure

```
src/
│
├── api/
│   └── axios.js              # Axios instance pointing to localhost:8080
│
├── components/
│   ├── Sidebar.jsx            # Sidebar nav used across all pages
│   └── StatusBadge.jsx        # Color-coded status pill component
│
├── pages/
│   ├── LoginPage.jsx          # Login with email + password
│   ├── RegisterPage.jsx       # New user registration
│   ├── DashboardPage.jsx      # Stats cards + Recharts donut/bar charts
│   ├── JobsPage.jsx           # Jobs table with filter + delete
│   ├── AddJobPage.jsx         # Form to add new application
│   └── EditJobPage.jsx        # Form to edit existing application
│
├── App.jsx                    # React Router routes
├── main.jsx                   # App entry point
└── index.css                  # Global styles
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/login` | Login | Sign in with email and password |
| `/register` | Register | Create a new account |
| `/dashboard` | Dashboard | Stats overview with charts |
| `/jobs` | My Applications | Full jobs table with filters |
| `/jobs/add` | Add Job | Form to add a new application |
| `/jobs/edit/:id` | Edit Job | Form to update an existing application |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Backend running at `http://localhost:8080`

### Setup

**1. Clone the repository**
```bash
git clone https://github.com/harshYadav0013/Job_Tracker_Frontend.git
cd Job_Tracker_Frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

The app runs at `http://localhost:5173`

> Make sure your Spring Boot backend is running at `http://localhost:8080` before using the app.

---

## How It Connects to the Backend

All API calls go through `src/api/axios.js`:

```js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,   // sends session cookie with every request
})

export default api
```

`withCredentials: true` is critical — it tells the browser to include the Spring Security session cookie with every request so the user stays logged in across page navigation.

---

## Running Both Together

| Service | URL |
|---|---|
| React frontend | http://localhost:5173 |
| Spring Boot backend | http://localhost:8080 |
| Swagger API docs | http://localhost:8080/swagger-ui/index.html |

Start backend first in IntelliJ, then run `npm run dev` in VS Code terminal.

---

## Backend

The Spring Boot REST API for this project is available at:
[https://github.com/harshYadav0013/Job_Tracker_backend](https://github.com/harshYadav0013/Job_Tracker_backend)

---

## Author

**Harsh Yadav**  
[GitHub](https://github.com/harshYadav0013)
