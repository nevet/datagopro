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
				"padding": "20px",
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
			"text": "Add tags to manage your saved input.",
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
			}).appendTo(".tagbox");
			$("<a></a>", {
				"text": taglist[i],
				"click": function() {
					$(this).addClass("selected");
				},
			}).appendTo(".savewindow .label-size:last");
		}

		//create new tags
		$("<div></div>",{
			"class": "inputcontainer",
			"css": {
				"display": "none",
				"border": "1px solid #ccc",
			},
			"click": function(){
				$(".inputcontainer>input").trigger("focus");
			}
		}).appendTo(".savewindow");

		$("<div></div>", {
			"class": "created",
		}).appendTo(".inputcontainer");

		$("<input>", {
			"type": "text",
			"keydown": function(e){
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
				"padding-top": "8px",
			},
		}).appendTo(".savewindow");

		$("<i></i>", {
			"class": "fa fa-plus",
			"css": {
				"cursor": "pointer",
				"margin": "0 5px",
			},
			"click": function(e){
				$(".addtagcontainer").css("display", "none");
				$(".inputcontainer").css("display", "block");
				$(".inputcontainer>input").trigger("focus");
			},
		}).appendTo(".addtagcontainer");

		$("<p></p>", {
			"text": "Create new tags",
			"click": function(e){
				$(".addtagcontainer").css("display", "none");
				$(".inputcontainer").css("display", "block");
				$(".inputcontainer>input").trigger("focus");
			},
			"css": {
				"cursor": "pointer",
				"display": "inline",
			},
		}).appendTo(".addtagcontainer");

		//as private
        $("<div></div>", {
        	"class": "checkbox",
        	"css": {
        		"margin": "5px 0",
        	},
        }).appendTo(".savewindow");

        $("<label></label>",{
        	"for": "aspopular",
        	"html": "<input id='aspopular' type='checkbox'> This saved input will be private.",
        	"css": {
        		"margin": "0 0 0 5px",
        	}
        }).appendTo(".savewindow .checkbox");

        //ok and cancel
        $("<div></div>", {
        	"class": "buttoncontainer",
        }).appendTo(".savewindow");
        $("<button></button>", {
        	"id": "tagok",
        	"text": "OK",
        	"class": "btn btn-primary",
        	"click" : function(){
        		getTags();
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

function updateTags() {
	
}

function getTags() {
	var tags = [];
	var tagsInput = $(".tagbox .selected"); 
	for (var i=0; i<tagsInput.length; i++) {
		var tagString = $(tagsInput)[i].innerHTML;
		if (tags.indexOf(tagString) === -1) {
			tags.push(tagString);			
		}
	};

	tagsInput = $(".inputcontainer a");
	for (var i=0; i<tagsInput.length; i++) {
		var tagString = $(tagsInput)[i].innerHTML;
		if (tags.indexOf(tagString) === -1) {
			tags.push(tagString);			
		}
	};

	if (tags.length < 5) {
		tagsInput = $(".inputcontainer input");
		var tagString = $(tagsInput).val();
		if (tags.indexOf(tagString) === -1) {
			tags.push(tagString);			
		}
	}

  $(".savewindow").remove();
	$(".cover").remove();

	updateTags();
}