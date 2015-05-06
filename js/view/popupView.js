(function (popupView, $, undefined) {
  var popup = $("#popup");

  function preparePopup (input) {
    switch (input.datatype) {
      case "number":
        prepareNumber(input);
        checkNumberValidation();
        break;
      case "string":
        prepareString(input);
        checkStringValidation();
        break;
      case "graph":
        prepareGraph(input);
        checkGraphValidation();
        break;
    }
  }

  function prepareNumber(input) {
    $("#anumber").addClass("selected").siblings().removeClass("selected");
    $("#number").css("display","block").siblings().css("display", "none");

    $("#numbertype")[0].selectedIndex = input.numberindex;
    if (input.numberindex == 1) {
      $("#precision").val(input.floatprecision);
      $("#precisionDiv").show();
      $("#parity").prop("disabled", "disabled");
      $("#permutationDiv").hide();
    } else {
      $("#precisionDiv").hide();
      $("#parity").prop("disabled", false);
      noErrorHighlight($("#precision"));
      $("#permutation")[0].checked = input.permutation;
      $("#permutationDiv").show();
      checkPermutation();
    }
    $("#min").val(input.numbermin);
    $("#max").val(input.numbermax);
    $("#parity")[0].selectedIndex = input.parityindex;
    $("#order")[0].selectedIndex = input.orderindex;
    $("#repeatTypeNumber")[0].selectedIndex = input.repeatypeindex;
    
    $("#repeatTypeNumber").trigger("change");

    if (input.repeatypeindex == 0) {
      $("#repeatNumber").val(input.repeattime);
    } else {
      $("#backrefNumber")[0].selectedIndex = input.referto;
    }
  }

  function prepareString(input) {
    $("#astring").addClass("selected").siblings().removeClass("selected");
    $("#string").css("display","block").siblings().css("display", "none");

    $("#stringlength").val(input.stringlength);
    $("#charset")[0].selectedIndex = input.chartype;
    $("#case")[0].selectedIndex = input.caseindex;
    $("#hasnumber")[0].checked = input.hasnumber;
    $("#linelength").val(input.linelength);
    $("#linebreak").val(input.linebreak);
    $("#wordlength").val(input.wordlength);
    $("#wordbreak").val(input.wordbreak);
    $("#repeatTypeString")[0].selectedIndex = input.repeatypeindex;
    
    $("#repeatTypeString").trigger("change");

    if (input.repeatypeindex == 0) {
      $("#repeatString").val(input.repeattime);
    } else {
      $("#backrefString")[0].selectedIndex = input.referto;
    }
  }

  function prepareGraph(input) {
    $("#agraph").addClass("selected").siblings().removeClass("selected");
    $("#graph").css("display","block").siblings().css("display", "none");
    
    $("#connect")[0].checked = input.isconnect;
    $("#direct")[0].checked = input.isdirect;
    $("#weight")[0].checked = input.isweighted;
    $("#weightmin").val(input.weightmin);
    $("#weightmax").val(input.weightmax);
    $("#tree")[0].checked = input.isTree;
    $("#node").val(input.node);
    $("#edge").val(input.edge);
    $("#graphformat")[0].selectedIndex = input.graphformatindex;
    $("#repeatTypeGraph")[0].selectedIndex = input.repeatypeindex;
    
    $("#repeatTypeGraph").trigger("change");

    if (input.repeatypeindex == 0) {
      $("#repeatGraph").val(input.repeattime);
    } else {
      $("#backrefGraph")[0].selectedIndex = input.referto;
    }
  }

  function updateRepeat(input, type) {
    var capType = type.capitalizeFirstLetter();
    if (input.repeatypeindex == 0) {
      input.repeattime = parseInt($("#repeat" + capType).val());
    } else {
      input.referto = parseInt($("#backref" + capType).val());
    }
  }

  popupView.clearData = function() {
    $("#anumber").addClass("selected").siblings().removeClass("selected");
    $("#number").css("display","block").siblings().css("display", "none");
    
    $("#numbertype")[0].selectedIndex = 0;
    $("#permutation")[0].checked = false;
    $("#precision").val(3);
    $("#precisionDiv").hide();
    $("#min").val(0);
    $("#max").val(100);
    $("#parity")[0].selectedIndex = 0;
    $("#order")[0].selectedIndex = 0;
    $("#repeatTypeNumber")[0].selectedIndex = 0;
    $("#repeatNumber").val(10);  
    correctHighlight($("#repeatNumber"));
    correctHighlight($("#max"));
    correctHighlight($("#min"));
    noErrorHighlight($("#precision"));

    $("#stringlength").val(100);
    $("#charset")[0].selectedIndex = 0;
    $("#case")[0].selectedIndex = 0;
    $("#hasnumber")[0].checked = false;
    $("#linelength").val("");
    $("#linebreak").val("\\n");
    $("#wordlength").val("");
    $("#wordbreak").val("");
    $("#repeatString").val(10);
    correctHighlight($("#stringlength"));
    correctHighlight($("#repeatString"));

    $("#connect")[0].checked = true;
    $("#direct")[0].checked = true;
    $("#weight")[0].checked = false;
    $("#weightmin").val(1);
    $("#weightmax").val(1);
    $(".weightrange").css("display", "none");
    $("#tree")[0].checked = false;
    $("#node").val(10);
    $("#edge").val(90);
    $("#graphformat")[0].selectedIndex = 0;
    $("#repeatGraph").val(1);
    correctHighlight($("#repeatGraph"));
    correctHighlight($("#node"));
    correctHighlight($("#edge"));
    noErrorHighlight($("#weightmax"));
    noErrorHighlight($("#weightmin"));

    $("#repeatTypeNumber").trigger("change");
  }

  popupView.collapseAdvance = function (target) {
    target.closest(".container").find(".advanced").css("display","none");
    target.attr("class","fa fa-angle-double-down");
  }

  popupView.closePopup = function () {
    popup.close();
  }

  popupView.expandAdvance = function (target) {
    target.closest(".container").find(".advanced").css("display","block");
    target.attr("class","fa fa-angle-double-up");
  }

  popupView.getInput = function (type) {
    var input;

    switch (type) {
      case "number":
        input = {
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
          "referby": []
        }
        break;
      case "string":
        input = {
          "datatype": "string",
          "stringlength": $("#stringlength").val(),
          "chartype": $("#charset")[0].selectedIndex,
          "caseindex":$("#case")[0].selectedIndex,
          "casetype": $("#case").val(),
          "hasnumber": $("#hasnumber")[0].checked,
          "linelength": $("#linelength").val(),
          "linebreak": $("#linebreak").val(),
          "wordlength": $("#wordlength").val(),
          "wordbreak": $("#wordbreak").val(),
          "repeatypeindex": $("#repeatTypeString")[0].selectedIndex
        }
        break;
      case "graph":
        input = {
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
          "graphformat": $("#graphformat").val(),
          "repeatypeindex": $("#repeatTypeGraph")[0].selectedIndex
        }
    }

    input.referto = undefined;

    updateRepeat(input, type);

    return input;
  }

  popupView.numbertypeOnChange = function (target) {
    if (target.val() == "float") {
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

  popupView.showPopup = function () {
    var activeIndex = dataSessionController.getLastActiveEntryIndex();
    var input = dataSession.input[activeIndex];

    popupView.clearData();

    if (input) {
      // open an old entry, populate the entry using old values
      preparePopup(input);
    }
    
    $(".ok").show();
    $(".cancel").text("Cancel");
    $("#popup input").attr("disabled", false);
    $("#popup select").attr("disabled", false);
    
    popup.bPopup({
      speed: 300,
      transition: 'slideDown',
      transitionClose: 'fadeIn',
      onClose: function () {
        $("html").trigger("popupClose", [{"status": "cancel"}]);
      }
    });
  }
} (window.popupView = window.popupView || {}, jQuery));