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
    return inputList[index];
  }

  function createNewNumber(element) {
    var newObject = {
      "identifier" : element,
      "dataType": "number",
      "numbertype": document.getElementById("numbertype").selectedIndex,
      "precision": $("#precision").val(),
      "min": $("#min").val(),
      "max": $("#max").val(),
      "repeatNumber": $("#repeatNumber").val()
    }

    document.getElementById("numbertype").selectedIndex = 0;
    $("#precision").val("");
    $("#min").val("");
    $("#max").val("");
    $("#repeatNumber").val("");

    var index = inputInfo.checkExistence(element);
    if (index >= 0) {
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function createNewString(element) {
    var newObject = {
      "identifier" : element,
      "dataType": "string",
      "stringlength": $("#stringlength").val(),
      "chartype": document.getElementById("chartype").selectedIndex,
      "linelength": $("#linelength").val(),
      "linebreak": $("#linebreak").val(),
      "wordlength": $("#wordlength").val(),
      "wordbreak": $("#wordbreak").val(),
      "repeatString": $("#repeatString").val()
    }

    $("#stringlength").val("");
    document.getElementById("chartype").selectedIndex = 0;
    $("#linelength").val("");
    $("#linebreak").val("");
    $("#wordlength").val("");
    $("#wordbreak").val("");
    $("#repeatString").val("");

    var index = inputInfo.checkExistence(element);
    if (index >= 0) {
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function createNewGraph(element) {
    var newObject = {
      "identifier" : element,
      "dataType": "graph",
      "connect": document.getElementById("connect").selectedIndex,
      "direct": document.getElementById("direct").selectedIndex,
      "node": $("#node").val(),
      "edge": $("#edge").val(),
      "repeatGraph": $("#repeatGraph").val()
    }
     
    document.getElementById("connect").selectedIndex= 0;
    document.getElementById("direct").selectedIndex = 0;
    $("#node").val("");
    $("#edge").val("");
    $("#repeatGraph").val("");

    var index = inputInfo.checkExistence(element);
    if (index >= 0) {
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);