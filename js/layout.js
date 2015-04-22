$(function(){
  order=1;
  
	clearData();
	setHeights();
	$( window ).resize(function() {
		setHeights();
	});
	latestNewDataPreview = null;
	//navigation
	$("#newdata").on("click", function(e){
		var prev = $(".navbar-nav > li.active");
		if ($(prev.find("a")[0]).attr("id") == "newdata") {}
		else {
			if (prev.length == 0) {
				// timeline is displayed now
				$("#timeline").css("display", "none");
			}
			else if($(prev.find("a")[0]).attr("id") == "popularinput") {
				prev.removeClass();
				$("#popular").css("display", "none");
			}
			$(this).parent().addClass("active");
			$("#editor").css("display", "block");
			$("#preview").children().not(".previewLoadingCover").remove();
			if(latestNewDataPreview != null && latestNewDataPreview.length != 0) {
				$("#preview").append(latestNewDataPreview);
			}
		}
    $("#preview").css("font-family", "'Lucida Console',Monaco,monospace");
	});

	$("#popularinput").on("click", function(e){
		var prev = $(".navbar-nav > li.active");
		if (prev.length == 0) {
			// timeline is displayed now
			$("#timeline").css("display", "none");
			$(this).parent().addClass("active");
			$("#popular").css("display", "block");	
			$("#preview").children().not(".previewLoadingCover").remove();
		}
		else if($(prev.find("a")[0]).attr("id") == "newdata"){
			prev.removeClass();
			$("#editor").css("display", "none");
			$(this).parent().addClass("active");
			$("#popular").css("display", "block");	
			latestNewDataPreview = $("#preview").children().not(".previewLoadingCover").remove();
		}
    $("#preview").css("font-family", "inherit");
	});

	$("#myinput").on("click", function(e){
		var prev = $(".navbar-nav > li.active");
		if ($(prev.find("a")[0]).attr("id") == "popularinput") {
			prev.removeClass();
			$("#popular").css("display", "none");
			$("#timeline").css("display", "block");	
			$("#preview").children().not(".previewLoadingCover").remove();
		}
		else if($(prev.find("a")[0]).attr("id") == "newdata"){
			prev.removeClass();
			$("#editor").css("display", "none");
			$("#timeline").css("display", "block");	
			latestNewDataPreview = $("#preview").children().not(".previewLoadingCover").remove();
		}
   		$("#preview").css("font-family", "inherit");
	});

	$(".navbar img").click(function(e) {
		$("#newdata").trigger("click");
	});
	  	
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

	function setHeights() {
		if(document.documentElement.clientWidth > 768){
			//big screen
	  		var cHeight = document.documentElement.clientHeight;
	  		var np = 64/cHeight;
	  		//main body height
	  		var mbHeight = cHeight * (1-np);
	  		$("#mainbody").css("height", mbHeight+"px");
	  	}
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
    insertEntry(order);//group function.

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
  
  $(document).on("click", "#data-field .btn-delete",function(event){
    var dataBlock = $(this).closest(".data-block");
    inputInfo.removeElement(dataBlock.find("input")[0]);
        dataBlock.remove();

        deleteEntry(order);
        order --;

        renumberDatablocks();
  });

  $("#fbShare").on("click", function (e) {
    // TODO: need to revise this logic

    if (localStorage.dataSid) {
      // we logged in, all data has been pushed to server, and has been assigned
      // a data session id. In this case, we can share the input id directly
      $.get("tinyurl.php", {"id": localStorage.dataSid}, function (res) {
        var data = JSON.parse(res);

        if (data.status == "ok") {
          var tiny = data.url;
          var url = "https://www.facebook.com/sharer/sharer.php?u=" + tiny;
          
          window.open(url);
        }
      });
    } else
    if (localStorage.dataSession) {
      // upload to server with annoymous user, then use the return data session id
      // to get url
      $.post("datasession.php", {"cmd": "upload", "jsoninput": localStorage.dataSession}, function (res) {
        var data = JSON.parse(res);

        $.get("tinyurl.php", {"id": data.sid}, function (res) {
          var data = JSON.parse(res);

          if (data.status == "ok") {
            var tiny = data.url;
            var url = "https://www.facebook.com/sharer/sharer.php?u=" + tiny;
            
            // create a instant link
          }
        });
      });
    }

    e.preventDefault();
  });

  $("#setname").on("blur", function () {
    if (localStorage.dataSid) {
      // we are online, upload the session to server
      $.post("dataSession.php", {"cmd": "upload", "id": localStorage.dataSid, "setname": setName, "tags": ""}, function (res) {
        $("#notice").html("All changes saved");
      });
    } else {
      // we are offline, store the data in local storage
      localStorage.setName = setName;

      $("#notice").html("All changes saved locally");
    }
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
  $("#anumber").addClass("selected").siblings().removeClass("selected");
  $("#number").css("display","block").siblings().css("display", "none");
  
  $("#numbertype")[0].selectedIndex = 0;
  $("#permutation")[0].checked = false;
  $("#precision").val(3);
  $("#precisionDiv").hide();
  $("#min").val(0);
  $("#max").val(100);
  $("#repeatNumber").val(10);
  $("#parity")[0].selectedIndex = 0;
  $("#order")[0].selectedIndex = 0;
  correctHighlight($("#repeatNumber"));
  correctHighlight($("#max"));
  correctHighlight($("#min"));
  noErrorHighlight($("#precision"));

  $("#stringlength").val(100);
  $("#charset")[0].selectedIndex = 0;
  $("#case")[0].selectedIndex = 0;
  $("#hasnumber")[0].checked = false;
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
  $("#weightmin").val(1);
  $("#weightmax").val(1);
  $(".weightrange").css("display", "none");
  $("#tree")[0].checked = false;
  $("#node").val(10);
  $("#edge").val(90);
  $("#graphformat")[0].selectedIndex = 0;
  $("#repeatGraph").val(1);
  correctHighlight($("#repeatGraph"));
  correctHighlight($("#node"));
  correctHighlight($("#edge"));
  noErrorHighlight($("#weightmax"));
  noErrorHighlight($("#weightmin"));
}