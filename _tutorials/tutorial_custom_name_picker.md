---
[//]: # (Copyright IBM Corp. 2016.  All Rights Reserved.)

layout: tutorial
title:  "Custom Name Picker for IBM Verse"
categories: tutorial_verse_developer
---

# {{page.title}}

This tutorial will get you started writing a custom name picker application for Verse.

There is much more detailed documentation available [here][1], but it's not required to complete the tutorials.

This is a follow on tutorial to [Your First Application for IBM Verse](tutorial_verse_developer.md)

---

## Add Action for Custom Name Picker

### Edit applications.json
__1.__ Open `src/applications.json` in your text editor.

__2.__ Append the following object into the array in `applications.json`, and save the file. __Don't forget to add a comma `,` at the end of the preceding application before adding your own__.

```json
{
  "id": "com.ibm.verse.custom.name.picker",
  "name": "Custom name picker",
  "title": "Name Picker",
  "description": "Custom name picker on mail compose",
  "extensions": [
    {
      "type": "com.ibm.verse.ext.namePicker",
      "ext_id": "com.ibm.verse.namepicker.sample.compose",
      "has": "custom-name-picker",
      "name": "Custom name picker in mail compose",
      "url": "${extensionPath}/custom-name-picker/index.html",
      "title": "Add Contact"
    }
  ],
  "payload": {},
  "services": [
    "Verse"
  ]
}

```

__3.__ Create a folder called custom-name-picker in the verse developer __src__ folder. Download the custom name picker code in files __index.html__ and __ui.js__ [here][2] and place in the new __custom-name-picker__ folder you created.

__4.__ Make changes to the verse developer page.js file.

Open the verse developer page.js file, add a new line at line 25 and add the following code

```JavaScript
var app = updateExtensionUrl(appObj);
```

In the lines following line 25 replace every instance of __appObj__ with __app__ the variable you just created.

Now append the following code to the end of the file.

```JavaScript

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
    if (app.extensions && app.extensions.length > 0 && app.extensions[0].url) {
      var extensionUrl = app.extensions[0].url;
      if (extensionUrl.indexOf('${extensionPath}/') > -1) {
        theApp.extensions[0].url = extensionUrl.replace('${extensionPath}/', extensionPath);
        return theApp;
      }
    }
    return app;
  }

```

__5.__ Make changes to the verse developer contentscript.js file.

Open the verse developer contentscript.js file.

Append the following javascript to the end of the file.

```javascript
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
```

__6.__ Finally we require a small change in the verse developer manifest file.

In the __web_accessible_resources__ array add a new entry and call it __"custom-name-picker/index.html"__.


### Reload the extension and Verse
__Every time__ you make a change to the extension code, you need to __reload the extension__ first, then __reload Verse,__ so that Chrome and Verse will pick up your latest changes.

To reload the extension in Chrome, open your Chrome browser, go to `chrome://extensions`, find the IBM Verse Developer Extension for Google Chrome, and click __Reload__.  

![reload extension](img/2_reload.png)

To reload the extension in Firefox, open your Firefox browser, go to `about:debugging`, find the IBM Verse Developer Extension for Google Chrome, and click __Reload__.  

![reload extension](img/2_reload_ff.png)

### Test it out
1. In the Verse UI, click the __Compose__ button.  
![compose button](img/2_compose_action.png)

2. In the pop-up Mail Compose view, click on the __To__ link text.
![to field](img/5_to_field.png)

3. From here you can enter the names of people the message is meant for and filter the results of the names by location and job.
![name picker](img/5_name_picker.png)

Congratulations! You successfully registered the custom name picker with Verse.

---

[1]:../reference/reference.html
[2]:../samples/custom-name-picker
