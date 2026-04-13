import { useState, useEffect } from 'react'
import Topbar from '../../components/Topbar'
import API_BASE_URL from '../../apiConfig'

interface RepairTicket {
  _id: string
  ticketNo: string
  customerName: string
  phone: string
  email: string
  deviceType: string
  issue: string
  status: 'Pending' | 'In Progress' | 'Done'
  priority: 'Low' | 'Medium' | 'High'
  receivedDate: string
  estimatedCost: number
}

const emptyForm = {
  customerName: '',
  phone: '',
  email: '',
  deviceType: '',
  issue: '',
  priority: 'Medium' as const,
  estimatedCost: '',
}

const priorityClass: Record<string, string> = {
  Low: 'badge-available',
  Medium: 'badge-pending',
  High: 'badge-out-of-stock',
}

function mapTicket(t: any): RepairTicket {
  return {
    _id: t._id,
    ticketNo: `TF-${String(t._id).slice(-4).toUpperCase()}`,
    customerName: t.customerName || 'Unknown',
    phone: t.phone || 'N/A',
    email: t.email || '',
    deviceType: t.deviceModel || 'Unknown Device',
    issue: t.issueDescription || '',
    status: (t.status === 'Completed' ? 'Done' : t.status) || 'Pending',
    priority: t.priority || 'Medium',
    estimatedCost: t.estimatedCost || 0,
    receivedDate: t.createdAt ? new Date(t.createdAt).toISOString().slice(0, 10) : 'N/A',
  }
}

export default function RepairIssues() {
  const [issues, setIssues] = useState<RepairTicket[]>([])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<typeof emptyForm>>({})

  useEffect(() => {
    fetch(`${API_BASE_URL}/tickets`)
      .then(res => res.json())
      .then(data => setIssues(data.map(mapTicket)))
      .catch(err => console.error(err))
  }, [])

  let filtered = issues.filter(i =>
    i.customerName.toLowerCase().includes(search.toLowerCase()) ||
    i.ticketNo.toLowerCase().includes(search.toLowerCase())
  )
  if (filterStatus !== 'All') {
    filtered = filtered.filter(i => i.status === filterStatus)
  }

  const counts = {
    All: issues.length,
    Pending: issues.filter(i => i.status === 'Pending').length,
    'In Progress': issues.filter(i => i.status === 'In Progress').length,
    Done: issues.filter(i => i.status === 'Done').length,
  }

  const validate = () => {
    const e: Partial<typeof emptyForm> = {}
    if (!form.customerName.trim()) e.customerName = 'Customer name required'
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid 10-digit phone required'
    if (!form.deviceType.trim()) e.deviceType = 'Device type required'
    if (!form.issue.trim()) e.issue = 'Issue description required'
    return e
  }

  const handleAdd = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    const payload = {
      customerName: form.customerName,
      phone: form.phone,
      email: form.email,
      deviceModel: form.deviceType,
      issueDescription: form.issue,
      priority: form.priority,
      estimatedCost: Number(form.estimatedCost) || 0,
    }

    fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to add repair')
        return data
      })
      .then(data => {
        setIssues([mapTicket(data), ...issues])
        setForm(emptyForm)
        setErrors({})
        setShowModal(false)
      })
      .catch(err => {
        console.error(err)
        alert('Error adding repair: ' + err.message)
      })
  }

  const handleStatusChange = (id: string, status: RepairTicket['status']) => {
    // Persist status to DB
    fetch(`${API_BASE_URL}/tickets/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(err => console.error('Status update failed:', err))

    // Update UI immediately
    setIssues(issues.map(i => i._id === id ? { ...i, status } : i))
  }

  const handleDelete = (id: string) => {
    if (!confirm('Delete this repair ticket?')) return
    fetch(`${API_BASE_URL}/tickets/${id}`, { method: 'DELETE' })
      .then(() => setIssues(issues.filter(i => i._id !== id)))
      .catch(err => console.error(err))
  }

  return (
    <>
      <Topbar title="Repair Issues" />
      <div className="page-body">
        <div className="page-header">
          <div className="page-header-left">
            <h1>Repair Issues</h1>
            <p>All repair requests from clients and walk-ins — {issues.length} total</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + New Repair
          </button>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {(['All', 'Pending', 'In Progress', 'Done'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="btn btn-secondary btn-sm"
              style={filterStatus === s ? { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' } : {}}
            >
              {s} <span style={{ opacity: 0.7 }}>({counts[s]})</span>
            </button>
          ))}
        </div>

        <div className="search-bar">
          <div className="search-input-wrap">
            <span className="search-icon">Search</span>
            <input
              type="text"
              placeholder="Search by customer name or ticket no..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="card">
          <div className="table-wrap">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <p>No repair tickets found.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Ticket</th>
                    <th>Customer</th>
                    <th>Device</th>
                    <th>Issue</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Cost (₹)</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <tr key={r._id}>
                      <td><span style={{ fontFamily: 'monospace', color: 'var(--accent)', fontWeight: 600 }}>{r.ticketNo}</span></td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>{r.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.phone}</div>
                        {r.email && <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{r.email}</div>}
                      </td>
                      <td style={{ fontSize: '0.82rem' }}>{r.deviceType}</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: 180 }}>{r.issue}</td>
                      <td><span className={`badge ${priorityClass[r.priority]}`}>{r.priority}</span></td>
                      <td>
                        <select
                          className="form-control"
                          style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
                          value={r.status}
                          onChange={e => handleStatusChange(r._id, e.target.value as RepairTicket['status'])}
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Done</option>
                        </select>
                      </td>
                      <td style={{ fontWeight: 600 }}>₹{r.estimatedCost.toLocaleString()}</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{r.receivedDate}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <span className="modal-title">Add New Repair</span>
                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Customer Name *</label>
                    <input className="form-control" placeholder="Full name" value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} />
                    {errors.customerName && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.customerName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input className="form-control" placeholder="10-digit number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} maxLength={10} />
                    {errors.phone && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-control" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Device Type *</label>
                    <select className="form-control" value={form.deviceType} onChange={e => setForm({ ...form, deviceType: e.target.value })}>
                      <option value="">Select device</option>
                      <option>Laptop</option>
                      <option>Desktop PC</option>
                      <option>Printer</option>
                      <option>Monitor</option>
                      <option>Other</option>
                    </select>
                    {errors.deviceType && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.deviceType}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select className="form-control" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as typeof form.priority })}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estimated Cost (₹)</label>
                    <input className="form-control" type="number" placeholder="e.g. 1500" value={form.estimatedCost} onChange={e => setForm({ ...form, estimatedCost: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Issue Description *</label>
                  <textarea className="form-control" placeholder="Describe the issue in detail..." value={form.issue} onChange={e => setForm({ ...form, issue: e.target.value })} />
                  {errors.issue && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.issue}</span>}
                </div>
                <div className="form-actions">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleAdd}>Add Repair</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
