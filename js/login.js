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

