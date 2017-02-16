/**
 * Print out Verse API data for all the action samples
 */
window.addEventListener("message", function(event) {
  // Add check for the event origin here
  console.log(event);

  document.getElementById("status").innerHTML = "";

  var jsonNode = document.getElementById("json");
  jsonNode.innerText = jsonNode.innerText + "\n" + JSON.stringify(event.data, null, 2);

  /**
   * Message from Verse to check whether your web application is ready.
   */
  if (event.data.verseApiType === "com.ibm.verse.ping.application.loaded") {
    var loaded_message = {
      verseApiType: 'com.ibm.verse.application.loaded'
    };
    /**
     * Your application must send a message back to Verse
     * to identify that it's ready to receive data from Verse.
     */
    event.source.postMessage(loaded_message, event.origin);
  }
}, false);
