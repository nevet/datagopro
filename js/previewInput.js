$(function() {

	var datasetName = "My first input";
	var author = "My name";
	var createTime = "Sat Apr 04 2015 15:28:10";
	var tag1 = "first";
	var tag2 = "second";
	var tags = [ tag1, tag2 ];

    var dataArray = [{
	  "datatype": "number",
	  "parityindex": 1,
	  "parity": undefined,
	  "numberindex" :0,
	  "numbertype": "integer",
	  "floatprecision": "",
	  "numbermin": 10,
	  "numbermax": 20,
	  "repeattime": 10
	}, {
	  "datatype": "number",
	  "parityindex": 0,
	  "parity": undefined,
	  "numberindex" :1,
	  "numbertype": "float",
	  "floatprecision": 3,
	  "numbermin": 10,
	  "numbermax": 20,
	  "repeattime": 10
	}, {
	  "datatype": "string",
	  "stringlength": 100,
	  "chartype": "unicode",
	  "linelength": "",
	  "linebreak": "\n",
	  "wordlength":"",
	  "wordbreak": "",
	  "repeattime": 10
	}, {
	  "datatype": "graph",
	  "isconnect": true,
	  "isdirect": true,
	  "isweighted": false,
	  "isTree": false,
	  "node": 10,
	  "edge": 90,
	  "repeattime": 10
	}];
	
    function createPopularBlock(){
    	//block wrap
    	$("<div></div>", {
    		"class": "popular-block",
    		"click": function(e) {
    			highlightSelectedBlock("#popular", e);
    		}
    	}).appendTo("#populartable");

    	//dataset name
    	$("<h4></h4>", {
    		"text": datasetName,
    		"click": function(e) {
    			$('.popular-block').trigger('click');
    		},
    	}).appendTo("#populartable > .popular-block:last");

    	//author and created time
    	$("<p></p>", {
    		"html": "Author: "+author+"&nbsp;&nbsp;"+createTime,
    		"click": function(e) {
    			$('.popular-block').trigger('click');
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
				"click": function() {
					$(this).addClass("selected");
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
	    	}
	    }).appendTo("#populartable > .popular-block:last");

	    $("<i></i>", {
	    	"class": "fa fa-eye",
	    }).appendTo("#populartable > .popular-block:last .view:last");
	}

	createPopularBlock();
	// $("#timeline .timeline-block").click(function(e){
	// 	$(this).css("border-color", "#FFFAFA");
	// });

	// $(".timeline-block .view").click(function(e){
	// 	e.stopPropagation();
	// 	e.preventDefault();
	// 	var id = $(this).attr("data-target");
	// 	viewDataSet(id);
	// });
	// $(".timeline-block .clone").click(function(e){
	// 	e.stopPropagation();
	// 	e.preventDefault();
	// 	var id = $(this).attr("data-target");
	// 	var dataset = 
	// 	cloneDataSet(id);
	// });

	function highlightSelectedBlock(container, event){
		console.log(container+event);
		var block = event.target;
		if($(block).hasClass("selected")) {
			$(block).removeClass("selected");
		}
		else {
			var prev = $(container+" .popular-block.selected");
			prev.removeClass("selected");
			$(block).addClass("selected");
		}
	}

	$("div#mainbody .label-size a").click(function(e){
		e.stopPropagation();
		if($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		}
		else {
			$(this).addClass("selected");
		}
	});

	function viewDataSet(event) {
		for (var i = 0; i <= dataArray.length-1; i++) {

			var data = dataArray[i];
			console.log()
			//data-block
			$("<div></div>", {
				"class": "data-block",
			}).appendTo("#preview");

			// order
			$("<span></span>", {
				"class": "order fa-stack",
			}).appendTo("#preview .data-block:last");
			$("<i></i>", {
				"class": "fa fa-circle-thin fa-stack-2x",
			}).appendTo("#preview .data-block:last .order:last");
			$("<i></i>", {
				"class": "fa fa-stack-1x",
				"text": i+1,
			}).appendTo("#preview .data-block:last .order:last");

			//button
			$("<div></div>", {
				"class": "column",
			}).appendTo("#preview .data-block:last");

			$("<input>", {
				"class": "btn btn-default",
				"editable": "false",
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
				}
			}).appendTo("#preview .data-block:last .column");

			$("<i></i>", {
				"class": "fa fa-folder-open",
			}).appendTo("#preview .data-block:last .column");	

			//info span 
			var info_span = $("<span></span>", {
				"class": "data-block-info",
			});
			info_span.appendTo("#preview .data-block:last");
			changeInfoMessage(data.datatype, info_span, data);
		};
	}
	function cloneDataSet(event) {

	}
});