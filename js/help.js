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
			var activeNav = $(".navbar-nav > li.active");
			var activeId = $(activeNav.find('a')[0]).attr("id");
			switch(activeId)
			{
				case "newdata":
												$('#newdataguide').joyride({
												   autoStart : true,
												 	 nubPosition: 'top',
												 	 modal:true,
												 	 expose: true	});
												break;
				case "popularinput":
												break;
				case "help":
												break;
				case "login":
												break;
			}


		});
	});







})();