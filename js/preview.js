(function (preview, $, undefined) {
  var display = $("#preview");
  var div = "<div></div>";

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

  preview.startLoading = function () {
    display.addClass("loading");
  }

  preview.endLoading = function () {
    display.removeClass("loading");
  }

  preview.render = function (element, data) {
    var newDiv = exist(element);

    if (newDiv == undefined) {
      newDiv = $(div);
    }
    
    newDiv.html(data);
    newDiv.appendTo(display);

    var object = {
      "identifier": element,
      "div": newDiv
    }

    if (divs.length) {
      newDiv.css({
        "padding-top": 10
      });
    }

    divs.push(object);
  }
}) (window.preview = window.preview || {}, jQuery);