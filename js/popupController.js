var chosebutton;

$("#popup").hide();
$("#precisionDiv").hide();

function cancelClicked(e) {
  $("#popup").bPopup().close();
}

function chooseDataType(e) {
  chosebutton = e;
  var index = inputInfo.checkExistence(chosebutton);
  if (index >=0) {
    preparePopup(index);
  };
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

function preparePopup(index) {
  var object = inputInfo.getElement(index);
  switch (object.dataType) {
    case "number":
      prepareNumber(object);
      break;

    case "string":
      prepareString(object);
      break;

    case "graph":
      prepareGraph(object);
      break;

    default:
      break;
  }
}

function prepareNumber(object) {
  // $("#popup").tabs({selected: 0});
  document.getElementById("numbertype").selectedIndex = object.numbertype;
  $("#precision").val(object.precision);
  $("#min").val(object.min);
  $("#max").val(object.max);
  $("#repeatNumber").val(object.repeatNumber);
}

function prepareString(object) {
  // $("#popup").tabs({selected: 1});
  $("#stringlength").val(object.stringlength);
  document.getElementById("chartype").selectedIndex = object.chartype;
  $("#linelength").val(object.linelength);
  $("#linebreak").val(object.linebreak);
  $("#wordlength").val(object.wordlength);
  $("#wordbreak").val(object.wordbreak);
  $("#repeatString").val(object.repeatString);
}

function prepareGraph(object) {
  // $("#popup").tabs({selected: 2});
  document.getElementById("connect").selectedIndex= object.connect;
  document.getElementById("direct").selectedIndex = object.direct;
  $("#node").val(object.node);
  $("#edge").val(object.edge);
  $("#repeatGraph").val(object.repeatGraph);
}

function okclicked(e) {
  $("#popup").bPopup().close();
  var element = $(e);
  switch (element.val()) {
    case "number":
      $(chosebutton).attr("value","Number");
      inputInfo.createNewInfo("number",chosebutton);
      break;

    case "string":
      $(chosebutton).attr("value","String");
      inputInfo.createNewInfo("string", chosebutton);
      break;

    case "graph":
      $(chosebutton).attr("value","Graph");
      inputInfo.createNewInfo("graph", chosebutton);
      break;

    default:
      break;
  }
}