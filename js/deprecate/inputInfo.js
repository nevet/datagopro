(function (inputInfo, $, undefined) {
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
      "repeatypeindex": $("#repeatTypeNumber")[0].selectedIndex,
      "refindex": []
    }

    if (newObject.repeatypeindex == 0) {
      newObject.repeattime = $("#repeatNumber").val();
      newObject.repeatVal = $("#repeatNumber").val();
    } else {
      newObject.repeatref = inputList[parseInt($("#backrefNumber").val())].identifier;
      newObject.repeatVal = $("#backrefNumber").val();

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
}) (window.inputInfo = window.inputInfo || {}, jQuery);
