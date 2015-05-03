(function (previewController, $, undefined) {
  $("#preview").on("click", "button", previewView.toggleCollapseButton);
} (window.previewController = window.previewController || {}, jQuery));