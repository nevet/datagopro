var chosebutton;

$("#popup").hide();
$("#precisionDiv").hide();

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
    $("#precisionDiv").show();
  } else {
    $("#precisionDiv").hide();
  }
}

function okclicked(e) {
  $("#popup").bPopup().close();
  var element = $(e);
  switch (element.val()) {
    case "number":
      chosebutton.attr("value","Number");
      inputInfo.createNewInfo(element);
      break;

    case "string":
      chosebutton.attr("value","String");
      inputInfo.createNewInfo(element);
      break;

    case "graph":
      chosebutton.attr("value","Graph");
      inputInfo.createNewInfo(element);
      break;

    default:
      break;
  }
}