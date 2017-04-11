---
[//]: # (Copyright IBM Corp. 2017.  All Rights Reserved.)

layout: tutorial
title:  "Live Text Extension Point for IBM Verse"
categories: verse_live_text
---

# {{page.title}}

This tutorial will get you started creating a live text extension for Verse. This is a follow on tutorial to [Your First Application for IBM Verse][7](tutorial_verse_developer.html)

There is much more detailed documentation available [here][16], but it's not required to complete the tutorial.


---

## Create Live Text Extension

### Edit applications.json  
__1.__ Open `src/applications.json` in your text editor.

__2.__ Append the following object into the array in `applications.json`, and save the file. __Don't forget to add a comma `,` at the end of the preceding application before adding your own__.

```json
  {
    "name": "Live Text Widget Sample application",
    "title": "Live Text Widget Sample",
    "description": "The sample that shows how to contribute a live text extension in Verse",
    "extensions": [
      {
        "name": "Live Text Widget Sample extension",
        "type": "com.ibm.verse.ext.liveText",
        "payload": {
          "text": "Live Text Widget Action",
          "href": "https://www.ibm.com/${1}/sample.html?tel=${2}",
          "recognizer": "Path:([a-z].*), Tel:([0-9]{8}).*",
          "location": "window",
          "renderParams": {
            "width": "800",
            "height": "600"
          }
        }
      }
    ],
    "payload": {},
    "services": [
      "Verse"
    ]
  }
```

__3.__ __Every time__ you make a change to the extension code, you need to __reload the extension__ first, then __reload Verse,__ so that the browser and Verse will pick up your latest changes.

For instructions on how to reload the extension click [here](tutorial_verse_developer.html#installing-the-verse-developer-browser-extension).


### Test it out
1. In the Verse UI, click the __Compose__ button.
2. In the New Mail Dialog, type in __Path:reference, Tel:82451234 CN__ in the mail body.
3. Send the mail to yourself.
4. Once you received the mail, open it.
5. You will see that the text __Path:reference, Tel:82451234 CN__ is recognized and underlined with dash line.
6. Click on the highlighed text, a menu will pop up with a menu item, __Live Text Widget Action__.
7. Click on the menu item, __Live Text Widget Action__, a new browser window will be opened with "__reference/sample.html?tel=82451234__" at the end of the URL.

![Here, a GIF animation is needed](gifs/live_text.gif)

Congratulations! You successfully configured a Live Text extension with Verse.

### Multiple Actions  
Sometimes users may want to create multiple actions for one live text, 
to fulfill this, muliple Live Text Extensions are needed to be created 
with the same `recognizer` property, the multiple action items will be 
organized into one pop up menu for the recognized live text.  


### How it works

* This step introduces a new extension point with the type `com.ibm.verse.ext.liveText`
* A live text extension is configured into Verse, the recognized live text will be highlighted to indicate the end user to click on it and then the menu item 
* Click on the popped up menu item, the specified web application is opened in a new window
* The web application receives parameters from the URL


---

## Further Reading
1. [Introduction to Verse extensibility][3]{:target="_blank"}
2. [Editing the `manifest.json` file][4]{:target="_blank"}
3. [Working with match patterns in `manifest.json`][2]{:target="_blank"}
4. [Verse API data][5]{:target="_blank"}
5. [Registering an application in IBM Verse][9]{:target="_blank"}
6. [Tips for debugging][14]{:target="_blank"}


[2]: https://developer.chrome.com/extensions/match_patterns
[3]: ../reference/reference.html#introduction-to-ibm-verse-extensibility
[4]: ../reference/reference.html#editing-the-manifest
[5]: ../reference/reference.html#verse-api-data
[7]: tutorial_verse_developer.html
[9]: ../reference/reference.html#registering-an-application-in-ibm-verse
[14]: ../reference/reference.html#troubleshooting
[16]: ../reference/reference.html
