---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: tutorial
title:  "How to add an action contribution to the mail compose view"
categories: tutorial_action_ext
---

## {{page.title}}  

This tutorial guides you through the process of creating an action contribution that displays in the mail compose view in Verse. When a user clicks the action button, a web application loads in a separate window and Verse sends context data to the web application through cross-document messaging.

### Step 1. [Install the Verse Developer Extension for Google Chrome][1].

### Step 2. Add a new widget configuration to the widget.json file

This tutorial uses the __widget.json__ file, located in the /src folder of the extracted toolkit. Open the file and insert the following configuration as the first widget, making changes to the properties as described below the sample code.

```
  {
    "app_id": "com.ibm.verse.ext.sample2",
    "name": "Widget example 2",
    "url": "https://yourcompany.com/sample2.html",
    
    "extensions": [
      {
        "type": "com.ibm.verse.action",
        "ext_id": "com.ibm.verse.ext.sample2.action",
        "name": "Extension example 2",
        "payload": {},
        "path": "mail.compose",
        "title": "Extension sample 2"
       }
    ],

    "payload": {
      "features": [
        "core"
      ],
      "renderParams": {
        "width": "500",
        "height": "400"
      }
    },

    "services": [
      "Verse"
    ]
  }
```

Properties to modify for this tutorial:

* __app_id__ provides a default value that you can either use, or change to another value.

* __url__ is required because it specifies the URL of the web application that is launched by the action contribution; you can specify the URL of any web application that you can access.

* __extensions__ configures the widget as an action contribution, and uses __"path": "mail.compose"__ to specify that the action button is rendered in the mail compose view. 

* __features : ["core"]__ in __payload__ indicates that Verse will send context data to the specified web application through cross-document messaging. Refer to [Sending data to a web application][2] to learn how to construct the web application page to receive cross-document messages. For more information on context data, see the "The context structure from the mail compose view" section at the end of this tutorial.

### Step 3. Load the widget into Verse and interact with it

1.	Open Verse in the Chrome browser.

2.	Click __Compose__ to open the mail compose view:

    ![mail compose]({{site.baseurl}}/tutorials/img/compose_action.png)   

3.	Click the "More actions" icon:

    ![more action button]({{site.baseurl}}/tutorials/img/compose_more_action.png)   

    The "Sample 2" action button displays:

    ![action button]({{site.baseurl}}/tutorials/img/compose_view_action.png)  

4.	Click the "Sample 2" button to open the specified web application in a new window.

<br><br>
<hr>

## _The context structure from the mail compose view_


Verse provides the following properties in context data from the mail compose view; you can use these properties in your extensions. In the following properties, 'recipientTo' and 'recipientCC' properties values are Array type, and the 'body' property value is a HTML format. All of other properties values are String type.

```
  {
    "body": "the content of mail body",
    "contextId: "id of mail compose view control",
    "unid": "Notes document unid. If the document has not ever been saved, then the value will be'$new'",
    "recipientTo": [
      {
        "displayName": "test77 seq",
        "emailAddress": "internet email address, for example, test77seq@yourcompany.com",
        "notesAddress": "Notes email address, for example, test77 seq/test",
        "phoneticName": "phonetic name"
      }
    ],
    "recipientCC": [
      {
        "displayName": "test76 seq",
        "emailAddress": "internet email address, for example, test76seq@yourcompany.com",
        "notesAddress": "Notes email address, for example, test76 seq/test",
        "phoneticName": "phonetic name"
      }
    ],
    "subject": "the subject of the mail"
  }
```



[1]: {{site.baseurl}}/tutorials/ext-install-toolkit.html
[2]: {{site.baseurl}}/tutorials/ext-send-data-to-app.html
