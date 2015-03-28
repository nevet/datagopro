(function (controller, $, undefined) {
	var private_attribute;
	controller.public_attribute;

	function private_function (parameter) {
	}
	controller.public_function (parameter) {
	}

	$(function (){
		$(document.body).on("click", ".add", function(){
			console.log("add clicked!");
			$(".addrow").before(new_data);
			$($("#datafield").children()[$("#datafield").children().length-2]).html(number_integer);
		});

		$("#datafield").on("change", ".datatype", function(event){
			console.log("datatype changed!");
			var data_type = $(event.target).val();
			console.log(data_type);
			switch (data_type) {
				case "number": 
					$(this).closest(".row").html(number_integer);
				break;
				case "string":
					$(this).closest(".row").html(string);
				break;
			}
		});

		$("#datafield").on("change", ".numbertype", function(event){
			console.log("numbertype changed");
			var number_type = $(event.target).val();
			console.log(number_type);
			switch(number_type) {
				case "integer":
					$(this).closest(".row").html(number_integer);
				break;
				case "float":
					$(this).closest(".row").html(number_float);
				break;
			}
		});
	});
} (window.controller = window.controller || {}, jQuery));

