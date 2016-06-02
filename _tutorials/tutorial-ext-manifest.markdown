---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "The manifest file"
categories: 
---

### {{page.title}}  


The configurations of the Verse extensions are recorded in a manifest file, which is in [JSON format][2]. If you use the [Widget Registry Toolkit][1] to develop Verse extensions, you may find the toolkit configured the __widget.json__ as the manifest file.  

Verse supports different types of Verse extension, and different types Verse extensions support different properties. The following sample is a typical configuration of an action contribution in the manifest file, the whole manifest file is defined as an Array which is represented by a pair of `[]`, and a Verse extension is described as an Object which is represented by a pair of `{}`,  
   
```
[
  {
    "id": "com.ibm.verse.ext.sample",
    "url": "https://mycompany/verseext.html",
    "rawExtensionData": [
      {
        "type": "com.ibm.verse.action", 
        "id": "com.ibm.verse.ext.sample.action", 
        "path": "mail.read", 
        "title": "Extension example"
      }
    ],
    "preference" : [
      {
        "name": "subject ",
        "value": "subject "
      },
      {
        "name": "body",
        "value": "body"
      }
    ],
    
    "renderParams" : {
      "width" : "500",
      "height" : "400"
    },
    
    "feature" : []
  }
]
```

In the manifest file, we can see the genernal properties used for configuring a Verse extension,

* __"id"__ is needed for a Verse widget. The __"id"__ is the identification of the widget.  

* __"url"__ tells Verse where to load the web application page.  

* __"rawExtensionData"__ with its sub-properties describes the type of the extension and the type related properties. For different Verse extension types, please refer to the relevant sections in this document.  

* __"renderParams"__ is used to describe the size of new opened window, which the web application is loaded in.  

* __"preference"__ can be configured to let Verse know which data should be sent to specified web application as URL parameters.

* __"feature"__ describes which Verse API the widget wants to call. So far, only the __"core"__ is valid for configuring the __"feature"__, by this configuration, Verse core API will send context related data to the specified web application through [Cross-document messaging][5].

how Verse send data to the web application. please see the [How to send data to a web application][4].  




### Note: _All the properties' name are case sensitive._

[1]: {{site.widget-reg-toolkit}}
[2]: http://json.org
[3]: {{site.baseurl}}/tutorials/tutorial-ext-action-contribution.html
[4]: {{site.baseurl}}/tutorials/tutorial-ext-send-data-to-app.html
[5]: https://www.w3.org/TR/2011/WD-webmessaging-20110317/#web-messaging