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
  resize();

  
}

function resize() {
    //resize canvas
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
      var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.getElementById("canvas").style.backgroundColor=randomColor;
    }
    resizeCanvas();
}

function update(data) {
  //all my animations! using the data!
  console.log(data);
  //PUT ALL THIS DATA INTO THE POINTS IN THE SQUARE


}


function load() {
  //SQUARE IS ROTATING
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


