---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Developing action contributions"
categories:
---

## {{page.title}}  


An action contribution is a type of extension that is rendered as an action button in the Verse user interface. Verse currently supports three extension points where you can add action contributions:

* Business card view: You can add an action contribution to the "More actions" section of a business card (see "Sample 1" in the following image).

    ![Business card view]({{site.baseurl}}/tutorials/img/bizcard_action.png "business card view")   

* Mail read view: You can add an action contribution to the "More actions" menu (see "Content Demo" in the following image).

    ![Mail read view]({{site.baseurl}}/tutorials/img/mailreadview.png "mail read view")   

* Mail compose view:  You can add an action contribution to the "More actions" menu (see "Tone Analyzer Demo" in the following image).

    ![Mail compose view]({{site.baseurl}}/tutorials/img/mailcomposeview.png "mail compose view")   

The configuration of an action contribution contains the __extensions__ property, along with other general properties described in [Working with the widget.json file][1]. For example, the following properties describe the "Sample 1" action configuration, which will display on the business card view:

```
  "extensions": [
    {
      "type": "com.ibm.verse.action",
      "ext_id": "com.ibm.verse.ext.sample1.action",
      "name": "Extension sample 1",
      "payload": {},
      "object": "person",
      "title": "Sample 1"
    }
  ],
```

In this configuration:

* The __type__ property indicates the type of extension being configured (com.ibm.verse.action specifies an action contribution).

* The __ext_id__ property is a string that provides a unique identifier for this action contribution.

* The __object__ property indicates the extension point where the action contribution is displayed to the user:

    * The __person__ property specifies that the action contribution displays in the business card view.

* The __path__ property indicates that the action contribution displays in the mail view, and uses two additional sub-properties to indicate the specific mail view: 
    
    * __mail.read__ indicates that the action contribution displays in the mail read view.
    * __mail.compose__ indicates that the action contribution displays in the mail compose view.
        
* The __title__ property is a string that provides text that will be displayed as a caption and as a tool tip for the action button. 



[1]: {{site.baseurl}}/tutorials/ext-manifest.html
