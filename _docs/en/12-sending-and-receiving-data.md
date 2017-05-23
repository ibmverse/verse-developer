---
title: Sending and Receiving Data
lang: en
pagename: sending-and-receiving-data
---

## Sending and Receiving Data
Verse supports both URL query string parameters and/or cross-document messaging to communicate with your application. Both methods are described below.

&nbsp;

### Passing data in a URL
Your application can receive data from Verse through URL query string parameters, which are added to the URL specified in the `applications.json` file. Valid parameters are described in the [Verse API Data](#verse-api-data) section.

For example, to send the name of a user from a business card extension to your application, specify the following URL in the `applications.json` file: `https://<your-domain-here>/extension.html?username=<profile.name>.profile.name` is a variable that contains the user’s name.

In your application, you retrieve the URL query string parameters as usual.

&nbsp;

### Passing data through cross-document messaging
If your web application cannot support receiving data from a URL request, you can use cross-document messaging instead. To use this method, you must add the features property to the manifest with the value of `["core"]` so that your web application can communicate with Verse.

In your application code, you must send a `"com.ibm.verse.application.loaded"` message back to the Verse window, so that Verse knows your web application is ready to receive data. If you have a reference to the Verse window, you can do this at the beginning of your code; otherwise wait for the message `"com.ibm.verse.ping.application.loaded"` because the source of this message will be the Verse window.

To handle messages from Verse, your web application needs to register an event listener by using:
{% highlight pre %}
window.addEventListener("message", function(event) {
  // handle message event code
});
{% endhighlight %}

&nbsp;

See [here]({{site.data.developers.sampleActionApp}}){:target="_blank"} for the complete code source of a sample application that demonstrates the concepts described in this section. Please be aware that this example lacks certain security implementations for simplicity. To make it more secure for your own purpose, please refer to the [Security](#security) section, which includes suggested security implementations when using cross-document messaging.