window.onload = init()

function init() {
    var workerResults = [];

    var computeWorker = new Worker("computeWorker.js");

    computeWorker.addEventListener("message", event => {
        console.log('Start: ' + event.data.start, 'End: ' + event.data.end, 'Result:' +  event.data.result);
        let result = {
            start: event.data.start,
            end: event.data.end,
            result: event.data.result
        }
        workerResults.push(result);
        window.localStorage.setItem('workerResults', JSON.stringify(workerResults));
    });

    computeWorker.postMessage({start: 1, end: 1000})
    computeWorker.postMessage({start: 1001, end: 2000})
    computeWorker.postMessage({start: 2001, end: 3000})
    computeWorker.postMessage({start: 3001, end: 4000})
    computeWorker.postMessage({start: 4001, end: 5000})
}

