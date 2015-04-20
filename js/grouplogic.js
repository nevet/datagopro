groupinfor = [1,2,3,4,5];


function group(from, end)
{
  var jsonstring = JSON.stringify(groupinfor);
  
  var index1 = jsonstring.search(from);
  var index2 = jsonstring.search(end); 
  var output = jsonstring.slice(0,index1)+'['+jsonstring.slice(index1,index2+1)+']'+jsonstring.slice(index2+1, jsonstring.length);
  groupinfor = JSON.parse(output);

}

function insertEntry(data)
{
  groupinfor.push(data);
}

function deleteEntry(data)
{
  var jsonstring = JSON.stringify(groupinfor);
  var index = jsonstring.search(data);
  for(var i=index+2;i<jsonstring.length-1;i=i+2)
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

  groupinfor = JSON.parse(jsonstring);
}