(function (myinputController, $, undefined) {
  $(".timeline-block .timeline-content").on("click", function (event) {
    myinputView.highlightSelectedBlock($(event.target).closest(".timeline-content"));
  });
} (window.myinputController = window.myinputController || {}, jQuery));