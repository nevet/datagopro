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
        validRef.push(findElementDomIndex(inputList[i].identifier) + 1);
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
    var setName = $("setname").val();
    console.log(data);

    $("#notice").html("Saving changes...");

    if (localStorage.dataSid) {
      // we are online, upload the session to server
      $.post("dataSession.php", {"cmd": "upload", "id": localStorage.dataSid, "jsoninput": data, "setname": setName}, function (res) {
        $("#notice").html("All changes saved");
      });
    } else {
      // we are offline, store the data in local storage
      localStorage.dataSession = data;
      localStorage.setName = setName;

      $("#notice").html("All changes saved locally");
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
      "permutation": $("#permutation")[0].checked,
      "floatprecision": $("#precision").val(),
      "numbermin": $("#min").val(),
      "numbermax": $("#max").val(),
      "refindex": []
    }

    if ($("#repeatNumber").length) {
      newObject.repeattime = $("#repeatNumber").val();
    } else {
      var refDomIndex = parseInt($("#backrefNumber").val());
      var refObj = $("#data-field").find("input")[refDomIndex];
      var internalIndex = inputInfo.checkExistence(refObj);

      newObject.repeatref = inputList[internalIndex].identifier;
      newObject.repeatindex = refDomIndex;
      inputList[internalIndex].refindex.push(findElementDomIndex(element));
    }

    var index = inputInfo.checkExistence(element);
    var object = inputInfo.getElement(index);

    if (index >= 0) {
      newObject.refindex = object.refindex;
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
      inputList.splice(index, 1);
    }

    inputList.push(newObject);
  }

  function findElementDomIndex(element) {
    return $("#data-field").find("input").index(element);
  }

  function serializeInput() {
    var output = [];

    var inputs = $("#data-field").find("input");

    for (var i = 0; i < inputs.length; i ++) {
      for (var j = 0; j < inputList.length; j ++) {
        if (inputList[j].identifier === inputs[i]) {
          var obj = jQuery.extend({}, inputList[j]);
          obj.identifier = undefined;
          obj.reflist = undefined;
          obj.repeatref = undefined;
          output.push(obj);
        }
      }
    }

    return JSON.stringify(output);
  }
}) (window.inputInfo = window.inputInfo || {}, jQuery);
