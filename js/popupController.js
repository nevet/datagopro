var chosebutton;

$(function () {
  $("#popup").hide();
});

function cancelClicked(e) {
  Popup.hide("popup");
}

function chooseDataType(e) {
  chosebutton = $(e);
  Popup.showModal("popup");
}

function okclicked(e) {
  Popup.hide("popup");
  var element = $(e);
  switch (element.val()) {
    case "number":
      chosebutton.attr("value","Number");
      break;

    case "string":
      chosebutton.attr("value","String");
      break;

    case "graph":
      chosebutton.attr("value","Graph");
      break;

    default:
      break;
  }
}