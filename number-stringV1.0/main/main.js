function divideNumber(number) {
  var NumberArray = [];

  var divide = parseInt(number.length/3);
  for(var i = 0 ; i < divide ; i++){
    NumberArray.push(number.slice(-3));
    number = number.substring(0,number.length-3);
  }
  if(number.length!==0){
    NumberArray.push(number);
  }

  return NumberArray;
}

function covertToText(NumberArray,numberDictionary){
  var stringArray = [];
  NumberArray.forEach(function(number){
    var subString = "";
    var length = number.length;
    switch(length){
      case 1:
        subString = getOneBitString(number,numberDictionary);
        break;
      case 2:
        subString = getTwoBitString(number,numberDictionary);
        break;
      case 3:
        subString = getThreeBitString(number,numberDictionary);
        break;
    }
    stringArray.push(subString);
  })
  return stringArray;
}

function getOneBitString(number,numberDictionary){
  return numberDictionary.unit[parseInt(number)];
}

function getTwoBitString(number,numberDictionary){
  var decade = parseInt(number.charAt(0));
  var unit = parseInt(number.charAt(1));

  if(decade===0){
    return numberDictionary.unit[unit];
  }else if(decade===1){
    return numberDictionary.unit[number];
  }else{
    var unitString = numberDictionary.unit[unit];
    var decadeString = numberDictionary.decade[decade];
    
    return unitString===""?decadeString:decadeString+" "+unitString;
    
  }
}

function getThreeBitString(number,numberDictionary){
  var firstString = getOneBitString(number.substring(0,1),numberDictionary);
  if(firstString!==""){
    firstString += " " + numberDictionary.hundred;
  }

  var subNumber = number.slice(-2);
  var subString = getTwoBitString(subNumber,numberDictionary);
  subString = subString===""||firstString===""?subString:" and "+subString;

  return firstString + subString ;
}