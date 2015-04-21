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

  inputInfo.getValidBackref = function (index) {
    var validRef = [];

    for (var i = 0; i < inputList.length; i ++) {
      if (i != index &&
          inputList[i].numbertype == "integer" &&
          inputList[i].repeattime == "1") {
        // validRef.push(inputList[i].closest(".data-block").find(".fa-stack-1x").html());
        validRef.push(i + 1);
      }
    }

    return validRef;
  }

  inputInfo.removeElement = function (identifier) {
    for (var i = 0; i < inputList.length; i ++) {
      if (inputList[i].identifier === identifier) {
        preview.removeEntry(identifier);
        inputList.splice(i, 1);

        break;
      }
    }
  }

  inputInfo.clearInputList = function() {
    inputList = [];
  }

  inputInfo.insertData = function(iden, data) {    
    data.identifier = iden;
    inputList.push(data);
  }

  function createNewNumber(element) {
    var newObject = {
      "identifier" : element,
      "datatype": "number",
      "parityindex": $("#parity")[0].selectedIndex,
      "parity":  $("#parity").val(),
      "orderindex": $("#order")[0].selectedIndex,
      "order": $("#order").val(),
      "numberindex" : $("#numbertype")[0].selectedIndex,
      "numbertype": $("#numbertype").val(),
      "floatprecision": $("#precision").val(),
      "numbermin": $("#min").val(),
      "numbermax": $("#max").val(),
    }

    if ($("#repeatNumber").length) {
      newObject.repeattime = $("#repeatNumber").val();
    } else {
      newObject.repeatref = inputList[parseInt($("#backrefNumber").val())].identifier;
    }

    var index = inputInfo.checkExistence(element);
    var object = inputInfo.getElement(index);

    if (index >= 0) {
      if (object.datatype != newObject.datatype) {
        // alert("Different datatype");
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
      "caseindex":$("#case")[0].selectedIndex,
      "casetype": $("#case").val(),
      "hasnumber": $("#hasnumber")[0].checked,
      "linelength": $("#linelength").val(),
      "linebreak": $("#linebreak").val(),
      "wordlength": $("#wordlength").val(),
      "wordbreak": $("#wordbreak").val()
    }

    if ($("#repeatString").length) {
      newObject.repeattime = $("#repeatString").val();
    } else {
      newObject.repeatref = inputList[parseInt($("#backrefString").val())].identifier;
    }


    var index = inputInfo.checkExistence(element);
    var object = inputInfo.getElement(index);

    if (index >= 0) {
      if (object.datatype != newObject.datatype) {
        // alert("Different datatype");
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
      "weightmin": $("#weightmin").val(),
      "weightmax": $("#weightmax").val(),
      "node": $("#node").val(),
      "edge": $("#edge").val(),
      "graphformatindex": $("#graphformat")[0].selectedIndex,
      "graphformat": $("#graphformat").val()
    }

    if ($("#repeatGraph").length) {
      newObject.repeattime = $("#repeatGraph").val();
    } else {
      newObject.repeatref = inputList[parseInt($("#repeatGraph").val())].identifier;
    }
    
    var index = inputInfo.checkExistence(element);
    var object = inputInfo.getElement(index);

    if (index >= 0) {
      if (object.datatype != newObject.datatype) {
        // alert("Different datatype");
      };
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);
