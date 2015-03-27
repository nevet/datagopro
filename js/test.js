$(function(){
	var data_type_number = ("<div class='col-sm-2'>"
							+	"<select class='datatype form-control '>"
							+		"<option value='number' selected>Number</option> "
							+		"<option value='string'>String</option>"
							+	"</select>"
							+"</div>");

	var data_type_string = ("<div class='col-sm-2'>"
							+	"<select class='datatype form-control '>"
							+		"<option value='number'>Number</option> "
							+		"<option value='string' selected>String</option>"
							+	"</select>"
							+"</div>");

	var number_type_integer = ("<div class='col-sm-2'>"
								+	"<select class='form-control numbertype'>"
								+		"<option value='integer' selected>Integer</option>"
								+		"<option value='float'>Float</option>"
								+	"</select>"
								+"</div>");

	var number_type_float = ("<div class='col-sm-2'>"
								+	"<select class='form-control numbertype'>"
								+		"<option value='integer'>Integer</option>"
								+		"<option value='float'selected>Float</option>"
								+	"</select>"
								+"</div>");

	var number_min = ("<div class='col-sm-2'>"
					+		"<input class='form-control numbermin' type='text' placeholder='min'>"
					+	"</div>");

	var number_max = ("<div class='col-sm-2'>"
					+		"<input class='form-control numbermax' type='text' placeholder='max'>"
					+	"</div>");

	var float_precision = ("<div class='col-sm-2'>"
						+		"<input class='form-control floatprecision' type='text' placeholder='precision'>"
						+	"</div>");
	
	var string_length = ("<div class='col-sm-2'>"
						+	"<input class='form-control length' type='text'>"
						+	"<span class='lengthlabel'>length</span>"
						+"</div>");

	var repeat = ("<div class='col-sm-2 repeat'>"
				  + 	"<span class='times'>x</span>"
				  +		"<input class='form-control repeattime' type='text' value='1'>"
				  +		"<span class='times'>times</span>"
				  +"</div>");

	var number_integer = (data_type_number + number_type_integer + number_min + number_max + repeat);
	var number_float = (data_type_number + number_type_float + number_min + number_max + float_precision + repeat);
	var string = (data_type_string + string_length + repeat);
	var new_data = ("<div class='row'></div>");
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
	$(".integer").closest(".row").draggable({
		helper: "clone"
	});
});




