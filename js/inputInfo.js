(function (inputInfo, $, undefined) {
  var inputList=[];

  inputInfo.createNewInfo = function (type) {
    switch (type) {
      case "number":
        createNewNumber();
        break;

      case "string":
        createNewString();
        break;

      case "graph":
        createNewGraph();
        break;

      default:
        break;
    }
  }

  function createNewNumber() {
    console.log("number info");
  }

  function createNewString() {
    console.log("string info");
  }

  function createNewGraph() {
    console.log("graph info");
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);