(function(){
        $(document).on("click", "#mybutton", function(event){
            event.preventDefault();
            $("#element_to_pop_up").bPopup({//uses jQuery easing plugin
                speed: 500,
                transition: 'slideDown',
                transitionClose: 'slideUp'
            });
        });


        $(document).ready(function(){

            if(localStorage.getItem('firstVisit')!='true'){   
                localStorage.setItem('firstVisit', 'true');
                $("#element_to_pop_up").bPopup({//uses jQuery easing plugin
                speed: 500,
                transition: 'slideDown',
                transitionClose: 'slideUp'
                });
            }
            else{}

        });

        $(document).on('click','#logclose',function(event){
            event.preventDefault();
            var bPopup = $("#element_to_pop_up").bPopup();
            bPopup.close({
               transitionClose: 'slideUp'
            });
        }); 
})();

var logintype = undefined;

//facebook log in
window.fbAsyncInit = function() {
        FB.init({
            appId   : '1567423636871440',
            oauth   : true,
            status  : true, // check login status
            cookie  : true, // enable cookies to allow the server to access the session
            xfbml   : true, // parse XFBML
            version    : 'v2.3'
        }); };

        (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

    function fb_login(){
    FB.login(function(response) {

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            var user_id = response.authResponse.userID; //get FB UID

            var bPopup = $("#element_to_pop_up").bPopup();
                bPopup.close({
                   transitionClose: 'slideUp'
                });

            FB.api('/me', function(response) {
                var user_email = response.email; 
                var user_name = response.name;
                logintype = "facebook";
                $("div#profile span").html("Welcome, "+user_name+"!");
                $("#mybutton").css("display","none");
                $("#logoutbutton").css("display",""); 
                $(".logininput").css("display","");             
            });

            

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
        }, {
        scope: 'publish_stream,email'
      });
    }   
    
    (function() {
        var e = document.createElement('script');
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        e.async = true;
        $('#fb-root').append(e);
    }());


    function facebook_logout(){
        FB.logout(function(response) { });
    }
  

//google login functions
    (function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client.js?onload=onLoadCallback';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();

     function onLoadCallback()
    {
        gapi.client.setApiKey('AIzaSyBjLBRfKdgND__xGZaY6z4SBltIxf1fXq8'); //set your API KEY
        gapi.client.load('plus', 'v1',function(){});//Load Google + API
    }

    function google_login() 
    {
      var myParams = {
        'clientid' : '980224079160-bmsd1d9rpiatcfguc987a32appn6j58k.apps.googleusercontent.com', //You need to set client id
        'cookiepolicy' : 'single_host_origin',
        'callback' : 'loginCallback', //callback function
        'approvalprompt':'force',
        'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
      };
      gapi.auth.signIn(myParams);
    }

    function loginCallback(result)
    {
        if(result['status']['signed_in'])
        { 
            var request = gapi.client.plus.people.get(
            {
                'userId': 'me'
            });
            request.execute(function (resp)
            {
                var email = '';
                if(resp['emails'])
                {
                    for(i = 0; i < resp['emails'].length; i++)
                    {
                        if(resp['emails'][i]['type'] == 'account')
                        {
                            email = resp['emails'][i]['value'];
                        }
                    }
                }
             
                //var str = "Name:" + resp['displayName'] + "<br>";
                // str += "<img src='" + resp['image']['url'] + "' /><br>";
                //str += "Email:" + email + "<br>";
                $("div#profile span").html("Welcome, "+resp['displayName']+"!");
                $("#mybutton").css("display","none");
                $("#logoutbutton").css("display","");
                $(".logininput").css("display","");
                logintype="google";
                var bPopup = $("#element_to_pop_up").bPopup();
                    bPopup.close({
                       transitionClose: 'slideUp'
                    });
            });
        }   
     
    }

    function google_logout()
    {
        gapi.auth.signOut();
    }

    $(document).on("click", "#logoutbutton", function(event){
            event.preventDefault();
            if (logintype=="google") {
                google_logout();
                $(".logininput").css("display","none");
                $("div#profile span").html("");
                $("#mybutton").css("display","");
                $("#logoutbutton").css("display","none");
            }
            else {
                facebook_logout();
                $(".logininput").css("display","none");
                $("div#profile span").html("");
                $("#mybutton").css("display","");
                $("#logoutbutton").css("display","none");
            }
    });


