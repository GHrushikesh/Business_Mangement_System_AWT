import { useState } from 'react'
import API_BASE_URL from '../../apiConfig'
export default function ClientBook() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', device: '', issue: '' })
  const [submitted, setSubmitted] = useState(false)
  const [ticketNo, setTicketNo] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newTicket = {
      customerName: form.name,
      phone: form.phone,
      email: form.email,
      deviceModel: form.device,
      issueDescription: form.issue,
    }

    fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTicket),
    })
      .then(async res => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to submit request')
        return data
      })
      .then(data => {
        const generatedTicketNo = `TF-${String(data._id).slice(-4).toUpperCase()}`
        setTicketNo(generatedTicketNo)
        setSubmitted(true)
        setForm({ name: '', phone: '', email: '', device: '', issue: '' })
      })
      .catch(err => {
        console.error(err)
        alert('Error: ' + err.message)
      })
  }

  return (
    <div style={{ padding: '60px 0', background: 'var(--bg)', flex: 1 }}>
      <div className="client-container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{ width: '100%', maxWidth: 640, padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 8 }}>Schedule a Repair</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Tell us what's wrong with your computer or device. We'll get back to you soon with a price estimate and when you can bring it in.</p>
          </div>
          {submitted ? (
            <div style={{ padding: '32px', textAlign: 'center', background: 'var(--success-light)', color: 'var(--success)', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 8 }}>Request Submitted!</h3>
              <p style={{ marginBottom: 16 }}>We'll give you a call within a couple of hours to discuss the repair.</p>
              <div style={{
                background: '#fff',
                border: '2px dashed var(--success)',
                borderRadius: '8px',
                padding: '16px 24px',
                marginBottom: 20,
                display: 'inline-block',
              }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4, opacity: 0.7 }}>Your Ticket Number</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '4px', color: 'var(--success)' }}>{ticketNo}</div>
                <div style={{ fontSize: '0.78rem', marginTop: 6, opacity: 0.8 }}>Save this to track your repair status</div>
              </div>
              <div>
                <button className="btn btn-secondary" style={{ background: '#fff' }} onClick={() => { setSubmitted(false); setTicketNo('') }}>Submit Another Request</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="form-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <input required className="form-control" placeholder="e.g. John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number *</label>
                  <input required type="tel" className="form-control" placeholder="10-digit number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Device Type *</label>
                  <select required className="form-control" value={form.device} onChange={e => setForm({...form, device: e.target.value})}>
                    <option value="">Select your device</option>
                    <option>Windows Laptop</option>
                    <option>MacBook</option>
                    <option>Desktop PC</option>
                    <option>Monitor/Display</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Describe the Issue *</label>
                <textarea 
                  required 
                  className="form-control" 
                  style={{ minHeight: 120 }}
                  placeholder="Tell us exactly what's wrong with the device..."
                  value={form.issue} 
                  onChange={e => setForm({...form, issue: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '1.05rem', justifyContent: 'center', marginTop: 10 }}>
                Request Repair Quote
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
