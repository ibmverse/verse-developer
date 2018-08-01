---
title: Third-Party File Repository Integration
lang: en
pagename: third-party-file-repository-integration
---

## {{page.title}}

This tutorial will get you started creating a third-party file repository extension for Verse. This is a follow-on tutorial to [Your First Application for IBM Verse](../developers/#how-to-install)

There is much more detailed documentation available [here](../developers), but it's not required for completing the tutorial.


---

### Create Third-Party File Repository Extension

&nbsp;
&nbsp;

#### Edit applications.json  
__1.__ Open `src/applications.json` in your text editor.

__2.__ Append the following object into the array in `applications.json`, and save the file. __Be sure to add a comma `,` at the end of the last object in applications.json before adding your own__.

```json
  {
    "name": "Third-party file repository integration",
    "title": "Third-party file repository integration",
    "description": "Integrate third-party file repository in Verse",
    "extensions": [{
      "type": "com.ibm.verse.ext.file",
      "name": "Third-party file repository extension",
      "payload": {
        "text": "Third-Party File Repository",
        "url": "https://third-party-file-repo.com",
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAGpJREFUOE+1k4EKgDAIRC36b/3z6kLJFUpOejAYQ293si3MvFMREdHdCQQqoN73rKpTxlxMC4BLpBrBg95NxV74QQ1De/LFQVSD89YMQBgBmPUsQuoAjbYi/ovgb80ctN9BO0JbYOo73xAdbuoHJPh854UAAAAASUVORK5CYII=",
        "renderParams": {
          "width": "450",
          "height": "230"
        }
      }
    }],
    "services": [
      "Verse"
    ]
  }
```

For the third-party file repository server, please see [third-party-file-repo-integration](https://github.com/ibmverse/third-party-file-repo-integration) as an example.

__3.__ __Every time__ you change the extension code, __reload the extension__ then __reload Verse,__ so that the browser and Verse will pick up your latest changes.

For instructions on how to reload the extension click [here](../developers/#installing-to-chrome).

&nbsp;
&nbsp;

#### Test it out
1. Login Verse, click the **Compose** button.
2. In the New Message Dialog, the third-party file repository extension you registered is displayed in the toolbar.
3. Click the repository extension button, to load the third-party file repository in a new window.
4. Choose files in the repository to add file links into the message body.

![The GIF animation for Third-Party File Repository Integration](gifs/third_party_file_repository_integration.gif)

Congratulations! You successfully configured a Third-Party File Repository extension with Verse.

&nbsp;
&nbsp;

#### How it works

1. This step introduces a new extension point with the type `com.ibm.verse.ext.file`.
1. A third-party file repository extension is contributed to Verse, a button is added on compose view toolbar.
1. Click on the contributed button to arise third-party file repository
1. Choose files from the repository.
1. Verse receives the chosen files information and add the file links into the message body.