export default function ClientServices() {
  const services = [
    { title: "Screen Replacement", desc: "If you've got a cracked laptop or a flickering monitor, we can help. We swap out broken panels with high-quality screens.", price: "Starts at ₹3,500" },
    { title: "Data Recovery", desc: "Lost some important files or having trouble with a hard drive? We'll try our best to get your data back safely.", price: "Starts at ₹1,500" },
    { title: "Hardware Fixes", desc: "From sticky keyboards to batteries that won't charge, we handle all sorts of component replacements.", price: "Starts at ₹800" },
    { title: "System Cleaning", desc: "Computers slowing down? We'll clean out any junk, viruses, or malware to get things running smooth again.", price: "Starts at ₹500" },
    { title: "Network Setup", desc: "Need help setting up your home Wi-Fi or office printer? We can get everything connected correctly.", price: "Starts at ₹1,000" },
    { title: "Custom PC Builds", desc: "Planning a gaming rig or a workstation? We'll help you pick the parts and put it all together for you.", price: "Build Fee ₹2,500" },
  ]
  return (
    <div style={{ padding: '60px 0', background: 'var(--bg)', flex: 1 }}>
      <div className="client-container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 className="section-title" style={{ marginBottom: 16 }}>Our Repair Services</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>We offer dependable repair and setup services for all kinds of computers and accessories.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: 12 }}>{s.title}</h4>
              <p style={{ flex: 1, color: 'var(--text-secondary)' }}>{s.desc}</p>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)', fontWeight: 600, color: 'var(--accent)' }}>
                {s.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
