require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection — uses MONGODB_URI env variable
// Set this in your .env file locally, and in Vercel's Environment Variables for production
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined! Check your .env file or Vercel Environment Variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB Atlas!'))
  .catch((err) => console.log('❌ MongoDB connection error: ', err));

// Models
const RepairTicket = require('./models/RepairTicket');
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const RepairIssue = require('./models/RepairIssue');

// ======================= REPAIR TICKET ROUTES =======================
app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await RepairTicket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tickets', async (req, res) => {
  try {
    const newTicket = new RepairTicket(req.body);
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/tickets/track/:ticketNo', async (req, res) => {
  try {
    const { ticketNo } = req.params;
    // Strip the "TF-" prefix if present, and convert to lowercase for matching
    const suffix = ticketNo.replace(/^TF-/i, '').toLowerCase();

    // Load all tickets and find one whose MongoDB _id ends with the given suffix
    const tickets = await RepairTicket.find();
    const ticket = tickets.find(t => String(t._id).toLowerCase().endsWith(suffix));

    if (ticket) {
      res.json({ found: true, status: ticket.status });
    } else {
      res.json({ found: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/tickets/:id', async (req, res) => {
  try {
    const updatedTicket = await RepairTicket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/tickets/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await RepairTicket.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/tickets/:id', async (req, res) => {
  try {
    await RepairTicket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================= CUSTOMER ROUTES =======================
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================= PRODUCT ROUTES =======================
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================= REPAIR ISSUE ROUTES =======================
app.get('/api/issues', async (req, res) => {
  try {
    const issues = await RepairIssue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/issues', async (req, res) => {
  try {
    const newIssue = new RepairIssue(req.body);
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/issues/:id', async (req, res) => {
  try {
    const updatedIssue = await RepairIssue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedIssue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/issues/:id', async (req, res) => {
  try {
    await RepairIssue.findByIdAndDelete(req.params.id);
    res.json({ message: 'Issue deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Only start the server if we are running locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
