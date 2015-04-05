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
      chosebutton.html("Number");
      break;

    case "string":
      chosebutton.html("String");
      break;

    case "graph":
      chosebutton.html("Graph");
      break;

    default:
      break;
  }
}