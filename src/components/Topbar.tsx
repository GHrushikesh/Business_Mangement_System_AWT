import type { ReactNode } from 'react'
interface TopbarProps {
  title: string
  children?: ReactNode
}
export default function Topbar({ title, children }: TopbarProps) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  })
  return (
    <header className="topbar">
      <span className="topbar-title">{title}</span>
      <div className="topbar-right">
        <span className="topbar-date">{dateStr}</span>
        <div className="topbar-badge" title="Notifications">
          Notifications
        </div>
        {children}
      </div>
    </header>
  )
}
