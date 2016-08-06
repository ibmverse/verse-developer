---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Sending data to a web application"
categories: 
---

## {{page.title}}  


There are two ways to send data from Verse to a web application: by passing data in a URL, and by using cross-document messaging. Both methods are explained in this topic.

### Passing data in a URL

The most common method for passing data to a web application is by including the data as parameters in a URL. Parameters that are static can be directly specified in the URL, but sometimes you will not know the values of a parameter such as the current user's email address. In that situation, you can extract information from the Verse context data and add it to the URL. 

However, sometimes, the URL will contain variable which is surrounded by `< >`. If there are some variables in the widget's URL, we need to first resolve each variable through querying context's value before including other parameters defined in __preferences__ property into URL.

For example, suppose that the widget's URL is `https://yourcompany.com/your_app.html/<userName>` and Verse provides the following context data for a user and you want to send that user's email address to your web application:
   
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

If a URL cannot support the type or length of the data you want to pass to your web application, you can use [cross-document messaging][1]  instead. To use this method, add the __features__ property to the manifest with the value of  __["core"]__ so that Verse will load the web application before sending data.

Then, add code to your web application so that it can notify Verse when it is ready to receive data, plus an event listener to actually receive the data from Verse. For example, suppose that your web application includes the following script:    

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

When the web application is called by Verse, it might load its resources and scripts asynchronously. Before it can send context data, Verse needs to be informed that the web application has finished loading and that it is ready to receive data. When loading is complete, the web application sends the __(opener.postMessage())__ message to Verse with __"verseApiType" : "com.ibm.verse.widget.loaded"__ to indicate that it is ready to receive data. The web application then registers an event listener so that it can receive data from Verse: __(window.addEventListener())__

[1]: https://html.spec.whatwg.org/multipage/comms.html#web-messaging
