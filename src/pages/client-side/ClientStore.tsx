import { useState, useEffect } from 'react'
import API_BASE_URL from '../../apiConfig'

function getImg() {
  return '/logo.jpeg'
}


interface Product {
  _id: string
  name: string
  category: string
  price: number
  stock: number
  description: string
  imgUrl?: string
}
export default function ClientStore() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, [])

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div style={{ padding: '60px 0', background: 'var(--bg)', flex: 1 }}>
      <div className="client-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <h1 className="section-title" style={{ marginBottom: 8 }}>Our Shop</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Check out the computer components and systems we currently have in stock at Ujjam Computer.</p>
          </div>
          <div className="search-input-wrap" style={{ width: 300, background: '#fff' }}>
            <span className="search-icon">Search:</span>
            <input
              type="text"
              placeholder="What are you looking for?"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="products-grid">
          {filtered.map(p => {
             const inStock = p.stock > 0;
             return (
            <div className="product-card" key={p._id}>
              <div className="product-img" style={{ height: 160, padding: 16, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
                <img src={getImg()} alt={p.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: inStock ? 'none' : 'grayscale(100%)', opacity: inStock ? 1 : 0.5 }} />
              </div>
              <div className="product-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="product-name">{p.name}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{p.price.toLocaleString()}</span>
                </div>
                <div className="product-category">{p.category}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 8 }}>{p.description}</div>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  <span className={`badge ${inStock ? 'badge-available' : 'badge-out-of-stock'}`}>
                    {inStock ? 'Available In-Store' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
              <p>No products match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
