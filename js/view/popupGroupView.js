(function (popupGroupView, $, undefined) {
  var popup = $("#grouppopup");

  popupGroupView.showPopup = function () {
    $("#from").children().remove();
    $("#to").children().remove();
    $("#repeatGroup").val("10");
    // fillFromTo();

    popup.bPopup({ //uses jQuery easing plugin
      speed: 200,
      transition: 'slideDown',
      transitionClose: 'fadeIn'
    });
  }

} (window.popupGroupView = window.popupGroupView || {}, jQuery));