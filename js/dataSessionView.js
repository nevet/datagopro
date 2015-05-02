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

  dataSessionView.modifyEntry = function (index) {
    popupView.preparePopup(index);
    popupView.showPopup();
  }

  dataSessionView.removeEntry = function (index) {
    if (index == undefined) {
      dataField.children().last().remove();
    } else {
      dataField.children()[index].remove();
    }

    if (dataField.children().length == 0) {
      addDataButtonMaximize();
    }
  }

  $("html").on("sessionUpdate", function (event, res) {
    switch (res.opcode) {
      case "clear":
        clearDataField();
        break;
      case "add":
        break;
      case "delete":
        break;
    }
  });

  $("html").on("popupConfirm", function (event, res) {

  });
} (window.dataSessionView = window.dataSessionView || {}, jQuery));