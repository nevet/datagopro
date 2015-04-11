$(function(){
    	setHeights();
    	$( window ).resize(function() {
    		setHeights();
    	});
    	function setHeights() {
    		if(document.documentElement.scrollWidth > 768){
	    		var cHeight = document.documentElement.clientHeight;
	    		//console.log(cHeight);
	    		//banner height
	    		var bHeight = cHeight*13/100;
	    		$("#banner").css("height", bHeight+"px");
	    		//main body height
	    		var mbHeight = cHeight * 3/4;
	    		$("#mainbody").css("height", mbHeight+"px");
	    		//footer height
	    		var fHeight = cHeight*12/100;
	    		$("#footer").css("height", fHeight+"px");
	    		//timeline height
	    		tlHeight();
	    	}
    	}
	    $("#nav li>a").click(function(e){
	        e.preventDefault();
	        if (this.id != "mybutton") {
	        	console.log("fired!");
		        var prev = $("#nav li.active");
		        prev.removeClass();
		        $(this).parent().addClass("active");
		        $($(this).attr("data-target")).css("display", "block");
		        if ($(this).attr("data-target") == "#timeline") {
		        	tlHeight();
		        }
		        var sibling = $($(this).parent().siblings()[0]);
		        $($(prev.find("a")[0]).attr("data-target")).css("display", "none");
	        }
	        
	    });
	    function tlHeight() {
	    	var sHeight = document.getElementById("timeline").scrollHeight * 0.97;
	    	$('<style>#timeline:before{height:'+sHeight+'px}</style>').appendTo('head');
	    }
	    var order=1;
	    $("#add").click(function(e){
	    	e.preventDefault();
	    	order++;
	    	createData(order);
	    });
	    function createData(num) {
	    	$($("#data-field").children()[$("#data-field").children().length-1]).after($("<div class='data-block'><span class='order fa-stack'> <i class='fa fa-circle-thin fa-stack-2x'></i> <i class='fa fa-stack-1x'>"+num+"</i> </span> <div class='column'> <input class='btn btn-default' editable='false' readonly='on' placeholder='Data Type' onclick='chooseDataType(this)''> <i class='fa fa-folder-open'></i> </div></div>"));
		}
		$("#export li").click(function(e){
			if($(this).className==null) {
				var prev = $($(this).parent().find(".active"));
				prev.removeClass("active")
				$(this).addClass("active");
			}
			showExportSetting(prev.html().toLowerCase(), $(this).html().toLowerCase());
		});
		function showExportSetting(prev, type) {
			$("#"+prev).css("display", "none");
			$("#"+type).css("display", "block");
		}

		$(".timeline-block .view").click(function(e){
			e.preventDefault();
			var id = $(this).attr("data-target");
			viewDataSet(id);
		});
		function viewDataSet(id) {
			var dataset = ("<div class='data-set'><h3>This is data-set No."+id+"</h3><p>content of this data-set.</p></div>")
			$("#preview").html(dataset);
		}
	});