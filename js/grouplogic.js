grouparray = [1];


function group(from, end)
{
  var jsonstring = JSON.stringify(grouparray);
  
  var fromInt, endInt;
  
  if(Array.isArray(from)) fromInt = from[0];
  else fromInt = from;

  if(Array.isArray(end)) endInt = end[end.length-1];
  else endInt = end;

  var index1 = jsonstring.search(fromInt.toString());
  var index2 = jsonstring.search(endInt.toString()); 
  var output = jsonstring.slice(0,index1)+'['+jsonstring.slice(index1,index2+1)+']'+jsonstring.slice(index2+1, jsonstring.length);
  grouparray = JSON.parse(output);

}

function insertEntry(data)
{
  grouparray.push(data);
}

function deleteEntry(data)
{
  var jsonstring = JSON.stringify(grouparray);
  var index = jsonstring.search(data);
  for(var i=index+2;i<jsonstring.length-1;i++)
  {
    if(!isNaN(jsonstring.charAt(i))) //means it is a number.(parseInt(jsonstring.charAt(i))-1).toString()
    {
      jsonstring = jsonstring.replace(jsonstring.charAt(i),(parseInt(jsonstring.charAt(i))-1).toString());
    }
  }

  if(jsonstring.charAt(index+1) == ','){
    jsonstring = jsonstring.replace(data.toString()+',', '');
  }
  else jsonstring = jsonstring.replace(','+data.toString(), '');

  grouparray = JSON.parse(jsonstring);
}

function deleteGroup(from, end)
{
  var jsonstring = JSON.stringify(grouparray);
  
  var fromInt, endInt;
  
  if(Array.isArray(from)) fromInt = from[0];
  else fromInt = from;

  if(Array.isArray(end)) endInt = end[0];
  else endInt = end;

  var index1 = jsonstring.search(fromInt.toString());
  var index2 = jsonstring.search(endInt.toString()); 
  var output = jsonstring.slice(0,index1-1)+jsonstring.slice(index1,index2+1)+jsonstring.slice(index2+2, jsonstring.length);
  grouparray = JSON.parse(output);
}