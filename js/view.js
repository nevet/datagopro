(function (view, $, undefined) {
  var inputId = 1;
  var contentArea;

  var row = "<div class='row'></div>";
  var colSm2 = "<div class='col-sm-2'></div>";
  var selection = "<select class='form-control'></select>";

  function getNextRow(rowId) {
    var rowObj = $(row);

    rowObj.attr("id": "block" + rowId);

    return $(row);
  }

  function getNextInputBox(cueWord) {
    var controlCol = $(colSm2);
    var textInput = $("<input>");

    textInput.attr({
      "type": "text",
      "id": "input" + inputId,
      "placeholder": cueWord
    });
    
    inputId ++;

    textInput.appendTo(controlCol);

    return textInput;
  }

  function getSelection(options, cueIndex) {
    var selectionObj = $(selection);

    for (var i = 0; i < options.length; i ++) {
      var optionObj = $("<option>" + options[i] + "</option>");

      optionObj.attr("value", options[i].toLowerCase());

      if (i == cueIndex) {
        optionObj.attr({"selected", "disabled", "hidden"});
      }

      optionObj.appendTo(selectionObj);
    }

    return selectionObj;
  }

  view.addContentArea = function () {
    var contentAreaHtml = "<div class='container' id='container'>"
    
    contentArea = $(contentAreaHtml).appendTo("body");

    return contentArea;
  }

  view.addRow = function (rowId, typeSelectionHandler) {
    var row = getNextRow(rowId);

    row.appendTo(contentArea);

    return row;
  }
  
  view.addInput = function (block, type, cueWord, inputLeaveFocusHandler) {
    var inputBox = getNextInputBox(cueWord);
    
    inputBox.parent().appendTo(block);

    inputBox.on("focusout", inputLeaveFocusHandler);

    return inputBox;
  }

  view.addSelection = function (block, options, cueIndex, selectionChangedHandler) {
    var controlCol = $(colSm2);
    var selection = getSelection(options, cueIndex);

    selection.appendTo(controlCol);
    controlCol.appendTo(block);

    selection.on("change", selectionChangedHandler);

    return selection;
  }

  view.removeElement = function (element) {
    element.remove();
  }
}) (window.view = window.view || {}, jQuery);