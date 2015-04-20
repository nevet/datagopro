
 
  $(document).on("click","#groupbutton>i", function(){
    $("#grouppopup").bPopup({ //uses jQuery easing plugin
    speed: 500,
    transition: 'slideDown',
    transitionClose: 'slideUp'});
  });
