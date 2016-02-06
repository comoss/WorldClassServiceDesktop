'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var WCSSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: Date,
  email: String,
  resolutionDepartment: String,
  issue: String,
  product: String,
  resolutionStatus: String,
  notes: String,
  active: Boolean,
  submitter: String,
  manufactureDate: String,
  noticeLabel: String,
  // this doesn not seem to be working, why can't I get it to work? Probably should convert it to a string and then pass it. 
  file: { data: Buffer, contentType: String}
});

export default mongoose.model('WCS', WCSSchema);
