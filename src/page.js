/**
 * Copyright IBM Corp. 2016
 * Licensed under the MIT License.
 */


document.addEventListener("WidgetRegistryReady", function(event) {
  var widgetRegistry = event.widgetRegistry;
  if(!widgetRegistry) {
    console.error("Fail to get widgetRegistry!");
    return;
  }

  var jsonString = localStorage.getItem('applications-json');
  if(jsonString) {
    var apps = [];
    try {
      apps = JSON.parse(jsonString);
    } catch (error) {
      console.error("Fail to parse applications.json: %O", error);
    }

    // the applications.json file can define an array of applications or a single application
    if(apps instanceof Array) {
      apps.forEach(function(appObj) {
        var app = updateExtensionUrl(appObj);
        try {
          widgetRegistry.addWidgetFromJSON(app);
        } catch (error) {
          console.error("Fail to add an application %O from applications.json file: %O", app, error);
        }
      });
    } else {
      widgetRegistry.addWidgetFromJSON(apps);
    }
  } else {
    console.error("Fail to read applications.json.");
  }
}, false);

init();

function init() {
  document.addEventListener('SetExtensionPath', setExtensionPath);
  document.dispatchEvent(new CustomEvent('GetExtensionPath'));
}


/** Set the extension path url
   * @param {Event}
 */
function setExtensionPath(e) {
  extensionPath = e.detail;
}

/**
 * Update the extension url with the extension path
 * @param {Object} app - The app object.
 * @return {Object} - updated app with the new url
 */
 function updateExtensionUrl(app) {
   var theApp = app;
   if (app.extensions && app.extensions.length > 0 && (app.extensions[0].url || app.extensions[0].payload.url)) {
     var extensionUrl = app.extensions[0].url || app.extensions[0].payload.url;
     if (extensionUrl.indexOf('${extensionPath}/') > -1) {
       if(theApp.extensions[0].url){
         theApp.extensions[0].url = extensionUrl.replace('${extensionPath}/', extensionPath)
       } else {
         theApp.extensions[0].payload.url = extensionUrl.replace('${extensionPath}/', extensionPath);
       }
       return theApp;
     }
   }
   return app;
 }
