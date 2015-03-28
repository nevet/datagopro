(function (view, $, undefined) {
  var id = 1;

  function getNextRow() {
    
  }

  function getNextInputBox() {
    var textInput = "<input type='text' id=" + id + ">";

    id ++;
    return $(textInput);
  }

  view.addRow = function () {

  }
  
  view.addInput = function (type, inputChangedHandler, inputLeaveFocusHandler) {
    var inputBox = getNextInputBox();
    
    inputBox.appendTo("body");

    inputBox.on("keyup", inputChangedHandler);
    inputBox.on("focusout", inputLeaveFocusHandler);
  }
}) (window.view = window.view || {}, jQuery);