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

  $(function () {
    fbLogin();
  });
} (window.controller = window.controller || {}, jQuery));