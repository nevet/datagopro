(function (inputInfo, $, undefined) {
  var inputList=[];

  inputInfo.createNewInfo = function (type, element) {
    switch (type) {
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

  inputInfo.checkExistence = function (element) {
    for (var i = inputList.length - 1; i >= 0; i--) {
      if (inputList[i].identifier === element) {
        console.log("the element is existing at "+i);
        return i;
      }
    };

    return -1;
  }

  inputInfo.getElement = function (index) {
    console.log(inputList);
    return inputList[index];
  }

  function createNewNumber(element) {
    var newObject = {
      "identifier" : element,
      "type": "number",
      "numbertype": document.getElementById("numbertype").selectedIndex,
      "precision": $("#precision").val(),
      "min": $("#min").val(),
      "max": $("#max").val(),
      "repeatNumber": $("#repeatNumber").val()
    }

    var index = inputInfo.checkExistence(element);
    if (index >= 0) {
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function createNewString(element) {
    var newObject = {
      "identifier" : element,
      "type": "string",
      "stringlength": $("#stringlength").val(),
      "charset": document.getElementById("charset").selectedIndex,
      "linelength": $("#linelength").val(),
      "linebreak": $("#linebreak").val(),
      "wordlength": $("#wordlength").val(),
      "wordbreak": $("#wordbreak").val(),
      "repeatString": $("#repeatString").val()
    }

    var index = inputInfo.checkExistence(element);
    if (index >= 0) {
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function createNewGraph(element) {
    var newObject = {
      "identifier" : element,
      "type": "graph",
      "connect": document.getElementById("connect").selectedIndex,
      "direct": document.getElementById("direct").selectedIndex,
      "node": $("#node").val(),
      "edge": $("#edge").val(),
      "repeatGraph": $("#repeatGraph").val()
    }

    var index = inputInfo.checkExistence(element);
    if (index >= 0) {
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);