---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Sending data to a web application"
categories: 
---

## {{page.title}}  


This part is going to explain how to send data from Verse to a web application using two different methods: 1) passing data in a URL and 2) using cross-document messaging.
You can use both ways in your web application at the same time.

### Passing data in a URL

This method supports sending data to a URL with unknown value parameters, known as dot-separated string variables. In a URL, every variable is represented as `<variable>`. When a URL is employed to send data from Verse to a web application, each URL variable will be dynamically substituted as a specific value. In Verse, the information can be extracted from the context data to replace the URL variable. This kind of variable can exist in any part of a URL, such as path, query and fragment, etc.

In this section, a specific example will be given to explain how to configure the widget.json file to define a URL and use this URL to send data to a web application. For example, a web application is expected to find the homePage of some employee from the specific department of a company. For example, you can use the URL
`https://yourcompany.com/org/research?username=samantha_daryn` to look up the Samantha_daryn, who is from your company's research department. Also, you can find the Sophia from your company's marketing department via the URL `https://yourcompany.com/org/markerting?username=sophia`. To achieve this, you can simply construct one URL
`https://yourcompany.com/org/<profile.department>?username=<profile.name>`. When you click different person's profile, the variables `<profile.department>` and `<profile.name>` will be replaced by the specific value extracted from the context data.

To construct such a URL, the url attribute of the widget.json file can be set as

```
  "url": "https://yourcompany.com/org/<profile.department>?username=<profile.name>",
```

Alternatively, the _preference_ property can be used to set the variable in the URL query part, so we can also construct the URL `https://yourcompany.com/org/<profile.department>?username=<profile.name>` by re-configuring the widget.json file as below

```
  "url": "https://yourcompany.com/org/<profile.department>",
  
  "preferences" : [
    {
      "name": "username",
      "value": "profile.name"
    }
  ],
```

In verse, the dot-separated string variable _(A.B.C)_ is applied to extract the information from the context data. Suppose that the following context data is given,
```
  {
    "profile": {
      "name": "samantha_daryn",
      "department": "research"
    },
    
    "profile": {
      "name": "sophia",
      "department": "marketing"
    }
  }
```
The variables _profile.name_ and _profile.department_ will be replaced by the corresponding values which are extracted from the context data. Therefore, if you click the samantha_daryn's profile,
you can get the URL `https://yourcompany.com/org/research?username=samantha_daryn`. If you click the sophia's profile, the URL will be `https://yourcompany.com/org/marketing?marketing=sohpia`.


### Passing data through cross-document messaging

If your web application cannot support receiving the data from url request, you can use [cross-document messaging][1] instead. To use this method, you must 

1. add the __features__ property to the manifest with the value of  __["core"]__ so that your web application can communicate with Verse
1. send a 'com.ibm.verse.ping.widget.loaded' message back to Verse in your web application, then Verse can know that your web application is ready to receive the data from Verse

Before sending the context data to your application, Verse needs to know whether your web application is completely loaded. Verse will continue to send a ping widget's message to your web application to check whether the web application is ready until timeout. Then, when your web application is ready, it needs to post a widget loaded's message back to Verse to identify that it is fully loaded and ready to receive data from Verse. The specific messages are like 

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

In order to handle the message from Verse, your web application needs to register an event listener through __window.addEventListener("message", function(event) {})__.
In the event handler, the web application first sends a 'com.ibm.verse.widget.loaded' message back to Verse to identify that the web application is ready to receive the message. Then your web application can process the context data based on its own logic. 

A sample script included in the web application to communicate with Verse through cross-document messaging is like below. Also here is [a sample HTML page][2] you can refer.

```
    <script>
      window.addEventListener("message", function(event) {
        var eventData = event.data;
        //Message from verse to check whether your web application is ready
        if (eventData.verseApiType === "com.ibm.verse.ping.widget.loaded") {
          var message = {
            verseApiType : "com.ibm.verse.widget.loaded"
          };
          //Your application must send a message back to Verse to identify that
          //it's ready to receive data from Verse
          event.source.postMessage(message, event.origin);
        } else if (eventData.verseApiType === "com.ibm.verse.action.clicked") {
          var actionData = eventData.verseApiData;
          //"ext_id" of array "extensions" in widget.json
          if (actionData.actionId === "com.ibm.verse.ext.sample1.action") {
            var message = actionData.context;
            if (message && message.subject) {
              //The html element created in your web application to display
              //the verse message
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
[2]: {{site.baseurl}}/tutorials/sample-html.html
