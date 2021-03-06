
exports.getMailProp = (object, property) => {
  if (property == "attachments") {
    if ((object.email.hasOwnProperty('attachmentfile')) && (object.email.hasOwnProperty('sharedfile')))
      return object.email.attachmentfile.concat(object.email.sharedfile).toString();

    else if (object.email.hasOwnProperty('attachmentfile'))
      return object.email.attachmentfile.toString();

    else if (object.email.hasOwnProperty('sharedfile'))
      return object.email.sharedfile.toString()
    else return null
  }

  if (property == "rejected"){
   if(object.email.rejected == 0){return null;}
   else return object.email.rejected;
  }

 
  if (object.email.hasOwnProperty(property)) { return (object.email[property]); }

  else return null;
}


