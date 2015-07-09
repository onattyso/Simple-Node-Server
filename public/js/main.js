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
      this.socket = io(':8080/');
      this.socket.on('audio out', function (data) {
        // console.log(data);
        update(data);
      });
    }
  };
})();


function init() {
  Socket.init();
}

function update(data) {
  //all my animations! using the data!
  console.log(data);
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


