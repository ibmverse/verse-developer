(function() {
  'use strict';

  window.addEventListener('message', function(event) {
    if(event.data) {
      if (event.data.verseApiType === 'com.ibm.verse.ping.application.loaded') {
        var loaded_message = {
          verseApiType: 'com.ibm.verse.application.loaded'
        };
        event.source.postMessage(loaded_message, event.origin);
      } else if (event.data.verseApiType === 'com.ibm.verse.action.clicked') {
        if(event.data.verseApiData.context) {
          if(isValidBodyContent(event.data.verseApiData.context.body)) {
            var response_message = {
              verseApiType: 'com.ibm.verse.message.continue.send'
            };
            event.source.postMessage(response_message, event.origin);
          } else {
            var errorNode = document.getElementById('error');
            errorNode.textContent = 'Are you sure you want to send a mail that contains "Secret12345"?';
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
