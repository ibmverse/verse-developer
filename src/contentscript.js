/**
 * Copyright IBM Corp. 2016
 * Licensed under the MIT License.
 */

var apps = chrome.extension.getURL('applications.json');
var xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == "200") {
    localStorage.setItem('applications-json', xhr.responseText);
    var pageScript = document.createElement('script');
    pageScript.src = chrome.extension.getURL('page.js');
    pageScript.onload = function() {
      this.parentNode.removeChild(this);
    };
    (document.head||document.documentElement).appendChild(pageScript);
  }
};
xhr.open('GET', apps, true);
xhr.send();

init();

/**
 * Initialises the verse developer by saving the applications.json contents to localStorage,
 * injecting the page.js script into Verse, as well as a DOM element.
 */
function init() {
    document.addEventListener('GetExtensionPath', getExtensionPath);
}

/**
  * Get the extension path which can be used to load the iframes
*/
function getExtensionPath() {
  document.dispatchEvent(new CustomEvent('SetExtensionPath', {
  detail: chrome.extension.getURL('')
}));
}
