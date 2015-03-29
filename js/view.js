(function (view, $, undefined) {
  var inputId = 1;
  var contentArea;

  function getNextRow(rowId) {
    var row = "<div class='row' id='block" + rowId + "'></div>";

    return $(row);
  }

  function getNextInputBox() {
    var textInput = "<div class='col-sm-2'><input type='text' id='input" +
                    inputId + "'></div>";

    inputId ++;
    return $(textInput);
  }

  view.addContentArea = function () {
    var contentAreaHtml = "<div class='container' id='container'>"
    
    contentArea = $(contentAreaHtml).appendTo("body");

    return contentArea;
  }

  view.addRow = function (rowId) {
    var row = getNextRow(rowId);

    row.appendTo(contentArea);

    return row;
  }
  
  view.addInput = function (block, type, inputChangedHandler, inputLeaveFocusHandler) {
    var inputBox = getNextInputBox();
    
    inputBox.appendTo(block);

    inputBox.on("keyup", inputChangedHandler);
    inputBox.on("focusout", inputLeaveFocusHandler);

    return inputBox;
  }

  view.removeElement = function (element) {
    element.remove();
  }
}) (window.view = window.view || {}, jQuery);