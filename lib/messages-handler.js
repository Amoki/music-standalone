"use strict";


var mapSourceUrl = {
  youtube: 'https://www.youtube.com/watch?v=',
  soundcloud: ''
};

function getUrl(source, id) {
  return mapSourceUrl[source] + id;
}

module.exports = function onMessage(vlc) {
  return function(message) {
    if(message.stop) {
      return vlc.pause();
    }
    if(message.action === 'play') {
      vlc.load(getUrl(message.source, message.options.music_id));
      vlc.seek(parseInt(message.timer_start));
      vlc.play();
    }
  };
};
