(function (dataSession, $, undefined) {
  dataSession.input = [];
  dataSession.data = [];

  function updateReferby(input) {
    if (input.referto == undefined) return;

    var referee = dataSession.input[input.referto];
    
    referee.referby.push(dataSession.input.length - 1);
  }

  function printInput(index) {
    var input = dataSession.input[index];
    var dup = $.extend({}, input);

    // set repeat time if it's backref type
    if (dup.repeatypeindex) {
      dup.repeattime = dataSession.data[dup.referto];
    }

    previewView.startLoadingEntry(index);

    var thread = new Worker("js/model/dataInfo.js");

    thread.onmessage = threadOnMessageHandler;
    thread.postMessage({"cmd":"start", "data": JSON.stringify(dup), "index": index});
  }

  function threadOnMessageHandler(event) {
    var data = event.data;

    dataSession.data[data.index] = data.data;

    previewView.stopLoadingEntry(data.index);
    previewView.updateEntry(data.index);

    // update each input that refers to current index. We must handle the updating
    // here, since we need to wait for it to be updated
    if (data.referby && data.referby.length) {
      for (var i = 0; i < data.referby.length; i ++) {
        var referbyIndex = data.referby[i];
        printInput(referbyIndex);
      }
    }
  }

  function isValidBackrefOption(input) {
    return input.datatype == "number" && input.numbertype == "integer" && input.repeattime === 1;
  }

  dataSession.add = function (userInput) {
    dataSession.input.push(userInput);
    updateReferby(userInput);

    dataSession.save();

    // issue confirm add message before anything else
    $("html").trigger("sessionUpdate", [{"opcode": "add"}]);

    printInput(dataSession.input.length - 1);
  }

  dataSession.getValidBackrefOptions = function () {
    var output = [];
    var index = dataSessionController.getLastActiveEntryIndex();

    for (var i = 0; i < index; i ++) {
      if (isValidBackrefOption(dataSession.input[i])) {
        output.push(i + 1);
      }
    }

    return output;
  }

  dataSession.init = function () {
    localStorage.clear();

    dataSession.input = [];
    dataSession.data = [];

    $("html").trigger("sessionUpdate", [{"opcode": "clear"}]);
  }

  dataSession.load = function (sid) {
    $.get("/api/datasession.php", {"cmd": "retrieveInp", "id": sid}, function (res) {
      var json = JSON.parse(res);

      if (json.status == "ok") {
        var data = json.data;
        dataSession.input = JSON.parse(data.input.replace(/\&quot\;/g, '\"'));

        $("html").trigger("sessionUpdate", [{"opcode": "addBatch", "amount": dataSession.input.length}]);

        dataSession.regenerate();
      }
    });
  }

  dataSession.modify = function (index, input) {
    /* need to update referto and referby here if necessary.

    ** for referto, we have 5 cases:
    ** 1. before: no referto; after: still no referto;
    ** 2. before: no referto; after: referto A;
    ** 3. before: referto == A; after: referto == A;
    ** 4. before: referto == A; after: referto == B;
    ** 5. before: referto == A; after: no referto.

    ** case 1: do nothing;
    ** case 2: update A's referby;
    ** case 3: do nothing;
    ** case 4: remove from A's referby, add to B's referby;
    ** case 5: remove from A's referby

    ** for referby, we have 2 cases:
    ** 1. before: valid reference; after: still valid;
    ** 2. before: valid reference; after: invalid;

    ** case 1: do nothing, since data update will be handled in printInput;
    ** case 2: for every entries in referby, change its referto to -1, data to undefined, and issue sessionUpdate */
    var oldInput = dataSession.input[index];
    
    dataSession.input[index] = input;

    // handle referto first
    if (oldInput.referto == undefined && input.referto != undefined) {
      // case 2
      dataSession.input[input.referto].referby.push(index);
    } else
    if (oldInput.referto != undefined && oldInput.referto != input.referto) {
      var oldRefer = dataSession.input[oldInput.referto];

      // case 4 && 5
      for (var i = 0; i < oldRefer.referby.length; i ++) {
        if (oldRefer.referby[i] == index) {
          oldRefer.referby.splice(i, 1);
          break;
        }
      }

      // case 4
      if (input.referto != undefined) {
        dataSession.input[input.referto].referby.push(index);
      }
    }

    // handle referby
    if (oldInput.referby.length) {
      if (isValidBackrefOption(input)) {
        // case 1
        dataSession.input[index].referby = oldInput.referby;
      } else {
        // case 2
        for (var i = 0; i < oldInput.referby.length; i ++) {
          dataSession.input[oldInput.referby[i]].referto = undefined;
          dataSession.data[oldInput.referby[i]] = undefined;

          $("html").trigger("sessionUpdate", [{"opcode": "modify", "index": oldInput.referby[i]}]);
        }
      }
    }

    dataSession.save();
    
    $("html").trigger("sessionUpdate", [{"opcode": "modify", "index": index}]);

    printInput(index);
  }

  dataSession.regenerate = function () {
    for (var i = 0; i < dataSession.input.length; i ++) {
      if (dataSession.input[i].referto == undefined) {
        printInput(i);
      }
    }
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
        input.referto = undefined;
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

    dataSession.save();

    $("html").trigger("sessionUpdate", [{"opcode": "remove", "index": index}]);
  }

  dataSession.save = function () {
    // TODO: saving is currently sequential, could be made as parallel in the
    // future
    var serializedData = JSON.stringify(dataSession.input);
    
    view.loadingSaveRegion();

    if (user.getProfile().sysid != undefined) {
      // we are online, upload the session to server
      $.post("/api/datasession.php", {"cmd": "upload", "id": localStorage.dataSid, "jsoninput": serializedData}, function (res) {
        var json = JSON.parse(res);

        if (json.status == "ok") {
          view.refreshSaveRegion("online");
          localStorage.dataSid = json.sid;
        }
      });
    } else {
      // we are offline, store the data in local storage
      localStorage.dataSession = serializedData;
      view.refreshSaveRegion("local");
    }
  }
} (window.dataSession = window.dataSession || {}, jQuery));