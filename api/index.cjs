require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Successfully connected to MongoDB Atlas!'))
    .catch((err) => console.log('❌ MongoDB connection error: ', err));
}

// Models (Note the .cjs extensions!)
const RepairTicket = require('./models/RepairTicket.cjs');
const Customer = require('./models/Customer.cjs');
const Product = require('./models/Product.cjs');
const RepairIssue = require('./models/RepairIssue.cjs');

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Backend is running (CJS Mode)!' }));

// ======================= ROUTES =======================

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

app.get('/api/issues', async (req, res) => {
  try {
    const issues = await RepairIssue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tickets/track/:ticketNo', async (req, res) => {
  try {
    const { ticketNo } = req.params;
    const suffix = ticketNo.replace(/^TF-/i, '').toLowerCase();
    const tickets = await RepairTicket.find();
    const ticket = tickets.find(t => String(t._id).toLowerCase().endsWith(suffix));
    if (ticket) res.json({ found: true, status: ticket.status });
    else res.json({ found: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.delete('/api/tickets/:id', async (req, res) => {
  await RepairTicket.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = app;
