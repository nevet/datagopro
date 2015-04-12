var generatedData;

generate = function (array) {
  generatedData = "";
  if (array) {
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

        case "graph":
          dealWithGraph(object);
          break;

        default:
          break;
      }
    }
  }

  return generatedData;
}

function dealWithString(stringObject) {
  for (var i = stringObject.repeattime; i > 0; i--) {
    var string = generateString(stringObject);
    generatedData = generatedData+string;
  };
}

function generateString(stringObject) {
  var
  stringLength = stringObject.stringlength,
  charset = stringObject.choosecharset, 
  lineLength = stringObject.linelength,
  lineBreak = stringObject.linebreak.replace(/\\n/g, "\n")
                                    .replace(/\\'/g, "\'")
                                    .replace(/\\"/g, '\"')
                                    .replace(/\\&/g, "\&")
                                    .replace(/\\r/g, "\r")
                                    .replace(/\\t/g, "\t")
                                    .replace(/\\b/g, "\b")
                                    .replace(/\\f/g, "\f"),
  wordLength = stringObject.wordlength,
  wordBreak = stringObject.wordbreak.replace(/\\n/g, "\n")
                                    .replace(/\\'/g, "\'")
                                    .replace(/\\"/g, '\"')
                                    .replace(/\\&/g, "\&")
                                    .replace(/\\r/g, "\r")
                                    .replace(/\\t/g, "\t")
                                    .replace(/\\b/g, "\b")
                                    .replace(/\\f/g, "\f");

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
      for (var i = numberObject.repeattime; i > 0; i--) {
        var string = generateInteger(numberObject).toString();
        generatedData = generatedData+string+" ";
      };
      break;

    case "float":
      for (var i = numberObject.repeattime; i > 0; i--) {
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

function dealWithGraph(graphObject) {
  for (var i = graphObject.repeattime; i > 0; i--) {
    var graph = [];
    var string = graphObject.numberOfNode + " " + graphObject.numberOfEdge + "\n";

    if (graphObject.isConnected) {
      graph = generateConnectGraph(graphObject);
    } else {
      graph = generateDisconnectGraph(graphObject);
    }

    string = string + graphToString(graph);

    generatedData = generatedData+string;
  };
}

function graphToString(graph) {
  var string = "";

  for (var i=0; i<graph.length; i++) {
    // graph[i].sort();
    for (var j=0; j<graph[i].length; j++) {
      string = string + (i+1) + " " + (graph[i][j]+1) + "\n";
    }
  }

  return string;
}

function generateConnectGraph(graphObject) {
  var n = graphObject.numberOfNode;
  var e = graphObject.numberOfEdge;
  var isDirected = graphObject.isDirected;
  var nodes = [];
  var graph = [];
  for (var i=0; i<n; i++) {
    nodes[i] = i;
    graph[i] = [];
  }
  
  nodes = shuffle(nodes);

  for (var i = 0; i < nodes.length - 1 ; i++) {
    graph[nodes[i]].push(nodes[i+1]);
  };
  
  if (isDirected && e > n*(n-1)) {
    e = n*(n-1);
  } else if (!isDirected && e > n*(n-1)/2) {
    e = n*(n-1)/2;
  }

  if (e > n-1) {
    var i = 0;
    while (i <= e-n) {
      var randomIndex = Math.floor(Math.random() * n);
      if (i % n == 0) {
        nodes = shuffle(nodes);
      }

      for (var j = nodes.length - 1; j >= 0; j--) {
        if (randomIndex != nodes[j] && graph[randomIndex].indexOf(nodes[j]) === -1) {
          if (isDirected) {
            graph[randomIndex].push(nodes[j]);
            i++;
            break;
          } else if (graph[nodes[j]].indexOf(randomIndex) === -1){
            graph[randomIndex].push(nodes[j]);
            i++;
            break;
          };
        }
      };
    };
  };
  
  return graph;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generateDisconnectGraph(graphObject) {

}