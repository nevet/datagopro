(function (dataSessionController, $, undefined) {
  var activeEntryState; // 0: this entry is waiting to be populated; 1: populated and is waiting to be modified
  var activeEntryIndex;

  // add data
  $("#add i, #add p").on("click", function () {
    activeEntryIndex = dataSessionView.addEntry();
    activeEntryState = 0;
  });

  $("html").on("popupClose", function (event, res) {
    // when data popup is closed, we need to check if user cancels the action
    // or made some modification
    if (res.status == "cancel") {
      // user cancles the action, if user is currently adding an entry, 
      if (activeEntryState === 0) {
        // remove the last entry
        dataSessionView.removeEntry(activeEntryIndex);
      }
    } else {
      // some modification has been made, change data session
    }

    // clear active entry
    activeEntryIndex = undefined;
    activeEntryState = undefined;
  });

  // modify data
  $("#data-field").on("click", ".data-block input", function (event) {
    var input = $(event.target);

    input.blur();
    
    activeEntryIndex = input.closest(".data-block").index();
    activeEntryState = 1;

    dataSessionView.modifyEntry(activeEntryIndex);
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
} (window.dataSessionController = window.dataSessionController || {}, jQuery));