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

  popupView.expandAdvance = function (target) {
    target.closest(".container").find(".advanced").css("display","block");
    target.attr("class","fa fa-angle-double-up");
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