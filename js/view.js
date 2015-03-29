(function (view, $, undefined) {
  var inputId = 1;
  var contentArea;

  var colSm2 = "<div class='col-sm-2'></div>";

  var dataTypeSelection = "<select class='form-control'>"
          +   "<option selected disabled hidden value=''>Data type</option>"
          +   "<option value='number'>Number</option> "
          + "</select>";

  var numberTypeSelection = "<div class='col-sm-2'>"
          + "<select class='form-control numbertype'>"
          +   "<option selected disabled hidden value=''>Number type</option>"
          +   "<option value='integer'>Integer</option>"
          +   "<option value='float'>Float</option"
          + "</select>"
          +"</div>";

  function getNextRow(rowId) {
    var row = "<div class='row' id='block" + rowId + "'></div>";

    return $(row);
  }

  function getNextInputBox(cueWord) {
    var textInput = "<div class='col-sm-2'><input type='text' id='input" +
                    inputId + "' placeholder='" + cueWord + "'></div>";

    inputId ++;
    return $(textInput);
  }

  view.addContentArea = function () {
    var contentAreaHtml = "<div class='container' id='container'>"
    
    contentArea = $(contentAreaHtml).appendTo("body");

    return contentArea;
  }

  view.addRow = function (rowId, typeSelectionHandler) {
    var row = getNextRow(rowId);
    var selectionCol = $(colSm2);
    var selection = $(dataTypeSelection);

    selection.on("change", typeSelectionHandler);
    selection.appendTo(selectionCol);

    selectionCol.appendTo(row);

    row.appendTo(contentArea);

    return row;
  }
  
  view.addInput = function (block, type, cueWord, inputLeaveFocusHandler) {
    var inputBox = getNextInputBox(cueWord);
    
    inputBox.appendTo(block);

    inputBox.on("focusout", inputLeaveFocusHandler);

    return inputBox;
  }

  view.removeElement = function (element) {
    element.remove();
  }
}) (window.view = window.view || {}, jQuery);