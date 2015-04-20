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
    generatedData = generatedData+string+" ";
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
    text = text + possible.charAt(Math.floor(Math.random() * possible.length));

    if (lineLength > 0) {
      if (i % lineLength == 0) {
        text = text + lineBreak;
      } else if (wordLength > 0 && (i % lineLength) % wordLength == 0) {
        text = text + wordBreak;
      }
    } else if (wordLength > 0) {
      if (i % wordLength == 0) {
        text = text + wordBreak;
      }
    }
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
  min = Math.ceil(integerObject.numbermin), 
  max = Math.floor(integerObject.numbermax);

  var number = Math.floor(Math.random() * (max - min) + min);
  if (integerObject.parity) {
    if (integerObject.parity == "odd" && number % 2 == 0) {
      if (number < max) {
        number++;
      } else {
        number--;
      };
    } else if (integerObject.parity == "even" && number % 2 == 1) {
      if (number < max) {
        number++;
      } else {
        number--;
      };
    };
  };

  return number;
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
    var string = graphObject.node + " " + graphObject.edge + "\n";

    if (graphObject.isconnect) {
      graph = generateConnectGraph(graphObject);
    } else {
      graph = generateDisconnectGraph(graphObject);
    }

    string = string + graphToString(graph, graphObject);

    generatedData = generatedData+string;
  };
}

function graphToString(graph, graphObject) {
  var string = "<br>";
  var max, min;
  console.log(graphObject);
  if (graphObject.isweighted) {
    max = graphObject.weightmax;
    min = graphObject.weightmin;
  };
  for (var i=0; i<graph.length; i++) {
    // graph[i].sort();
    for (var j=0; j<graph[i].length; j++) {
      string = string + (i+1) + " " + (graph[i][j]+1);

      if (graphObject.isweighted) {
        var weight = new Number((Math.random() * (max - min)) + min);
        console.log(max+" "+" "+min+" weight: "+weight);
        string = string + " " + weight.toFixed(0);
      };

      string = string + "<br>";
    }
  }

  console.log(string);
  return string;
}

function generateConnectGraph(graphObject) {
  var n = parseInt(graphObject.node);
  var e = parseInt(graphObject.edge);
  var isDirected = graphObject.isdirected;
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
  var n = parseInt(graphObject.node);
  var e = parseInt(graphObject.edge);
  var isDirected = graphObject.isdirected;
  var nodes = [];
  var graph = [];
  for (var i=0; i<n; i++) {
    nodes[i] = i;
    graph[i] = [];
  }

  nodes = shuffle(nodes);

  if (isDirected && e > n*(n-1)) {
    e = n*(n-1);
  } else if (!isDirected && e > n*(n-1)/2) {
    e = n*(n-1)/2;
  }
   
  var i = 0;
  while (i < e) {
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

  return graph;
}