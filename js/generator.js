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
          generatedData = generatedData + "\n";
          break;

        default:
          break;
      }
    };

    save();
  }

  function dealWithString(stringObject) {
    for (var i = stringObject.repeattime - 1; i >= 0; i--) {
      var string = generateString(stringObject);
      generatedData = generatedData+string;
    };
  }

  function generateString(stringObject) {
    var
    stringLength = stringObject.stringlength,
    charset = stringObject.choosecharset, 
    lineLength = stringObject.linelength,
    lineBreak = stringObject.linebreak,
    wordLength = stringObject.wordlength,
    wordBreak = stringObject.wordbreak;

    var
    text = "",
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 1; i <= stringLength; i++) {
      if (i % lineLength == 0) {
        text = text+lineBreak;
      } else if ((i % lineLength) % wordLength == 0) {
        text = text + wordBreak;
      } else {
        text = text + possible.charAt(
          Math.floor(Math.random() * possible.length));
      };
    };

    if (stringLength % lineLength != 0) { text += lineBreak;};

    return text;
  }

  function dealWithNumber(numberObject) {
    switch (numberObject.numbertype) {
      case "integer":
        for (var i = numberObject.repeattime; i >= 0; i--) {
          var string = generateInteger(numberObject).toString();
          generatedData = generatedData+string+" ";
        };
        break;

      case "float":
        for (var i = numberObject.repeattime; i >= 0; i--) {
          var string = generateFloat(numberObject).toString();
          generatedData = generatedData+string+" ";
        };
        break;

      default:
        break;
    }
  }

  function generateInteger(integerObject) {
    var
    min = new Number(integerObject.numbermin), 
    max = new Number(integerObject.numbermax);

    var number = new Number(Math.floor(Math.random() * (max - min + 1)) + min);

    return number.toFixed(0);
  }

  function generateFloat(floatObject) {
    var
    precision = new Number(floatObject.floatprecision), 
    min = new Number(floatObject.numbermin), 
    max = new Number(floatObject.numbermax);

    var number = new Number(Math.random() * (max - min) + min);

    return number.toFixed(precision);
  }

  function save() {
    console.log(generatedData);

    var textToWrite = generatedData;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var downloadLink = document.createElement("a");

    downloadLink.download = "textFile";
    downloadLink.innerHTML = "Download File";
    if (window.URL != null) {
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    }

    downloadLink.click();
  }
}) (window.generator = window.generator || {}, jQuery);