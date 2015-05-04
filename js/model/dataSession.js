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
    dataSession.input.push(userInput);
    updateReferby(userInput);

    dataSession.save();

    // issue confirm add message before anything else
    $("html").trigger("sessionUpdate", [{"opcode": "add"}]);

    printEntry(userInput, dataSession.input.length - 1);
  }

  dataSession.init = function () {
    dataSession.input = [];
    dataSession.data = [];

    $("html").trigger("sessionUpdate", [{"opcode": "clear"}]);
  }

  dataSession.remove = function (index) {
    // take care of referto first. There are totally 3 cases:
    // referto < index, this one won't be affected by deletion;
    // referto == index, the data will become "undefined";
    // referto > index, referto should be decreased by 1 since index is taken away.
    for (var i = 0; i < dataSession.input.length; i ++) {
      var input = dataSession.input[i];

      if (i == index || input.referto < index) continue;
      
      if (input.referto > index) {
        input.referto --;
      } else
      if (input.referto == index) {
        dataSession.data[i] = undefined;
        input.referto = -1;
      }

      $("html").trigger("sessionUpdate", [{"opcode": "modify", "index": i}]);
    }

    // take care of referby. There are totally 3 cases:
    // referby < index, this one won't be affected by deletion;
    // referby == index, simply delete this entry;
    // referby > index, simply decrease referby by 1 since index is taken away.
    for (var i = 0; i < dataSession.input.length; i ++) {
      var input = dataSession.input[i];

      if (i == index || !input.referby) continue;

      // need to do it from right to left since splice will mess up the index
      for (var j = input.referby.length - 1; j >= 0; j --) {
        if (input.referby[j] > index) {
          input.referby[j] --;
        } else
        if (input.referby[j] == index) {
          input.referby.splice(j, 1);
        }
      }
    }

    dataSession.input.splice(index, 1);
    dataSession.data.splice(index, 1);

    $("html").trigger("sessionUpdate", [{"opcode": "remove", "index": index}]);
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