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
  noticeLabel: String,
  assignedAgent: String,
  orderNumber:String,
  // this doesn not seem to be working, why can't I get it to work? Probably should convert it to a string and then pass it.
  file: { data: Buffer, contentType: String}
});

export default mongoose.model('WCS', WCSSchema);
