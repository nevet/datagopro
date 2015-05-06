(function (view, $, undefined) {
  var saveNotice = $("#notice");
  var currentView = "editor";

  function setHeights() {
    if(document.documentElement.clientWidth > 768){
      //big screen
        var cHeight = document.documentElement.clientHeight;
        var navHeight = $("nav").height() + 2; // height + border-height * 2
        //main body height
        var mbHeight = cHeight - navHeight;
        $("#mainbody").css("min-height", mbHeight+"px");
        $("#mainbody").css("height", mbHeight+"px");

        $("#mainbody>div").css("min-height", mbHeight+"px");
      }
  }

  view.finishLoadingLogin = function () {
    $(".loginLoadingCover").css("display", "none");
  }

  view.init = function () {
    setHeights();
  }

  view.loadingSaveRegion = function () {
    saveNotice.html("Saving changes...");
  }

  view.popupLoginClose = function () {
    var bPopup = $("#element_to_pop_up").bPopup();
    bPopup.close({
      transitionClose: 'slideUp'
    });
  }

  view.popupLoginOptions = function (isNewUser) {
    $("#element_to_pop_up").bPopup({ //uses jQuery easing plugin
      speed: 500,
      transition: 'slideDown',
      transitionClose: 'slideUp',
      onClose: function() {
        if (isNewUser) {
          $('#tutorialguide').joyride({
            autoStart: true,
            nubPosition: 'top',
            modal: true,
            expose: true
          });
        }
      }
    });
  }

  view.refreshSaveRegion = function (scope) {
    if (scope == "online") {
      saveNotice.html("All changes saved");
    } else {
      saveNotice.html("All changes saved locally");
    }
  }

  view.startLoadingLogin = function () {
    $(".loginLoadingCover").css("display", "block");
  }

  view.switchToEditor = function () {
    if (currentView == "editor") return;

    $("#newdata").parent().addClass("active");

    $("html").trigger("viewSwitch", [{"fromView": currentView, "toView": "editor"}]);
    currentView = "editor";

    // if ($(prev.find("a")[0]).attr("id") != "newdata") {
    //   if (prev.length == 0) {
    //     // timeline is displayed now
    //     $("#timeline").css("display", "none");
    //   }
    //   else if($(prev.find("a")[0]).attr("id") == "popularinput") {
    //     prev.removeClass();
    //     $("#popular").css("display", "none");
    //   }
    //   $(this).parent().addClass("active");
    //   $("#editor").css("display", "block");
    //   $("#preview").children().not(".previewLoadingCover").remove();
    //   if(latestNewDataPreview != null && latestNewDataPreview.length != 0) {
    //     $("#preview").append(latestNewDataPreview);
    //   }
    // }
  }

  view.switchToMyinput = function () {
    if (currentView == "myinput") return;

    $(".navbar-nav > li.active").removeClass();

    // if ($(prev.find("a")[0]).attr("id") == "popularinput") {
    //   $("#popular").css("display", "none");
    //   $("#timeline").css("display", "block"); 
    //   $("#preview").children().not(".previewLoadingCover").remove();
    // }

    $("html").trigger("viewSwitch", [{"fromView": currentView, "toView": "myinput"}]);
    currentView = "myinput";
  }

  view.udpateLoginRegion = function (name) {
    $("span#profile").html("Welcome, " + name + "!");
    $("#login").css("display", "none");
    $("#afterlogin").css("display", "");
  }

  $(window).resize(function() {
    setHeights();
  });
} (window.view = window.view || {}, jQuery));