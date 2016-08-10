---
[//]: # (Copyright IBM Corp. 2016.  All Rights Reserved.)

layout: tutorial
title:  "How to add an action contribution to the business card view"
categories: tutorial_action_ext
---

## {{page.title}}  

This tutorial guides you through the process of creating action contribution that displays on the business card in Verse. When a user clicks the action button, a web application loads in a separate window.

### Step 1. [Install the Verse Developer Extension for Google Chrome][1]

### Step 2. Add a new widget configuration to the widget.json manifest file.

This tutorial uses the __widget.json__ file, located in the /src folder of the extracted toolkit. Open the file and insert the following configuration as the first widget in the manifest, making changes to the properties as described below the sample code.

```
  {
    "app_id": "com.ibm.verselabs.actions.sample",
    "name": "Person Action Sample",
    "url": "https://git.swg.usma.ibm.com/pages/IBM-Verse/verse-developer-chrome-ext/samples/actions.html",

    "extensions": [
      {
        "type": "com.ibm.verse.action",
        "ext_id": "com.ibm.verselabs.action.sample.person",
        "name": "Person Action Sample",
        "payload": {},
        "object": "person",
        "title": "Person Action"
       }
    ],

    "payload": {
      "features": [
        "core"
      ],
      "preferences" : [
        {
          "name": "searchFor",
          "value": "profile.primaryEmail"
        }
      ],
      "renderParams": {
        "width": "900",
        "height": "500"
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

* __extensions__ configures the widget as an action contribution, and uses __"object": "person"__ to specify that the action button is rendered in the business card view.

* __preferences__ in __payload__ indicates that a context property called profile.primaryEmail is sent to the web application as the value of the URL parameter called __searchFor__.

* __features : ["core"]__ in __payload__ indicates that Verse will send context data to the specified web application through cross-document messaging. Refer to [Sending data to a web application][4] to learn how to construct the web application page to receive cross-document messages. In this example we are printing out all the context information in the specified web application. If we are only sending the context property profile.primaryEmail to the web application as the value of the URL parameter we do not need to include __features : ["core"]__.

In Verse, __context__ is an internal data object; in the business card view, it references information about the user who is described by the business card. For more information, see the "The context structure from the business card view" section at the end of this tutorial.

After the widget is loaded by Verse, the action button "Person Action" displays in the business card view. Clicking the button opens the specified web application and passes the primary email address of the user described in the business card.

### Step 3. Load the widget into Verse and interact with it.

1. Open Verse in the Chrome browser.

2. Open a business card and view it:

    ![business card]({{site.baseurl}}/tutorials/img/bizcard.png)   

3. In the business card, click the "More actions" arrow:

    ![more action button]({{site.baseurl}}/tutorials/img/bizcard_more_action.png)   

    The "Person Action" action button displays:

    ![action button]({{site.baseurl}}/tutorials/img/bizcard_action.png)  

4. Click the "Person Action" button to open the specified web application in a new window. If you examine the URL in the new window, you will see the searchFor parameter with the email address of the person whose business card you viewed in Verse.

<br><br>
<hr>

## _The context structure from the business card view_

Verse provides the following properties in context data from the business card view; you can use these properties in your extensions.

```
{
  "currentUser": {
    "company": "",
    "displayName": "CN=test82 seq/O=test",
    "fax": "",
    "id": "",
    "jobTitle": "",
    "mobilePhone": "",
    "name": {
      "displayName": "CN=test82 seq/O=test",
      "displayType": "",
      "familyName": "",
      "formatted": "test82@yourcompany.com",
      "givenName": "",
      "honorificPrefix": "",
      "honorificSuffix": "",
      "middleName": ""
    },
    "network": "",
    "orgId": "",
    "photo": "",
    "photoUrl": "",
    "primaryAddress": "",
    "primaryEmail": "test82@yourcompany.com",
    "primaryPhone": "",
    "status": "",
    "tags": "",
    "website": ""
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

[1]: {{site.baseurl}}/tutorials/ext-install-toolkit.html
[2]: {{site.verse-developer-chrome-ext}}
[3]: {{site.baseurl}}/tutorials/ext-action-contribution.html
[4]: {{site.baseurl}}/tutorials/ext-send-data-to-app.html
