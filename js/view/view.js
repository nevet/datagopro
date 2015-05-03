(function (view, $, undefined) {
  var saveNotice = $("#notice");

  function setHeights() {
    if(document.documentElement.clientWidth > 768){
      //big screen
        var cHeight = document.documentElement.clientHeight;
        var np = 64/cHeight;
        //main body height
        var mbHeight = cHeight * (1-np);
        $("#mainbody").css("height", mbHeight+"px");
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

  view.udpateLoginRegion = function (name) {
    $("span#profile").html("Welcome, " + name + "!");
    $("#login").css("display", "none");
    $("#afterlogin").css("display", "");
  }
} (window.view = window.view || {}, jQuery));