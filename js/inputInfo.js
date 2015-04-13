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
    for (var i = inputList.length - 1; i >= 0; i--) {
      if (inputList[i].identifier === element) {
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
      "parityindex": $("#parity")[0].selectedIndex,
      "parity": $("#parity")[0].selectedIndex == 1 ? "even" : "odd",
      "numberindex" : $("#numbertype")[0].selectedIndex,
      "numbertype": $("#numbertype")[0].selectedIndex == 1 ? "integer" : "float",
      "floatprecision": $("#precision").val(),
      "numbermin": $("#min").val(),
      "numbermax": $("#max").val(),
      "repeattime": $("#repeatNumber").val()
    }

    clearData();

    var index = inputInfo.checkExistence(element);
    var object = inputInfo.getElement(index);
    if (index >= 0) {
      if (object.datatype != newObject.datatype) {
        alert("Different datatype");
      };
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function createNewString(element) {
    var newObject = {
      "identifier" : element,
      "datatype": "string",
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
      if (object.datatype != newObject.datatype) {
        alert("Different datatype");
      };
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function createNewGraph(element) {
    var newObject = {
      "identifier" : element,
      "datatype": "graph",
      "isconnect": $("#connect")[0].checked,
      "isdirect": $("#direct")[0].checked,
      "isweighted": $("#weight")[0].checked,
      "isTree": $("#tree")[0].checked,
      "numberOfNode": $("#node").val(),
      "numberOfEdge": $("#edge").val(),
      "repeattime": $("#repeatGraph").val()
    }

    clearData();
    
    var index = inputInfo.checkExistence(element);
    var object = inputInfo.getElement(index);
    if (index >= 0) {
      if (object.datatype != newObject.datatype) {
        alert("Different datatype");
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
    $("#parity")[0].selectedIndex = 0;

    $("#stringlength").val("");
    $("#charset")[0].selectedIndex = 0;
    $("#linelength").val("");
    $("#linebreak").val("");
    $("#wordlength").val("");
    $("#wordbreak").val("");
    $("#repeatString").val(1);

    $("#connect")[0].checked = false;
    $("#direct")[0].checked = false;
    $("#weight")[0].checked = false;
    $("#tree")[0].checked = false;
    $("#node").val("");
    $("#edge").val("");
    $("#repeatGraph").val(1);
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);