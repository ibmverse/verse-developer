/**
 * Copyright IBM Corp. 2016
 * Licensed under the MIT License.
 */

var apps = chrome.extension.getURL('applications.json');
var xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var appsStr = updateExtensionURLs(xhr.responseText);
    localStorage.setItem('applications-json', appsStr);
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

/**
 * Updates the relative url of an extension
 * @param {String} definedApps - Apps defined in applications.json
 * @return {String} - Apps definitions with updated extension URLs
 */
function updateExtensionURLs(definedApps) {
  var baseURL = chrome.extension.getURL("");
  definedApps = definedApps.replace(/\$\{extensionPath\}\//g, baseURL);
  return definedApps;
}
