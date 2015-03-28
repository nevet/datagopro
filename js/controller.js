(function (controller, $, undefined) {
  // do when document is ready
  $(function () {
    $("#testButton").on("click", function () {
      doc.addBlock('number');
    });
  });
}) (window.controller = window.controller || {}, jQuery);