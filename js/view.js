(function (view, $, undefined) {
  view.startLoadingLogin = function () {
    $(".loginLoadingCover").css("display", "block");
  }

  view.finishLoadingLogin = function () {
    $(".loginLoadingCover").css("display", "none");
  }

  view.udpateLoginRegion = function (name) {
    $("span#profile").html("Welcome, " + name + "!");
    $("#login").css("display", "none");
    $("#afterlogin").css("display", "");
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

  $("html").on("sessionUpdate", function (event, res) {
    var addDataButton = $("#add");
    var addDataButtonCueword = $("#add p");
    var addDataButtonIcon = $("#add i");

    switch (res.opcode) {
      case "clear":
        addDataButton.removeClass("hasInput");
        addDataButton.addClass("empty");

        addDataButtonIcon.removeClass("fa-2x");
        addDataButtonIcon.addClass("fa-5x");

        addDataButtonCueword.removeClass("hasInput");
        addDataButtonCueword.addClass("empty");
        addDataButtonCueword.html("Click here to add data...");
        break;
      case "add":
        break;
      case "delete":
        break;
    }
  });
} (window.view = window.view || {}, jQuery));