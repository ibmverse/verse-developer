(function() {
  'use strict';

  window.addEventListener('message', function(event) {
    // Add check for the event origin here
    if(event.data) {
      if (event.data.verseApiType === 'com.ibm.verse.ping.application.loaded') {
        var loaded_message = {
          verseApiType: 'com.ibm.verse.application.loaded'
        };
        event.source.postMessage(loaded_message, event.origin);
      } else if (event.data.verseApiType === 'com.ibm.verse.action.clicked') {
        if(event.data.verseApiData.context) {
          checkMailBody(event.data.verseApiData.context.body, event);
        } else {
          console.warn('No context data retrieved from Verse');
        }
      }
    } else {
      console.warn('No data retrieved from Verse');
    }
  }, false);

  /*
   * Checks if the mail body contains a credit card number and if it does displays a warning.
   * @param {String} body Body of the mail as HTML
   * @param {String} event Before on send action events
   */
  function checkMailBody(body, event) {
    var regex = /\b(?:3[47]\d|(?:4\d|5[1-5]|65)\d{2}|6011)\d{12}\b/
    var found = regex.test(body);
    if (found) {
      var errorNode = document.getElementById('error');
      errorNode.textContent = 'You are not permitted to send an email that contains a credit card number.';
    } else {
      var response_message = {
        verseApiType: 'com.ibm.verse.message.continue.send'
      };
      event.source.postMessage(response_message, event.origin);
    }
  }

})();
