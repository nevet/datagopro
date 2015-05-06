if (typeof(importScripts) === 'function') {
  importScripts("generator.js");
}

onmessage = function (event) {
  var data = event.data;

  switch (data.cmd) {
    case "start":
      var json = JSON.parse(data.data);
      var generatedData = generate([json]);

      postMessage({"data": generatedData, "index": data.index, "referby": json.referby});
      close();
  }
}