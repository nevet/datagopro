var chosebutton;
var worker = new Worker("js/dataInfo.js");
var currentEntryIndex;

var repInputHtml = '<input class="repeattime form-control" type="number" min="1" style="background-color: white;">';
var iconError = '<span class="glyphicon glyphicon-remove" style="color: #A94442"></span>';
var iconCorrect = '<span class="glyphicon glyphicon-ok" style="color: #3C763D"></span>';
var backrefSelectHtml = '<select class="form-control" style="width: 125px"></select>';

function cancelClicked(e) {
  $("#popup").bPopup().close();
}

function chooseDataType(e) {
  clearData();
  chosebutton = e;
  $(e).blur();
  currentEntryIndex = inputInfo.checkExistence(chosebutton);
  if (currentEntryIndex >= 0) {
    preparePopup(currentEntryIndex);
  };
  $("#popup").bPopup({
                speed: 300,
                transition: 'slideDown',
                transitionClose: 'fadeIn'
            });
}

function numberChanged(e) {
  var element = $(e);
  if (element.val() == "float") {
    $("#precisionDiv").show();
    checkNumberValidation();
    $("#parity").prop("disabled", "disabled");
  } else {
    $("#precisionDiv").hide();
    noErrorHighlight($("#precision"));
    $("#parity").prop("disabled", false);
  }
}

function preparePopup(index) {
  var object = inputInfo.getElement(index);

  switch (object.datatype) {
    case "number":
      prepareNumber(object);
      break;

    case "string":
      prepareString(object);
      break;

    case "graph":
      prepareGraph(object);
      break;

    default:
      break;
  }
}

function prepareNumber(object) {
  $("#anumber").addClass("selected").siblings().removeClass("selected");
  $("#number").css("display","block").siblings().css("display", "none");

  $("#numbertype")[0].selectedIndex = object.numberindex;
  $("#precision").val(object.floatprecision);
  $("#min").val(object.numbermin);
  $("#max").val(object.numbermax);
  $("#repeatNumber").val(object.repeattime);
  $("#parity")[0].selectedIndex = object.parityindex;
}

function prepareString(object) {
  $("#astring").addClass("selected").siblings().removeClass("selected");
  $("#string").css("display","block").siblings().css("display", "none");

  $("#stringlength").val(object.stringlength);
  $("#charset")[0].selectedIndex = object.chartype;
  $("#linelength").val(object.linelength);
  $("#linebreak").val(object.linebreak);
  $("#wordlength").val(object.wordlength);
  $("#wordbreak").val(object.wordbreak);
  $("#repeatString").val(object.repeattime);
}

function prepareGraph(object) {
  $("#agraph").addClass("selected").siblings().removeClass("selected");
  $("#graph").css("display","block").siblings().css("display", "none");
  
  $("#connect")[0].checked = object.isconnect;
  $("#direct")[0].checked = object.isdirect;
  $("#weight")[0].checked = object.isweighted;
  $("#tree")[0].checked = object.isTree;
  $("#node").val(object.node);
  $("#edge").val(object.edge);
  $("#repeatGraph").val(object.repeattime);
}

function repeatTypeChanged(e) {
  var repeatTypeSelect = $(e);
  var inputGroup = repeatTypeSelect.parent(".input-group");
  var dataType = repeatTypeSelect.attr("id").substr(10);

  var backrefSelect = inputGroup.find("select[id*='backref']");
  var customInput = inputGroup.find("input");
  
  // if we are choosing custom input
  if (repeatTypeSelect[0].selectedIndex == 0) {
    // if input field is not there
    if (!customInput.length) {
      // check if we have select field first
      if (backrefSelect.length) {
        // if we find a select, delete it
        backrefSelect.remove();
      }

      customInput = $(repInputHtml);
      customInput.attr("id", "repeat" + dataType);
      customInput.appendTo(inputGroup);
    }
  } else { // if we are choosing backreference
    // if backref select is not there
    if (!backrefSelect.length) {
      // check if custom input field is there
      if (customInput.length) {
        // if we find a custom input box, delete it
        customInput.remove();
      }

      backrefSelect = $(backrefSelectHtml);
      backrefSelect.attr("id", "backref" + dataType);

      var validOptions = inputInfo.getValidBackref(currentEntryIndex);

      if (!validOptions.length) {
        backrefSelect.append("<option value='' disabled selected style='display:none;'>No Valid Reference</option>");
      } else {
        for (var i = 0; i < validOptions.length; i ++) {
          backrefSelect.append("<option value=" + (validOptions[i] - 1) + ">Data Entry " + validOptions[i] + "</option>");
        }
      }

      backrefSelect.appendTo(inputGroup);
    }
  }
}

