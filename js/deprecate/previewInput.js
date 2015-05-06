function createPopularBlock(datasetName, createTime, tags, dataArray){
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
      var curBlock = $(e.target).parents(".popular-block");
      var curIndex = curBlock.parent().find(".popular-block").index(curBlock);
  		cloneDataSet(e, curIndex);
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
      var curBlock = $(e.target).parents(".popular-block");
      var curIndex = curBlock.parent().find(".popular-block").index(curBlock);
  		viewDataSet(e, curIndex);
  	},
  }).appendTo("#populartable > .popular-block:last");

  $("<i></i>", {
  	"class": "fa fa-eye",
  }).appendTo("#populartable > .popular-block:last .view:last");
}

function createPopular() {
  $.get("/api/datasession.php", {"cmd": "retrievePInp"}, function (res) {
    var data = JSON.parse(res);

    alldata = data.data;

    for (var i = 0; i < alldata.length; i ++) {

      var input = alldata[i].input.replace(/(?:&quot;)/g, '\"');
      // console.log(input);
      input = JSON.parse(input);
      alldata[i].input = input;
      // console.log(input);
      createPopularBlock(alldata[i].setname, alldata[i].date, alldata[i].tag, input);
    }
  });
}

function viewDataSet(event, curIndex) {
	$("#preview").children().not(".previewLoadingCover").remove();
	insertDataSet("#preview", alldata[curIndex].input, event);
}

function insertDataSet(container, dataArray){
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

function cloneDataSet(event, curIndex) {
	latestNewDataPreview = null;
	$("#preview").children().not(".previewLoadingCover").remove();
	$("#newdata").trigger("click");
	$("#data-field").children().remove();
  
  localStorage.dataSid = alldata[curIndex].id;

	insertDataSet("#data-field", alldata[curIndex].input);
  
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
