(function (dataSessionController, $, undefined) {
  var lastActiveEntryState; // 0: this entry is waiting to be populated; 1: populated and is waiting to be modified
  var lastActiveEntryIndex;

  function save(textToWrite) {
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var downloadLink = document.createElement("a");

    downloadLink.download = "textFile";
    downloadLink.innerHTML = "Download File";
    if (window.URL != null) {
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    }

    downloadLink.click();
  }

  dataSessionController.getLastActiveEntry = function () {
    return $($("#data-field").find(".data-block")[lastActiveEntryIndex]);
  }

  dataSessionController.getLastActiveEntryIndex = function () {
    return lastActiveEntryIndex;
  }

  // add data
  $("#add i, #add p").on("click", function () {
    lastActiveEntryIndex = dataSessionView.addEntry();
    lastActiveEntryState = 0;
  });

  $("html").on("popupClose", function (event, res) {
    // when data popup is closed, we need to check if user cancels the action
    // or made some modification
    if (res.status == "cancel") {
      // user cancles the action, if user is currently adding an entry, 
      if (lastActiveEntryState === 0) {
        // remove the last entry
        dataSessionView.removeEntry(lastActiveEntryIndex);
      }
    } else {
      // some modification has been done, change data session
      var input = res.input;

      if (validate(input.datatype)) {
        popupView.closePopup();
        dataSession.add(input);
      }
    }

    // clear active entry
    lastActiveEntryIndex = undefined;
    lastActiveEntryState = undefined;
  });

  // modify data
  $("#data-field").on("click", ".data-block input", function (event) {
    var input = $(event.target);

    input.blur();
    
    lastActiveEntryIndex = input.closest(".data-block").index();
    lastActiveEntryState = 1;

    dataSessionView.modifyEntry(lastActiveEntryIndex);
  });

  $("#data-field").on("click", ".data-block div i", function (event) {
    var target = $(event.target);
    target.parent().children("input").click();
  });  

  // delete data    
  $("#data-field").on("click", ".btn-delete", function (event) {
    var dataBlock = $(this).closest(".data-block");
    inputInfo.removeElement(dataBlock.find("input")[0]);
    dataBlock.remove();
  });

  // hover on back reference
  $("#data-field").on("mouseenter", ".data-block-info .fa-stack", dataSessionView.hoverEntryBackrefIn)
                  .on("mouseleave", ".data-block-info .fa-stack", dataSessionView.hoverEntryBackrefOut);

  // modify set name
  $("#setname").on("blur", function () {
    var setName = $(this).val();

    if (localStorage.dataSid) {
      // we are online, upload the session to server
      $.post("/api/datasession.php", {"cmd": "upload", "id": localStorage.dataSid, "setname": setName, "tags": ""}, function (res) {
        view.refreshSaveRegion("online");
      });
    } else {
      // we are offline, store the data in local storage
      localStorage.setName = setName;

      view.refreshSaveRegion("local")
    }
  });

  // download
  $("#generate button").on("click", function () {
    if (dataSession.data.length) {
      var output = "";

      for (var i = 0; i < dataSession.data.length; i ++) {
        output += allData[i];
      }
      
      save(output);
    } else {
      alert("There's no input so far!");
    }
  });
} (window.dataSessionController = window.dataSessionController || {}, jQuery));