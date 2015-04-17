$(function(){
	var taglist = ["tag1", "tag2", "tag3"];
	$("#save").click(function(e){
		e.preventDefault();
		var left = $(this).offset().left;
		var top = $(this).offset().top;
		var height = $(this).height();
		var width =  $(this).width();
		var x = left + width;
		var y = top + height/2;
		console.log(left+" "+top+" "+height+" "+width+" "+x+" "+y);
		createSaveWindow(x, y);
	});
	function createSaveWindow(x, y) {
		var cH = document.documentElement.clientHeight;
		var cW = document.documentElement.clientWidth;
		//cover
		$("<div></div>", {
			"class": "cover",
			"click" : function(){
		        $(".savewindow").remove();
				$(".cover").remove();
		    },
			"css": {
				"height": cH+"px",
				"width": cW+"px",
				"opacity": "0",
			},
		}).appendTo("body");
		//savewindow
		$("<div></div>", {
			"class": "savewindow",
			"css": {
				"position": "absolute",
				"z-index": "1",
				"left": (x+30)+"px",
				"top": (y-240)+"px",
			},
		}).appendTo("#editor");
		//close
		$("<i></i>", {
			"class": "fa fa-times",
			"css": {
				"position": "absolute",
				"left": 380+"px",
				"top": 5+"px",
				"cursor": "pointer",
			},
			"click" : function(){
		        $(".savewindow").remove();
				$(".cover").remove();
		    },
		}).appendTo(".savewindow");
		//header
		$("<h5></h5>", {
			"text": "Successfully saved!",
		}).appendTo(".savewindow");
		//info
		$("<div></div>", {
			"class": "info",
		}).appendTo(".savewindow");

		$("<i></i>", {
			"class": "fa fa-info-circle",
			"css": {
				"color": "#4E4E4E",
				"margin": "0 8px",
			},
		}).appendTo(".info");

		$("<p></p>", {
			"class": "message",
			"text": "Add tags to manage your input.",
			"css": {
				"color": "#4E4E4E",
				"display": "inline",
			},
		}).appendTo(".info");

		//tagbox
		$("<div></div>", {
			"class": "tagbox",
		}).appendTo(".savewindow");

		$("<span></span>", {
			"text": "Popular tags:",
			"css": {
				"float": "left",
				"width": "100px",
				"line-height": "34px",
			}
		}).appendTo(".tagbox");

		for (var i=0; i < taglist.length; i++){
			$("<span></span>", {
				"class": "label-size",
				"html": "<a>"+ taglist[i]+"</a>",
			}).appendTo(".tagbox");
		}

		//create new tags
		$("<div></div>",{
			"class": "inputcontainer",
			"css": {
				"display": "none",
				"border": "1px solid #ccc",
			}
		}).appendTo(".savewindow");

		$("<div></div>", {
			"class": "created",
		}).appendTo(".inputcontainer");

		$("<input>", {
			"type": "text",
			"keydown": function(e){
				console.log(e.which);
				var tagname = $(this).val().trim();
				if(e.which == 32) {
					
					this.value = "";
					if($(".created").children().length == 2) {
						$(".info").css("background-color", "#FFC8A5");
						$(".message").text("Only support creating 2 new tags at most.");
					}
					else if(tagname != "") {	
						$("<span></span>", {
							"class": "label-size",
							"html": "<a>"+ tagname+"</a>",
						}).appendTo(".created");					
					}		
				}
				else if(e.which == 127 || e.which == 8) {
					console.log($(".created").children());
					if(tagname == "") {
						$($(".created").children().last()).remove();
					}
				}
			},
		}).appendTo(".inputcontainer");

		//add button
		$("<div></div>", {
			"class": "addtagcontainer",
			"css": {
				"padding-top": "7px",
			},
		}).appendTo(".savewindow");

		$("<i></i>", {
			"class": "fa fa-plus",
			"css": {
				"cursor": "pointer",
				"margin": "0 5px",
			},
			"click": function(e){
				console.log(e);
				$(".addtagcontainer").css("display", "none");
				$(".inputcontainer").css("display", "block");
				$(".inputcontainer>input").trigger("focus");
			},
		}).appendTo(".addtagcontainer");

		$("<p></p>", {
			"text": "Create new tags",
			"click": function(e){
				console.log(e);
				$(".addtagcontainer").css("display", "none");
				$(".inputcontainer").css("display", "block");
				$(".inputcontainer>input").trigger("focus");
			},
			"css": {
				"cursor": "pointer",
				"display": "inline",
			},
		}).appendTo(".addtagcontainer");

		//as popular
        $("<div></div>", {
        	"class": "checkbox",
        	"css": {
        		"margin": "5px 0",
        	},
        }).appendTo(".savewindow");

        $("<label></label>",{
        	"for": "aspopular",
        	"html": "<input id='aspopular' type='checkbox'> Save as popular input",
        	"css": {
        		"margin": "0 0 0 5px",
        	}
        }).appendTo(".checkbox");

        //ok and cancel
        $("<div></div>", {
        	"class": "buttoncontainer",
        }).appendTo(".savewindow");
        $("<button></button>", {
        	"id": "tagok",
        	"text": "OK",
        	"class": "btn btn-primary",
        	"click" : function(){
		        $(".savewindow").remove();
				$(".cover").remove();
		    },
        }).appendTo(".buttoncontainer");

        $("<button></button>", {
        	"id": "tagcancel",
        	"text": "Cancel",
        	"class": "btn btn-danger",
        	"click" : function(){
		        $(".savewindow").remove();
				$(".cover").remove();
		    },
        }).appendTo(".buttoncontainer");
        
	}
});