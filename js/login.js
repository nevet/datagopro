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
})();

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-42119746-1']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
