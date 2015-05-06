(function (previewView, $, undefined) {
  var preview = $("#preview");
  var _div = "<div>";
  var _span = "<span>";
  var _collapseButton = "<button class='dataCollapseButton fa fa-angle-down' data-toggle='collapse' aria-expanded='true'></button>"
  var _spinner = "<i class='fa fa-spinner fa-spin'>";

  var welcomeMsg = "Welcome to DataGoPro!";
  var welcomeDiv = $(_div).html(welcomeMsg);

  var previewContent;

  function addEntry () {
    var div = $(_div);
    var collapseButton = $(_collapseButton);
    var dataDiv = $(_div);
    var previewSpan = $(_span);
    var collapseDataDiv = $(_div);
    var divUid = getDivUID();

    if (preview.find("#welcomeMsg").length) {
      preview.find("#welcomeMsg").remove();
    }

    div.addClass("data-div");

    collapseButton.attr("data-target", "#" + divUid);
    collapseButton.css("visibility", "hidden");
    collapseButton.appendTo(div);

    dataDiv.css("padding-left", "10px");

    previewSpan.appendTo(dataDiv);
    dataDiv.appendTo(div);
    div.appendTo(preview);
    
    collapseDataDiv.attr("id", divUid);
    collapseDataDiv.attr("aria-expanded", true);
    collapseDataDiv.addClass("collapse");
    collapseDataDiv.addClass("in");
    collapseDataDiv.appendTo(dataDiv);
  }

  function addEntryBatch (amount) {
    for (var i = 0; i < amount; i ++) {
      addEntry();
    }
  }

  function clearDataField() {
    preview.html("");
  }

  function getDiv(index) {
    return $(preview.children("div")[index]);
  }

  function getDivUID() {
    var date = new Date();
    var time = date.getTime();
    var id = "";

    while (time) {
      last = time % 62;

      if (last < 10) {
        id += last;
      } else
      if (last >= 10 && last < 36) {
        id += String.fromCharCode(last + 55);
      } else {
        id += String.fromCharCode(last + 61);
      }

      time = ~~(time / 62);
    }

    return id;
  }

  function removeEntry (index) {
    getDiv(index).remove();
  }

  function splitData(data, span, div) {
    if (!data) {
      span.html("undefined");
      div.html("");

      return;
    }

    var temp = data.toString().trim();

    temp = temp.replace(/(?:\r\n|\r|\n)/g, '<br/>');

    var maxWidth = span.parent().width();
    var lastWidth = 0;
    var best = 0;

    temp += " ";

    for (var i = 0; i < temp.length; i ++) {
      if (temp[i] == ' ' || temp[i] == '>') {
        span.html(temp.substr(0, i));

        var curWidth = span.width();

        if (curWidth < maxWidth && curWidth != lastWidth) {
          best = i;
          lastWidth = curWidth;
        } else
        if (curWidth < maxWidth && curWidth == lastWidth) {
          span.html(temp.substr(0, best));
          div.html(temp.substr(best + 1).trim());

          break;
        } else
        if (curWidth > maxWidth) {
          span.html(temp.trim());

          break;
        }
      }
    }
  }

  previewView.diminishEntry = function (index) {
    var div = getDiv(index);
    div.find("span").removeClass("glowSpan");
  }

  previewView.highlightEntry = function (index) {
    var div = getDiv(index);
    div.find("span").addClass("glowSpan");
  }

  previewView.init = function (index) {
    welcomeDiv.attr("id", "welcomeMsg");
    welcomeDiv.appendTo(preview);
  }

  previewView.startLoadingEntry = function (index) {
    var div = getDiv(index);
    var previewSpan = div.find("span");
    var collapseDiv = div.find("div div");
    var spinner = $(_spinner);

    collapseDiv.html("");
    previewSpan.html("");

    spinner.appendTo(previewSpan);
  }

  previewView.stopLoadingEntry = function (index) {
    var div = getDiv(index);
    var previewSpan = div.find("span");

    previewSpan.html("");
  }

  previewView.toggleCollapseButton = function (event) {
    var button = $(event.target);
    
    if (button.attr("aria-expanded") == "true") {
      button.removeClass("fa-angle-down");
      button.addClass("fa-angle-right");
    } else {
      button.removeClass("fa-angle-right");
      button.addClass("fa-angle-down");
    }
  }

  previewView.updateEntry = function (index) {
    var div = getDiv(index);
    var previewSpan = div.find("span");
    var collapseDiv = div.find("div div");

    splitData(dataSession.data[index], previewSpan, collapseDiv);

    if (collapseDiv.html() != "") {
      div.find("button").css("visibility", "visible");
    } else {
      div.find("button").css("visibility", "hidden");
    }
  }

  $("html").on("sessionUpdate", function (event, res) {
    switch (res.opcode) {
      case "clear":
        clearDataField();
        break;
      case "add":
        addEntry();
        break;
      case "addBatch":
        addEntryBatch();
      case "remove":
        removeEntry(res.index);
        break;
      case "modify":
        previewView.updateEntry(res.index);
    }
  });

  $("html").on("viewSwitch", function (event, res) {
    if (res.fromView == "editor") {
      previewContent = preview.html();
      clearDataField();
      preview.css("font-family", "inherit");
    }

    if (res.toView == "editor") {
      preview.html(previewContent);
      preview.css("font-family", "'Lucida Console',Monaco,monospace");
    }
  });
} (window.previewView = window.previewView || {}, jQuery));