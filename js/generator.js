(function (generator, $, undefined) {
  var generatedData;

  generator.generate = function (array) {
    generatedData = "";

    for (var i = 0; i<=array.length - 1; i++) {
      var object = array[i];
      switch (object.datatype) {
        case "string":
          dealWithString(object);
          break;

        case "number":
          dealWithNumber(object);
          break;

        default:
          break;
      }
      generatedData = generatedData + "\n";
    };

    save();
  }

  function dealWithString(stringObject) {
    for (var i = stringObject.repeattime - 1; i >= 0; i--) {
      var string = generatedString(stringObject);
      generatedData = generatedData+string;
    };
  }

  function generateString(stringObject) {
    var
    stringLength = stringObject.stringlength,
    charset = stringObject.charset, 
    lineLength = stringObject.linelength,
    lineBreak = stringObject.linebreak,
    wordLength = stringObject.wordlength,
    wordBreak = stringObject.wordbreak;

    var
    text = "",
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i <= stringlength - 1; i++) {
      if (i % wordLength == 0) {
        text = text + wordBreak;
      } else {
        text = text + possible.charAt(
          Math.floor(Math.random() * possible.length));
      };
    };

    text += lineBreak;

    return text;
  }

  function dealWithNumber(numberObject) {
    switch (numberObject.numbertype) {
      case "integer":
        for (var i = numberObject.repeattime; i >= 0; i--) {
          var string = generatedInteger(numberObject).toString();
          generatedData = generatedData+string+"\n";
        };
        break;

      case "float":
        for (var i = numberObject.repeattime; i >= 0; i--) {
          var string = generateFloat(numberObject).toString();
          generatedData = generatedData+string+"\n";
        };
        break;

      default:
        break;
    }
  }

  function generateInteger(integerObject) {
    var
    min = integerObject.min, 
    max = integerObject.max;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateFloat(floatObject) {
    var
    precision = floatObject.precision, 
    min = floatObject.min, 
    max = floatObject.max;

    var number = Math.random() * (max - min) + min;

    return number.toFixed(precision);
  }

  function save() {
    console.log(generatedData);

    var textToWrite = generatedData;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var downloadLink = document.createElement("a");

    downloadLink.download = "download";
    downloadLink.innerHTML = "Download File";
    if (window.URL != null) {
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    }

    downloadLink.click();
  }
}) (window.generator = window.generator || {}, jQuery);