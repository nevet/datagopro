$(function(){
  $("#min").focusout(function() {
    var element = $("#max");
    if (isNumberInput(element) && checkMaxMin($("#min"), $("#max"))) {
      correctHighlight($("#min"));
      if (parseInt($("#min").val()) <= parseInt($("#max").val())) {
        correctHighlight($("#max"));
      }
    }

    checkParity();
  });

  $("#max").focusout(function() {
    var element = $("#max");
    if (isNumberInput(element) && checkMaxMin($("#min"), $("#max"))) {
      correctHighlight($("#max"));
      if (parseInt($("#min").val()) <= parseInt($("#max").val())) {
        correctHighlight($("#min"));
      }
    }

    checkParity();
  });

  $("#permutation").on('change', function() {
    checkPermutation();
  })

  $("#parity").on('change', function() {
    checkParity();
  })

  $("#repeatNumber").focusout(function() {
    var element = $("#repeatNumber");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    }
  });

  $("#precision").focusout(function() {
    if ($("#numbertype")[0].selectedIndex == 1) {
      var element = $("#precision");
      if (isNumberInput(element) && isNonNegativeInput(element)) {
        correctHighlight(element);
      }
    } else {
      noErrorHighlight($("#precision"));
    }
  });
  
  $("#stringlength").focusout(function() {
    var element = $("#stringlength");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    }
  });

  $("#repeatString").focusout(function() {
    var element = $("#repeatString");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    }
  });

  $("#node").focusout(function() {
    var element = $("#node");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    }
  });

  $("#edge").focusout(function() {
    if (!$("#tree")[0].checked) {
      var element = $("#edge");
      if (isNumberInput(element) && isPositiveInput(element)) {
        correctHighlight(element);
      }
    } else {
      noErrorHighlight($("#edge"));
    }
  });

  $("#weightmin").focusout(function() {
    var element = $("#weightmin");
    if (isNumberInput(element) && checkMaxMin($("#weightmin"), $("#weightmax"))) {
      correctHighlight($("#weightmin"));
      if (parseInt($("#weightmin").val()) <= parseInt($("#weightmax").val())) {
        correctHighlight($("#weightmax"));
      }
    }
  });

  $("#weight").on("click", function() {
    if (!$("#weight")[0].checked) {
      noErrorHighlight($("#weightmin"));
      noErrorHighlight($("#weightmax"));
    } else {
      var element = $("#weightmin");
      if (isNumberInput(element) && checkMaxMin($("#weightmin"), $("#weightmax"))) {
        correctHighlight($("#weightmin"));
      }

      element = $("#weightmax");
      if (isNumberInput(element) && checkMaxMin($("#weightmin"), $("#weightmax"))) {
        correctHighlight($("#weightmax"));
      }
    }
  });

  $("#weightmax").focusout(function() {
    var element = $("#weightmax");
    if (isNumberInput(element) && checkMaxMin($("#weightmin"), $("#weightmax"))) {
      correctHighlight($("#weightmax"));
      if (parseInt($("#weightmin").val()) <= parseInt($("#weightmax").val())) {
        correctHighlight($("#weightmin"));
      }
    }
  });

  $("#repeatGraph").focusout(function() {
    var element = $("#repeatGraph");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    }
  });

  $('#linelength').keypress(function(e) {
    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9]/);
    if (verified) {e.preventDefault();}
  });

  $('#wordlength').keypress(function(e) {
    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9]/);
    if (verified) {e.preventDefault();}
  });
});

function checkNumberValidation() {
  var isValid = true;
  var element;

  element = $("#repeatNumber");
  if (isNumberInput(element) && isPositiveInput(element)) {
    correctHighlight(element);
  } else {
    isValid = false;
  }
  
  element = $("#max");
  if (isNumberInput(element) && checkMaxMin($("#min"), $("#max"))) {
    correctHighlight(element);
  } else {
    isValid = false;
  };

  element = $("#min");
  if (isNumberInput(element) && checkMaxMin($("#min"), $("#max"))) {
    correctHighlight(element);
  } else {
    isValid = false;
  };
  
  element = $("#precision");
  if ($("#numbertype")[0].selectedIndex == 1) {
    if (isNumberInput(element) && isNonNegativeInput(element)) {
      correctHighlight(element);
    } else {
      isValid = false;
    }
  } else {
    noErrorHighlight(element);
  }

  if (!checkParity()) {
    isValid = false;
  }

  return isValid;
}

