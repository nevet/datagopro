(function (controller, $, undefined) {
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
    // fbLogin();

    $.post("/api/login.php", {"cmd": "session"}, function (res) {
      var json = JSON.parse(res);

      if (json.status == "tiny") {
        dataSession.load(json.sid);
      } else {
        dataSession.init();
        view.init();
        previewView.init();
      }
    });
  });

  //navigation
  $("#newdata").on("click", function () {
    history.pushState({"toView": "editor"}, null, "/");
    view.switchToEditor();
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

    $("#populartable").children().remove();
    $("#tag").children().not("h4").remove();
    createPopular();
  });

  $("#myinput").on("click", function(e){
    history.pushState({"toView": "myinput"}, null, "myinput");
    view.switchToMyinput();
  });

  $(".navbar img").click(function(e) {
    $("#newdata").trigger("click");
  });

  // history
  $(window).on("popstate", function (event) {
    var state = event.originalEvent.state;
    
    if (state == undefined || state.toView == "editor") {
      view.switchToEditor();
    } else
    if (state && state.toView == "myinput") {
      view.switchToMyinput();
    }
  });

  // sharing
  $("#fbShare").on("click", function (event) {
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

    event.preventDefault();
  });
} (window.controller = window.controller || {}, jQuery));

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}