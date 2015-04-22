var chosebutton;
var worker = new Worker("js/dataInfo.js");
var currentEntryIndex;

var repInputHtml = '<input class="repeattime form-control" type="number" min="1" style="background-color: white;">';
var iconError = '<span class="glyphicon glyphicon-remove" style="color: #A94442"></span>';
var iconCorrect = '<span class="glyphicon glyphicon-ok" style="color: #3C763D"></span>';
var backrefSelectHtml = '<select class="form-control" style="width: 121px"></select>';

worker.onmessage = function(event) {
  var data = event.data;
  var curindex = data[1];
  var refindex = data[2];

  var chosenElement = $("#data-field").find("input")[curindex];

  preview.endLoading();
  preview.render(chosenElement, data[0]);

  // we must handle reference updating here, since we need to wait the reference to
  // be updated
  if (refindex && refindex.length) {
    for (var i = 0; i < refindex.length; i ++) {
      var domObj = $("#data-field").find("input")[refindex[i]];
      var internalIndex = inputInfo.checkExistence(domObj);
      var refObj = inputInfo.getElement(internalIndex);
      // TODO: this is only for demo, need to create new thread for each ref later!!
      printEntry(jQuery.extend({}, refObj), worker);
    }
  }
};

function cancelClicked(e) {
  $("#popup").bPopup().close();
}

function chooseDataType(e) {
  clearData();
  $(".ok").show();
  $(".cancel").text("Cancel");
  $("#popup input").attr("disabled", false);
  $("#popup select").attr("disabled", false);

  chosebutton = e;
  $(e).blur();
  currentEntryIndex = inputInfo.checkExistence(chosebutton);
  if (currentEntryIndex >= 0) {
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
    $("#permutationDiv").hide();
  } else {
    $("#precisionDiv").hide();
    noErrorHighlight($("#precision"));
    $("#parity").prop("disabled", false);
    $("#permutationDiv").show();
  }
}

preparePopup = function (object) {

  switch (object.datatype) {
    case "number":
      prepareNumber(object);
      checkNumberValidation();
      break;

    case "string":
      prepareString(object);
      checkStringValidation();
      break;

    case "graph":
      prepareGraph(object);
      checkGraphValidation();
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
    $("#parity").prop("disabled", "disabled");
    $("#permutationDiv").hide();
  } else {
    $("#precisionDiv").hide();
    $("#parity").prop("disabled", false);
    noErrorHighlight($("#precision"));
    $("#permutation")[0].checked = object.permutation;
    $("#permutationDiv").show();
    checkPermutation();
  }
  $("#min").val(object.numbermin);
  $("#max").val(object.numbermax);
  $("#parity")[0].selectedIndex = object.parityindex;
  $("#order")[0].selectedIndex = object.orderindex;
  $("#repeatTypeNumber")[0].selectedIndex = object.repeatypeindex;
  repeatTypeChanged($("#repeatTypeNumber"));

  if (object.repeatypeindex == 0) {
    $("#repeatNumber").val(object.repeatVal);
  } else {
    $("#backrefNumber").val(object.repeatVal);
  }
}

function prepareString(object) {
  $("#astring").addClass("selected").siblings().removeClass("selected");
  $("#string").css("display","block").siblings().css("display", "none");

  $("#stringlength").val(object.stringlength);
  $("#charset")[0].selectedIndex = object.chartype;
  $("#case")[0].selectedIndex = object.caseindex;
  $("#hasnumber")[0].checked = object.hasnumber;
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
  $("#weightmin").val(object.weightmin);
  $("#weightmax").val(object.weightmax);
  $("#tree")[0].checked = object.isTree;
  $("#node").val(object.node);
  $("#edge").val(object.edge);
  $("#graphformat")[0].selectedIndex = object.graphformatindex;
  $("#repeatGraph").val(object.repeattime);
}

function repeatTypeChanged(e) {
  var repeatTypeSelect = $(e);
  var inputGroup = repeatTypeSelect.parent(".input-group");
  var dataType = repeatTypeSelect.attr("id").substr(10);

  var backrefSelect = inputGroup.find("select[id*='backref']");
  var customInput = inputGroup.find("input");
  
  if (repeatTypeSelect[0].selectedIndex == 0) {
    if (!customInput.length) {
      if (backrefSelect.length) {
        backrefSelect.remove();
      }

      customInput = $(repInputHtml);
      customInput.attr("id", "repeat" + dataType);
      customInput.appendTo(inputGroup);
    }
  } else {
    if (!backrefSelect.length) {
      if (customInput.length) {
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

function printEntry(obj, thread) {
  var curindex = $("#data-field").find("input").index(obj.identifier);
  obj.identifier = undefined;

  preview.startLoading();

  if (!obj.repeattime) {
    obj.repeattime = parseInt(preview.getData(obj.repeatref));
    obj.repeatref = undefined;
  }

  thread.postMessage({"cmd":"start", "data": JSON.stringify(obj), "curindex": curindex, "refindex": obj.refindex});
}

function okclicked(e) {
  var element = $(e);

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

  inputInfo.saveSession();

  var obj = jQuery.extend({}, inputInfo.getLastElement());

  printEntry(obj, worker);
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