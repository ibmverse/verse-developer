---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "How to send data to a web application"
categories: 
---

### {{page.title}}  


By Clicking the contributed action button, Verse will load the configured web application in an iframe or a new window, and send context related data to the web application.  

For sending data to a web application page, two different ways can be used,  

* Pass data in URL, this is the most common way for passing parameters to a web application. The foregone data can be put directly in the search part of __"url"__ as parameters.  For the data that can only be determinated after the extension has been loaded into Verse, the property of __"preferences"__ can be used to tell Verse to prepare to data and send them in URL.  The __"preferences"__ property is a Array, each parameter should be represented by an Object with the following sub-properties,   

   __"name"__, represents the name of a parameter.  
   __"value"__, represents from which context property the value could be retrieved.  


   For instance, if the Verse has the following __context__ data,  
   
```
  {
    "profile": {
      "primaryEmail": "someone@yourcompany.com"
    }
  }
```
   
   and you want to send the "someone@yourcompany.com" to a web application page, then you need to configre the preperty of  __"preferences"__ as below to tell Verse to pass the email address through the URL parameter, and the parameter's name is "email",  that is say, you can see the final url which Verse requested is, `https://yourcompany.com/sample.html?email=someone@yourcompany.com`
   
```
  "preferences" : [
    {
      "name": "email",
      "value": "profile.primaryEmail"
    }
  ],
```

  
   
* Pass data by Cross-document messageing. For the limitation of the URL(2k characters), the data length and data type which you want to send to your web application may not meet your requirements, you can choose this more flexible way to pass data. The property of __"features" : ["core"]__ can be set in the widget configuration to indicate Verse to pass data by [Cross-document messageing][1] instead of by URL parameters. Then, Verse will load the web application page first and send data to it by Cross-document messaging.  


    Please see the following sample codes.

```
    <script>
      var opener = window.opener;
      if (opener) {
        var message = {
          verseApiType : "com.ibm.verse.widget.loaded"
        };
        opener.postMessage(message, '*');
        
        window.addEventListener("message", function(event) {
          var eventData = event.data;
          if (eventData.verseApiType === "com.ibm.verse.action.clicked") {
            var actionData = eventData.verseApiData;
            if (actionData.actionId === "com.ibm.verse.ext.sample1.action") {
              var message = actionData.context;
              if (message && message.subject) {
                document.getElementById("subject").innerHTML = message.subject;
              }
              if (message && message.body) {
                document.getElementById("mailBody").innerHTML = message.body;
              }
            }
          }
        }, false);
      }
    </script>
```

The web application which Verse loads in sandbox may load its resources and scripts _asynchronously_, before Verse send context data to the web application, Verse need to know that the web application has been completely loaded. It is the web application's responsibility to let Verse know that it is loaded and is ready for receiving messages from Verse.  From the above codes you may see, the web application sent back a message(`opener.postMessage()`) with __verseApiType : "com.ibm.verse.widget.loaded"__ as an acknowledge to let Verse know that it is ready for receiving messages, and also registered an event listener(`window.addEventListener()`) for receiving the data from Verse. 


[1]: https://www.w3.org/TR/2011/WD-webmessaging-20110317/#web-messaging
