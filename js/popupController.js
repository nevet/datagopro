var chosebutton;
var worker = new Worker("js/dataInfo.js");

function cancelClicked(e) {
  $("#popup").bPopup().close();
}

function chooseDataType(e) {
  clearData();
  chosebutton = e;
  var index = inputInfo.checkExistence(chosebutton);
  if (index >= 0) {
    preparePopup(index);
  };
  $("#popup").bPopup({
                speed: 300,
                transition: 'slideDown',
                transitionClose: 'fadeIn'
            });
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
  $("#anumber").addClass("selected").siblings().removeClass("selected");
  $("#number").css("display","block").siblings().css("display", "none");

  $("#numbertype")[0].selectedIndex = object.numberindex;
  $("#precision").val(object.precision);
  $("#min").val(object.numbermin);
  $("#max").val(object.numbermax);
  $("#repeatNumber").val(object.repeattime);
}

function prepareString(object) {
  $("#astring").addClass("selected").siblings().removeClass("selected");
  $("#string").css("display","block").siblings().css("display", "none");

  $("#stringlength").val(object.stringlength);
  $("#charset")[0].selectedIndex = object.chartype;
  $("#linelength").val(object.linelength);
  $("#linebreak").val(object.linebreak);
  $("#wordlength").val(object.wordlength);
  $("#wordbreak").val(object.wordbreak);
  $("#repeatString").val(object.repeattime);
}

function prepareGraph(object) {
  $("#agraph").addClass("selected").siblings().removeClass("selected");
  $("#graph").css("display","block").siblings().css("display", "none");
  
  $("#connect")[0].checked = object.isconnect;
  $("#direct")[0].checked = object.isdirect;
  $("#weight")[0].checked = object.isweighted;
  $("#tree")[0].checked = object.istree;
  $("#node").val(object.node);
  $("#edge").val(object.edge);
  $("#repeatGraph").val(object.repeattime);
}

function okclicked(e) {
  $("#popup").bPopup().close();

  var element = $(e);

  worker.onmessage = function(event) {
    preview.render(element, event.data);
    preview.endLoading();
  };

  switch (element.val()) {
    case "number":
      $(chosebutton).attr("value","Number");
      inputInfo.createNewInfo("number",chosebutton);
      changeInfoMessage("number");
      break;

    case "string":
      $(chosebutton).attr("value","String");
      inputInfo.createNewInfo("string", chosebutton);
      changeInfoMessage("string");
      break;

    case "graph":
      $(chosebutton).attr("value","Graph");
      inputInfo.createNewInfo("graph", chosebutton);
      changeInfoMessage("graph");
      break;

    default:
      break;
  }

  var obj = jQuery.extend({}, inputInfo.getLastElement());

  console.log(obj);
  obj.identifier = undefined;

  preview.startLoading();
  worker.postMessage({"cmd":"start", "data": JSON.stringify(obj)});

  element.html(string);
}

function changeInfoMessage(type) {
  var element = $(chosebutton).closest("div.data-block").find("#data-block-info");
  var object = inputInfo.getLastElement();
  var string = ""; 

  switch (type) {
    case "number":
      string = numberInfoMessage(object);
      break;

    case "string":
      string = stringInfoMessage(object);
      break;

    case "graph":
      string = graphInfoMessage(object);
      break;

    default:
      break;
  }
}

function numberInfoMessage(object) {
  var string = "<b>"+object.repeattime + " X ";

  switch (object.numbertype) {
    case "integer":
      string = string + "Integer</b>" + 
        " from " + object.numbermin + 
        " to " + object.numbermax;
      break;

    case "float":
      string = string + "Float</b>" + 
        " from " + object.numbermin + 
        " to " + object.numbermax + 
        " with precision " + object.precision;
      break;
  }

  return string;
}

function stringInfoMessage(object) {
  var string = "<b>"+object.repeattime + " X ";

  string = string + "String</b> with length of " + object.stringlength;

  return string;
}

function graphInfoMessage(object) {
  var string = "<b>"+object.repeattime + " X ";

  string = string + "Graph</b> with " + object.node + 
        " nodes and " + object.edge + " edges";

  return string;
}

function clearData() {
    $("#numbertype")[0].selectedIndex = 0;
    $("#precision").val("");
    $("#min").val("");
    $("#max").val("");
    $("#repeatNumber").val(1);

    $("#stringlength").val("");
    $("#charset")[0].selectedIndex = 0;
    $("#linelength").val("");
    $("#linebreak").val("");
    $("#wordlength").val("");
    $("#wordbreak").val("");
    $("#repeatString").val(1);

    $("#connect")[0].checked = false;
    $("#direct")[0].checked = false;
    $("#weight")[0].checked = false;
    $("#tree")[0].checked = false;
    $("#node").val("");
    $("#edge").val("");
    $("#repeatGraph").val(1);
  }
