$(function () {
  $("#popup").hide();
});

function chooseDataType(e) {
  Popup.showModal("popup");
  console.log(e);
}

function okclicked(e) {
  Popup.hide("popup");
  console.log(e);
  var element = $(e);
  switch (element.val()) {
    case "number":
      console.log("number");
      break;

    case "string":
      console.log("string");
      break;

    case "graph":
      console.log("graph");
      break;

    default:
      break;
  }
}