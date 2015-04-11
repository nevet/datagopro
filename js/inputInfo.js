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
      "numbertype": $("#numbertype")[0].selectedIndex,
      "precision": $("#precision").val(),
      "min": $("#min").val(),
      "max": $("#max").val(),
      "repeatNumber": $("#repeatNumber").val()
    }

    clearData();

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
      "chartype": $("#chartype")[0].selectedIndex,
      "linelength": $("#linelength").val(),
      "linebreak": $("#linebreak").val(),
      "wordlength": $("#wordlength").val(),
      "wordbreak": $("#wordbreak").val(),
      "repeatString": $("#repeatString").val()
    }

    clearData();

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
      "connect": $("#connect")[0].selectedIndex,
      "direct": $("#direct")[0].selectedIndex,
      "node": $("#node").val(),
      "edge": $("#edge").val(),
      "repeatGraph": $("#repeatGraph").val()
    }

    clearData();
    
    var index = inputInfo.checkExistence(element);
    if (index >= 0) {
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function clearData() {
    $("#numbertype")[0].selectedIndex = 0;
    $("#precision").val("");
    $("#min").val("");
    $("#max").val("");
    $("#repeatNumber").val("");

    $("#stringlength").val("");
    $("#chartype")[0].selectedIndex = 0;
    $("#linelength").val("");
    $("#linebreak").val("");
    $("#wordlength").val("");
    $("#wordbreak").val("");
    $("#repeatString").val("");

    $("#connect")[0].selectedIndex = 0;
    $("#direct")[0].selectedIndex = 0;
    $("#node").val("");
    $("#edge").val("");
    $("#repeatGraph").val("");
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);