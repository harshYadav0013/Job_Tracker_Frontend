import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

function RegisterPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/api/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError('Registration failed. Email may already be in use.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">JobTracker</div>
        <div className="login-sub">Create your account — it's free</div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="login-group">
            <label className="login-label">Full name</label>
            <input
              className="login-input"
              name="name"
              placeholder="Your_Full_Name"
              value={form.name}
              onChange={handleChange}
                autoComplete="new-password"
              required
            />
          </div>

          <div className="login-group">
            <label className="login-label">Email</label>
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
                autoComplete="new-password"
              required
            />
          </div>

          <div className="login-group">
            <label className="login-label">Password</label>
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
                autoComplete="new-password"
              required
            />
          </div>

          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="login-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage