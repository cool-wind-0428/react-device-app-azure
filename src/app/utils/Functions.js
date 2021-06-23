export const swap = (json) => {
    var ret = {};
    for(var key in json){
      ret[json[key]] = key;
    }
    return ret;
}

export const ceil = (number) => {
  return Math.ceil(number * 100) / 100;
}

export const dividing = (n1, n2) => {
  return n1===0 || n2===0 ? 0 : n1/n2;
}

export const formattedDate = (date) => {
  if(date==='' || isNaN(date)) {
    return '';
  } else {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;//January is 0!
    var yyyy = date.getFullYear();
    if(dd < 10) { dd = '0' + dd };
    if(mm < 10) { mm = '0' + mm };
    return mm + '/' + dd + '/' + yyyy;
  }
}

export const formattedString = (val) => {
  if(IsNumeric(val)) { 
    return val===0 ? '' : ceil(val);
  } else if(IsNumeric(val) && isNaN(val)) {
    return '';
  } else {
    return val;
  }
}

export const formattedNumber = (val) => {
  if(IsNumeric(val)) { 
    return ceil(val);
  } else if(IsNumeric(val) && isNaN(val)) {
    return 0;
  } else {
    return ceil(val);
  }
}

export const IsNumeric = (input) => {
    return (input - 0) === input && (''+input).trim().length > 0;
}

export const diff = (m1, m2) => {
  let diff = '';
  
  const min = m1.diff(m2, 'minutes');
  const hour = m1.diff(m2, 'hours');
  const day = m1.diff(m2, 'days');
  if(min < 2) 
    diff = 'a few seconds';
  else if(min < 60)
    diff = `${min} mins ago`;
  else if(hour < 2)
    diff = `${hour} hour ago`;
  else if(hour < 24)
    diff = `${hour} hours ago`;
  else if(day < 2)	
    diff = `${day} day ago`;
  else 
    diff = `${day} days ago`;
    
  return diff;	
}

export function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}