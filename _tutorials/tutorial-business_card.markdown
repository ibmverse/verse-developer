---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: tutorial
title:  "How to contribute an action contribution to business card"
categories: tutorial_action_ext
---

### {{page.title}}  

This tutorial will guide you through on how to compose an action contribution which will contribute a action to "__business card view__". By clicking the contributed action, a web application with a specific URL parameter will be loaded in a separate window.


### Step 1, download and [Install the Verse Developer Chrome Extension][1]  

### Step 2, compose a widget configuration to the manifest file

The manifest file is configred to widget.json by the [Verse Developer Chrome Extension][2], open it from your local file system, and insert the following configuration as the first widget of the manifest.  

```
  {
    "id": "com.ibm.verse.ext.sample1",
    "url": "https://yourcompany.com/sample1.html",
    "rawExtensionData": [
      {
        "type": "com.ibm.verse.action", 
        "id": "com.ibm.verse.ext.sample1.action", 
        "dataType": "person",
        "title": "Sample 1"
      }
    ],
    "preference" : [
      {
        "name": "searchFor",
        "value": "profile.primaryEmail"
      }
    ],
    
    "renderParams" : {
      "width" : "900",
      "height" : "500"
    }
  },
```

With this configuration, after the widget loaded by Verse, you may see an action button is renderred in the __business card view__.  

___Note:___ the __"url"__ should be changed to your own html page.

* __"rawExtensionData"__ configures the widget as an __Action Contribution__, with the __"dataType": "person"__, the action button is rendered in __business card view__. Please see [Action contributions][3] for reference.

* __"id"__, you may give it any value you like(should not contain white space characters), here we give "com.ibm.verse.ext.sample1" to it.  


* __"url"__ is a must-set property, you should set it to the URL of your html page.  


* __"preference"__, indicates that a __context__ property, "profile.primaryEmail" need to be sent as an URL parameter, and the parameter name is "searchFor".


  The __"context"__ is a Verse internal data object, in the __business card view__, it is related to an important person, please refer to the "context structure from business card view" section at the end of this page for detail.  



### Step 3, Load the widget into Verse and interact with it

* ####  3.1, `Reload` the "IBM Verse" page,  

* ####  3.2, Click on the business card,  

    ![business card]({{site.baseurl}}/tutorials/img/bizcard.png)   

* ####  3.3, Click on the "More action" button,  

    ![more action button]({{site.baseurl}}/tutorials/img/bizcard_more_action.png)   
    You may see our sample action button has been rendered in,  
    ![action button]({{site.baseurl}}/tutorials/img/bizcard_action.png)  
  

* ####  3.4, Click on the action button, the web application should be opened in a new window, the expected parameter, "searchFor" with its value can be seen from the URL.  
![action button]({{site.baseurl}}/tutorials/img/bizcard_sample.png)  


<br><br>
<hr>

## _context structure from business card view_ 

Currently, the context related data from __business card view__ can provide the following properties that extensions could use.

```
{
  "currentUser": {
    "displayName": "CN=test82 seq/O=test",
    "emails": [
      {
        "primary": true,
        "type": "work",
        "value": "test82@yourcompany.com"
      },
    ],
    "id": "id.string"
  },
  "profile": {
    "company": "test",
    "displayName": "test99 seq",
    "fax": "",
    "id": "",
    "jobTitle": "",
    "mobilePhone": "",
    "name": {
      "displayName": "test99 seq",
      "displaytype": "",
      "familyName": "",
      "formatted": "test99 seq",
      "givenName": "",
      "honorificPrefix": "",
      "honorificSuffix": "",
      "middleName": ""
    },
    "network": "",
    "orgId": "",
    "photo": "https://...",
    "photoUrl": "",
    "primaryAddress": "",
    "primaryEmail": "test99@yourcompany.com",
    "primaryPhone": "",
    "status": "",
    "tags": "",
    "website": ""
  }
}
```

[1]: {{site.baseurl}}/tutorials/tutorial-ext-install-toolkit.html
[2]: {{site.verse-developer-chrome-ext}}
[3]: {{site.baseurl}}/tutorials/tutorial-ext-action-contribution.html