data = [1, [2, [3, 4, 5]], 6, 7];


function adjustTo(from) {
	var fromOption = $(from).find("option:selected"); 
	var fromEnd;
	if(fromOption.val() == "group") {
		fromEnd = fromOption.attr("ending");
	}
	else {
		fromEnd = $(fromOption).val();
	}
	$("#to option").show();
	var selectedTo = $("#to").find("option:selected");
	var needReSelect = false;
	for(var i = 0; i < data.length-1; i++) {
		var groupStart = findGroupStart(data[i+1]);
		if(groupStart <= fromEnd){
			$($("#to").children()[i]).hide();
			if(selectedTo.val() == $($("#to").children()[i]).val() 
				&& selectedTo.attr("start") == $($("#to").children()[i]).attr("start")) {
				needReSelect = true;
			}
		}
		else {
			if(needReSelect) {
				$("#to")[0].selectedIndex = i;
			}
			break;
		}
	}
}

function adjustFrom(to) {
	var toOption = $(to).find("option:selected"); 
	var toStart;

	if(toOption.val() == "group") {
		toStart = toOption.attr("start");
	}
	else {
		toStart = $(toOption).val();
	}
	$("#from option").show();
	var selectedFrom = $("#from").find("option:selected");
	var needReSelect = false;
	for(var i = data.length-2; i >= 0; i--) {
		var groupEnd = findGroupEnd(data[i]); 
		if(groupEnd >= toStart){
			$($("#from").children()[i]).hide();
			if(selectedFrom.val() == $($("#from").children()[i]).val() 
				&& selectedFrom.attr("start") == $($("#from").children()[i]).attr("start")) {
				needReSelect = true;
			}
		}
		else {
			if(needReSelect) {
				$("#from")[0].selectedIndex = i;
			}
			break;
		}
	}
}

function groupCancelled() {
	$("#grouppopup").bPopup().close();

}

function groupDone() {
	$("#grouppopup").bPopup().close();
	var from = getEndPoints("#from");	
	var to = getEndPoints("#to");

	group(from, to);//group logic functions - xudong
	var fromExp = createEndExpression(from);
	var toExp = createEndExpression(to);

	var repeatGroup = $("#repeatGroup").val();
	var position = (Array.isArray(to)) ? to[1]: to; // 1 base

	var group_info = $("<p></p>", {
		"class": "group-info",
		"html": "From: "+fromExp+" to: "+toExp+" repeat "+repeatGroup+" times.",
	});
	$($("#data-field").children()[position-1]).append(group_info);
}

function getEndPoints(container) {
	var value = $(container).val();
	if(value == "group") {
		var start = $(container).find("option:selected").attr("start");
		var end = $(container).find("option:selected").attr("ending");
		value = [start, end ];
	}
	return value;
}

function createEndExpression(value) {
	var exp;
	if (Array.isArray(value)) {
		var start = "<span class='fa-stack'>"
			+"<i class='fa fa-circle-thin fa-stack-2x'>"
			+"</i><i class='fa fa-stack-1x'>"
  			+value[0]+"</i></span>";
  		var end = "<span class='fa-stack'>"
			+"<i class='fa fa-circle-thin fa-stack-2x'>"
			+"</i><i class='fa fa-stack-1x'>"
  			+value[1]+"</i></span>";
  		exp = start+"~"+end;
	}
	else {
		exp = "<span class='fa-stack'>"
			+"<i class='fa fa-circle-thin fa-stack-2x'>"
			+"</i><i class='fa fa-stack-1x'>"
  			+value+"</i></span>";
	}
	return exp;
}

function findGroupStart(arr) {
	if (Array.isArray(arr)) {
		return findGroupStart(arr[0]);
	}
	else {
		return arr;
	}
}
function findGroupEnd(arr) {
	if (Array.isArray(arr)) {
		var last = arr.length - 1;
		return findGroupEnd(arr[last]);
	}
	else {
		return arr;
	}
}

$(function() {

	$(document).on("click","#groupbutton>i", function(){
	    $("#grouppopup").bPopup({ //uses jQuery easing plugin
	    speed: 500,
	    transition: 'slideDown',
	    transitionClose: 'slideUp'});
	    $("#from").children().remove();
	    $("#to").children().remove();
	    $("#repeatGroup").val("10");
	    fillFromTo();
	});
	function fillFromTo() {
		for(var i = 0; i < data.length; i++) {
			if(!Array.isArray(data[i])) {
				//a stand alone data
				if(i != data.length - 1) {
					addNumberOption(data[i], "#from");
				}
				if(i != 0) {
					addNumberOption(data[i], "#to");
				}
			}
			else {
				//a group
				var start = findGroupStart(data[i]);
				var end = findGroupEnd(data[i]);
				//console.log(end);
				if(i != data.length - 1) {
					addGroupOption(start, end, "#from");
				}
				if(i != 0) {
					addGroupOption(start, end, "#to");
				}
			}
		}
	}
	function addNumberOption(number, container) {
		$("<option></option>", {
			"value": number,
			"text": number,
		}).appendTo("#grouppopup "+container);
	}

	function addGroupOption(start, end, container) {
		$("<option></option>", {
			"value": "group",
			"start": start,
			"ending": end,
			"text": "("+start+"~"+end+")",
		}).appendTo("#grouppopup "+container);
	}


});

  
