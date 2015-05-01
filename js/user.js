(function (user, $, undefined) {
  var profile = {"uid": undefined, "name": undefined, "email": undefined, "logintype": undefined};

  user.getDetails = function () {
    return profile;
  }

  $("html").on("login", function (event, res) {
    profile.uid = res.id;
    profile.name = res.name;
    profile.email = res.email;
    profile.logintype = "facebook";

    // update server
  });
} (window.user = window.user || {}, jQuery));