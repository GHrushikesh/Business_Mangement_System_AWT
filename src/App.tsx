import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ClientLayout from './components/ClientLayout'
import Dashboard from './pages/admin-side/Dashboard'
import Customers from './pages/admin-side/Customers'
import RepairIssues from './pages/admin-side/RepairIssues'
import Products from './pages/admin-side/Products'
import ClientHome from './pages/client-side/ClientHome'
import ClientServices from './pages/client-side/ClientServices'
import ClientStore from './pages/client-side/ClientStore'
import ClientTrack from './pages/client-side/ClientTrack'
import ClientBook from './pages/client-side/ClientBook'
import Login from './pages/Login'
function AdminLayout() {
  return (
    <div className="app-layout">
      <Layout />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<ClientHome />} />
        <Route path="services" element={<ClientServices />} />
        <Route path="store" element={<ClientStore />} />
        <Route path="track" element={<ClientTrack />} />
        <Route path="book" element={<ClientBook />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ClientHome />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="repairs" element={<RepairIssues />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  )
}
export default App
