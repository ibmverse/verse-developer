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
  
  var jsonString = localStorage.getItem('widget-json');
  if(jsonString) {
    var widgets = [];
    try {
      widgets = JSON.parse(jsonString);
    } catch (error) {
      console.error("Fail to parse widget.json: %O", error);
    }
    
    // the widget.json file can define an array of widgets or a single widget
    if(widgets instanceof Array) {
      widgets.forEach(function(widgetObj) {
        try {
          widgetRegistry.addWidgetFromJSON(widgetObj);
        } catch (error) {
          console.error("Fail to add a widget %O from widget.json file: %O", widgetObj, error);
        }
      })
    } else {
      widgetRegistry.addWidgetFromJSON(widgets);
    }
  } else {
    console.error("Fail to read widget.json.");
  }
}, false);