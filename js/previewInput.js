var datasetName = "My first input";
var author = "My name";
var createTime = "Sat Apr 04 2015 15:28:10";
var tag1 = "first";
var tag2 = "second";
var tags = [ tag1, tag2 ];
var allTags = ["1", "2", "3", "4", "5", "6", "7"];
var worker = new Worker("js/dataInfo.js");

// var dataArray = [{
//   "datatype": "number",
//   "parityindex": 1,
//   "parity": undefined,
//   "numberindex" :0,
//   "numbertype": "integer",
//   "floatprecision": "",
//   "numbermin": 10,
//   "numbermax": 20,
//   "repeattime": 20
// }, {
//   "datatype": "number",
//   "parityindex": 0,
//   "parity": undefined,
//   "numberindex" :1,
//   "numbertype": "float",
//   "floatprecision": 3,
//   "numbermin": -30,
//   "numbermax": 30,
//   "repeattime": 30
// }, {
//   "datatype": "string",
//   "stringlength": 200,
//   "chartype": "unicode",
//   "linelength": "",
//   "linebreak": "\\n",
//   "wordlength":"",
//   "wordbreak": "",
//   "repeattime": 11
// }, {
//   "datatype": "graph",
//   "isconnect": true,
//   "isdirect": true,
//   "isweighted": false,
//   "isTree": false,
//   "node": 5,
//   "edge": 7,
//   "repeattime": 2
// }];

var alldata = [];

function createPopularBlock(){
	//block wrap
	$("<div></div>", {
		"class": "popular-block",
		"click": function(e) {
			highlightSelectedBlock("#popular .popular-block", $(e.target).closest(".popular-block"));
		},
	}).appendTo("#populartable");

	//dataset name
	$("<h4></h4>", {
		"text": datasetName,
		"click": function(e) {
			e.stopPropagation();
			$(this).closest('.popular-block').trigger('click');
		},
	}).appendTo("#populartable > .popular-block:last");

	//author and created time
	$("<p></p>", {
		"html": "Author: "+author+"&nbsp;&nbsp;"+createTime,
		"click": function(e) {
			e.stopPropagation();
			$(this).closest('.popular-block').trigger('click');
		},
	}).appendTo("#populartable > .popular-block:last");

	//tags
	$("<i></i>",{
		"class": "fa fa-tags fa-2x",
	}).appendTo("#populartable > .popular-block:last");

	for (var i=0; i < tags.length; i++){
		$("<span></span>", {
		"class": "label-size",
		}).appendTo("#populartable > .popular-block:last");

		$("<a></a>", {
			"text": tags[i],
			"click": function(e) {
    		e.stopPropagation();
    	},
		}).appendTo("#populartable > .popular-block:last .label-size:last");
  }

  //clone
  $("<a></a>",{
  	"class":"clone",
  	"data-target": "1",
  	"text": "Clone",
  	"click": function(e){
  		e.stopPropagation();
		e.preventDefault();
  		cloneDataSet(e);
  	},
  }).appendTo("#populartable > .popular-block:last");

  $("<i></i>", {
  	"class": "fa fa-pencil",
  }).appendTo("#populartable > .popular-block:last .clone:last");

  //view
  $("<a></a>",{
  	"class":"view",
  	"data-target": "1",
  	"text": "View",
  	"click": function(e) {
  		e.stopPropagation();
		e.preventDefault();
  		viewDataSet(e);
  	},
  }).appendTo("#populartable > .popular-block:last");

  $("<i></i>", {
  	"class": "fa fa-eye",
  }).appendTo("#populartable > .popular-block:last .view:last");
}

