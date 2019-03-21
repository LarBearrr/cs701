var sliderModule = (function(win, doc) {

    win.onload = init;

    // canvas and context variables
    var canvas;
    var context;

    // center of the pattern
    var centerX, centerY;


    function init() {
        // draw the initial pattern
        drawPattern();
    }


    // called whenever the slider value changes
    function drawPattern() {
        const canvas = document.querySelector('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;

        const colors = ['#F00', '#00F'];
        const outerRadius = 200;
        let bandSize = doc.getElementById("bandWidth").value;
        doc.getElementById("currentBandWidth").innerHTML = bandSize;
        for (
            let r = outerRadius, colorIndex = 0;
            r > 0;
            r -= bandSize, colorIndex = (colorIndex + 1) % colors.length
        )
        {
          context.fillStyle = colors[colorIndex];
          context.beginPath();
          context.arc(canvas.width / 2, canvas.height / 2, r, 0, Math.PI * 2);
          context.closePath();
          context.fill();
        }
    }

    return {
        drawPattern: drawPattern
    };

})(window, document);

