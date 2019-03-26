---
title: CSS Extension
lang: en
pagename: css-extension
---

## {{page.title}}

This tutorial will get you started creating a CSS extension for Verse. This is a follow-on tutorial to [Your First Application for IBM Verse](../developers/#how-to-install)

There is much more detailed documentation available [here](../developers), but it's not required for completing the tutorial.

---

### Create CSS Extension

&nbsp;
&nbsp;

#### Edit applications.json
__1.__ Open `src/applications.json` in your text editor.

__2.__ Append the following object into the array in `applications.json`, and save the file. __Be sure to add a comma `,` at the end of the last object in applications.json before adding your own__.

```json
  {
    "name": "CSS Extension Sample",
    "description": "The sample shows how to customize Verse UI",
    "title": "CSS Extension Sample",
    "extensions": [
      {
        "type": "com.ibm.verse.ext.css",
        "name": "CSS extension sample",
        "payload": {
          "css": ".ics-scbanner {background-color:green!important;} .seq-window .compose-button {font-size:16px!important;background-color:red!important;} .message-list-container .seq-msg-row {background-color:yellow!important;} .createEvent {display:none!important;}"
        }
      }
    ],
    "services": [
      "Verse"
    ]
  }
```

__3.__ __Every time__ you change the extension code, __reload the extension__ then __reload Verse,__ so that the browser and Verse will pick up your latest changes.

For instructions on how to reload the extension click [here](../developers/#installing-to-chrome).

&nbsp;
&nbsp;

#### Test it out

In the Verse UI, the background color of navigation bar is changed to green, the background color of Compose button is changed to red, the background color of message list is changed to yellow. The font size of Compose button is changed to 16px. The New event button is hidden.

![CSS Extension UI]({{ site.url }}{{ site.baseurl }}/assets/img/css-extension-ui.png)

Congratulations! You successfully configured a CSS extension with Verse.

&nbsp;
&nbsp;

#### How it works

* This step introduces a new extension point with the type `com.ibm.verse.ext.css`.
* A CSS extension is configured into Verse. It changes the background color of navigation bar, Compose button and message list. Also changes the font size of Compose button and hides the New event button. 