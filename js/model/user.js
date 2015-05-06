(function (user, $, undefined) {
  var profile = {"uid": undefined, "name": undefined, "email": undefined, "logintype": undefined, "sysid": undefined};
  var allDataSet = undefined;

  user.getProfile = function () {
    return profile;
  }

  user.getAllDataset = function (callback) {
    if (allDataSet) {
      callback(allDataSet);
    } else {
      $.get("/api/datasession.php", {"cmd": "retrieveUInp"}, function (res) {
        allDataSet = JSON.parse(res).data;

        for (var i = 0; i < allDataSet.length; i ++) {
          alldata[i].input = JSON.parse(allDataSet[i].input).replace(/\&quot\;/g, '\"');
        }

        callback(allDataSet);
      });
    }
  }

  $("html").on("login", function (event, res) {
    profile.uid = res.id;
    profile.name = res.name;
    profile.email = res.email;
    profile.logintype = "facebook";

    $.post("/api/login.php", {"cmd": "login", "name": res.name, "email": res.email, "type": "facebook"}, function (res) {
      var json = JSON.parse(res);

      if (json.status == "ok") {
        profile.sysid = json.sysid;
      }
    });
  });
} (window.user = window.user || {}, jQuery));