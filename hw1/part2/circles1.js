(function (doc) {
    var canvas = doc.getElementById("circles");
    let circles = [];

    let radius = 30;

    // click event handler
    canvas.onclick = function (e) {
        var rect = e.target.getBoundingClientRect();
        var context = canvas.getContext("2d");

        let circle = new Object();
        circle.id = circles.length + 1;
        circle.posX = e.clientX - rect.left;
        circle.posY = e.clientY - rect.top;

        console.log(circles);

        circles.push(circle)

        context.fillStyle = randomColor();
        context.beginPath();
        context.arc(e.clientX - rect.left, e.clientY - rect.top, radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
})(document);