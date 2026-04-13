import { useState, useEffect } from 'react'
import API_BASE_URL from '../../apiConfig'
import Topbar from '../../components/Topbar'
interface Customer {
  _id: string
  name: string
  phone: string
  email: string
  address: string
  joinDate: string
  totalRepairs: number
}
const emptyForm = { name: '', phone: '', email: '', address: '' }
export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/customers`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((c: any) => ({
          ...c,
          joinDate: new Date(c.createdAt).toISOString().slice(0, 10),
          totalRepairs: c.totalRepairs || 0
        }))
        setCustomers(mapped)
      })
      .catch(err => console.error(err))
  }, [])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<typeof emptyForm>>({})
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )
  const validate = () => {
    const e: Partial<typeof emptyForm> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone number required'
    if (form.email.trim() && !form.email.includes('@')) e.email = 'Valid email is required if provided'
    if (!form.address.trim()) e.address = 'Address is required'
    return e
  }
  const handleAdd = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    const newCustomer = {
      ...form,
    }

    fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer)
    })
    .then(async res => {
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to add customer')
      return data
    })
    .then(data => {
      setCustomers([{
        ...data,
        joinDate: new Date(data.createdAt).toISOString().slice(0, 10),
        totalRepairs: 0
      }, ...customers])
      setForm(emptyForm)
      setErrors({})
      setShowModal(false)
    })
    .catch(err => {
      console.error(err)
      alert('Error adding customer: ' + err.message)
    })
  }
  const handleDelete = (id: string) => {
    fetch(`${API_BASE_URL}/customers/${id}`, { method: 'DELETE' })
      .then(() => setCustomers(customers.filter(c => c._id !== id)))
      .catch(err => console.error(err))
  }
  return (
    <>
      <Topbar title="Customers" />
      <div className="page-body">
        <div className="page-header">
          <div className="page-header-left">
            <h1>Customers</h1>
            <p>{customers.length} registered customers at Ujjam Computer</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Customer
          </button>
        </div>
        <div className="search-bar">
          <div className="search-input-wrap">
            <span className="search-icon">Search</span>
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="card">
          <div className="table-wrap">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <p>No customers found.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Joined</th>
                    <th>Repairs</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c._id}>
                      <td style={{ color: 'var(--text-secondary)' }}>{i + 1}</td>
                      <td style={{ fontWeight: 600 }}>{c.name}</td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: '0.8rem' }}>
                            Phone: {c.phone}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                            Email: {c.email}
                          </span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{c.address}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{c.joinDate}</td>
                      <td>
                        <span className="badge badge-in-progress">{c.totalRepairs} repairs</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-secondary btn-sm" title="Edit">
                            Edit
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)} title="Delete">
                            Delete
                          </button>
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
                <span className="modal-title">Add New Customer</span>
                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      className="form-control"
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      className="form-control"
                      placeholder="10-digit number"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      maxLength={10}
                    />
                    {errors.phone && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      className="form-control"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address *</label>
                    <input
                      className="form-control"
                      placeholder="City, Area"
                      value={form.address}
                      onChange={e => setForm({ ...form, address: e.target.value })}
                    />
                    {errors.address && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.address}</span>}
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleAdd}>Add Customer</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
