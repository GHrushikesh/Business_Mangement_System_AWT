import { Link, Outlet } from 'react-router-dom'

export default function ClientLayout() {
  return (
    <div className="client-layout">

      <header className="client-header">
        <div className="client-container header-inner">
          <Link to="/" className="client-brand" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.jpeg" alt="Ujjam Computer" style={{ height: 32, objectFit: 'contain', marginRight: 10 }} />
            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>Ujjam Computer</span>
          </Link>
          <nav className="client-nav">
            <Link to="/services">Services</Link>
            <Link to="/store">Store</Link>
            <Link to="/track">Track Repair</Link>
            <Link to="/book">Book Repair</Link>
            <Link to="/login" className="btn btn-secondary btn-sm" style={{ marginLeft: 16 }}>
              Admin Login
            </Link>
          </nav>
        </div>
      </header>


      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>


      <footer className="client-footer">
        <div className="client-container" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 8 }}>© 2026 Ujjam Computer.We Repair Your Products Faster Then Your Wi-Fi!!.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>You Can Visit us at Bhuj, Gujarat | Phone: +91 98242 30399</p>
        </div>
      </footer>
    </div>
  )
}
