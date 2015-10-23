"use strict";

var co = require('co');
var request = require("co-request");

var config = require('../config');


var getWSInfo = function*(room, password) {
  var res = yield request.get(config.apiUrl + '/login?name=' + room + '&password=' + password);
  var body = JSON.parse(res.body);
  return body;
};


var getCurrentMusic = function*(token) {
  var res = yield request.get(config.apiUrl + '/music', {
    'auth': {
      'bearer': token
    }
  });
  var body = JSON.parse(res.body);
  return body;
};

module.exports.getWSInfo = getWSInfo;
module.exports.getCurrentMusic = getCurrentMusic;
