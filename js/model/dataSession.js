(function (dataSession, $, undefined) {
  dataSession.input = [];
  dataSession.data = [];

  function updateReferby(input) {
    if (!input.referto) return;

    var referee = dataSession.input[input.referto];

    if (!referee.referby) {
      referee.referby = [];
    }
    
    referee.referby.push(dataSession.input.length);
  }

  function printEntry(entry, entryIndex) {
    var dup = $.extend({}, entry);

    // set repeat time if it's backref type
    if (!dup.repeattime) {
      dup.repeattime = dataSession.data[dup.repeatref];
    }

    previewView.startLoadingEntry(entryIndex);

    var thread = new Worker("js/dataInfo.js");

    thread.onmessage = threadOnMessageHandler;
    thread.postMessage({"cmd":"start", "data": JSON.stringify(dup), "index": entryIndex});
  }

  function threadOnMessageHandler(event) {
    var data = event.data;

    dataSession.data[data.index] = data.data;

    previewView.stopLoadingEntry(data.index);
    previewView.updateEntry(data.index);

    // update each input that refers to current index. We must handle the updating
    // here, since we need to wait for it to be updated
    if (data.referby && data.referby.length) {
      for (var i = 0; i < referby.length; i ++) {
        var referbyIndex = referby[i];
        printEntry(dataSession.input[referbyIndex]);
      }
    }
  }

  dataSession.add = function (userInput) {    
    // issue confirm add message before anything else
    $("html").trigger("sessionUpdate", [{"opcode": "add", "input": userInput}]);

    dataSession.input.push(userInput);
    updateReferby(userInput);

    dataSession.save();

    previewView.addEntry();

    printEntry(userInput, dataSession.input.length - 1);
  }

  dataSession.init = function () {
    dataSession.input = [];
    dataSession.data = [];

    $("html").trigger("sessionUpdate", [{"opcode": "clear"}]);
  }

  dataSession.save = function () {
    // TODO: saving is currently sequential, could be made as parallel in the
    // future
    var serializedData = JSON.stringify(dataSession.input);
    
    view.loadingSaveRegion();

    if (localStorage.dataSid) {
      // we are online, upload the session to server
      $.post("/api/datasession.php", {"cmd": "upload", "id": localStorage.dataSid, "jsoninput": serializedData}, function (res) {
        view.refreshSaveRegion("online");
      });
    } else {
      // we are offline, store the data in local storage
      localStorage.dataSession = serializedData;
      view.refreshSaveRegion("local");
    }
  }
} (window.dataSession = window.dataSession || {}, jQuery));