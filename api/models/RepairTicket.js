const mongoose = require('mongoose');

const repairTicketSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  deviceModel: { type: String, required: true },
  issueDescription: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Done', 'Completed', 'Cancelled'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  estimatedCost: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RepairTicket', repairTicketSchema);
