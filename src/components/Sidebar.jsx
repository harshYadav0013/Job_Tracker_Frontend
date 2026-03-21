import { NavLink, useNavigate } from 'react-router-dom'
import api from '../api/axios'

function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await api.post('/logout')
    navigate('/login')
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">JobTracker</div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="6" height="6" rx="1"/>
            <rect x="9" y="1" width="6" height="6" rx="1"/>
            <rect x="1" y="9" width="6" height="6" rx="1"/>
            <rect x="9" y="9" width="6" height="6" rx="1"/>
          </svg>
          Dashboard
        </NavLink>

        <NavLink to="/jobs" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 4h12M2 8h12M2 12h8"/>
          </svg>
          My applications
        </NavLink>

        <NavLink to="/jobs/add" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2v12M2 8h12"/>
          </svg>
          Add job
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={handleLogout}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 2h4v12h-4M7 11l-4-3 4-3M3 8h8"/>
          </svg>
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Sidebar