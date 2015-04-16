$(function(){
	clearData();
	setHeights();
	$( window ).resize(function() {
		setHeights();
	});
  // navigation
  $(".navbar-nav a").click(function(e){
    e.preventDefault();
    console.log(this.id);
    if(this.id == "newdata" || this.id=="popularinput" || this.id=="myinput") {
		var prev = $(".navbar-nav > li.active");
		prev.removeClass();
		$(this).parent().addClass("active");
		$($(prev.find("a")[0]).attr("data-target")).css("display", "none");
		$($(this).attr("data-target")).css("display", "block");
    }      
  });
  $("#myinput").click(function(e){
  		var prev = $("#nav li.active");
  		$($(prev.find("a")[0]).attr("data-target")).css("display", "none");
      	$($(this).attr("data-target")).css("display", "block");
  		tlHeight();
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
	  		console.log(cHeight);
	  		var np = 64/cHeight;
	  		//main body height
	  		var mbHeight = cHeight * (1-np);
	  		console.log(mbHeight);
	  		$("#mainbody").css("height", mbHeight+"px");
	  		//footer height
	  		// var fHeight = cHeight*(1-np-0.79);
	  		// $("#footer").css("height", fHeight+"px");
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

  	var datablock = $("<div class='data-block'><span class='order fa-stack'> <i class='fa fa-circle-thin fa-stack-2x'></i> <i class='fa fa-stack-1x'>"
  		+order+"</i> </span><div class='column'> <input class='btn btn-default' editable='false' readonly='on' placeholder='Data Type' onclick='chooseDataType(this)'>"+
      " <i class='fa fa-folder-open'></i> </div><a class='btn-delete' href='#'><i class='fa fa-trash-o fa-lg fa-delete'></i></a><span class='data-block-info'><span></div>");

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

	function renumberDatablocks() {
		var dataField = $("#data-field");
		var dataBlocks = dataField.find(".data-block");

		for (var i = 0; i < dataBlocks.length; i ++) {
			$(dataBlocks[i]).find(".fa-stack-1x").html(i + 1);
		}
	}

	var inDeleteIcon = undefined;

	$(document).on("click", "#data-field.fa-stack", function (event) {
		if (inDeleteIcon == undefined) {
			var icon = $(this).find(".fa-stack-1x");
		  var iconHtml = icon.html();
			icon.addClass("fa-times");
			icon.html("");

			inDeleteIcon = [icon, iconHtml];
			event.stopPropagation();
		} else {
			if ($(this).find(".fa-times").length) {
				// delete entry
				var dataBlock = $(this).closest(".data-block");

				inputInfo.removeElement(dataBlock.find("input")[0]);
				dataBlock.remove();

				order --;
				renumberDatablocks();
			} else {
				clearDeleteState(inDeleteIcon[0], inDeleteIcon[1]);
				inDeleteIcon = undefined;
			}
		}
	});

	$("body").on("click", function () {
		if (inDeleteIcon != undefined) {
			clearDeleteState(inDeleteIcon[0], inDeleteIcon[1]);
			inDeleteIcon = undefined;
		}
	});


  /*
   Delete functions and Select functions.
   */
  
  $(document).on("click", "#data-field .btn-delete",function(event){
    var dataBlock = $(this).closest(".data-block");
    inputInfo.removeElement(dataBlock.find("input")[0]);
        dataBlock.remove();

        order --;
        renumberDatablocks();

  });

  $("#data-field").on("mouseenter", ".data-block-info .fa-stack", function () {
    var corresPreviewDiv = preview.getDivByIndex(parseInt($(this).find(".fa-stack-1x").html()) - 1);
    corresPreviewDiv.find("span").addClass("glowSpan");
  }).on("mouseleave", ".data-block-info .fa-stack", function () {
    var corresPreviewDiv = preview.getDivByIndex(parseInt($(this).find(".fa-stack-1x").html()) - 1);
    corresPreviewDiv.find("span").removeClass("glowSpan");
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

	// auto click ok when enter key is pressed
	$("body").on("keypress", function (e) {
		// 
		if (!$("#popup[style*='block']").length) return;

		if (e.which == 13) {
			// find which tab are we in
			var tab = $(this).find("div[class*='container'][style*='block']").attr("id");
			var okButton = $(this).find("button[value='" + tab + "'][onclick*='ok']");
			 
			if (okButton) {
				okButton.click();
			}
		}
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
    correctHighlight($("#repeatNumber"));
    correctHighlight($("#max"));
    correctHighlight($("#min"));
    noErrorHighlight($("#precision"));

    $("#stringlength").val(100);
    $("#charset")[0].selectedIndex = 0;
    $("#linelength").val("");
    $("#linebreak").val("\\n");
    $("#wordlength").val("");
    $("#wordbreak").val("");
    $("#repeatString").val(10);
    correctHighlight($("#stringlength"));
    correctHighlight($("#repeatString"));

    $("#connect")[0].checked = true;
    $("#direct")[0].checked = true;
    $("#weight")[0].checked = false;
    $("#tree")[0].checked = false;
    $("#node").val(10);
    $("#edge").val(90);
    $("#repeatGraph").val(1);
    correctHighlight($("#repeatGraph"));
    correctHighlight($("#node"));
    correctHighlight($("#edge"));
}