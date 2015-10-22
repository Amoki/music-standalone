"use strict";

var co = require('co');
var wait = require('co-wait');

var api = require('./api');
var VLCPlayer = require('./vlc');
var onMessage = require('./ws-messages');
var WebSocketClient = require('./ws-client');

var main = co.wrap(function*(room, password) {
  var vlc = new VLCPlayer();
  yield wait(2000);
  vlc.init();
  var connectionInfo = yield api.getWSInfo(room, password);
  var body = JSON.parse(connectionInfo.body);

  var options = {
    uri: body.websocket.uri + body.room.token + '?subscribe-broadcast',
    receive_message: onMessage(vlc),
    heartbeat_msg: body.websocket.heartbeat,
    onOpen: function() {
      console.log("Connected");
    },
    onError: function(err) {
      console.error(err);
    }
  };

  var client = new WebSocketClient(options);
});



module.exports = main;
