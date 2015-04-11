if (typeof(importScripts) === 'function') {
  importScripts("generator.js");
}

onmessage = function (event) {
  var data = event.data;

  switch (data.cmd) {
    case "start":
      console.log("received " + data.data);

      var json = JSON.parse(data.data);
      var generatedData = generate(json);

      console.log(generatedData);

      postMessage(generatedData);
      break;
  }
}