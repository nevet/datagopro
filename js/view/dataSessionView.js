(function (dataSessionView, $, undefined) {
  var dataField = $("#data-field");
  var addDataButton = $("#add");
  var addDataButtonCueword = $("#add p");
  var addDataButtonIcon = $("#add i");

  var _dataBlock = "<div class='data-block'>";
  var _serialNumber = "<i class='fa fa-stack-1x'><i>";
  var _serialNumberHolder = "<span class='order fa-stack'><i class='fa fa-circle-thin fa-stack-2x'></i>";
  var _inputButton = "<div class='column'><input class='btn btn-default' editable='false' readonly='on' placeholder='Data Type'><i class='fa fa-cog fa-2x'></i></div>";
  var _deleteButton = "<a class='btn-delete' href='#'><i class='fa fa-trash-o fa-lg fa-delete'></i></a>";
  var _entryInfo = "<span class='data-block-info'></span>";

  function addDataButtonMaximize() {
    addDataButton.removeClass("hasInput");
    addDataButton.addClass("empty");

    addDataButtonIcon.removeClass("fa-2x");
    addDataButtonIcon.addClass("fa-5x");

    addDataButtonCueword.removeClass("hasInput");
    addDataButtonCueword.addClass("empty");
    addDataButtonCueword.html("Click here to add data...");
  }

  function addDataButtonMinimize() {
    addDataButton.removeClass("empty");
    addDataButton.addClass("hasInput");

    addDataButtonIcon.removeClass("fa-5x");
    addDataButtonIcon.addClass("fa-2x");

    addDataButtonCueword.removeClass("empty");
    addDataButtonCueword.addClass("hasInput");
    addDataButtonCueword.html("Add more data...");
  }

  function addEntryConfirm() {
    var activeEntry = dataSessionController.getLastActiveEntry();
    var input = dataSession.input[dataSession.input.length - 1];
    var type = input.datatype;

    activeEntry.find("input").attr("value", type.capitalizeFirstLetter());
    changeInfoMessage(activeEntry, type, input);
  }

  function createDataBlock() {
    var dataBlock = $(_dataBlock);

    var serialNumber = $(_serialNumber);
    var serialNumberHolder = $(_serialNumberHolder);
    var inputButton = $(_inputButton);
    var deleteButton = $(_deleteButton);
    var entryInfo = $(_entryInfo);

    serialNumber.html(dataField.children().length + 1);
    serialNumber.appendTo(serialNumberHolder);
    serialNumberHolder.appendTo(dataBlock);

    inputButton.appendTo(dataBlock);

    deleteButton.appendTo(dataBlock);

    entryInfo.appendTo(dataBlock);

    return dataBlock;
  }

  function clearDataField() {
    dataField.html("");
    addDataButtonMaximize();
  }

  function changeInfoMessage(entry, type, input) {
    var infoSpan = entry.find(".data-block-info");
    var string = ""; 

    switch (type) {
      case "number":
        string = numberInfoMessage(input);
        break;
      case "string":
        string = stringInfoMessage(input);
        break;
      case "graph":
        string = graphInfoMessage(input);
        break;
    }

    string += " <b><i class='fa fa-times' style='padding-right: 5px;'></i>";

    if (input.repeattime) {
      infoSpan.html(string + input.repeattime + "</b>");
    } else {
      var index = input.referto + 1;
      var circle = $('<span class="fa-stack"><i class="fa fa-stack-2x fa-circle-thin"></i><i class="fa fa-stack-1x">' + index + '</i></span>');

      infoSpan.html(string);
      circle.appendTo(infoSpan);
    }
  }

  function modifyEntryConfirm(index) {
    
  }

  function numberInfoMessage(object) {
    var string;

    switch (object.numbertype) {
      case "integer":
        string = "<b>Integer</b>" + 
          " from " + object.numbermin + 
          " to " + object.numbermax;
        break;

      case "float":
        string = "<b>Float</b>" + 
          " from " + object.numbermin + 
          " to " + object.numbermax + 
          " with precision " + object.floatprecision;
        break;
    }

    return string;
  }

  function removeEntry (index) {
    if (index == undefined) {
      dataField.children().last().remove();
    } else {
      dataField.children()[index].remove();
    }

    renumberDatablocks();

    if (dataField.children().length == 0) {
      addDataButtonMaximize();
    }
  }

  function renumberDatablocks() {
    var dataBlocks = dataField.find(".data-block");

    for (var i = 0; i < dataBlocks.length; i ++) {
      $(dataBlocks[i]).find(".fa-stack-1x").html(i + 1);
    }
  }

  function stringInfoMessage(object) {
    var string;

    string = "<b>String</b> with length of " + object.stringlength;

    return string;
  }

  function graphInfoMessage(object) {
    var string;

    string = "<b>Graph</b> with " + object.node + 
          " nodes and " + object.edge + " edges";

    return string;
  }

  dataSessionView.addEntry = function () {
    // add the data block into data field
    var dataBlock = createDataBlock();
    dataBlock.appendTo(dataField);

    var index = dataBlock.index();
    
    // scroll to bottom
    dataField.scrollTop(dataField[0].scrollHeight);

    // if this is the first entry, minimize add data area
    if (index == 0) {
      addDataButtonMinimize();
    }

    popupView.showPopup();

    return index;
  }

  dataSessionView.hoverEntryBackrefIn = function (event) {
    var target = $(event.target);
    var index = parseInt(target.html());

    previewView.highlightEntry(index - 1);
  }

  dataSessionView.hoverEntryBackrefOut = function (event) {
    var target = $(event.target);
    var index = parseInt(target.html());

    previewView.diminishEntry(index - 1);
  }

  dataSessionView.modifyEntry = function (index) {
    popupView.showPopup();
  }

  $("html").on("sessionUpdate", function (event, res) {
    switch (res.opcode) {
      case "clear":
        clearDataField();
        break;
      case "add":
        addEntryConfirm();
        break;
      case "remove":
        removeEntry(res.index);
        break;
      case "modify":
        modifyEntryConfirm(res.index);
    }
  });
} (window.dataSessionView = window.dataSessionView || {}, jQuery));