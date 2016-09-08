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

  var jsonString = localStorage.getItem('app-json');
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
        try {
          widgetRegistry.addWidgetFromJSON(appObj);
        } catch (error) {
          console.error("Fail to add an application %O from applications.json file: %O", appObj, error);
        }
      });
    } else {
      widgetRegistry.addWidgetFromJSON(apps);
    }
  } else {
    console.error("Fail to read applications.json.");
  }
}, false);
