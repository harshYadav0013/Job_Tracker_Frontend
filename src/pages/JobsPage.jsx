import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import StatusBadge from '../components/StatusBadge'
import api from '../api/axios'

const STATUSES = ['ALL', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']

function JobsPage() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)

  const fetchJobs = async (status) => {
    setLoading(true)
    try {
      const url = status === 'ALL'
        ? '/api/jobs'
        : `/api/jobs?status=${status}`
      const res = await api.get(url)
      setJobs(res.data)
    } catch (err) {
      console.error('Failed to fetch jobs', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs(filter)
  }, [filter])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return
    try {
      await api.delete(`/api/jobs/${id}`)
      setJobs(jobs.filter(j => j.id !== id))
    } catch (err) {
      alert('Failed to delete. Please try again.')
    }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">

        <div className="topbar">
          <span className="topbar-title">My applications</span>
          <button
            className="btn-primary"
            onClick={() => navigate('/jobs/add')}
          >
            + Add job
          </button>
        </div>

        <div className="page-body">

          <div className="filter-row">
            {STATUSES.map(s => (
              <button
                key={s}
                className={`filter-pill ${filter === s ? 'active' : ''}`}
                onClick={() => setFilter(s)}
              >
                {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
                {s === 'ALL' && ` (${jobs.length})`}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : jobs.length === 0 ? (
            <div className="empty-state">
              <p>No applications found</p>
              <button
                className="btn-primary"
                onClick={() => navigate('/jobs/add')}
              >
                Add your first job
              </button>
            </div>
          ) : (
            <div className="jobs-table">
              <div className="table-header">
                <span className="th-cell">Company / Role</span>
                <span className="th-cell">Location</span>
                <span className="th-cell">Applied</span>
                <span className="th-cell">Status</span>
                <span className="th-cell"></span>
              </div>

              {jobs.map(job => (
                <div className="table-row" key={job.id}>
                  <div>
                    <div className="company-name">{job.companyName}</div>
                    <div className="role-name">{job.role}</div>
                  </div>
                  <div className="td-cell">{job.location || '—'}</div>
                  <div className="td-cell">
                    {job.appliedDate
                      ? new Date(job.appliedDate).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short'
                        })
                      : '—'}
                  </div>
                  <div>
                    <StatusBadge status={job.status} />
                  </div>
                  <div className="row-actions">
                    <button
                      className="action-btn"
                      onClick={() => navigate(`/jobs/edit/${job.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn danger"
                      onClick={() => handleDelete(job.id)}
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobsPage