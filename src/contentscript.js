/**
 * Copyright IBM Corp. 2016
 * Licensed under the MIT License.
 */



var apps = chrome.extension.getURL('applications.json');
var xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == "200") {
    var appsStr = replaceExtensionPath(xhr.responseText);
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

function replaceExtensionPath(appsStr) {
  var extensionPath = chrome.extension.getURL('');
  var apps = [];
  try {
    apps = JSON.parse(appsStr);
    apps.forEach(function(app) {
      var extensions = app.extensions;
      extensions.forEach(function(extension) {
        var extensionUrl = extension.url;
        if (extensionUrl && extensionUrl.indexOf('${extensionPath}/') > -1) {
          extension.url = extensionUrl.replace('${extensionPath}/', extensionPath);
        }
        if (extension.payload) {
          extensionUrl = extension.payload.url;
          if (extensionUrl && extensionUrl.indexOf('${extensionPath}/') > -1) {
            extension.payload.url = extensionUrl.replace('${extensionPath}/', extensionPath);
          }
        }
      });
    });
    appsStr = JSON.stringify(apps);
  } catch (error) {
    console.error("Fail to parse applications.json: %O", error);
  }
  return appsStr;
}
