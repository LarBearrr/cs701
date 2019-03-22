// /**
//  * Inspiration drawn from:
//  * https://lavrton.com/hit-region-detection-for-html5-canvas-and-how-to-listen-to-click-events-on-canvas-shapes-815034d7e9f8/
//  *
//  *
//  *
//  * See: https://stackoverflow.com/questions/46495357/hiding-or-erasing-the-the-circle-from-canvas-if-user-clicks-on-same-area
//  */

// (function (doc) {
//     var canvas = doc.getElementById("circles");
//     var context = canvas.getContext("2d");

//     let circles = [];

//     let radius = 30;

//     /**
//      *
//      * @param {*} x
//      * @param {*} y
//      * @param {*} circle
//      *
//      * https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
//      */
//     function isTouching(x, y, circle) {
//         return Math.sqrt((x-circle.posX) ** 2 + (y - circle.posY) ** 2) < 60;
//     }


// access the canvas element and its context
var canvas = document.getElementById("circles");
var context = canvas.getContext("2d");
var circles = []; // An empty array to hold our circles

// add click handler
canvas.onclick = function(e) {
  var pos = getMousePos(canvas, e);

    if (circles.length == 0) {
        addCircle(pos.x, pos.y);
    }


  addCircle(pos.x, pos.y);
}

function addCircle(mouse_x, mouse_y) {
  // First, we check if there is any intersection with existing circles
  for (var i = circles.length - 1; i > 0; i--) {
    var circle = circles[i],
      distance = isTouching(circle.x, circle.y, mouse_x, mouse_y);

    // If distance is less than radius times two, then we know its a collision
    if (distance < 60) {
      circles.splice(i, 1); // Remove the element from array
    }
  }

  // Second, we push the new circle in the array
  circles.push({
    x: mouse_x,
    y: mouse_y,
    color: randomColor()
  });

  // Third, we draw based on what circles we have in the array
  drawCircles();
}

function drawCircles() {
  // We'll have to clear the canvas as it has deleted circles as well
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = circles.length - 1; i > 0; i--) {
    var circle = circles[i];

    context.fillStyle = circle.color;
    context.beginPath();
    context.arc(circle.x, circle.y, 30, 0, 2 * Math.PI);
    context.fill();
  }
}

// Function to get distance between two points
function isTouching(x1, y1, x2, y2) {
  // Distance formula
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function randomColor() {
  var color = [];
  for (var i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256));
  }
  return 'rgb(' + color.join(',') + ')';
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}