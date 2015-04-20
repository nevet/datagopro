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
  $(".ok").show();
  chosebutton = e;
  $(e).blur();
  currentEntryIndex = inputInfo.checkExistence(chosebutton);
  if (currentEntryIndex >= 0) {
    console.log("existing " + currentEntryIndex);
    preparePopup( inputInfo.getElement(currentEntryIndex) );
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
    $("#parity")[0].selectedIndex = 0;
    $("#parity").prop("disabled", "disabled");
  } else {
    $("#precisionDiv").hide();
    noErrorHighlight($("#precision"));
    $("#parity").prop("disabled", false);
  }
}

preparePopup = function (object) {

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
  if (object.numberindex == 1) {
    $("#precision").val(object.floatprecision);
    $("#precisionDiv").show();
    checkNumberValidation();
    $("#parity").prop("disabled", "disabled");
  } else {
    $("#precisionDiv").hide();
    $("#parity").prop("disabled", false);
    noErrorHighlight($("#precision"));
  }
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

function changeInfoMessage(type, info_span, data) {
  if (info_span) {
    element = info_span;
    object = data;
  }
  else {
    var element = $(chosebutton).closest("div.data-block").find(".data-block-info");
    var object = inputInfo.getLastElement();
  }

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

  string += " <b>X ";

  if (object.repeattime) {
    element.html(string + object.repeattime + "</b>");
  } else {
    var ref = preview.getDivByIdentifier(object.repeatref);
    var index = ref[0] + 1;
    var refDiv = ref[1];

    var circle = $('<span class="fa-stack"><i class="fa fa-stack-2x fa-circle-thin"></i><i class="fa fa-stack-1x">' + index + '</i></span>');

    element.html(string);
    circle.appendTo(element);
  }
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
  var element;

  element = $("#repeatNumber");
  if (isNumberInput(element) && isPositiveInput(element)) {
    correctHighlight(element);
  } else {
    isValid = false;
  }
  
  element = $("#max");
  if (isNumberInput(element) && checkMaxMin()) {
    correctHighlight(element);
  } else {
    isValid = false;
  };

  element = $("#min");
  if (isNumberInput(element) && checkMaxMin()) {
    correctHighlight(element);
  } else {
    isValid = false;
  };
  
  element = $("#precision");
  if ($("#numbertype")[0].selectedIndex == 1) {
    if (isNumberInput(element) && isNonNegativeInput(element)) {
      correctHighlight(element);
    } else {
      isValid = false;
    }
  } else {
    noErrorHighlight(element);
  }

  if (!checkParity()) {
    isValid = false;
  }

  return isValid;
}

function checkStringValidation() {
  var isValid = true;
  var element;

  element = $("#stringlength");
  if (isNumberInput(element) && isPositiveInput(element)) {
    correctHighlight(element);
  } else {
    isValid = false;
  }

  element = $("#repeatString");
  if (isNumberInput(element) && isPositiveInput(element)) {
    correctHighlight(element);
  } else {
    isValid = false;
  }

  return isValid;
}

function checkGraphValidation() {
  var isValid = true;
  var element;

  element = $("#repeatGraph");
  if (isNumberInput(element) && isPositiveInput(element)) {
    correctHighlight(element);
  } else {
    isValid = false;
  }

  element = $("#node");
  if (isNumberInput(element) && isPositiveInput(element)) {
    correctHighlight(element);
  } else {
    isValid = false;
  }

  if (!$("#tree")[0].checked) {
    element = $("#edge");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
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
    var element = $("#max");
    if (isNumberInput(element) && checkMaxMin()) {
      correctHighlight($("#min"));
      if (parseInt($("#min").val()) <= parseInt($("#max").val())) {
        correctHighlight($("#max"));
      }
    }

    checkParity();
  });

  $("#max").focusout(function() {
    var element = $("#max");
    if (isNumberInput(element) && checkMaxMin()) {
      correctHighlight($("#max"));
      if (parseInt($("#min").val()) <= parseInt($("#max").val())) {
        correctHighlight($("#min"));
      }
    }

    checkParity();
  });

  $("#parity").on('change', function() {
    checkParity();
  })

  $("#repeatNumber").focusout(function() {
    var element = $("#repeatNumber");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    }
  });

  $("#precision").focusout(function() {
    if ($("#numbertype")[0].selectedIndex == 1) {
      var element = $("#precision");
      if (isNumberInput(element) && isNonNegativeInput(element)) {
        correctHighlight(element);
      }
    } else {
      noErrorHighlight($("#precision"));
    }
  });
  
  $("#stringlength").focusout(function() {
    var element = $("#stringlength");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    }
  });

  $("#repeatString").focusout(function() {
    var element = $("#repeatString");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    }
  });

  $("#node").focusout(function() {
    var element = $("#node");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    }
  });

  $("#edge").focusout(function() {
    if (!$("#tree")[0].checked) {
      var element = $("#edge");
      if (isNumberInput(element) && isPositiveInput(element)) {
        correctHighlight(element);
      }
    } else {
      noErrorHighlight($("#edge"));
    }
  });

  $("#repeatGraph").focusout(function() {
    var element = $("#repeatGraph");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    }
  });

  $('#linelength').keypress(function(e) {
    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9]/);
    if (verified) {e.preventDefault();}
  });

  $('#wordlength').keypress(function(e) {
    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9]/);
    if (verified) {e.preventDefault();}
  });
});

function isNumberInput(element) {
  if ($(element).val() == "") {
    errorHighlight($(element));
    return false;
  }

  return true;
}

function isPositiveInput(element) {
  if ($(element).val() <= 0) {
    errorHighlight(element);
    return false;    
  };

  return true;
}

function isNonNegativeInput(element) {
  if ($(element).val() < 0) {
    errorHighlight(element);
    return false;    
  };

  return true;  
}

function checkMaxMin() {
  if (parseInt($("#min").val()) > parseInt($("#max").val())) {
    errorHighlight($("#min"));
    errorHighlight($("#max"));

    return false;
  }

  return true;
}

function checkParity() {
  if ($("#parity")[0].selectedIndex == 1) {
    if (parseInt($("#min").val()) == parseInt($("#max").val())) {
      if (parseInt($("#min").val()) % 2 == 1) {
        errorHighlight($("#min"));
        errorHighlight($("#max"));

        return false;
      };
    };
  } else if ($("#parity")[0].selectedIndex == 2) {
    if (parseInt($("#min").val()) == parseInt($("#max").val())) {
      if (parseInt($("#min").val()) % 2 == 0) {
        isValid = false;
        errorHighlight($("#min"));
        errorHighlight($("#max"));

        return false;
      };
    };
  };

  return true;
}