"use strict";

var co = require('co');
var wait = require('co-wait');

var api = require('./api');
var VLCPlayer = require('./vlc');
var onMessage = require('./messages-handler');
var WebSocketClient = require('./WSClient');

var main = co.wrap(function*(room, password) {
  var vlc = new VLCPlayer();
  yield wait(2000);
  vlc.init();
  var connectionInfo = yield api.getWSInfo(room, password);

  var options = {
    uri: connectionInfo.websocket.uri + connectionInfo.room.token + '?subscribe-broadcast',
    onMessage: onMessage(vlc),
    heartbeat: connectionInfo.websocket.heartbeat,
    onOpen: function() {},
    onError: function(err) {
      console.error(err);
    }
  };

  var client = new WebSocketClient(options);
});



module.exports = main;
