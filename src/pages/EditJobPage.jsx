import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api/axios'

function EditJobPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    companyName: '',
    role: '',
    location: '',
    appliedDate: '',
    status: 'APPLIED',
    notes: '',
  })

  useEffect(() => {
    api.get(`/api/jobs/${id}`)
      .then(res => {
        const job = res.data
        setForm({
          companyName: job.companyName || '',
          role:        job.role || '',
          location:    job.location || '',
          appliedDate: job.appliedDate || '',
          status:      job.status || 'APPLIED',
          notes:       job.notes || '',
        })
      })
      .catch(() => setError('Failed to load job details.'))
      .finally(() => setFetching(false))
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.put(`/api/jobs/${id}`, form)
      navigate('/jobs')
    } catch (err) {
      setError('Failed to update. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="loading">Loading...</div>
      </div>
    </div>
  )

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">

        <div className="topbar">
          <span className="topbar-title">Edit application</span>
        </div>

        <div className="page-body">
          <div className="form-card">

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">

                <div className="form-group">
                  <label className="form-label">Company name *</label>
                  <input
                    className="form-input"
                    name="companyName"
                    placeholder="e.g. Google"
                    value={form.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role *</label>
                  <input
                    className="form-input"
                    name="role"
                    placeholder="e.g. SWE Intern"
                    value={form.role}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    className="form-input"
                    name="location"
                    placeholder="e.g. Bangalore"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date applied</label>
                  <input
                    className="form-input"
                    name="appliedDate"
                    type="date"
                    value={form.appliedDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    className="form-input"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-input"
                    name="notes"
                    rows="3"
                    placeholder="e.g. HR call scheduled for Monday..."
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="form-actions">
                <button
                  className="btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Update application'}
                </button>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() => navigate('/jobs')}
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default EditJobPage