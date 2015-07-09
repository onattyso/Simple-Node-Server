// function getConfig(callback) {
//   $.ajax({
//     url: window.location.origin + '/config',
//     success: function(data, textStatus, jqXHR) {
//       console.dir(data);
//       App.config = data;
//       if (typeof data !== "undefined") {
//         callback();
//       }
//     },
//     error: function() {
//       console.log("FAIL");
//       App.initFailed = true;
//     }
//   });
// }

var Socket = (function () {
  return {
    socket: null,
    init: function () {
      // var that = this;
      this.socket = io('http://localhost:8080');
      // this.socket.on('news', function (data) {
        // console.log(data);
      
      // });
    }
  };
})();


function init() {
  Socket.init();

  //Listen to mic!
  initAudioInput();
}

function initAudioInput() {
  // Set up the audio context (using a monkey patch to use whichever version ACTUALLY works in this browser):
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();

  // Attempt to get audio input from the audio context we just grabbed.
  // Again, this uses monkey patches because browsers don't all work the same...
  try {
    // monkeypatch getUserMedia
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // ask for an audio input
    navigator.getUserMedia({audio:true}, gotStream, function() {
      alert('Stream generation failed.');
    });
  } catch (e) {
    alert('getUserMedia threw exception :' + e);
  }
}

function gotStream(stream) {
  // Create an AudioNode from the stream.
  var mediaStreamSource = audioContext.createMediaStreamSource(stream);
  // Create a new volume meter and connect it.
  meter = createAudioMeter(audioContext);
  mediaStreamSource.connect(meter);


  // This is where you loop and continue checking the meter.volume value:
  audioInterval = window.setInterval(function() {
    console.log("meter.volume: " + meter.volume);
    if (meter.volume > 0.075) {
        console.log("We're getting data!");
        Socket.socket.emit('audio data', meter.volume);
    }
  } , 10);
}


function load() {
}

$(document).ready(function () {
  // This runs after the DOM is ready (this happens WAY before you can see anything in the browser)
  console.log("DOM ready...");
  init();
});

$(window).load(function () {
  // This runs after the CSS rules have been applied to the page. (this happens WAY AFTER the DOM loads)
  console.log("and CSS loaded!");
  load();
});


