(function() {

  var whiteListOrigin = [
    'https://localhost.notes.collabservintegration.com',
    'https://mail.notes.collabservintegration.com',
    'https://mail.notes.na.collabserv.com',
    'https://mail.notes.ap.collabserv.com',
    'https://mail.notes.ce.collabserv.com',
    'https://mail.notes.scniris.com',
    'https://mail.notes.collabservsvt2.swg.usma.ibm.com',
    'https://llc1mail.notes.collabservsvt1.swg.usma.ibm.com'
  ];

  window.addEventListener('message', function(event) {
    if(whiteListOrigin.indexOf(event.origin) < 0) {
      return;
    }
    if(event.data) {
      if (event.data.verseApiType === 'com.ibm.verse.ping.application.loaded') {
        var loaded_message = {
          verseApiType: 'com.ibm.verse.application.loaded'
        };
        event.source.postMessage(loaded_message, event.origin);
      }
      if(event.data.verseApiData && event.data.verseApiData.actionId === 'com.ibm.verse.ext.action.modifyOnSend') {
        var context = event.data.verseApiData.context;
        if(context) {
          var response_message = {
            verseApiType: 'com.ibm.verse.message.modified.data',
            modifiedContext: getModifiedContext(context)
          };
          event.source.postMessage(response_message, event.origin);
        } else {
          console.warn('No context data retrieved from Verse');
        }
      }
    } else {
      console.warn('No data retrieved from Verse');
    }
  }, false);

  function getModifiedContext (context) {
    var modifiedContext = {};
    /**
     * Modify the properties here and add it to modifiedContext
     * modifiedContext.subject = "Confidential: "+context.subject;
     */
    modifiedContext.subject = modifySubject(context.subject, "Confidential: ", true);//"Confidential: "+context.subject
    return JSON.stringify(modifiedContext);
  }

  /*
   * this function adds either a prefix or suffix to a given subject
   * @param {String} subject. current subject sent from Verse
   * @paran {String} label. the string to add as either prefix or suffix
   * @param {boolean} prefix. if true add prefix if false add suffic
   * @return {String} the modified subject with prefix or suffix concatenated.
   */
  modifySubject =  function(subject, label, isPrefix) {
    return isPrefix ? label.concat(subject) : subject.concat(label);
  }
})();
