"use strict";

var co = require('co');
var request = require("co-request");

var config = require('../config');


var getWSInfo = function*(room, password) {
  return yield request.get(config.apiUrl + '/login?name=' + room + '&password=' + password);
};


var getCurrentMusic = function*(token) {
  return yield request.get(config.apiUrl + '/music', {
    'auth': {
      'bearer': token
    }
  });
};

module.exports.getWSInfo = getWSInfo;
module.exports.getCurrentMusic = getCurrentMusic;
