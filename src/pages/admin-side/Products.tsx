import { useState, useEffect } from 'react'
import Topbar from '../../components/Topbar'
import API_BASE_URL from '../../apiConfig'
interface Product {
  _id: string
  name: string
  category: string
  brand: string
  price: number
  stock: number
  status: 'Available' | 'Out of Stock'
  description: string
  imgUrl?: string
}
const categoryIcons: Record<string, string> = {
  Laptop: 'Laptop',
  Monitor: 'Monitor',
  RAM: 'RAM',
  Storage: 'Storage',
  Peripherals: 'Peripherals',
  Other: 'Other',
}
const emptyForm = { name: '', category: '', brand: '', price: '', stock: '', description: '' }
export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((d: any) => ({
           ...d,
           status: d.stock > 0 ? 'Available' : 'Out of Stock'
        }))
        setProducts(mapped)
      })
      .catch(err => console.error(err))
  }, [])
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<typeof emptyForm>>({})
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )
  if (filterCategory !== 'All') {
    filtered = filtered.filter(p => p.category === filterCategory)
  }
  const validate = () => {
    const e: Partial<typeof emptyForm> = {}
    if (!form.name.trim()) e.name = 'Product name required'
    if (!form.category.trim()) e.category = 'Category required'
    if (!form.brand.trim()) e.brand = 'Brand required'
    if (!form.price || isNaN(Number(form.price))) e.price = 'Valid price required'
    return e
  }
const categoryImages: Record<string, string> = {
  Laptop:       'https://picsum.photos/seed/laptop/500/300',
  'Desktop PC': 'https://picsum.photos/seed/desktop/500/300',
  Monitor:      'https://picsum.photos/seed/monitor/500/300',
  RAM:          'https://picsum.photos/seed/ram/500/300',
  Storage:      'https://picsum.photos/seed/ssd/500/300',
  Peripherals:  'https://picsum.photos/seed/keyboard/500/300',
  Printer:      'https://picsum.photos/seed/printer/500/300',
  Other:        'https://picsum.photos/seed/tech/500/300',
}

  const handleAdd = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    const stock = Number(form.stock) || 0
    const newProduct = {
      name: form.name,
      category: form.category,
      brand: form.brand,
      price: Number(form.price),
      stock,
      description: form.description,
      imgUrl: categoryImages[form.category] || categoryImages['Other'],
    }

    fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then(async res => {
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to add product')
      return data
    })
    .then(data => {
      setProducts([{...data, status: data.stock > 0 ? 'Available' : 'Out of Stock'}, ...products])
      setForm(emptyForm)
      setErrors({})
      setShowModal(false)
    })
    .catch(err => {
      console.error(err)
      alert('Error adding product: ' + err.message)
    })
  }
  const handleDelete = (id: string) => {
    fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts(products.filter(p => p._id !== id)))
      .catch(err => console.error(err))
  }
  return (
    <>
      <Topbar title="Products" />
      <div className="page-body">
        <div className="page-header">
          <div className="page-header-left">
            <h1>Products</h1>
            <p>{products.length} products in Ujjam Computer inventory</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Product
          </button>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className="btn btn-secondary btn-sm"
              onClick={() => setFilterCategory(cat)}
              style={filterCategory === cat ? { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="search-bar">
          <div className="search-input-wrap">
            <span className="search-icon">Search</span>
            <input
              type="text"
              placeholder="Search by product name or brand..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No products found.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => (
              <div className="product-card" key={p._id}>
                <div className="product-img" style={{ height: 160, padding: 0, overflow: 'hidden' }}>
                  {p.imgUrl ? (
                    <img src={p.imgUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: p.status === 'Available' ? 'none' : 'grayscale(100%)', opacity: p.status === 'Available' ? 1 : 0.6 }} />
                  ) : (
                    <div style={{ fontSize: '3rem', color: p.status === 'Available' ? 'inherit' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      {categoryIcons[p.category] || 'Product'}
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <div className="product-category">{p.brand} · {p.category}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{p.description}</div>
                  <div className="product-footer">
                    <div className="product-price">₹{p.price.toLocaleString()}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <span className={`badge ${p.status === 'Available' ? 'badge-available' : 'badge-out-of-stock'}`}>
                        {p.status}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Stock: {p.stock}</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}
                    onClick={() => handleDelete(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <span className="modal-title">Add New Product</span>
                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Product Name *</label>
                    <input className="form-control" placeholder="e.g. Dell Inspiron 15" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                      <option value="">Select category</option>
                      <option>Laptop</option>
                      <option>Desktop PC</option>
                      <option>Monitor</option>
                      <option>RAM</option>
                      <option>Storage</option>
                      <option>Peripherals</option>
                      <option>Printer</option>
                      <option>Other</option>
                    </select>
                    {errors.category && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.category}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Brand *</label>
                    <input className="form-control" placeholder="e.g. Dell, HP, Lenovo" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
                    {errors.brand && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.brand}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price (₹) *</label>
                    <input className="form-control" type="number" placeholder="e.g. 45000" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                    {errors.price && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.price}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stock Quantity</label>
                    <input className="form-control" type="number" placeholder="e.g. 5" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" placeholder="Brief product description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="form-actions">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleAdd}>Add Product</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
