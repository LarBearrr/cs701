window.onload = init()

function init() {
    var worker = new Worker("computeWorker.js");

    // listen for worker
    worker.onmessage = function(e){
        // from client
        console.log(e.data)
    };

    worker.postMessage("start");
}

