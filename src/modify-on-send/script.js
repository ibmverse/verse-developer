(function() {
  'use strict';

  window.addEventListener('message', function(event) {
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
            modifiedContext: {
              subject: 'Confidential: ' + context.subject
            }
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
})();
