import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Specific Admin Credentials
    const ADMIN_EMAIL = 'admin@gmail.com'
    const ADMIN_PASSWORD = 'admin123'

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Save auth state (simplified)
        localStorage.setItem('isAdminAuthenticated', 'true')
        navigate('/admin/repairs') // Use the correct route from App.tsx
      } else {
        setError('Invalid email or password. Please try again.')
        setLoading(false)
      }
    }, 800)
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text-primary)', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <img src="/logo.jpeg" alt="Ujjam Computer Logo" style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: '50%' }} />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 8 }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sign in to manage your workshop.</p>
        </div>
        <div className="card" style={{ padding: 32, background: 'var(--card-bg)' }}>
          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem', textAlign: 'center', border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label className="form-label">Email Address</label>
              <input
                required
                type="email"
                className="form-control"
                placeholder="admin@ujjam.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <a href="#" style={{ fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none' }}>Forgot?</a>
              </div>
              <input
                required
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '14px', justifyContent: 'center', marginTop: 8 }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>
            Back to Public Site
          </Link>
        </div>
      </div>
    </div>
  )
}
