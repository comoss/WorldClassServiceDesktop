'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Pictoose	= require('pictoose');

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
  updated: { type: Date, default: Date.now },
  submitter: String,

});

export default mongoose.model('WCS', WCSSchema);
