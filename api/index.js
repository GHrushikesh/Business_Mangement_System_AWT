require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Models (Standard .js)
const RepairTicket = require('./models/RepairTicket.js');
const Customer = require('./models/Customer.js');
const Product = require('./models/Product.js');
const RepairIssue = require('./models/RepairIssue.js');

// Database Helper
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.log('❌ DB Error:', err);
  }
};

// ======================= ROUTES =======================

// Health check that also checks the DB
app.get('/api/health', async (req, res) => {
  await connectDB();
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 });
});

app.get('/api/customers', async (req, res) => {
  try {
    await connectDB();
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    await connectDB();
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/tickets', async (req, res) => {
  try {
    await connectDB();
    const tickets = await RepairTicket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tickets', async (req, res) => {
  try {
    await connectDB();
    const newTicket = new RepairTicket(req.body);
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    await connectDB();
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/issues', async (req, res) => {
  try {
    await connectDB();
    const issues = await RepairIssue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tickets/track/:ticketNo', async (req, res) => {
  try {
    await connectDB();
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
  await connectDB();
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.delete('/api/products/:id', async (req, res) => {
  await connectDB();
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.delete('/api/tickets/:id', async (req, res) => {
  await connectDB();
  await RepairTicket.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = app;