function checkStringValidation() {
  var isValid = true;
  var element;

  element = $("#stringlength");
  if (isNumberInput(element) && isPositiveInput(element)) {
    correctHighlight(element);
  } else {
    isValid = false;
  }

  element = $("#repeatString");
  if (isNumberInput(element) && isPositiveInput(element)) {
    correctHighlight(element);
  } else {
    isValid = false;
  }

  return isValid;
}

function checkGraphValidation() {
  var isValid = true;
  var element;

  element = $("#repeatGraph");
  if (isNumberInput(element) && isPositiveInput(element)) {
    correctHighlight(element);
  } else {
    isValid = false;
  }

  element = $("#node");
  if (isNumberInput(element) && isPositiveInput(element)) {
    correctHighlight(element);
  } else {
    isValid = false;
  }

  if (!$("#tree")[0].checked) {
    element = $("#edge");
    if (isNumberInput(element) && isPositiveInput(element)) {
      correctHighlight(element);
    } else {
      isValid = false;
    }
  } else {
    noErrorHighlight($("#edge"));
  }

  if ($("#weight")[0].checked) {
    element = $("#weightmin");
    if (isNumberInput(element) && checkMaxMin($("#weightmin"), $("#weightmax"))) {
      correctHighlight($("#weightmin"));
    } else {
      isValid = false;
    }

    element = $("#weightmax");
    if (isNumberInput(element) && checkMaxMin($("#weightmin"), $("#weightmax"))) {
      correctHighlight($("#weightmax"));
    } else {
      isValid = false;
    }
  } else {
    noErrorHighlight($("#weightmin"));
    noErrorHighlight($("#weightmax"));
  }

  return isValid;
}

function isNumberInput(element) {
  if ($(element).val() == "") {
    errorHighlight($(element));
    return false;
  }

  return true;
}

function isPositiveInput(element) {
  if ($(element).val() <= 0) {
    errorHighlight(element);
    return false;    
  };

  return true;
}

function isNonNegativeInput(element) {
  if ($(element).val() < 0) {
    errorHighlight(element);
    return false;    
  };

  return true;  
}

function checkMaxMin(minElement, maxElement) {
  if (parseInt($(minElement).val()) > parseInt($(maxElement).val())) {
    errorHighlight(minElement);
    errorHighlight(maxElement);

    return false;
  }

  return true;
}

function checkParity() {
  if ($("#parity")[0].selectedIndex == 1) {
    if (parseInt($("#min").val()) == parseInt($("#max").val())) {
      if (parseInt($("#min").val()) % 2 == 1) {
        errorHighlight($("#min"));
        errorHighlight($("#max"));

        return false;
      };
    };
  } else if ($("#parity")[0].selectedIndex == 2) {
    if (parseInt($("#min").val()) == parseInt($("#max").val())) {
      if (parseInt($("#min").val()) % 2 == 0) {
        isValid = false;
        errorHighlight($("#min"));
        errorHighlight($("#max"));

        return false;
      };
    };
  };

  return true;
}

function errorHighlight(element) {
  $(element).parent().removeClass("has-success form-feedback");
  $(element).parent().addClass("has-error form-feedback");
  var string = "#"+$(element).attr("id")+"Span";
  $(string).html(iconError);
}

function noErrorHighlight(element) {
  $(element).parent().removeClass("has-error has-success form-feedback");
  var string = "#"+$(element).attr("id")+"Span";
  $(string).html("");
}

function correctHighlight(element) {
  $(element).parent().removeClass("has-error form-feedback");
  $(element).parent().addClass("has-success form-feedback");
  var string = "#"+$(element).attr("id")+"Span";
  $(string).html(iconCorrect);
}

function checkPermutation() {
  if ($("#permutation")[0].checked) {
    permutationChecked();
  } else {
    permutationNotChecked();
  }
}

function permutationChecked() {
  $("#repeatNumber").val(1);
  $("#repeatNumber").attr("disabled", true);
  $("#repeatTypeNumber").attr("disabled", true);
}

function permutationNotChecked() {
  $("#repeatNumber").val(10);
  $("#repeatNumber").attr("disabled", false);     
  $("#repeatTypeNumber").attr("disabled", false);
}
