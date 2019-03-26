window.onload = function () {
  var verseWindow;
  var verseOrigin;
  var samples =
  [
    {
      "emailAddress": "userSample1@test.com",
      "notesAddress": "CN=User Sample 1/OU=China/O=HCL",
      "displayName": "User Sample 1"
    },
    {
      "emailAddress": "userSample2@test.com",
      "displayName": "User Sample 2"
    },
    {
      "notesAddress": "CN=User Sample 3/OU=China/O=HCL",
      "displayName": "User Sample 3"
    },
    {
      "emailAddress": "userSample4@test.com",
    },
    {
      "notesAddress": "CN=User Sample 5/OU=China/O=HCL",
    },
    {
      "emailAddress": "userSample6@test.com",
      "displayName": "User Sample 6",
      "forwardMailAddress": "userForward@test.com"
    }
  ];

  window.addEventListener('message', function(event) {
    var verseApiType = event && event.data && event.data.verseApiType;
    verseWindow = event.source;
    verseOrigin = event.origin;
    // 1. The extension must reply 'com.ibm.verse.ping.application.loaded' message sent from Verse as below, to tell Verse the extension is loaded
    if (verseApiType === 'com.ibm.verse.ping.application.loaded') {
      var loaded_message = {
        verseApiType: 'com.ibm.verse.application.loaded'
      };
      verseWindow.postMessage(loaded_message,verseOrigin);
    } else if (verseApiType === 'com.ibm.verse.action.clicked') {
      // 2. The extension checks Verse message and gets the search string.
      var actionId = event.data.verseApiData && event.data.verseApiData.actionId;
      if ( actionId === "com.ibm.verse.ext.action.directorySearch") {
        var searchString = event.data.verseApiData && event.data.verseApiData.context
          && event.data.verseApiData.context.searchString;

        // 3. The extension executes search and returns the search results to Verse.
        // You can replace below Search Logic block with your own one
        // === Search Logic Start ==
        var searchResult = '';
        // Use a sample data as returned result
        if (searchString == 'sample hcl') {
          searchResult = samples;
        }
        // === Search Logic End ===

        var searched_message = {
            verseApiType: 'com.ibm.verse.ext.directorySearch.searchResults',
            returnCode: 0,
            result: searchResult,
          };
          verseWindow.postMessage(searched_message, verseOrigin);
      }
    }
  }, false);
};
