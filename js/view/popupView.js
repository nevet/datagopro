(function (popupView, $, undefined) {
  var popup = $("#popup");

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
    repeatTypeChanged($("#repeatTypeNumber"));
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
          "repeatypeindex": $("#repeatTypeNumber")[0].selectedIndex
        }
        // some conditional fields need to be set here:
        // 1. repeattime
        // 2. referto
        // 3. referby
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
          "wordbreak": $("#wordbreak").val()
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
          "graphformat": $("#graphformat").val()
        }
      break;
    }

    return input;
  }

  popupView.preparePopup = function (index) {
    // chosebutton = e;
    // $(e).blur();
    // currentEntryIndex = inputInfo.checkExistence(chosebutton);
    // if (currentEntryIndex >= 0) {
    //   preparePopup( inputInfo.getElement(currentEntryIndex) );
    // };
  }

  popupView.showPopup = function (noClear) {
    if (noClear == undefined) {
      popupView.clearData();
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