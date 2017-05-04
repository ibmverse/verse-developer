---
title: Secure the Application
lang: en
---

## Secure the Application
The sample applications we have worked with so far are not secure because they do no check the origin of messages they receive. It is your responsibility to protect your application against [cross-site scripting attacks](#security).

&nbsp;

The following version of the `actions.js` includes a check to verify the validity of the message origin. The method `isValidOrigin` contains a list of origins which the application expects to receive messages from. Messages from other origins are possible cross-site scripting attacks. This list of origins that are checked should be the same as the ones listed in the `manifest.json`.

&nbsp;

{% highlight pre %}
/**
 * Print out Verse API data for all the action samples
 */
window.addEventListener("message", function(event) {
  if (!isValidOrigin(event.origin)) {
    return;
  }

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

/** 
 * Verify we are listening to the right origin
 * @param {String} currentOrigin - The url which we should listen to
 * @return {Boolean} true if the origin is valid, false otherwise
 */
function isValidOrigin(currentOrigin) {
  var originsList = [
    "https://mail.notes.na.collabserv.com",
    "https://mail.notes.ap.collabserv.com",
    "https://mail.notes.ce.collabserv.com"
  ];
  for (var i = 0; i < originsList.length; i++) {
    if (originsList[i].indexOf(currentOrigin) !== -1) {
      return true;
    }
  }
  return false;
}
{% endhighlight %}