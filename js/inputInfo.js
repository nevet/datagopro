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

        inputInfo.saveSession();

        break;
      }
    }
  }

  inputInfo.saveSession = function () {
    // TODO: saving is currently sequential, could be made as parallel in the
    // future
    var data = serializeInput();
    console.log(data);

    if (localStorage.dataSid) {
      // we are online, upload the session to server
      $.post("dataSession.php", {"cmd": "upload", "id": localStorage.dataSid, "jsoninput": data}, function (res) {
        // update label
      });
    } else {
      // we are offline, store the data in local storage
      localStorage.dataSession = data;
    }
  }

  function createNewNumber(element) {
    var newObject = {
      "identifier" : element,
      "datatype": "number",
      "parityindex": $("#parity")[0].selectedIndex,
      "parity": undefined,
      "numberindex" : $("#numbertype")[0].selectedIndex,
      "numbertype": $("#numbertype")[0].selectedIndex == 0 ? "integer" : "float",
      "floatprecision": $("#precision").val(),
      "numbermin": $("#min").val(),
      "numbermax": $("#max").val(),
    }

    if ($("#repeatNumber").length) {
      newObject.repeattime = $("#repeatNumber").val();
    } else {
      newObject.repeatref = inputList[parseInt($("#backrefNumber").val())].identifier;
    }

    switch (newObject.parityindex) {
      case 0:
        newObject.parity = undefined;
        break;

      case 1:
        newObject.parity = "even";
        break;

      case 2:
        newObject.parity = "odd";
        break;

      default:
        break;
    }

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
      "node": $("#node").val(),
      "edge": $("#edge").val(),
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
        alert("Different datatype");
      };
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function serializeInput() {
    var output = [];

    var inputs = $("#data-field").find("input");

    for (var i = 0; i < inputs.length; i ++) {
      for (var j = 0; j < inputList.length; j ++) {
        if (inputList[j].identifier === inputs[i]) {
          var obj = jQuery.extend({}, inputList[j]);

          obj.identifier = undefined;
          output.push(obj);
        }
      }
    }

    return JSON.stringify(output);
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);
