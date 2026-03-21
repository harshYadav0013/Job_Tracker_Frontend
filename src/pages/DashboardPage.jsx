import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '../components/Sidebar'
import api from '../api/axios'

const COLORS = {
  APPLIED: '#378ADD',
  INTERVIEW: '#EF9F27',
  OFFER: '#639922',
  REJECTED: '#E24B4A',
}

function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/jobs/stats')
      .then(res => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="loading">Loading dashboard...</div>
      </div>
    </div>
  )

  const chartData = stats ? [
    { name: 'Applied',   value: Number(stats.applied)   },
    { name: 'Interview', value: Number(stats.interview) },
    { name: 'Offer',     value: Number(stats.offer)     },
    { name: 'Rejected',  value: Number(stats.rejected)  },
  ].filter(d => d.value > 0) : []

  const offerRate = stats && stats.total > 0
    ? Math.round((stats.offer / stats.total) * 100)
    : 0

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">

        <div className="topbar">
          <span className="topbar-title">Dashboard</span>
          <span style={{ fontSize: '12px', color: '#888' }}>
            Your job hunt at a glance
          </span>
        </div>

        <div className="page-body">

          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-label">Total applied</div>
              <div className="stat-value">{stats?.total ?? 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Interviews</div>
              <div className="stat-value amber">{stats?.interview ?? 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Offers</div>
              <div className="stat-value green">{stats?.offer ?? 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Rejected</div>
              <div className="stat-value red">{stats?.rejected ?? 0}</div>
            </div>
          </div>

          <div className="chart-row">

            <div className="card">
              <div className="card-title">Applications by status</div>
              {['APPLIED','INTERVIEW','OFFER','REJECTED'].map(s => {
                const val = Number(stats?.[s.toLowerCase()] ?? 0)
                const total = Number(stats?.total ?? 1)
                const pct = total > 0 ? Math.round((val / total) * 100) : 0
                return (
                  <div className="bar-row" key={s}>
                    <span className="bar-label">{s.charAt(0) + s.slice(1).toLowerCase()}</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: pct + '%', background: COLORS[s] }}
                      />
                    </div>
                    <span className="bar-num">{val}</span>
                  </div>
                )
              })}
            </div>

            <div className="card">
              <div className="card-title">Status breakdown</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <ResponsiveContainer width={140} height={140}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {chartData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[entry.name.toUpperCase()]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [v, '']} />
                  </PieChart>
                </ResponsiveContainer>

                <div>
                  <div className="legend">
                    {Object.entries(COLORS).map(([key, color]) => (
                      <div className="legend-item" key={key}>
                        <div className="legend-dot" style={{ background: color }} />
                        {key.charAt(0) + key.slice(1).toLowerCase()}
                        {' '}({stats?.[key.toLowerCase()] ?? 0})
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '14px', fontSize: '12px', color: '#888' }}>
                    Offer rate:{' '}
                    <span style={{ fontWeight: 600, color: '#3B6D11' }}>
                      {offerRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage