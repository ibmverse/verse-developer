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


The configuration of an __Action contribution__ contains a specific property of __"rawExtensionData"__ and other general properties described in [The manifest file][1]. 

For instance, the following configuration described an __Action contribution__,  

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



* __"type"__, as metioned above,  must be configured to  __"com.ibm.verse.action"__  to describe the Verse extension is an __Action Contribution__.  

* __"dataType"__ and __"path"__  
The configuration of the sub-property, __"dataType" : "person"__ means that the __Action Contribution__ will be contributed to the __"Business card view"__. Alternatively, the sub-property, __"path"__ can be used to configure the actions to be contributed to the __mail read view__ or to the __mail compose view__,  
    - __"path" : "mail.read"__ ,  the __Action Contribution__ will be contributed to the __mail read view__.  
    - __"path" : "mail.compose"__,  the __Action Contribution__ will be contributed to the __mail compose view__.  

* __"id"__, an identification string of the action contribution.  

* __"title"__, a description string which will be displayed as caption and tool tip string of the action button.  





[1]: {{site.baseurl}}/tutorials/tutorial-ext-manifest.html