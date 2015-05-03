$(function(){  
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
});