(function (preview, $, undefined) {
  var display = $("#preview");
  var div = "<div></div>";
  var button = "<button class='dataCollapseButton fa fa-angle-down' data-toggle='collapse' aria-expanded='true'></button>"
  var previewPadding;

  var divs = [];
  var allData = [];

  function exist(element) {
    for (var i = 0; i < divs.length; i ++) {
      if (divs[i].identifier === element) {
        return [divs[i], i];
      }
    }

    return [undefined, -1];
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

  function splitData(data, preview, collapse) {
    data = data.replace(/(?:\r\n|\r|\n)/g, '<br />');
    preview.html(data);

    var maxWidth = preview.parent().width();
    var lastWidth = 0;
    var best = 0;

    for (var i = 0; i < data.length; i ++) {
      if (data[i] == ' ') {
        preview.html(data.substr(0, i));

        var curWidth = preview.width();

        // console.log(curWidth + " " + maxWidth + " " + lastWidth);

        if (curWidth < maxWidth && curWidth != lastWidth) {
          best = i;
          lastWidth = curWidth;
        } else {
          preview.html(data.substr(0, best));
          collapse.html(data.substr(best + 1));

          break;
        }
      }
    }
  }

  preview.getData = function (identifier) {
    for (var i = 0; i < divs.length; i ++) {
      if (divs[i].identifier === identifier) {
        return allData[i];
      }
    }
  }

  preview.getDivByIdentifier = function (identifier) {
    for (var i = 0; i < divs.length; i ++) {
      if (divs[i].identifier === identifier) {
        return [i, divs[i].div];
      }
    }
  }

  preview.getDivByIndex = function (index) {
    return divs[index].div;
  }

  preview.removeEntry = function (identifier) {
    for (var i = 0; i < divs.length; i ++) {
      if (divs[i].identifier === identifier) {
        divs[i].div.remove();
        divs.splice(i, 1);
        allData.splice(i, 1);

        break;
      }
    }
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
    var check = exist(element);
    console.log(check);
    var newDiv = check[0];
    var divId = getDivId();
    var collapseButton = $(button);
    var dataDiv = $(div);

    if (newDiv == undefined) {
      newDiv = $(div);
      newDiv.css("margin-top", "-20px");

      collapseButton.attr("data-target", "#" + divId);
      collapseButton.appendTo(newDiv);

      dataDiv.css("padding-left", "10px");

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
      allData.push(data);
    } else {
      newDiv = newDiv.div;
      collapseButton = $(newDiv).find("button");
      dataDiv = $(newDiv).children("div");
      dataDiv.html("");
      divId = check[0].divId;
      allData[check[1]] = data;
    }

    collapseButton.css("visibility", "visible");
    
    var previewDataSpan = $("<span></span>");
    
    previewDataSpan.appendTo(dataDiv);

    if (data.length == 0) {
      previewDataSpan.html("unspecified");
      return;
    }

    var collapseDataDiv = $(div);
    
    collapseDataDiv.attr("id", divId);
    collapseDataDiv.attr("aria-expanded", true);
    collapseDataDiv.addClass("collapse");
    collapseDataDiv.addClass("in");
    collapseDataDiv.appendTo(dataDiv);

    splitData(data, previewDataSpan, collapseDataDiv);

    if (collapseDataDiv.html() == "") {
      collapseButton.css("visibility", "hidden");
    }
  }

  $("#preview").on("click", "button", function () {
    var button = $(this);

    if (button.attr("aria-expanded") == "true") {
      button.removeClass("fa-angle-down");
      button.addClass("fa-angle-right");
    } else {
      button.removeClass("fa-angle-right");
      button.addClass("fa-angle-down");
    }
  });

  $("#generate button").on("click", function () {
    if (allData.length) {
      var output = "";

      for (var i = 0; i < allData.length; i ++) {
        output += allData[i];
      }
      
      save(output);
    } else {
      alert("There's no input so far!");
    }
  });
}) (window.preview = window.preview || {}, jQuery);