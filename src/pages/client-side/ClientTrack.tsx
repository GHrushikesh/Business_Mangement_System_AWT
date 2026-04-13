import { useState } from 'react'
import API_BASE_URL from '../../apiConfig'
export default function ClientTrack() {
  const [ticketNo, setTicketNo] = useState('')
  const [statusResult, setStatusResult] = useState<{ found: boolean, status?: string } | null>(null)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketNo.trim()) return
    
    fetch(`${API_BASE_URL}/tickets/track/${ticketNo}`)
      .then(res => res.json())
      .then(data => {
        setStatusResult(data)
      })
      .catch(err => {
        console.error(err)
        setStatusResult({ found: false })
      })
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--sidebar-bg)', color: '#fff' }}>
      <div className="client-container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 32px' }}>
        <div className="hero-search-box" style={{ width: '100%', maxWidth: 540 }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 8 }}>Track Your Repair</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.95rem' }}>
            Enter the Ticket Number from your receipt to see how your repair is coming along.
          </p>
          <form onSubmit={handleSearch} className="hero-search-form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input 
              type="text" 
              placeholder="e.g. TF-001" 
              value={ticketNo}
              onChange={e => setTicketNo(e.target.value)}
              style={{ fontSize: '1.05rem', padding: '14px 16px' }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '14px', justifyContent: 'center', fontSize: '1rem' }}>
              Check Status
            </button>
          </form>
          {statusResult && (
            <div className={`status-result ${statusResult.found ? 'found' : 'not-found'}`} style={{ marginTop: 24 }}>
              {statusResult.found
                ? (
                  <div>
                    <div style={{ fontSize: '1rem', marginBottom: 8 }}>
                      Ticket <strong>{ticketNo}</strong> found in our system.
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.1rem', fontWeight: 700 }}>
                      Current Status:
                      <span style={{
                        padding: '4px 14px',
                        borderRadius: '99px',
                        background: statusResult.status === 'Done' || statusResult.status === 'Completed'
                          ? '#d1fae5' : statusResult.status === 'In Progress'
                          ? '#fef3c7' : '#e5e7eb',
                        color: statusResult.status === 'Done' || statusResult.status === 'Completed'
                          ? '#065f46' : statusResult.status === 'In Progress'
                          ? '#92400e' : '#374151',
                      }}>
                        {statusResult.status}
                      </span>
                    </div>
                  </div>
                )
                : 'No ticket found with that number. Please double-check and try again.'
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
