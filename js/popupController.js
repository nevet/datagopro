var chosebutton;
var worker = new Worker("js/dataInfo.js");

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
  $("#popup").bPopup({
                speed: 500,
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

  $("#numbertype")[0].selectedIndex = object.numbertype;
  $("#precision").val(object.precision);
  $("#min").val(object.min);
  $("#max").val(object.max);
  $("#repeatNumber").val(object.repeatNumber);
}

function prepareString(object) {
  $("#astring").addClass("selected").siblings().removeClass("selected");
  $("#string").css("display","block").siblings().css("display", "none");

  $("#stringlength").val(object.stringlength);
  $("#chartset")[0].selectedIndex = object.chartype;
  $("#linelength").val(object.linelength);
  $("#linebreak").val(object.linebreak);
  $("#wordlength").val(object.wordlength);
  $("#wordbreak").val(object.wordbreak);
  $("#repeatString").val(object.repeatString);
}

function prepareGraph(object) {
  $("#agraph").addClass("selected").siblings().removeClass("selected");
  $("#graph").css("display","block").siblings().css("display", "none");
  
  $("#connect")[0].selectedIndex = object.connect;
  $("#direct")[0].selectedIndex = object.direct;
  $("#node").val(object.node);
  $("#edge").val(object.edge);
  $("#repeatGraph").val(object.repeatGraph);
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
      var obj = inputInfo.getLastElement();

      console.log(obj);
      obj.identifier = undefined;

      preview.startLoading();
      worker.postMessage({"cmd":"start", "data": JSON.stringify(obj)});

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
}

function changeInfoMessage(type) {
  var element = $(chosebutton).closest("div.data-block").find("#data-block-info");
  var object = inputInfo.getLastElement();
  console.log(object);
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

  element.html(string);
}

function numberInfoMessage(object) {
  var string = "<b>"+object.repeattime + " X </b>";

  string = string + object.numbertype + 
        " from " + object.numbermin + 
        " to " + object.numbermax;

  return string;
}

function stringInfoMessage(object) {
  var string = "<b>"+object.repeattime + " X </b>";

  string = string + "string with length of " + object.stringlength;

  return string;
}

function graphInfoMessage(object) {
  var string = "<b>"+object.repeattime + " X </b>";

  string = string + "graph with " + object.node + 
        " nodes and " + object.edge + " edges";

  return string;
}