/**
 * Copyright IBM Corp. 2016
 * Licensed under the MIT License.
 */

var apps = chrome.extension.getURL('applications.json');
var xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == "200") {
    localStorage.setItem('app-json', xhr.responseText);
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

