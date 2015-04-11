(function (inputInfo, $, undefined) {
  var inputList = [];

  inputInfo.createNewInfo = function (type, element) {
    switch (type) {
      case "number":
        return createNewNumber(element);
      case "string":
        return createNewString(element);
      case "graph":
        return createNewGraph(element);
    }
  }

  inputInfo.checkExistence = function (element) {
    console.log(inputList);
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

  inputInfo.getLastElement = function () {
    return inputList[inputList.length - 1];
  }

  function createNewNumber(element) {
    var newObject = {
      "identifier" : element,
      "datatype": "number",
      "numbertype": $("#numbertype")[0].selectedIndex == 1 ? "integer" : "float",
      "precision": $("#precision").val(),
      "numbermin": $("#min").val(),
      "numbermax": $("#max").val(),
      "repeattime": $("#repeatNumber").val()
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