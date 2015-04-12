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
      "dataType": "number",
      "numberindex" : $("#numbertype")[0].selectedIndex,
      "numbertype": $("#numbertype")[0].selectedIndex == 1 ? "integer" : "float",
      "precision": $("#precision").val(),
      "numbermin": $("#min").val(),
      "numbermax": $("#max").val(),
      "repeattime": $("#repeatNumber").val()
    }

    clearData();

    var index = inputInfo.checkExistence(element);
    var object = inputInfo.getElement(index);
    if (index >= 0) {
      if (object.dataType != newObject.dataType) {
        alert("Different dataType");
      };
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function createNewString(element) {
    var newObject = {
      "identifier" : element,
      "dataType": "string",
      "stringlength": $("#stringlength").val(),
      "chartype": $("#charset")[0].selectedIndex,
      "linelength": $("#linelength").val(),
      "linebreak": $("#linebreak").val(),
      "wordlength": $("#wordlength").val(),
      "wordbreak": $("#wordbreak").val(),
      "repeattime": $("#repeatString").val()
    }

    clearData();

    var index = inputInfo.checkExistence(element);
    var object = inputInfo.getElement(index);
    if (index >= 0) {
      if (object.dataType != newObject.dataType) {
        alert("Different dataType");
      };
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
      "repeattime": $("#repeatGraph").val()
    }

    clearData();
    
    var index = inputInfo.checkExistence(element);
    var object = inputInfo.getElement(index);
    if (index >= 0) {
      if (object.dataType != newObject.dataType) {
        alert("Different dataType");
      };
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function clearData() {
    $("#numbertype")[0].selectedIndex = 0;
    $("#precision").val("");
    $("#min").val("");
    $("#max").val("");
    $("#repeatNumber").val(1);

    $("#stringlength").val("");
    $("#charset")[0].selectedIndex = 0;
    $("#linelength").val("");
    $("#linebreak").val("");
    $("#wordlength").val("");
    $("#wordbreak").val("");
    $("#repeatString").val(1);

    $("#connect")[0].selectedIndex = 0;
    $("#direct")[0].selectedIndex = 0;
    $("#weight")[0].selectedIndex = 0;
    $("#tree")[0].selectedIndex = 0;
    $("#node").val("");
    $("#edge").val("");
    $("#repeatGraph").val(1);
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);