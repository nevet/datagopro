(function (preview, $, undefined) {
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

  function splitData(data, preview, collapse) {
    var temp = data.toString();

    var index = 0;
    for (var i=0; i<data.length; i++) {
      if (i < 50 && data[i] == "\n") {break; } 
      if (i !=0 && i % 50 == 0) {
        temp = temp.substr(0, i+index) + " " + temp.substr(i+index+1);
        index++;
      }
    }

    temp = temp.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    console.log(temp);
    preview.html(temp);

    var maxWidth = preview.parent().width();
    var lastWidth = 0;
    var best = 0;

    for (var i = 0; i < temp.length; i ++) {
      if (temp[i] == ' ' || temp[i] == '>') {
        preview.html(temp.substr(0, i));

        var curWidth = preview.width();

        if (curWidth < maxWidth && curWidth != lastWidth) {
          best = i;
          lastWidth = curWidth;
        } else {
          preview.html(temp.substr(0, best));
          collapse.html(temp.substr(best + 1));

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

  preview.render = function (element, data) {
    var check = exist(element);
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
}) (window.preview = window.preview || {}, jQuery);