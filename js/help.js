(function(){

	// $(document).ready(function() {
	//     tl.pg.init({
	//     	auto_show_first: true,
	//      	custom_open_button: "#help",
	//      	auto_refresh: true
	//  	});
	// });
	// 
	
	$(document).ready(function(){
		$(document).on("click","#help",function(event){
			$('#tutorialguide').joyride({
	      autoStart : true,
	 		  nubPosition: 'top',
	 		  modal:true,
	 		  expose: true	
		    });
		});
	});







})();