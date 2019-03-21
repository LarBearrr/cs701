/**
 * Inspiration drawn from:
 * https://lavrton.com/hit-region-detection-for-html5-canvas-and-how-to-listen-to-click-events-on-canvas-shapes-815034d7e9f8/
 *
 *
 *
 * See: https://stackoverflow.com/questions/46495357/hiding-or-erasing-the-the-circle-from-canvas-if-user-clicks-on-same-area
 */

(function (doc) {
    var canvas = doc.getElementById("circles");
    var context = canvas.getContext("2d");
    let circles = [];

    let radius = 30;

    /**
     *
     * @param {*} x
     * @param {*} y
     * @param {*} circle
     *
     * https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
     */
    function isTouching(x, y, circle) {
        return Math.sqrt((x-circle.posX) ** 2 + (y - circle.posY) ** 2) < 60;
    }

    function draw() {
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

    // click event handler
    canvas.onclick = function (e) {
        var rect = e.target.getBoundingClientRect();


        circles.forEach(circle => {
            if (isTouching(e.clientX, e.clientY, circle)) {
                // context.beginPath();
                // context.clearRect(
                //     circle.posX - radius - 1,
                //     circle.posY - radius - 1,
                //     radius * 2 + 2,
                //     radius * 2 + 2
                // );
                // context.closePath();

                context.save();
                context.beginPath();
                context.arc(circle.posX, circle.posY, radius+1, 0, 2*Math.PI, true);
                context.clip();
                context.clearRect(circle.posX-radius,circle.posY-radius,(radius+1)*2,(radius+1)*2);
                context.restore();
            }
        });

        let newCircle = new Object();
        newCircle.id = circles.length + 1;
        newCircle.posX = e.clientX - rect.left;
        newCircle.posY = e.clientY - rect.top;
        circles.push(newCircle)

        context.fillStyle = randomColor();
        context.beginPath();
        context.arc(e.clientX - rect.left, e.clientY - rect.top, radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
})(document);