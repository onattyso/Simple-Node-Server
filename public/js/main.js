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
  setup();
}

function resize() {
    //resize canvas
    var canvas = document.getElementById('defaultCanvas');
        // context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);


//do all of this changing color thing in p5
    function resizeCanvas() {
      var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.removeAttribute('style');
      canvas.style.width = window.innerWidth;
      canvas.style.height = window.innerHeight;

      canvas.style.backgroundColor=randomColor;
    }
    resizeCanvas();
}

var w = 50;

function update(data) {
  //all my animations! using the data!
  console.log(data);
  //PUT ALL THIS DATA INTO THE POINTS IN THE SQUARE
  w = data*100;
}

function setup () {
}

function draw() {
  ellipse(w, 50, 50,50);
//when draw happens, it comes up with a new color for when the resize happens. 
}


function load() {
  //SQUARE IS ROTATING
  resize();
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


