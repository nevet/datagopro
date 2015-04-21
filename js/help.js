(function(){

	
	$(document).ready(function(){


		$(document).on("click","#help",function(event){
			var activeNav = $(".navbar-nav > li.active");
			var activeId = $(activeNav.find('a')[0]).attr("id");
			console.log(activeId);
			switch(activeId)
			{
				case "newdata":
												$('#newdataguide').joyride({
												   autoStart : true,
												 	 nubPosition: 'top',
												 	 cookieMonster: false,
												 	 modal:true,
												 	 expose: true	}); 
												 break;
				case "popularinput":
											
												$('#popularguide').joyride({
												   autoStart : true,
												 	 nubPosition: 'top',
												 	 cookieMonster: false,
												 	 modal:true,
												 	 expose: true	});
												break;
				case "help":   
												break;
				case "login":  	break;
			}
		});
	});







})();