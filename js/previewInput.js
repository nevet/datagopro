$(function() {

	var datasetName = "My first input";
	var userName = "My name";
	var tag1 = "first";
	var tag2 = "second";
	var tags = [ tag1, tag2 ];
	var dataEntry1 = {
      "datatype": "number",
      "parityindex": 1,
      "parity": "even",
      "numberindex" : 0,
      "numbertype": "integer",
      "floatprecision": "",
      "numbermin": 1,
      "numbermax": 100,
      "repeattime": 10,
    };
    var dataArray = [ dataEntry1 ];

    function createPopularBlock(){}

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

	$("#popular .popular-block").click(function(e){
		if($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		}
		else {
			var prev = $("#popular .popular-block.selected");
			prev.removeClass("selected");
			$(this).addClass("selected");
		}
	});
	$(".popular-block .view").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		var id = $(this).attr("data-target");
		viewDataSet(id);
	});
	$(".popular-block .clone").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		var id = $(this).attr("data-target");
		cloneDataSet(id);
	});

	$("div#mainbody .label-size a").click(function(e){
		e.stopPropagation();
		if($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		}
		else {
			$(this).addClass("selected");
		}
	});

	function viewDataSet(id) {
		
	}
});