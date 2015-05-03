(function (previewView, $, undefined) {
  var preview = $("#preview");
  var _div = "<div>";
  var _span = "<span>";
  var _collapseButton = "<button class='dataCollapseButton fa fa-angle-down' data-toggle='collapse' aria-expanded='true'></button>"
  var _spinner = "<i class='fa fa-spinner fa-spin'>";

  function getDiv(index) {
    return $(preview.find("div")[index]);
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

  function splitData(data, span, div) {
    var temp = data.toString().trim();

    temp = temp.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    span.html(temp);

    var maxWidth = span.parent().width();
    var lastWidth = 0;
    var best = 0;

    for (var i = 0; i < temp.length; i ++) {
      if (temp[i] == ' ' || temp[i] == '>') {
        span.html(temp.substr(0, i));

        var curWidth = span.width();

        if (curWidth < maxWidth && curWidth != lastWidth) {
          best = i;
          lastWidth = curWidth;
        } else {
          span.html(temp.substr(0, best));
          div.html(temp.substr(best + 1));

          break;
        }
      }
    }
  }

  previewView.addEntry = function () {
    var div = $(_div);
    var collapseButton = $(_collapseButton);
    var dataDiv = $(_div);
    var previewSpan = $(_span);
    var divUid = getDivUID();

    collapseButton.attr("data-target", "#" + divUid);
    collapseButton.appendTo(div);

    dataDiv.css("padding-left", "10px");

    previewDataSpan.appendTo(dataDiv);
    dataDiv.appendTo(div);
    div.appendTo(preview);

    var collapseDataDiv = $(div);
    
    collapseDataDiv.attr("id", divUid);
    collapseDataDiv.attr("aria-expanded", true);
    collapseDataDiv.addClass("collapse");
    collapseDataDiv.addClass("in");
    collapseDataDiv.appendTo(dataDiv);

    splitData(data, previewDataSpan, collapseDataDiv);

    if (collapseDataDiv.html() == "") {
      collapseButton.css("visibility", "hidden");
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

  $("#preview").on("click", "button", function (event) {
    var button = $(event.target);

    if (button.attr("aria-expanded") == "true") {
      button.removeClass("fa-angle-down");
      button.addClass("fa-angle-right");
    } else {
      button.removeClass("fa-angle-right");
      button.addClass("fa-angle-down");
    }
  });
} (window.previewView = window.previewView || {}, jQuery));