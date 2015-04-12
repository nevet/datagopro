$(function() {
	$('[data-toggle="tooltip"]').tooltip(); 
	$("div.tabcontents>i").on("click", function(e) {
		var content = getActiveContent();
		if (content.attr("id") == "number") {
			numberHelp(content);
		}
		else if (content.attr("id") == "string") {
			stringHelp(content);
		}
		else if (content.attr("id") == "graph") {
			graphHelp(content);
		}
		else {
			console.log(content.attr("id"));
		}
	});
	function getActiveContent() {
		var tabName = $("ul.tabs>li.selected").attr("id");
		var content;
		switch (tabName){
			case "anumber":
				content = "number";
				break;
			case "astring":
				content = "string";
				break;
			case "agraph":
				content = "graph";
				break;
			default:
				break;
		}
		return $("div.tabcontents>#"+content);
	}
	function numberHelp(container){
		console.log("enter");
		$("#numbertype").css("border", "3px solid #51CBEE");
		$("#numbertype").tooltip("show");
		$("#numbertype").val("integer").trigger("change");	
		setTimeout(function(){
			$("#numbertype").val("float").trigger("change");
			setTimeout( function(){
				$("#numbertype").tooltip("hide");
				$("#numbertype").css("border", "1px solid #ccc");
				$("#precision").css("border", "3px solid #51CBEE");
				$("#precision").parent().tooltip("show");
				setTimeout( function(){
					$("#precision").parent().tooltip("hide");
					$("#precision").css("border", "1px solid #ccc");
					$("#min").css("border", "3px solid #51CBEE");
					$("#max").css("border", "3px solid #51CBEE");
					$("#min").parent().parent().tooltip("show");
					setTimeout( function(){
						$("#min").css("border", "1px solid #ccc");
						$("#max").css("border", "1px solid #ccc");
						$("#min").parent().parent().tooltip("hide");
						container.find(".fa-angle-double-down").css("border", "3px solid #51CBEE");
						container.find(".fa-angle-double-down").tooltip("show");
						container.find(".fa-angle-double-down").trigger("click");
						setTimeout( function(){
							container.find(".fa-angle-double-up").tooltip("hide");
							$("#parity").tooltip("show");
							$("#numbertype").css("border", "3px solid #51CBEE");
							$("#numbertype").val("integer").trigger("change");
							setTimeout( function(){
								$("#numbertype").css("border", "1px solid #ccc");
								$("#parity").css("border", "3px solid #51CBEE");
								$("#parity").val("even").trigger("change");
								setTimeout( function(){
									$("#parity").val("odd").trigger("change");
									$("#parity").tooltip("hide");
									setTimeout( function(){
										$("#parity").val("").trigger("change");
										$("#parity").css("border", "1px solid #ccc");
										container.find(".fa-angle-double-up").css("border", "");
										container.find(".fa-angle-double-up").trigger("click");
										$("#numbertype").val("").trigger("change");
									},1500);
								},1500);
							},1500);
						},2000);
					},1500);
				},1500);
			},1500);
		},1500);
	}
	function stringHelp(container){

		$("#stringlength").css("border", "3px solid #51CBEE");
		$("#stringlength").parent().tooltip("show");
		setTimeout( function(){
			$("#stringlength").parent().tooltip("hide");
			$("#stringlength").css("border", "1px solid #ccc");
			$("#charset").css("border", "3px solid #51CBEE");
			$("#charset").tooltip("show");
			setTimeout( function(){
				$("#charset").css("border", "1px solid #ccc");
				$("#charset").tooltip("hide");
				container.find(".fa-angle-double-down").css("border", "3px solid #51CBEE");
				container.find(".fa-angle-double-down").tooltip("show");
				container.find(".fa-angle-double-down").trigger("click");
				setTimeout( function(){
					container.find(".fa-angle-double-up").css("border", "");
					container.find(".fa-angle-double-up").tooltip("hide");
					$("#linelength").css("border", "3px solid #51CBEE");
					$("#linelength").parent().tooltip("show");
					setTimeout( function(){
						$("#linelength").css("border", "1px solid #ccc");
						$("#linelength").parent().tooltip("hide");
						$("#linebreak").css("border", "3px solid #51CBEE");
						$("#linebreak").parent().tooltip("show");
						setTimeout( function(){
							$("#linebreak").css("border", "1px solid #ccc");
							$("#linebreak").parent().tooltip("hide");
							$("#wordlength").css("border", "3px solid #51CBEE");
							$("#wordlength").parent().tooltip("show");
							setTimeout( function(){
								$("#wordlength").css("border", "1px solid #ccc");
								$("#wordlength").parent().tooltip("hide");
								$("#wordbreak").css("border", "3px solid #51CBEE");
								$("#wordbreak").parent().tooltip("show");
								setTimeout( function(){
									$("#wordbreak").css("border", "1px solid #ccc");
									$("#wordbreak").parent().tooltip("hide");
									container.find(".fa-angle-double-up").trigger("click");
								},1500);
							},1500);
						},1500);
					},1500);
				},1500);
			},1500);
		},1500);
	}
	function graphHelp(container){
		$("#node").css("border", "3px solid #51CBEE");
		$("#node").parent().tooltip("show");
		setTimeout( function(){
			$("#node").css("border", "1px solid #ccc");
			$("#node").parent().tooltip("hide");
			$("#direct").css("border", "3px solid #51CBEE");
			$("#direct").parent().tooltip("show");
			setTimeout( function(){
				$("#direct").css("border", "1px solid #ccc");
				$("#direct").parent().tooltip("hide");
				$("#weight").css("border", "3px solid #51CBEE");
				$("#weight").parent().tooltip("show");
				
				setTimeout( function(){
					$("#weight").trigger("click");
					$("#weight").css("border", "1px solid #ccc");
					$("#weight").parent().tooltip("hide");
					$("#weightmin").css("border", "3px solid #51CBEE");
					$("#weightmax").css("border", "3px solid #51CBEE");
					$("#weightmin").parent().parent().tooltip("show");
					setTimeout( function(){
						$("#weightmin").parent().parent().tooltip("hide");
						$("#weightmin").css("border", "1px solid #ccc");
						$("#weightmax").css("border", "1px solid #ccc");
						$("#edge").css("border", "3px solid #51CBEE");
						$("#edge").parent().tooltip("show");
						setTimeout( function(){
							$("#edge").css("border", "1px solid #ccc");
							$("#edge").parent().tooltip("hide");
							$("#connect").css("border", "3px solid #51CBEE");
							$("#connect").parent().tooltip("show");
							setTimeout( function(){
								$("#connect").css("border", "1px solid #ccc");
								$("#connect").parent().tooltip("hide");
								$("#tree").css("border", "3px solid #51CBEE");
								$("#tree").parent().tooltip("show");
								setTimeout( function(){
									$("#tree").css("border", "1px solid #ccc");
									$("#tree").parent().tooltip("hide");
									$("#weight").trigger("click");
									
								},1500);
							},1500);
						},1500);
					},1500);
				},1500);
			},1500);
		},1500);
	}
});