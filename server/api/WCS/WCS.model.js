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
  resolutionStatus: false,
  notes: String,
  active: Boolean,
  submitter: String,
  manufactureDate: String,
  noticeLabel: String,
  // this doesn not seem to be working, why are there so little examples?
  file: { data: Buffer, contentType: String}
});

console.log(WCSSchema.file);

export default mongoose.model('WCS', WCSSchema);
