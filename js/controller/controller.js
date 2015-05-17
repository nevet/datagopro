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

    // $.post("/api/login.php", {"cmd": "session"}, function (res) {
    //   var json = JSON.parse(res);

    //   if (json.status == "tiny") {
    //     dataSession.load(json.sid);
    //   } else {
        dataSession.init();
        view.init();
        previewView.init();
    //   }
    // });
  });

  //navigation
  $("#newdata").on("click", function () {
    history.pushState({"toView": "editor"}, null, "/");
    view.switchToEditor();
  });

  $("#popularinput").on("click", function(e){
    history.pushState({"toView": "popinput"}, null, "popinput");
    view.switchToPopinput();
  });

  $("#myinput").on("click", function(e){
    history.pushState({"toView": "myinput"}, null, "myinput");
    view.switchToMyinput();
  });

  $(".navbar img").click(function(e) {
    $("#newdata").trigger("click");
  });

  // help
  $("#help").on("click", function (event) {
    var activeNav = $(".navbar-nav > li.active");
    var activeId = $(activeNav.find('a')[0]).attr("id");
    console.log(activeId);
    switch (activeId) {
      case "newdata":
        var logincss = $("#login").css("display");
        console.log(logincss);
        if (logincss == 'block') {
          $("#newdataguide>li.helplogin").attr("data-id", "login");
          $("#newdataguide>li.helplogin>div>p").html("Click here to log in through facebook or Google+.");
        } else {
          $(".helplogin").attr("data-id", "afterlogin");
          $("#newdataguide>li.helplogin>div>p").html("Click here to see your past input or log out.");
        }

        $('#newdataguide').joyride({
          autoStart: true,
          nubPosition: 'top',
          cookieMonster: false,
          modal: true,
          expose: true
        });
        break;
      case "popularinput":

        $('#popularguide').joyride({
          autoStart: true,
          nubPosition: 'top',
          cookieMonster: false,
          modal: true,
          expose: true
        });
        break;
      case "help":
        break;
      case "login":
        break;
    }
  });

  // history
  $(window).on("popstate", function (event) {
    var state = event.originalEvent.state;
    
    if (state == undefined || state.toView == "editor") {
      view.switchToEditor();
    } else
    if (state && state.toView == "myinput") {
      view.switchToMyinput();
    } else
    if (state && state.toView == "popinput") {
      view.switchToPopinput();
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

  // add tag
  $("#add-tags").on("click", function (event) {
    event.preventDefault();

    view.showTags();
  });
} (window.controller = window.controller || {}, jQuery));

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}