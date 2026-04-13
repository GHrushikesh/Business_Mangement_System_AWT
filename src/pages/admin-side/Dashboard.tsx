import Topbar from '../../components/Topbar'
const stats = [
  { label: 'Total Customers', value: '128', icon: null, color: 'blue', change: '+4 this week' },
  { label: 'Active Repairs', value: '23', icon: null, color: 'orange', change: '6 pending' },
  { label: 'Products', value: '54', icon: null, color: 'green', change: '8 low stock' },
  { label: 'Revenue (Month)', value: '₹84,200', icon: null, color: 'blue', change: '+12% vs last' },
]
const recentRepairs = [
  { customer: 'Rahul Sharma', issue: 'Laptop screen broken', status: 'In Progress', date: '14 Mar' },
  { customer: 'Priya Patel', issue: 'PC not booting', status: 'Pending', date: '13 Mar' },
  { customer: 'Arjun Mehta', issue: 'Keyboard replacement', status: 'Done', date: '12 Mar' },
  { customer: 'Sneha Joshi', issue: 'Virus removal', status: 'In Progress', date: '12 Mar' },
  { customer: 'Vikram Singh', issue: 'RAM upgrade', status: 'Done', date: '11 Mar' },
]
const recentActivities = [
  { text: 'New customer Rahul Sharma added', time: '2 hours ago', type: 'blue' },
  { text: 'Repair #023 marked as completed', time: '4 hours ago', type: 'green' },
  { text: 'New product "Corsair 16GB RAM" added', time: 'Yesterday', type: 'orange' },
  { text: 'Customer Priya Patel repair logged', time: 'Yesterday', type: 'blue' },
  { text: 'Invoice #102 generated', time: '2 days ago', type: 'green' },
]
const statusClass: Record<string, string> = {
  'Pending': 'badge-pending',
  'In Progress': 'badge-in-progress',
  'Done': 'badge-done',
}
export default function Dashboard() {
  return (
    <>
      <Topbar title="Dashboard" />
      <div className="page-body">
        <div className="page-header">
          <div className="page-header-left">
            <h1>Overview</h1>
            <p>Welcome back, Admin. Here's what's happening today at Ujjam Computer.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 500 }}>
            Live Data
          </div>
        </div>
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className={`stat-icon ${s.color}`} style={{ fontSize: '1.2rem' }}>
                {s.icon}
              </div>
              <div className="stat-info">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-change">{s.change}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="dashboard-grid">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Recent Repairs</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', cursor: 'pointer' }}>View All</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Issue</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRepairs.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{r.customer}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{r.issue}</td>
                      <td><span className={`badge ${statusClass[r.status]}`}>{r.status}</span></td>
                      <td style={{ color: 'var(--text-secondary)' }}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Recent Activity</span>
            </div>
            <div className="card-body">
              <ul className="activity-list">
                {recentActivities.map((a, i) => (
                  <li className="activity-item" key={i}>
                    <div className={`activity-dot ${a.type}`} />
                    <div>
                      <div className="activity-text">{a.text}</div>
                      <div className="activity-time">{a.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
