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
    checkExistence(element);
    inputList.push(newObject);
  }

  function createNewString(elementId) {
    console.log("string info");
  }

  function createNewGraph(elementId) {
    console.log("graph info");
  }

  function checkExistence(element) {
    for (var i = inputList.length - 1; i >= 0; i--) {
      if (inputList[i] === element) {
        console.log("the element is existing");
        inputList.splice(i, 1);
        break;
      }
    };
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);