/**
 * initAtlasDB.js
 * Run this ONCE to create all empty collections + indexes in MongoDB Atlas.
 * No data is inserted — just the collection structure.
 *
 * Usage:
 *   cd backend
 *   node initAtlasDB.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env file!');
  process.exit(1);
}

// Import all models
const Customer    = require('./models/Customer');
const Product     = require('./models/Product');
const RepairTicket = require('./models/RepairTicket');
const RepairIssue = require('./models/RepairIssue');

async function initDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas!\n');

    // createCollection() explicitly creates the collection + all schema indexes
    // without inserting any documents
    await Customer.createCollection();
    console.log('✅ Collection created: customers');

    await Product.createCollection();
    console.log('✅ Collection created: products');

    await RepairTicket.createCollection();
    console.log('✅ Collection created: repairtickets');

    await RepairIssue.createCollection();
    console.log('✅ Collection created: repairissues');

    console.log('\n🎉 All collections are ready in Atlas! You can close this.');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

initDB();
