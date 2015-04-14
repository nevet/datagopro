(function (controller, $, undefined) {
  // do when document is ready
  $(function () {
    $("#addRowButton").on("click", function () {
      doc.addBlock();
    });

    $("#genButton").on("click", function () {
      doc.generate();
    });
  });
}) (window.controller = window.controller || {}, jQuery);