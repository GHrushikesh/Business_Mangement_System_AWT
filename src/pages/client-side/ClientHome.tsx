import { Link } from 'react-router-dom'
export default function ClientHome() {
  return (
    <>
      <section className="client-hero">
        <div className="client-container">
          <div className="hero-content">
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              Electronics Repair & Sales
            </h1>
            <p>Get your devices fixed by experts or check out our latest collection of systems and components. Track your ongoing repairs in real-time right here.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40 }}>
              <Link to="/book" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>Book a Repair</Link>
              <Link to="/track" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Track Status</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="client-services" style={{ padding: '60px 0', background: 'var(--card-bg)' }}>
        <div className="client-container">
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, textAlign: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Quick Turnaround</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We aim to finish most repairs in 1-2 days. If you're in a hurry, ask about our express service.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>3-Month Warranty</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We stand by our work. All hardware fixes come with a reliable 90-day warranty on parts and labor.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Quality Components</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We use only genuine or top-grade replacement parts to ensure your device stays fixed for good.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="client-contact" style={{ padding: '80px 0', background: 'var(--bg)' }}>
        <div className="client-container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: 12 }}>Visit Our Shop</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>Need help with a device? Drop by our store in Bhuj or give us a call. We're open daily from 9:30 AM to 9:00 PM.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
            <div className="card" style={{ padding: 30 }}>
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: 8, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Call Us</h4>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 4 }}>Shop: +91 98242 30399</div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: 8, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Location</h4>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>Shop No.4, Shanthi Chamber, Station Rd, opposite SBI, Lal Tekri, Bhuj, Gujarat 370001</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent)', marginBottom: 8, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</h4>
                <p style={{ fontSize: '1.1rem' }}>ucbhuj@gmail.com</p>
              </div>
            </div>
            <div className="card" style={{ height: '100%', minHeight: 400, padding: 0, overflow: 'hidden' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.81644327049!2d69.67438589999999!3d23.249765699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3950e1fec923afbb%3A0xd00c97aacfa8704b!2sUjjam%20Computer!5e0!3m2!1sen!2sin!4v1773485278124!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