function okclicked(e) {
  var element = $(e);

  worker.onmessage = function(event) {
    preview.endLoading();
    preview.render(chosebutton, event.data);
  };

  switch (element.val()) {
    case "number":
      if (checkNumberValidation()) {
        $("#popup").bPopup().close();
        $(chosebutton).attr("value","Number");
        inputInfo.createNewInfo("number",chosebutton);
        changeInfoMessage("number");
      };
      break;

    case "string":
      if (checkStringValidation()) {
        $("#popup").bPopup().close();
        $(chosebutton).attr("value","String");
        inputInfo.createNewInfo("string", chosebutton);
        changeInfoMessage("string");
      };
      break;

    case "graph":
      if (checkGraphValidation()) {
        $("#popup").bPopup().close();
        $(chosebutton).attr("value","Graph");
        inputInfo.createNewInfo("graph", chosebutton);
        changeInfoMessage("graph");
      };
      break;

    default:
      break;
  }

  var obj = jQuery.extend({}, inputInfo.getLastElement());

  console.log(obj);
  obj.identifier = undefined;

  preview.startLoading();
  
  // handle backreference case
  if (!obj.repeattime) {
    obj.repeattime = parseInt(preview.getData(obj.repeatref));
    obj.repeatref = undefined;
  }

  worker.postMessage({"cmd":"start", "data": JSON.stringify(obj)});
}

function changeInfoMessage(type) {
  console.log("come in message");
  var element = $(chosebutton).closest("div.data-block").find("#data-block-info");
  var object = inputInfo.getLastElement();
  var string = ""; 

  switch (type) {
    case "number":
      string = numberInfoMessage(object);
      break;

    case "string":
      string = stringInfoMessage(object);
      break;

    case "graph":
      string = graphInfoMessage(object);
      break;

    default:
      break;
  }

  element.html(string+" <b>X "+object.repeattime);
}

function numberInfoMessage(object) {
  var string;

  switch (object.numbertype) {
    case "integer":
      string = "<b>Integer</b>" + 
        " from " + object.numbermin + 
        " to " + object.numbermax;
      break;

    case "float":
      string = "<b>Float</b>" + 
        " from " + object.numbermin + 
        " to " + object.numbermax + 
        " with precision " + object.floatprecision;
      break;
  }

  return string;
}

function stringInfoMessage(object) {
  var string;

  string = "<b>String</b> with length of " + object.stringlength;

  return string;
}

function graphInfoMessage(object) {
  var string;

  string = "<b>Graph</b> with " + object.node + 
        " nodes and " + object.edge + " edges";

  return string;
}

