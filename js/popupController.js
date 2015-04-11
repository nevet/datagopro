var chosebutton;

$(function () {
  $("#popup").hide();
  $("#precision").hide();
});

function cancelClicked(e) {
  $("#popup").bPopup().close();
}

function chooseDataType(e) {
  chosebutton = $(e);
  $("#popup").bPopup();
}

function numberChanged(e) {
  var element = $(e);
  if (element.val() == "float") {
    $("#precision").show();
  } else {
    $("#precision").hide();
  }
}

function okclicked(e) {
  $("#popup").bPopup().close();
  var element = $(e);
  switch (element.val()) {
    case "number":
      chosebutton.attr("value","Number");
      inputInfo.createNewInfo("number");
      break;

    case "string":
      chosebutton.attr("value","String");
      inputInfo.createNewInfo("string");
      break;

    case "graph":
      chosebutton.attr("value","Graph");
      inputInfo.createNewInfo("graph");
      break;

    default:
      break;
  }
}