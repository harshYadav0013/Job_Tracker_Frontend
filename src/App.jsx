import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import JobsPage from './pages/JobsPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<Navigate to="/login" />} />
        <Route path="/login"         element={<LoginPage />} />
        <Route path="/register"      element={<RegisterPage />} />
        <Route path="/dashboard"     element={<DashboardPage />} />
        <Route path="/jobs"          element={<JobsPage />} />
        <Route path="/jobs/add"      element={<AddJobPage />} />
        <Route path="/jobs/edit/:id" element={<EditJobPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App