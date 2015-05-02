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

  $("#fbShare").on("click", function (e) {
    // TODO: need to revise this logic

    if (localStorage.dataSid) {
      // we logged in, all data has been pushed to server, and has been assigned
      // a data session id. In this case, we can share the input id directly
      $.get("/api/tinyurl.php", {"id": localStorage.dataSid}, function (res) {
        var data = JSON.parse(res);

        if (data.status == "ok") {
          var tiny = data.url;
          var url = "https://www.facebook.com/sharer/sharer.php?u=" + tiny;
          
          window.open(url);
        }
      });
    } else {
      // upload to server with annoymous user, then use the return data session id
      // to get url
      $.post("/api/datasession.php", {"cmd": "upload", "jsoninput": localStorage.dataSession}, function (res) {
        var data = JSON.parse(res);

        $.get("/api/tinyurl.php", {"id": data.sid}, function (res) {
          var data = JSON.parse(res);

          if (data.status == "ok") {
            var tiny = data.url;
            var url = "https://www.facebook.com/sharer/sharer.php?u=" + tiny;
            
            window.open(url);
          }
        });
      });
    }

    e.preventDefault();
  });

  $("#data-field").on("mouseenter", ".data-block-info .fa-stack", function () {
    var corresPreviewDiv = preview.getDivByIndex(parseInt($(this).find(".fa-stack-1x").html()) - 1);
    corresPreviewDiv.find("span").addClass("glowSpan");
  }).on("mouseleave", ".data-block-info .fa-stack", function () {
    var corresPreviewDiv = preview.getDivByIndex(parseInt($(this).find(".fa-stack-1x").html()) - 1);
    corresPreviewDiv.find("span").removeClass("glowSpan");
  });
});