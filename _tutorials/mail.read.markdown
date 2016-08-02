---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: tutorial
title:  "How to add an action contribution to the mail read view"
categories: tutorial_action_ext
---

## {{page.title}}  

This tutorial guides you through the process of creating an action contribution that displays in the mail read view in Verse. When a user clicks the action button, a web application loads in a separate window and Verse sends context data to the web application through cross-document messaging.

### Step 1. [Install the Verse Developer Chrome Extension][1].

### Step 2. Add a new widget configuration to the widget.json manifest file.

This tutorial uses the __widget.json__ file, located in the /src folder of the extracted toolkit. Open the file and insert the following configuration as the first widget in the manifest, making changes to the properties as described below the sample code.  

```
  {
    "id": "com.ibm.verse.ext.sample3",
    "url": "https://yourcompany.com/sample3.html",
    "rawExtensionData": [
      {
        "type": "com.ibm.verse.action",
        "id": "com.ibm.verse.ext.sample3.action",
        "path": "mail.read",
        "title": "Sample 3"
      }
    ],

    "features" : ["core"],

    "renderParams" : {
      "width" : "500",
      "height" : "400"
    }
  }
```

Properties to modify for this tutorial:

* __id__ provides a default value that you can either use, or change to another value.

* __url__ is required because it specifies the URL of the web application that is launched by the action contribution; you can specify the URL of any web application that you can access.

* __rawExtensionData__ configures the widget as an action contribution, and uses __“dataType”: “path” : "mail.read"__ to specify that the action button is rendered in the mail read view.

* __features : ["core"]__ indicates that Verse will send context data to the specified web application through cross-document messaging. Refer to [Sending data to a web application][4] to learn how to construct the web application page to receive cross-document messages. For more information on context data, see the “The context structure from the mail read view” section at the end of this tutorial.

After the widget is loaded by Verse, the action button "Sample 3" displays in the mail compose view. Clicking the button opens the specified web application and passes context data (about the mail message that is currently being read) to the web application.

### Step 3. Load the widget into Verse and interact with it.

1.	Open Verse in the Chrome browser.

2.	Click an email to open it in mail read view.

3.	Click the "More actions" icon:

    ![more action button]({{site.baseurl}}/tutorials/img/mailread_more.png)   

    The "Sample 3" action button displays:

    ![action button]({{site.baseurl}}/tutorials/img/mailread_action.png)  

4.	Click the "Sample 3" button to open the specified web application in a new window.


<br><br>
<hr>

## _The context structure from the mail read view_

Verse provides the following properties in context data from the mail read view; you can use these properties in your extensions.

```
  {
    "body": "the content of mail body",
    "contextId: "",
    "id": "",
    "recipientCC": [
      {
         "displayName": "test76 yourcompany",
         "emailAddress": "test76@yourcompany.com"
      }
    ],
    "recipientTo": [
      {
         "displayName": "test77 yourcompany",
         "emailAddress": "test77@yourcompany.com"
      }
    ],
    "sender": {
      "displayName": "test77 yourcompany",
      "emailAddress": "test77@yourcompany.com"
    },
    "subject": "the subject of the mail",
    "timeSent": "Tue Jun 21 2016 20:12:18 GMT+0800"
  }

```



[1]: {{site.baseurl}}/tutorials/ext-install-toolkit.html
[2]: {{site.verse-developer-chrome-ext}}
[3]: {{site.baseurl}}/tutorials/ext-action-contribution.html
[4]: {{site.baseurl}}/tutorials/ext-send-data-to-app.html
