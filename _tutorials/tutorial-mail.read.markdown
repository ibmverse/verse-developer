---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: tutorial
title:  "How to contribute an action to mail read view"
categories: tutorial_action_ext
---

### {{page.title}}  


This tutorial will guide you through on how to compose an action contribution to __"mail read view"__. By clicking the contributed action button, a web application will be loaded in a separate window, and Verse will send context related data to the web application by Cross-document messaging.

### Step 1, download and [Install the Verse Developer Chrome Extension][1]  

### Step 2, compose a widget configuration to the manifest file

The manifest file is configred to widget.json by the [Verse Developer Chrome Extension][2],  open it from your local file system, and insert the following configuration as the first widget of the manifest.  

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
    
    "feature" : ["core"],
    
    "renderParams" : {
      "width" : "500",
      "height" : "400"
    }
  }
```

With this configuration, after the widget loaded by Verse, you may see an action button is renderred in the __mail read view__.

___Note:___ the __"url"__ should be changed to your own html page.


* __"rawExtensionData"__ configures the widget as an __Action Contribution__, with the __"path": "mail.read"__, the action button is rendered in __mail read view__. Please see [Action contributions][3] for reference.

* __"id"__,  you may give it any value you like(should not contain white space characters), here we give "com.ibm.verse.ext.sample2" to it,

* __"url"__, a must-set property, you should set it to the URL of your html page,  

* __"feature"__, set it to "core", Verse will send __context__ related data to the specified web application by __Cross-document messaging__.  Please refer to the [How to send data to a web application][4] on how to construct the web application page to receive Cross-document messages.

The __"context"__ is a Verse internal data object, in __mail read view__, it is related to the mail you are composing, please refer to the "context structure" section at the end of this page for detail.  





### Step 3, Load the widget into Verse and interact with it

* ####  3.1, `Reload` the "IBM Verse", 

* ####  3.2, Click on a received email, then click on the "More action" button from the mail read view,  
    ![more action button]({{site.baseurl}}/tutorials/img/mailread_more.png)   
    You may see our sample action button has been rendered in,  
    ![action button]({{site.baseurl}}/tutorials/img/mailread_action.png)  
  

* ####  3.3, Click on the action button, the web application should be opened in a new window.  
    ![action button]({{site.baseurl}}/tutorials/img/mailread_web_app.png)  



<br><br>
<hr>

## _context structure from mail read view_ 


Currently, the context related data from __mail read view__ can provide the following properties that extensions could use.

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



[1]: {{site.baseurl}}/tutorials/tutorial-ext-install-toolkit.html
[2]: {{site.verse-developer-chrome-ext}}
[3]: {{site.baseurl}}/tutorials/tutorial-ext-action-contribution.html
[4]: {{site.baseurl}}/tutorials/tutorial-ext-send-data-to-app.html