function createTimelineBlock(datasetName, createTime, tags, dataArray){
	//block wrap
	$("<div></div>", {
		"class": "timeline-block",
		"click": function(e) {
			
		},
	}).appendTo("#timeline");

	//dot on timeline
	$("<div></div>", {
		"class": "timeline-dot",
	}).appendTo("#timeline .timeline-block:last");

	//content
	$("<div></div>", {
		"class": "timeline-content",
		"click": function(e) {
			highlightSelectedBlock("#timeline .timeline-content", $(e.target).closest(".timeline-content"));
		}
	}).appendTo("#timeline .timeline-block:last");


	//dataset name
	$("<h4></h4>", {
		"text": datasetName,
		"click": function(e) {
			e.stopPropagation();
			$(this).closest('.timeline-content').trigger('click');
		},
	}).appendTo("#timeline > .timeline-block:last > .timeline-content");

	//created time
	$("<p></p>", {
		"html": createTime,
		"click": function(e) {
			e.stopPropagation();
			$(this).closest('.timeline-content').trigger('click');
		},
	}).appendTo("#timeline > .timeline-block:last > .timeline-content");

	//tags
	$("<i></i>",{
		"class": "fa fa-tags fa-2x",
	}).appendTo("#timeline > .timeline-block:last > .timeline-content");

	for (var i=0; i < tags.length; i++){
		$("<span></span>", {
		  "class": "label-size",
		}).appendTo("#timeline > .timeline-block:last > .timeline-content");

		$("<a></a>", {
			"text": tags[i],
			"click": function(e) {
  			e.stopPropagation();
  		},
		}).appendTo("#timeline > .timeline-block:last .label-size:last");
  }

  //clone
  $("<a></a>",{
  	"class":"clone",
  	"data-target": "1",
  	"text": "Clone",
  	"click": function(e){
  		e.stopPropagation();
		e.preventDefault();
  		cloneDataSet(e);
  	},
  }).appendTo("#timeline > .timeline-block:last > .timeline-content");

  $("<i></i>", {
  	"class": "fa fa-pencil",
  }).appendTo("#timeline > .timeline-block:last .clone:last");

  //view
  $("<a></a>",{
  	"class":"view",
  	"data-target": "1",
  	"text": "View",
  	"click": function(e) {
  		e.stopPropagation();
		e.preventDefault();
  		viewDataSet(e);
  	}
  }).appendTo("#timeline > .timeline-block:last > .timeline-content");

  $("<i></i>", {
  	"class": "fa fa-eye",
  }).appendTo("#timeline > .timeline-block:last .view:last");
}

function createTimeLine() {
  $.get("datasession.php", {"cmd": "retrieveUInp"}, function (res) {
    var data = JSON.parse(res);

    alldata = data.data;

    for (var i = 0; i < alldata.length; i ++) {

      var input = alldata[i].input.replace(/(?:&quot;)/g, '\"');
      // console.log(input);
      input = JSON.parse(input);
      alldata[i].input = input;
      // console.log(input);
      createTimelineBlock(alldata[i].setname, alldata[i].date, alldata[i].tag, input);
    }
  });
}

function highlightSelectedBlock(container, block){

	if($(block).hasClass("selected")) {
		$(block).removeClass("selected");
	}
	else {
		var prev = $(container+".selected");
		prev.removeClass("selected");
		$(block).addClass("selected");
	}
}


function viewDataSet(event) {
  var curBlock = $(event.target).parents(".timeline-block");
  var curIndex = curBlock.parent().find(".timeline-block").index(curBlock);

	$("#preview").children().not(".previewLoadingCover").remove();
	insertDataSet("#preview", alldata[curIndex].input, event);
}

