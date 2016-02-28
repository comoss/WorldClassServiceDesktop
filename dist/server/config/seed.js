/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _apiThingThingModel = require('../api/thing/thing.model');

var _apiThingThingModel2 = _interopRequireDefault(_apiThingThingModel);

var _apiUserUserModel = require('../api/user/user.model');

var _apiUserUserModel2 = _interopRequireDefault(_apiUserUserModel);

// User.find({}).removeAsync()
//   .then(() => {
//     User.createAsync({
//       provider: 'local',
//       name: 'Test User',
//       email: 'test@example.com',
//       password: 'test',
//       role: 'guest'
//     }, {
//       provider: 'local',
//       role: 'admin',
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: 'admin'
//     })
//     .then(() => {
//       console.log('finished populating users');
//     });
//   });
//# sourceMappingURL=seed.js.map
