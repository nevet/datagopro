(function (inputInfo, $, undefined) {
  var inputList=[];

  inputInfo.createNewInfo = function (element) {
    console.log(element);
    switch (element.val()) {
      case "number":
        createNewNumber(element);
        break;

      case "string":
        createNewString(element);
        break;

      case "graph":
        createNewGraph(element);
        break;

      default:
        break;
    }
  }

  function createNewNumber(element) {
    console.log("number info");
    var newObject = {
      "id" : element,
      "numbertype": document.getElementById("numbertype").selectedIndex,
      "precision": $("#precision").val(),
      "min": $("#min").val(),
      "max": $("#max").val(),
      "repeat": $("#repeatNumber").val()
    }
    console.log(newObject);
    inputList.push(newObject);
  }

  function createNewString(elementId) {
    console.log("string info");
  }

  function createNewGraph(elementId) {
    console.log("graph info");
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);