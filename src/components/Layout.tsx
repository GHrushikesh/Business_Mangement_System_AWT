import { NavLink, Link } from 'react-router-dom'
const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/customers', label: 'Customers' },
  { to: '/admin/repairs', label: 'Repair Issues' },
  { to: '/admin/products', label: 'Products' },
]
export default function Layout() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-name">
          <img src="/logo.jpeg" alt="UC" style={{ width: 24, height: 24, objectFit: 'contain', verticalAlign: 'middle', marginRight: 6 }} />
          Ujjam Computer
        </div>
        <div className="sidebar-brand-sub">Computer Repair & Sales</div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-section-label">Main Menu</div>
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin/dashboard'}
            className={({ isActive }) =>
              `sidebar-nav-item${isActive ? ' active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
        <div style={{ marginTop: 20 }}>
          <div className="sidebar-section-label">Public</div>
          <Link to="/" className="sidebar-nav-item">
            Back to Site
          </Link>
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">U</div>
          <div>
            <div className="sidebar-user-name">Ujjam Admin</div>
            <div className="sidebar-user-role">Manager</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
