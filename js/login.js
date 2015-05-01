function uploadLocalSession() {
  // unuploaded session will be uploaded once user logged in
  inputInfo.saveSession();
  localStorage.setName = $("#setName").val();

  $.post("/api/datasession.php", {"cmd": "upload", "jsoninput": localStorage.dataSession, "setname": localStorage.setName}, function (res) {
    var data = JSON.parse(res);

    if (data.status == "ok") {
      localStorage.dataSid = data.sid;
      $("#notice").html("All changes saved");
    }
  });
}

function fb_login() {
  FB.login(function(response) {
    if (response.authResponse) {
      access_token = response.authResponse.accessToken; //get access token
      var user_id = response.authResponse.userID; //get FB UID

      FB.api('/me', function(response) {
        useremail = response.email;
        username = response.name;
        logintype = "facebook";

        data = {"name": username, "email": useremail, "type": logintype, "posttype": "login"};
        startLoadingLogin();

        $.post("/api/login.php", data, function (res) {
          if (res.status == "ok") {
            udpateLoginRegion(username);
            finishLoadingLogin();
            uploadLocalSession();
          } else {
            alert(res.msg);
          }
        }, "json");
      });
    } else {
      //user hit cancel button
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {
    scope: 'publish_stream,email'
  });
}

function facebook_logout() {
  FB.logout(function(response) {});
}

//google login functions
// (function() {
//   var po = document.createElement('script');
//   po.type = 'text/javascript';
//   po.async = true;
//   po.src = 'https://apis.google.com/js/client.js?onload=onLoadCallback';
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(po, s);
// })();

function onLoadCallback() {
  gapi.client.setApiKey('AIzaSyBjLBRfKdgND__xGZaY6z4SBltIxf1fXq8'); //set your API KEY
  gapi.client.load('plus', 'v1', function() {}); //Load Google + API
}

function google_login() {
  var myParams = {
    'clientid': '980224079160-bmsd1d9rpiatcfguc987a32appn6j58k.apps.googleusercontent.com', //You need to set client id
    'cookiepolicy': 'single_host_origin',
    'callback': 'loginCallback', //callback function
    'approvalprompt': 'force',
    'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
  };
  gapi.auth.signIn(myParams);
}

function loginCallback(result) {
  if (result['status']['signed_in']) {
    var request = gapi.client.plus.people.get({
      'userId': 'me'
    });
    request.execute(function(resp) {
      if (resp['emails']) {
        for (i = 0; i < resp['emails'].length; i++) {
          if (resp['emails'][i]['type'] == 'account') {
            useremail = resp['emails'][i]['value'];
          }
        }
      }

      //var str = "Name:" + resp['displayName'] + "<br>";
      // str += "<img src='" + resp['image']['url'] + "' /><br>";
      //str += "Email:" + email + "<br>";
      username = resp['displayName']
      $("span#profile").html("Welcome, " + username + "!");
      $("#login").css("display", "none");
      $("#afterlogin").css("display", "");
      logintype = "google";
      var bPopup = $("#element_to_pop_up").bPopup();
      bPopup.close({
        transitionClose: 'slideUp'
      });



      var postdata = {};
      postdata["name"] = username;
      postdata["email"] = useremail;
      postdata["type"] = logintype;
      postdata["posttype"] = "login";
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "/api/login.php", //Relative or absolute path to response.php file
        data: postdata,
        success: function(data) {
          var returndata = data["json"];
          console.log(returndata);
        }
      });

    });
  }
}

function google_logout() {
  gapi.auth.signOut();
}

$(document).ready(function() {
  // on every load, clear data stored in local storage for SIMPLICITY!! need to
  // be handled carefully if have time
  localStorage.clear();

  // $.post("/api/login.php", {"posttype": "session"}, function (res) {
  //   var data = JSON.parse(res);
    
  //   if (data.status == "tiny") {
  //     finishLoadingLogin();
  //     localStorage.dataSid = data.id;

  //     $.get("/api/datasession.php", {"cmd": "retrieveInp", "id": data.id}, function (res) {
  //       var data = JSON.parse(res).data;
  //       var input = data.input.replace(/(?:&quot;)/g, '\"');
  //       input = JSON.parse(input);
  //       $("#data-field").children().remove();
  //       insertDataSet("#data-field", input);
  //     });
  //   } else
  //   if (data.status == "return") {
  //     udpateLoginRegion(data.username);
  //     username = data.username;
  //     finishLoadingLogin();
  //     uploadLocalSession();
  //   } else {
  //     finishLoadingLogin();
  //     popupLoginOptions(true);
  //   }
  // });
});

$(document).on("click", "#login", function(event) {
  popupLoginOptions(false);
});

$(document).on('click', '#logclose', function(event) {
  event.preventDefault();
  var bPopup = $("#element_to_pop_up").bPopup();
  bPopup.close({
    transitionClose: 'slideUp'
  });
});

$(document).on("click", "#logout", function(event) {
  event.preventDefault();
  if (logintype == "google") {
    google_logout();
    $("span#profile").html("");
    $("#login").css("display", "");
    $("#afterlogin").css("display", "none");
  } else {
    facebook_logout();
    $("span#profile").html("");
    $("#login").css("display", "");
    $("#afterlogin").css("display", "none");
  }

  
  var postdata = {};
  postdata["logintype"] = "logout";
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/api/login.php", //Relative or absolute path to response.php file
    data: postdata
  });

  logintype = undefined;
  useremail = undefined;
  username = undefined;
});