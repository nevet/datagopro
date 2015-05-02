(function (controller, $, undefined) {
  var latestNewDataPreview = null;

  function fbLogin() {
    view.startLoadingLogin();

    $.ajaxSetup({cache: true});
    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
      FB.init({
        appId: '1567423636871440',
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
        version: 'v2.3'
      });

      FB.getLoginStatus(function (res) {
        if (res.status == "connected") {
          FB.api('/me', function(response) {
            view.udpateLoginRegion(response.name);
            view.finishLoadingLogin();

            $("html").trigger("login", [response]);
          });
        } else {
          view.finishLoadingLogin();
        }
      });
    });
  }

  // after DOM is ready, do initial setup
  $(function () {
    fbLogin();

    view.init();
    dataSession.init();
  });

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
      $("#populartable").children().remove();
      $("#tag").children().not("h4").remove();
      createPopular();
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
      $("#timeline").children().remove();
      createTimeLine();
  });

  $(".navbar img").click(function(e) {
    $("#newdata").trigger("click");
  });
} (window.controller = window.controller || {}, jQuery));