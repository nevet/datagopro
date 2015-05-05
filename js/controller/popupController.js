(function (popupController, $, undefined) {
  var repInputHtml = '<input class="repeattime form-control" type="number" min="1">';
  var backrefSelectHtml = '<select class="form-control" style="width: 163px"></select>';

  $("#popup").on("click", ".fa-angle-double-down",function(e){
    e.preventDefault();
    popupView.expandAdvance($(this));
  });
  
  $("#popup").on("click", ".fa-angle-double-up", function(e){
    e.preventDefault();
    popupView.collapseAdvance($(this));
  });

  // auto click ok when enter key is pressed
  $("body").on("keypress", function (e) {
    if (!$("#popup[style*='block']").length) return;

    if (e.which == 13) {
      // find which tab are we in
      var tab = $(this).find("div[class*='container'][style*='block']").attr("id");
      var okButton = $(this).find("#popup .ok[value='" + tab + "']");
       
      if (okButton) {
        okButton.click();
      }
    }
  });

  $("#tree").click(function(e){
    if($(this).is(":checked")) {
      $(".nottree").css("display", "none");
    }
    else {
      $(".nottree").css("display", "block");
    }
  });

  $("#weight").click(function(e){
    if($(this).is(":checked")) {
      $(".weightrange").css("display", "block");
    }
    else {
      $(".weightrange").css("display", "none");
    }
  });

  $("#popup .ok").on("click", function (event) {
    var target = $(event.target);
    var type = target.val();
    var input = popupView.getInput(type);

    $("html").trigger("popupClose", [{"status": "ok", "input": input}]);
  });

  $("#numbertype").on("change", function (event) {
    popupView.numbertypeOnChange($(event.target));
  });

  $("select[id*='repeatType']").on("change", function (event) {
    var repeatTypeSelect = $(event.target);
    var parentForm = repeatTypeSelect.closest(".form-inline");
    var inputGroup = repeatTypeSelect.parent(".input-group");
    var dataType = repeatTypeSelect.attr("id").substr(10);

    var backrefSelect = inputGroup.find("select[id*='backref']");
    var customInput = inputGroup.find("input");
    
    if (repeatTypeSelect[0].selectedIndex == 0) {
      repeatTypeSelect.css("width", "95px");

      if (parentForm.children().last().html() != "Times") {
        parentForm.append("<label>Times</label>");
      }

      if (!customInput.length) {
        if (backrefSelect.length) {
          backrefSelect.remove();
        }

        customInput = $(repInputHtml);
        customInput.attr("id", "repeat" + dataType);
        customInput.appendTo(inputGroup);
      }
    } else {
      repeatTypeSelect.css("width", "110px");

      if (parentForm.children().last().html() == "Times") {
        parentForm.children().last().remove();
      }

      if (!backrefSelect.length) {
        if (customInput.length) {
          customInput.remove();
        }

        backrefSelect = $(backrefSelectHtml);
        backrefSelect.attr("id", "backref" + dataType);

        var validOptions = dataSession.getValidBackrefOptions();

        if (!validOptions.length) {
          backrefSelect.append("<option value='' disabled selected style='display:none;'>No Valid Option</option>");
        } else {
          for (var i = 0; i < validOptions.length; i ++) {
            backrefSelect.append("<option value=" + (validOptions[i] - 1) + ">Data Entry " + validOptions[i] + "</option>");
          }
        }

        backrefSelect.appendTo(inputGroup);
      }
    }
  });
} (window.popupController = window.popupController || {}, jQuery));

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