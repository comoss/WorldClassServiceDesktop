'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var WCSSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: Date,
  email: String,
  resolutionDepartment: String,
  company: String,
  issue: String,
  product: String,
  resolutionStatus: String,
  notes: String,
  active: Boolean,
  submitter: String,
  submitterEmail: String,
  submitterPhone: String,
  manufactureDate: String,
  partNumber: String,
  assignedAgent: String,
  orderNumber: String,
  image: String,
  image0: String,
  image1: String,
});

export default mongoose.model('WCS', WCSSchema);
