---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Sending data to a web application"
categories: 
---

## {{page.title}}  


There are two ways to send data from Verse to a web application: by passing data in a URL, and by using cross-document messaging. You can use both of these two ways in your web application at the same time. These two methods are explained in this topic.

### Passing data in a URL

The most common method for passing data to a web application is by including the data as parameters in a URL. Parameters that are static can be directly specified in the URL, but sometimes you will not know the values of a parameter such as the current user's email address. In that situation, you can extract information from the Verse context data and add it to the URL. 

In the URL, this information is represented as a variable, which is surrounded by `< >`. If there are some variables in the widget's URL, each variable must be resolved by querying the context's value before including other parameters defined in __preferences__ property into URL.

For example, suppose that the widget's URL is `https://yourcompany.com/your_app.html/<userName>` and Verse provides the following context data for a user; you want to send that user's email address to your web application:
   
```
  {
    "profile": {
      "primaryEmail": "samantha_daryn@renovations.com",
      "userName": "samantha_daryn"
    }
  }
```

You can first extract the user name from the context data and use its value to replace the variable '<userName>' in the widget's URL. Then the widget's URL will be `https://yourcompany.com/your_app.html/samantha_daryn`.
   
Then you can extract that email address from the context data and add it to your application's URL by configuring the __preferences__ property in the manifest.

In the manifest, add a __preferences__ property with the name __email__ and a value that indicates where the email address resides within the context data (__profile.primaryEmail__), as shown in the following example. Remember that the properties are case sensitive.

```
  "preferences" : [
    {
      "name": "email",
      "value": "profile.primaryEmail"
    }
  ],
```

This property instructs Verse to pass the user's email address through the URL parameter, and that the parameter's name is __email__. Based on that information, Verse constructs the URL to your web application and includes the current user's email address; for example: 

```
https://yourcompany.com/your_app.html/samantha_daryn?email=samantha_daryn@renovations.com
```

### Passing data through cross-document messaging

If your web application cannot support receiving the data from url request, you can use [cross-document messaging][1] instead. To use this method, add the __features__ property to the manifest with the value of  __["core"]__ so that your web application can communicate with Verse.

Before sending the context data to your application, Verse needs to know whether your web application is completely loaded. Verse will continue to send a ping widget's message to your web application to check whether the web application is ready. Then, when your web application is ready, it needs to post a widget loaded's message back to Verse to identify that it is fully loaded and ready to receive data from Verse. The specific messages are like 

```
  The message that Verse sends to your web application:
  
  var message = {
    verseApiType : "com.ibm.verse.ping.widget.loaded"
  };
  
```

```
  The message that your web application sends back to Verse:
  
  var message = {
    verseApiType : "com.ibm.verse.widget.loaded"
  };
```

In order to handle the message from Verse, your web application needs to register an event listener through __window.addEventListener("message"), function(event) {}__.
Then in the event handler, the web application first sends a 'com.ibm.verse.widget.loaded' message back to Verse to identify that the web application is ready to receive the message. Then your web application can process the received the context data based on its own logic. 

A sample script included in the web application to communicate with Verse through cross-document messaging is like below:

```
    <script>
      window.addEventListener("message", function(event) {
        var eventData = event.data;
        if (eventData.verseApiType === "com.ibm.verse.ping.widget.loaded") {
          var message = {
            verseApiType : "com.ibm.verse.widget.loaded"
          };
          event.source.postMessage(message, event.origin);    //Your application must send a message back to Verse to identify that it's ready to receive data from Verse
        } else if (eventData.verseApiType === "com.ibm.verse.action.clicked") {
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
    </script>
```

[1]: https://html.spec.whatwg.org/multipage/comms.html#web-messaging
