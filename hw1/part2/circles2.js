/**
 * Inspiration drawn from:
 * https://lavrton.com/hit-region-detection-for-html5-canvas-and-how-to-listen-to-click-events-on-canvas-shapes-815034d7e9f8/
 *
 */

const canvas = document.getElementById("circles");
const context = canvas.getContext("2d");
let circles = [];

canvas.onclick = function (e) {
    let rect = canvas.getBoundingClientRect();

    let posX = e.clientX - rect.left;
    let posY = e.clientY - rect.top

    // draw the first cirlce if circles is empty
    if (circles.length == 0) {
        addCircle(posX, posY);
    }

    addCircle(posX, posY);
}

function addCircle(posX, posY) {
    // have to check our circles array first
    for (var i = circles.length - 1; i > 0; i--) {
        var circle = circles[i];

        if (isTouching(circle.x, circle.y, posX, posY)) {
            circles.splice(i, 1);
        }
    }

    circles.push({
        x: posX,
        y: posY,
        color: randomColor()
    });

    drawCircles();
}

/**
 *
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 */
function isTouching(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) < 60;
}

function drawCircles() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = circles.length - 1; i > 0; i--) {
        var circle = circles[i];

        context.fillStyle = circle.color;
        context.beginPath();
        context.arc(circle.x, circle.y, 30, 0, 2 * Math.PI);
        context.fill();
    }
}