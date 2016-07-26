---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Action contributions"
categories: 
---

### {{page.title}}  


An __Action contribution__ is a kind of Verse Extension, after loaded by Verse, it will be rendered as an action button in Verse UI. So far, the Verse Extension feature defined three extension points for rendering action buttons, which are,  

* business card view,  
    ![Business card view]({{site.baseurl}}/tutorials/img/bizcard_action.png "business card view")   
* mail read view,  
    ![Mail read view]({{site.baseurl}}/tutorials/img/mailreadview.png "mail read view")   
* mail compose view.  
    ![Mail compose view]({{site.baseurl}}/tutorials/img/mailcomposeview.png "mail compose view")   


The configuration of an action contribution contains the __rawExtensionData__ property, along with other general properties described in [Working with the manifest file][1]. For example, the following properties describe the "Sample 1" action configuration, which will display on the business card view:

```
  "rawExtensionData": [
    {
      "type": "com.ibm.verse.action", 
      "id": "", 
      "dataType": "person",
      "title": ""
    }
  ]
```

In this configuration:

* The __type__ property indicates the type of extension being configured (com.ibm.verse.action specifies an action contribution).

* The __id__ property is a string that provides a unique identifier for this action contribution.

* The __dataType__ property indicates the extension point where the action contribution is displayed to the user; there are two possible values:

    * The __person__ property specifies that the action contribution displays in the business card view.

    * The __path__ property indicates that the action contribution displays in the mail view, and uses two additional sub-properties to indicate the specific mail view: 
    
        * __mail.read__ indicates that the action contribution displays in the mail read view.
        * __mail.compose__ indicates that the action contribution displays in the mail compose view.
        
* The __title__ property is a string that provides text that will be displayed as a caption and as a tool tip for the action button. 





[1]: {{site.baseurl}}/tutorials/tutorial-ext-manifest.html
