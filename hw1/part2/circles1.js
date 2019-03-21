(function (doc) {
    var canvas = doc.getElementById("circles");
    let radius = 30;

    // click event handler
    canvas.onclick = function (e) {
        var rect = e.target.getBoundingClientRect();
        var context = canvas.getContext("2d");

        context.fillStyle = randomColor();
        context.beginPath();
        context.arc(e.clientX - rect.left, e.clientY - rect.top, radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
})(document);