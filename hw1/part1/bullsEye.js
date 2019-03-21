var sliderModule = (function(win, doc) {

    win.onload = init;

    // canvas and context variables
    var canvas1, canvas2, canvas3;
    var context1, context2, context3;

    function init() {
        // draw the initial pattern
        drawPattern1();
        drawPattern2();
        drawPattern3();
    }


    // called whenever the slider value changes
    function drawPattern1() {
        const canvas = document.getElementById('bullsEye1');
        const context = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;

        const colors = ['#F00', '#00F'];
        const outerRadius = 200;
        let bandSize = doc.getElementById("bandWidth1").value;
        doc.getElementById("currentBandWidth1").innerHTML = bandSize;
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

    function drawPattern2() {
        const canvas = document.getElementById('bullsEye2');
        const context = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;

        const colors = ['#F00', '#00F'];
        const outerRadius = 200;
        let bandSize = doc.getElementById("bandWidth2").value;
        doc.getElementById("currentBandWidth2").innerHTML = bandSize;
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

    function drawPattern3() {
        const canvas = document.getElementById('bullsEye3');
        const context = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;

        const colors = ['#F00', '#00F'];
        const outerRadius = 200;
        let bandSize = doc.getElementById("bandWidth3").value;
        doc.getElementById("currentBandWidth3").innerHTML = bandSize;
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
        drawPattern1: drawPattern1,
        drawPattern2: drawPattern2,
        drawPattern3: drawPattern3
    };

})(window, document);

