---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: tutorial
title:  "How to contribute an action to mail compose view"
categories: tutorial_action_ext
---

### {{page.title}}  

This tutorial will guide you through on how to compose an action contribution to __"mail compose view"__. By clicking the contributed action button, a web application will be loaded in a separate window, and Verse will send context related data to the web application by Cross-document messaging.

### Step 1, download and [Install the Verse Developer Chrome Extension][1]  

### Step 2, compose a widget configuration to the manifest file

The manifest file is configred to widget.json by the [Verse Developer Chrome Extension][2],  open it from your local file system, and insert the following configuration as the first widget of the manifest.  

```
  {
    "id": "com.ibm.verse.ext.sample2",
    "url": "https://yourcompany.com/sample2.html",
    "rawExtensionData": [
      {
        "type": "com.ibm.verse.action", 
        "id": "com.ibm.verse.ext.sample2.action", 
        "path": "mail.compose", 
        "title": "Sample 2"
      }
    ],
    
    "feature" : ["core"],
    
    "renderParams" : {
      "width" : "500",
      "height" : "400"
    }
  }
```

With this configuration, after the widget loaded by Verse, you may see an action button is renderred in the __mail compose view__.

___Note:___ the __"url"__ should be changed to your own html page.

* __"rawExtensionData"__ configures the widget as an __Action Contribution__, with the __"path": "mail.compose"__, the action button is rendered in __mail compose view__. Please see [Action contributions][3] for reference.

* __"id"__,  you may give it any value you like(should not contain white space characters), here we give "com.ibm.verse.ext.sample2" to it,

* __"url"__, a must-set property, you should set it to the URL of your html page,  

* __"feature"__, set it to "core", Verse will send __context__ related data to the specified web application by __Cross-document messaging__.  Please refer to the [How to send data to a web application][4] on how to construct the web application page to receive Cross-document messages.

The __"context"__ is a Verse internal data object, in __mail compose view__, it is related to the mail you are composing, please refer to the "context structure" section at the end of this page for detail.  





### Step 3, Load the widget into Verse and interact with it

* ####  3.1, `Reload` the "IBM Verse", 

* ####  3.2, Click on the compose action, 
    ![mail compose]({{site.baseurl}}/tutorials/img/compose_action.png)   
    Click on the "More action" button from the mail compose view,  
    ![more action button]({{site.baseurl}}/tutorials/img/compose_more_action.png)   
    You may see our sample action button has been rendered in,  
    ![action button]({{site.baseurl}}/tutorials/img/compose_view_action.png)  
  

* ####  3.3, Click on the action button, the web application should be opened in a new window.  
    ![action button]({{site.baseurl}}/tutorials/img/compose_web_app.png)  



<br><br>
<hr>

## _context structure from mail compose view_ 


Currently, the context related data from __mail compose view__ can provide the following properties that extensions could use.

```
  {
    "body": "the content of mail body",
    "contextId: "",
    "id": "",
    "recipientCC": [
      {
         "displayName": "test76 seq",
         "emailAddress": "test76 seq/test"
      }
    ],
    "recipientTo": [
      {
         "displayName": "test77 seq",
         "emailAddress": "test77 seq/test"
      }
    ],
    "subject": "the subject of the mail"
  }
```



[1]: {{site.baseurl}}/tutorials/tutorial-ext-install-toolkit.html
[2]: {{site.verse-developer-chrome-ext}}
[3]: {{site.baseurl}}/tutorials/tutorial-ext-action-contribution.html
[4]: {{site.baseurl}}/tutorials/tutorial-ext-send-data-to-app.html
