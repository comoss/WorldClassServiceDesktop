/**
 * WCS model events
 */

'use strict';

import {EventEmitter} from 'events';
var WCS = require('./WCS.model');
var WCSEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WCSEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  WCS.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WCSEvents.emit(event + ':' + doc._id, doc);
    WCSEvents.emit(event, doc);
  }
}

export default WCSEvents;
