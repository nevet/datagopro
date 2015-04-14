(function(){

	// $(document).ready(function() {
	//     tl.pg.init({
	//     	auto_show_first: true,
	//      	custom_open_button: "#help",
	//      	auto_refresh: true
	//  	});
	// });
	// 
	$(window).load(function() {
        $('#tutorialguide').joyride({
          autoStart : true,
          nubPosition: 'top'
        });
      });
	
	$(document).ready(function(){
		$(document).on("click","#help",function(event){
			$('#tutorialguide').joyride({
	          autoStart : true,
	 		  nubPosition: 'top'	
		    });
		});
	});





})();