function checkNumberValidation() {
  var isValid = true;

  if ($("#repeatNumber").val() == "" || $("#repeatNumber").val() <= 0) {
    errorHighlight($("#repeatNumber"));
    isValid = false;
  } else {
    correctHighlight($("#repeatNumber"));
  }

  if ($("#max").val() == "" || parseInt($("#min").val()) > parseInt($("#max").val())) {
    errorHighlight($("#max"));
    isValid = false;
  } else {
    noErrorHighlight($("#max"));
  }

  if ($("#min").val() == "" || parseInt($("#min").val()) > parseInt($("#max").val())) {
    errorHighlight($("#min"));
    isValid = false;
  } else {
    correctHighlight($("#min"));
  }

  if ($("#numbertype")[0].selectedIndex == 1) {
    if ($("#precision").val() == "" || $("#precision").val() < 0) {
      errorHighlight($("#precision"));
      isValid = false;
    } else {
      correctHighlight($("#precision"));
    }
  } else {
    noErrorHighlight($("#precision"));
  }

  if ($("#parity")[0].selectedIndex == 1) {
    if (parseInt($("#min").val()) == parseInt($("#max").val())) {
      if (parseInt($("#min").val()) % 2 == 1) {
        isValid = false; 
        errorHighlight($("#min"));
        errorHighlight($("#max"));
      };
    };
  } else if ($("#parity")[0].selectedIndex == 2) {
    if (parseInt($("#min").val()) == parseInt($("#max").val())) {
      if (parseInt($("#min").val()) % 2 == 0) {
        isValid = false;
        errorHighlight($("#min"));
        errorHighlight($("#max"));
      };
    };
  };

  return isValid;
}

function checkStringValidation() {
  var isValid = true;

  if ($("#stringlength").val() == "" || $("#stringlength").val() <= 0) {
    errorHighlight($("#stringlength"));
    isValid = false;
  } else {
    correctHighlight($("#stringlength"));
  }

  if ($("#repeatString").val() == "" || $("#repeatString").val() <= 0) {
    errorHighlight($("#repeatString"));
    isValid = false;
  } else {
    correctHighlight($("#repeatString"));
  }

  return isValid;
}

function checkGraphValidation() {
  var isValid = true;

  if ($("#repeatGraph").val() == "" || $("#repeatGraph").val() <= 0) {
    errorHighlight($("#repeatGraph"));
    isValid = false;
  } else {
    correctHighlight($("#repeatGraph"));
  }

  if ($("#node").val() == "" || $("#node").val() <= 0) {
    errorHighlight($("#node"));
    isValid = false;
  } else {
    correctHighlight($("#node"));
  }

  if (!$("#tree")[0].checked) {
    if ($("#edge").val() == "" || $("#edge").val() <= 0) {
      errorHighlight($("#edge"));
      isValid = false;
    } else {
      correctHighlight($("#edge"));
    }
  } else {
    noErrorHighlight(("#edge"));
  }

  return isValid;
}

function errorHighlight(element) {
  $(element).parent().removeClass("has-success form-feedback");
  $(element).parent().addClass("has-error form-feedback");
  var string = "#"+$(element).attr("id")+"Span";
  $(string).html(iconError);
}

function noErrorHighlight(element) {
  $(element).parent().removeClass("has-error has-success form-feedback");
  var string = "#"+$(element).attr("id")+"Span";
  $(string).html("");
}

function correctHighlight(element) {
  $(element).parent().removeClass("has-error form-feedback");
  $(element).parent().addClass("has-success form-feedback");
  var string = "#"+$(element).attr("id")+"Span";
  $(string).html(iconCorrect);
}

