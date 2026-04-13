const mongoose = require('mongoose');

const repairIssueSchema = new mongoose.Schema({
  issueName: { type: String, required: true },
  description: { type: String, required: true },
  estimatedCost: { type: Number },
  estimatedDuration: { type: String }, // e.g., '1-2 hours', '1 day'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RepairIssue', repairIssueSchema);
