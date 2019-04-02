addEventListener("message", event => {
  postMessage({
    start: event.data.start,
    end: event.data.end,
    result: sum(event.data.start, event.data.end)
  });
})

function sum(start, end) {
  return (end - start + 1) * (end + start) / 2;
}