const mongoose = require('mongoose');

const RepairTicket = require('./models/RepairTicket');
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const RepairIssue = require('./models/RepairIssue');

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/awtdb');
  console.log('Connected to DB');

  // Explicitly create collections so they show up in Compass even when empty
  await RepairTicket.createCollection();
  await Customer.createCollection();
  await Product.createCollection();
  await RepairIssue.createCollection();

  console.log('Collections successfully created! You can now see them in MongoDB Compass.');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
