(function(){

	
	$(document).ready(function(){


		$(document).on("click","#help",function(event){
			var activeNav = $(".navbar-nav > li.active");
			var activeId = $(activeNav.find('a')[0]).attr("id");
			console.log(activeId);
			switch(activeId)
			{
				case "newdata":
												var logincss = $("#login").css("display");
												if(logincss == ''){
													$("#newdataguide>li.helplogin").attr("data-id","login");
  												$("#newdataguide>li.helplogin>div>p").html("Click here to log in through facebook or Google+.");
												}
												else{ 
														$(".helplogin").attr("data-id","afterlogin");
		        								$("#newdataguide>li.helplogin>div>p").html("Click here to see your past input or log out.");
        						    }

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
				case "help":  	break;
				case "login":  	break;
			}
		});
	});







})();