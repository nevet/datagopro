(function (myinputView, $, undefined) {
  var myinput = $("#timeline");

  function clearData() {
    myinput.html("");
  }

  function createTimeLine() {
    
  }

  $("html").on("viewSwitch", function (event, res) {
    if (res.fromView == "myinput") {
      myinput.css("display", "none");
    }

    if (res.toView == "myinput") {
      myinput.css("display", "block");
      clearData();
      createTimeLine();
    }
  });
} (window.myinputView = window.myinputView || {}, jQuery));