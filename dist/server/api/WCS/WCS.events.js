/**
 * WCS model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var WCS = require('./WCS.model');
var WCSEvents = new _events.EventEmitter();

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
  return function (doc) {
    WCSEvents.emit(event + ':' + doc._id, doc);
    WCSEvents.emit(event, doc);
  };
}

exports['default'] = WCSEvents;
module.exports = exports['default'];
//# sourceMappingURL=WCS.events.js.map
