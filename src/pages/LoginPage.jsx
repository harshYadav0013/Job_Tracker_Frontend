import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
const handleLogin = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  try {
    const params = new URLSearchParams()
    params.append('username', email)
    params.append('password', password)

    const response = await api.post('/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 400
    })

    navigate('/dashboard')
  } catch (err) {
    if (err.response?.status === 302 || err.response?.status === 200) {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password. Please try again.')
    }
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">JobTracker</div>
        <div className="login-sub">Track your job hunt, land your dream role</div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="login-group">
            <label className="login-label">Email</label>
            <input
              className="login-input"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-group">
            <label className="login-label">Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="login-footer">
          Don't have an account?{' '}
          <Link to="/register" className="login-footer a">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage