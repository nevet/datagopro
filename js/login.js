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
             $("#element_to_pop_up").bPopup({//uses jQuery easing plugin
                speed: 500,
                transition: 'slideDown',
                transitionClose: 'slideUp'
            });
        });

        $(document).on('click','#logclose',function(event){
            event.preventDefault();
            var bPopup = $("#element_to_pop_up").bPopup();
            bPopup.close({
               transitionClose: 'slideUp'
            });
        });




    window.fbAsyncInit = function() {
    FB.init({
        appId   : '1567423636871440',
        oauth   : true,
        status  : true, // check login status
        cookie  : true, // enable cookies to allow the server to access the session
        xfbml   : true // parse XFBML
    }); };

    function fb_login(){
    FB.login(function(response) {

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function(response) {
                user_email = response.email; //get user email
          // you can store this data into your database             
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
        document.getElementById('fb-root').appendChild(e);
    }());
})();

