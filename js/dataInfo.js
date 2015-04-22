if (typeof(importScripts) === 'function') {
  importScripts("generator.js");
}

onmessage = function (event) {
  var data = event.data;

  switch (data.cmd) {
    case "start":
      var json = JSON.parse(data.data);
      var generatedData = generate([json]);

      postMessage([generatedData, data.curindex, data.refindex]);
      break;
  }
}