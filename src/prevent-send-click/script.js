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
          if(isValidBodyContent(event.data.verseApiData.context.body)) {
            var errorNode = document.getElementById('error');
            var response_message = {
              verseApiType: 'com.ibm.verse.message.enable.send'
            };
            event.source.postMessage(response_message, event.origin);
            errorNode.textContent = 'Your email looks good and can be sent';
          } else {
            var errorNode = document.getElementById('error');
            errorNode.textContent = 'You cannot send a mail that contains "Secret12345"?';
          }
        } else {
          console.warn('No context data retrieved from Verse');
        }
      }
    } else {
      console.warn('No data retrieved from Verse');
    }
  }, false);

  /**
   * Checks if the body content contains sensitive information (for this sample the sensitive information will be "Secret12345").
   * @param {String} bodyContent
   * @return {Boolean}
   */
  function isValidBodyContent(bodyContent) {
    return bodyContent.indexOf('Secret12345') < 0 ? true : false;
  }
})();