function insertDataSet(container, dataArray, event){
  var buttonArray = [];
  var index = 0;

  if(container != "#preview") {
	  preview.startLoading();
    inputInfo.clearInputList();
  }

  worker.onmessage = function(event) {
    preview.endLoading();
    preview.render(buttonArray[index++], event.data[0]);
  };

	for (var i = 0; i <= dataArray.length-1; i++) {
		var data = dataArray[i];
		//data-block
		$("<div></div>", {
			"class": "data-block",
		}).appendTo(container);

		// order
		$("<span></span>", {
			"class": "order fa-stack",
		}).appendTo(container+" .data-block:last");
		$("<i></i>", {
			"class": "fa fa-circle-thin fa-stack-2x",
		}).appendTo(container+" .data-block:last .order:last");
		$("<i></i>", {
			"class": "fa fa-stack-1x",
			"text": i+1,
		}).appendTo(container+" .data-block:last .order:last");

		//button
		$("<div></div>", {
			"class": "column",
		}).appendTo(container+" .data-block:last");

		if(container != "#preview") {
			var button = $("<input>", {
				"class": "btn btn-default",
				"editable": "true",
				"value": data.datatype,
				"data-index": i,
				"click": function(){
					$("#popup").bPopup({
		              speed: 300,
		              transition: 'slideDown',
		              transitionClose: 'fadeIn'
		            });
					chooseDataType(this);
				}
			}).appendTo(container+" .data-block:last .column");

			buttonArray.push(button[0]);
			inputInfo.insertData(button[0], dataArray[$(button).attr("data-index")]);
			
    		var obj = jQuery.extend({}, inputInfo.getLastElement());
			obj.identifier = undefined;

			// handle backreference case
			if (!obj.repeattime) {
				obj.repeattime = parseInt(preview.getData(obj.repeatref));
				obj.repeatref = undefined;
			}

			worker.postMessage({"cmd":"start", "data": JSON.stringify(obj)});
		}
		else {
			$("<input>", {
				"class": "btn btn-default",
				"editable": "true",
				"readonly": "on",
				"value": data.datatype,
				"data-index": i,
				"click": function(){
					$("#popup").bPopup({
		              speed: 300,
		              transition: 'slideDown',
		              transitionClose: 'fadeIn'
		            });
       				preparePopup(dataArray[$(this).attr("data-index")]);
		            $(".ok").hide();
		            $(".cancel").text("Back");
		            $("#popup input").attr("disabled", true);
		            $("#popup select").attr("disabled", true);
				}
			}).appendTo(container+" .data-block:last .column");
		}

		$("<i></i>", {
			"class": "fa fa-folder-open",
		}).appendTo(container+" .data-block:last .column");	

		//add delete button if cloned to the datafield
		if(container != "#preview") {
			$("<a></a>", {
				"class": "btn-delete",
			}).appendTo(container+" .data-block:last");
			$("<i></i>", {
				"class": "fa fa-trash-o fa-lg fa-delete",
			}).appendTo(container+" .data-block:last .btn-delete");
		}

		//info span 
		var info_span = $("<span></span>", {
			"class": "data-block-info",
		});
		info_span.appendTo(container+" .data-block:last");
		changeInfoMessage(data.datatype, info_span, data);
	};
}

function cloneDataSet(event) {
	latestNewDataPreview = null;
	$("#preview").children().not(".previewLoadingCover").remove();
	$("#newdata").trigger("click");
	$("#data-field").children().remove();
  
  var curBlock = $(event.target).parents(".timeline-block");
  var curIndex = curBlock.parent().find(".timeline-block").index(curBlock);

	insertDataSet("#data-field", alldata[curIndex].input, event);
  
  order = alldata[curIndex].input.length;
  grouparray=[];
  for (var i = 1; i <= order; i++) {
      grouparray.push(i);
  }
}

function showAllTags() {

	$("<a></a>", {
		"id": "show-all",
		"click": function(){
			//show all popular input
		}
	}).appendTo("#popular > #tag");
	for(var i=0; i<allTags.length-1; i++) {
		$("<span></span>", {
  		  "class": "label-size",
  		}).appendTo("#popular > #tag");

  		$("<a></a>", {
  			"text": tags[i],
  			"click": function(e) {
    			e.stopPropagation();
				var tag = $(e.target);
				if(tag.hasClass("selected")) {
					tag.removeClass("selected");
				}
				else {
					tag.addClass("selected");
				}
    		},
  		}).appendTo("#popular > #tag > .label-size:last");	
	}
	$("<a></a>", {
		"id": "filter",
		"click": function(){
			//filter input with selected tags
		}
	}).appendTo("#popular > #tag");
}
