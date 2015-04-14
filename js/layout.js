$(function(){
	clearData();
	setHeights();
	$( window ).resize(function() {
		setHeights();
	});
  // navigation
  $("#nav li>a").click(function(e){
    e.preventDefault();
    if (this.id != "mybutton" && this.id != "logoutbutton") {
    	console.log("fired!");
      var prev = $("#nav li.active");
      prev.removeClass();
      $(this).parent().addClass("active");
      $($(prev.find("a")[0]).attr("data-target")).css("display", "none");
      $($(this).attr("data-target")).css("display", "block");
      if ($(this).attr("data-target") == "#timeline") {
      	tlHeight();
      }
    }      
  });

  var order=1;
  $("#add>i").on("click", createData);
  $("#add>p").on("click", createData);
	$("#export li").click(function(e){
		if($(this).className==null) {
			var prev = $($(this).parent().find(".active"));
			prev.removeClass("active")
			$(this).addClass("active");
		}
		showExportSetting(prev.html().toLowerCase(), $(this).html().toLowerCase());
	});

	$(".timeline-block .view").click(function(e){
		e.preventDefault();
		var id = $(this).attr("data-target");
		viewDataSet(id);
	});

	function setHeights() {
		if(document.documentElement.clientWidth > 768){
			//big screen
  		var cHeight = document.documentElement.clientHeight;
  		//console.log(cHeight);
  		//banner height
  		var bHeight = cHeight*0.13;
  		$("#banner").css("height", bHeight+"px");
  		//main body height
  		var mbHeight = cHeight * 3/4;
  		console.log(mbHeight);
  		$("#mainbody").css("height", mbHeight+"px");
  		//footer height
  		var fHeight = cHeight*0.13;
  		$("#footer").css("height", fHeight+"px");
  		//timeline height
  		tlHeight();
  	}
	}

  function tlHeight() {
  	var sHeight = document.getElementById("timeline").scrollHeight * 0.97;
  	$('<style>#timeline:before{height:'+sHeight+'px}</style>').appendTo('head');
  }

  function createData(e) {
  	var dataField = $("#data-field");
  	var lastChild = dataField.children().last();
  	var lastInputButton = lastChild.find("input").last();
  	// the last one has not been specified, we need to add a place holder
  	// in preview
  	if (lastInputButton.val() == "") {
  		preview.render(lastInputButton[0], "");
  	}

  	order++;

  	var datablock = $("<div class='data-block'><a href='#'><span class='order fa-stack'> <i class='fa fa-circle-thin fa-stack-2x'></i> <i class='fa fa-stack-1x'>"
  		+order+"</i> </span></a> <div class='column'> <input class='btn btn-default' editable='false' readonly='on' placeholder='Data Type' onclick='chooseDataType(this)'> <i class='fa fa-folder-open'></i> </div><span id='data-block-info'><span></div>");

  	dataField.append(datablock);
		
		document.getElementById("data-field").scrollTop = document.getElementById("data-field").scrollHeight;

		datablock.find("input").trigger("click");
	}
	
	function showExportSetting(prev, type) {
		$("#"+prev).css("display", "none");
		$("#"+type).css("display", "block");
	}

	function viewDataSet(id) {
		var dataset = ("<div class='data-set'><h3>This is data-set No."+id+"</h3><p>content of this data-set.</p></div>")
		$("#preview").html(dataset);
	}

	function clearDeleteState(icon, iconHtml) {
		icon.html(iconHtml);
		icon.removeClass("fa-times");
	}

	var inDeleteIcon = undefined;

	$("#data-field").on("click", ".fa-stack", function (event) {
		if (inDeleteIcon == undefined) {
			var icon = $(this).find(".fa-stack-1x");
			var iconHtml = icon.html();
			icon.addClass("fa-times");
			icon.html("");

			inDeleteIcon = [icon, iconHtml];
			event.stopPropagation();
		} else {
			clearDeleteState(inDeleteIcon[0], inDeleteIcon[1]);
			inDeleteIcon = undefined;
		}
	});

	$("body").on("click", function () {
		if (inDeleteIcon != undefined) {
			clearDeleteState(inDeleteIcon[0], inDeleteIcon[1]);
			inDeleteIcon = undefined;
		}
	});

	// event listener for popup window
	$("#popup").on("click", ".fa-angle-double-down",function(e){
		e.preventDefault();
		$(this).closest(".container").find(".advanced").css("display","block");
		$(this).attr("class","fa fa-angle-double-up");
	});
	
	$("#popup").on("click", ".fa-angle-double-up", function(e){
		e.preventDefault();
		$(this).closest(".container").find(".advanced").css("display","none");
		$(this).attr("class","fa fa-angle-double-down");
	});

	$("#tree").click(function(e){
		if($(this).is(":checked")) {
			$(".nottree").css("display", "none");
		}
		else {
			$(".nottree").css("display", "block");
		}
	});

	$("#weight").click(function(e){
		if($(this).is(":checked")) {
			$(".weightrange").css("display", "block");
		}
		else {
			$(".weightrange").css("display", "none");
		}
	});
});

function clearData() {
    $("#numbertype")[0].selectedIndex = 0;
    $("#precision").val(3);
    $("#min").val(0);
    $("#max").val(100);
    $("#repeatNumber").val(10);
    $("#parity")[0].selectedIndex = 0;
    noErrorHighlight($("#repeatNumber"));
    noErrorHighlight($("#max"));
    noErrorHighlight($("#min"));
    noErrorHighlight($("#precision"));

    $("#stringlength").val(100);
    $("#charset")[0].selectedIndex = 0;
    $("#linelength").val("");
    $("#linebreak").val("\\n");
    $("#wordlength").val("");
    $("#wordbreak").val("");
    $("#repeatString").val(10);
    noErrorHighlight($("#stringlength"));
    noErrorHighlight($("#repeatString"));

    $("#connect")[0].checked = true;
    $("#direct")[0].checked = true;
    $("#weight")[0].checked = false;
    $("#tree")[0].checked = false;
    $("#node").val(10);
    $("#edge").val(90);
    $("#repeatGraph").val(1);
    noErrorHighlight($("#repeatGraph"));
    noErrorHighlight($("#node"));
    noErrorHighlight($("#edge"));
}