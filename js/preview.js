(function (preview, $, undefined) {
  var display = $("#preview");
  var div = "<div></div>";
  var button = "<button class='dataCollapseButton fa fa-angle-down' data-toggle='collapse' aria-expanded='true'></button>"
  var previewPadding;

  var divs = [];

  function exist(element) {
    for (var i = 0; i < divs; i ++) {
      if (divs[i].identifier === element) {
        var result = divs[i].div;
        divs.splice(i, 1);
        
        return result;
      }
    }

    return undefined;
  }

  function getDivId() {
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

  preview.startLoading = function () {
    display.removeClass("showContent");
    display.addClass("loading");
  }

  preview.endLoading = function () {
    display.addClass("showContent");
    display.removeClass("loading");
  }

  preview.render = function (element, data) {
    var newDiv = exist(element);
    var divId = getDivId();

    if (newDiv == undefined) {
      newDiv = $(div);
    }

    newDiv.css("margin-top", "-20px");

    var newButton = $(button);

    newButton.attr("data-target", "#" + divId);
    newButton.appendTo(newDiv);

    var dataDiv = $(div);
    dataDiv.css("padding-left", "10px");

    if (data.length < 65) {
      newButton.css("visibility", "hidden");
      dataDiv.html(data);
    } else {
      var previewData = data.substr(0, 64);
      var previewDataSpan = $("<span></span>");
      
      previewDataSpan.css("font-family", "'Abel', sans-serif");
      previewDataSpan.html(previewData);
      previewDataSpan.appendTo(dataDiv);

      var collapseData = data.substr(65);
      var collapseDataDiv = $(div);
      
      collapseDataDiv.attr("id", divId);
      collapseDataDiv.attr("aria-expanded", true);
      collapseDataDiv.addClass("collapse");
      collapseDataDiv.addClass("in");
      collapseDataDiv.html(collapseData);
      collapseDataDiv.appendTo(dataDiv);
    }

    dataDiv.appendTo(newDiv);

    newDiv.appendTo(display);

    var object = {
      "identifier": element,
      "div": newDiv,
      "divId": divId
    }

    if (divs.length) {
      newDiv.css({
        "padding-top": "10px"
      });
    }

    divs.push(object);
  }

  $("#preview button").on("click", function () {
    var button = $(this);

    console.log(button.attr("aria-expanded"));

    if (button.attr("aria-expanded") == "true") {
      button.removeClass("fa-angle-down");
      button.addClass("fa-angle-right");
    } else {
      button.removeClass("fa-angle-right");
      button.addClass("fa-angle-down");
    }
  });
}) (window.preview = window.preview || {}, jQuery);