$(function(){
  $("#min").focusout(function() {
    if ($("#min").val() == "") {
      errorHighlight($("#min"));
    } else if (parseInt($("#min").val()) > parseInt($("#max").val())) {
      errorHighlight($("#min"));
      errorHighlight($("#max"));
    } else {
      correctHighlight($("#min"));
      if (parseInt($("#min").val()) <= parseInt($("#max").val())) {
        correctHighlight($("#max"));
      }
    }

    if ($("#parity")[0].selectedIndex == 1) {
      if (parseInt($("#min").val()) == parseInt($("#max").val())) {
        if (parseInt($("#min").val()) % 2 == 1) {
          isValid = false; 
          errorHighlight($("#min"));
          errorHighlight($("#max"));
        };
      };
    } else if ($("#parity")[0].selectedIndex == 2) {
      if (parseInt($("#min").val()) == parseInt($("#max").val())) {
        if (parseInt($("#min").val()) % 2 == 0) {
          isValid = false;
          errorHighlight($("#min"));
          errorHighlight($("#max"));
        };
      };
    };
  });

  $("#max").focusout(function() {
    if ($("#max").val() == "") {
      errorHighlight($("#max"));
    } else if (parseInt($("#min").val()) > parseInt($("#max").val())) {
      errorHighlight($("#min"));
      errorHighlight($("#max"));
    } else {
      correctHighlight($("#max"));
      if (parseInt($("#min").val()) <= parseInt($("#max").val())) {
        correctHighlight($("#min"));
      }
    }

    if ($("#parity")[0].selectedIndex == 1) {
      if (parseInt($("#min").val()) == parseInt($("#max").val())) {
        if (parseInt($("#min").val()) % 2 == 1) {
          isValid = false; 
          errorHighlight($("#min"));
          errorHighlight($("#max"));
        };
      };
    } else if ($("#parity")[0].selectedIndex == 2) {
      if (parseInt($("#min").val()) == parseInt($("#max").val())) {
        if (parseInt($("#min").val()) % 2 == 0) {
          isValid = false;
          errorHighlight($("#min"));
          errorHighlight($("#max"));
        };
      };
    };
  });

  $("#parity").on('change', function() {
    if ($("#parity")[0].selectedIndex == 1) {
      if (parseInt($("#min").val()) == parseInt($("#max").val())) {
        if (parseInt($("#min").val()) % 2 == 1) {
          isValid = false; 
          errorHighlight($("#min"));
          errorHighlight($("#max"));
        };
      };
    } else if ($("#parity")[0].selectedIndex == 2) {
      if (parseInt($("#min").val()) == parseInt($("#max").val())) {
        if (parseInt($("#min").val()) % 2 == 0) {
          isValid = false;
          errorHighlight($("#min"));
          errorHighlight($("#max"));
        };
      };
    };
  })

  $("#repeatNumber").focusout(function() {
    if ($("#repeatNumber").val() == "" || $("#repeatNumber").val() <= 0) {
      errorHighlight($("#repeatNumber"));
    } else {
      correctHighlight($("#repeatNumber"));
    }
  });

  $("#precision").focusout(function() {
  if ($("#numbertype")[0].selectedIndex == 1) {
    if ($("#precision").val() == "" || $("#precision").val() < 0) {
        errorHighlight($("#precision"));
      } else {
        correctHighlight($("#precision"));
      }
    } else {
      noErrorHighlight($("#precision"));
    }
  });
  
  $("#stringlength").focusout(function() {
    if ($("#stringlength").val() == "" || $("#stringlength").val() <= 0) {
      errorHighlight($("#stringlength"));
    } else {
      correctHighlight($("#stringlength"));
    }
  });

  $("#repeatString").focusout(function() {
    if ($("#repeatString").val() == "" || $("#repeatString").val() <= 0) {
      errorHighlight($("#repeatString"));
    } else {
      correctHighlight($("#repeatString"));
    }
  });

  $("#node").focusout(function() {
    if ($("#node").val() == "" || $("#node").val() <= 0) {
      errorHighlight($("#node"));
    } else {
      correctHighlight($("#node"));
    }
  });

  $("#edge").focusout(function() {
    if (!$("#tree")[0].checked) {
      if ($("#edge").val() == "" || $("#edge").val() <= 0) {
        errorHighlight($("#edge"));
      } else {
        correctHighlight($("#edge"));
      }
    } else {
      noErrorHighlight(("#edge"));
    }
  });

  $("#repeatGraph").focusout(function() {
    if ($("#repeatGraph").val() == "" || $("#repeatGraph").val() <= 0) {
      errorHighlight($("#repeatGraph"));
    } else {
      correctHighlight($("#repeatGraph"));
    }
  });
});