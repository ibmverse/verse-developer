---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Introduction of Verse Extension"
categories: 
---

### {{page.title}}  

Verse Extension is a mechanism which customers can integrate their web applications into Verse. To date, two kinds of Verse extensions are supported,  

* __Action Contribution__, customers can use it to add action buttons to Verse UI, by clicking on the contributed actions, customers can access their specified web applications which hosted by themselves.  
* __LiveText__ is another kind of Verse Extension, customers can extend Verse to recognize specified strings in mail body and attach actions on them, then customers can click on them to access specified web applicaions.


Customers who want to contribute Verse Extensions to Verse UI should have,  

* __Web applications__, which hosted by customers themselves or the third party companies.  For security reasons, the web application pages will be limited in sandbox, which is a iframe or a separated new window. For sending data to the web application, two kinds of ways are provided by Verse,   
    * Attach the data directly to the URL as parameters, the web application pages can easily get the parameters by front end or back end technologies.  
    * Pass the data through [cross-document messaging][3].  
* A __manifest__ file, which describes the configurations of contributed Verse extensions. Please refer to the [Manifest file][2] for details. 



### Terms

#### - Widget  
* Refer to a contributed application in Verse.
* Can have a html which hosts the code for the widget.
* A widget may contribute several actions in Verse, and it may contribute other things, like LiveText recognizers, etc. These are called "extensions".

#### - Extension
* Refer to an extension added by a widget.
* There are many types of extensions, an extension can be an action contribution, or a LiveText recognizer, etc.

#### - Container
* Refer to the Verse page, which provides the ability to render a widget and other extensibility features, etc.


[1]: http://json.org
[2]: {{site.baseurl}}/tutorials/tutorial-ext-manifest.html
[3]: https://www.w3.org/TR/2011/WD-webmessaging-20110317/#web-messaging
