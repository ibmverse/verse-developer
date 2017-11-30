---
title: Create a New Application
lang: en
pagename: create-a-new-application
---

## Create a New Application
The previous sections showed you how to register an application with Verse, add a widget extension and then add multiple actions to the Verse UI. The external application that was launched was hosted within the Verse Developer Browser Extension. This is very convenient when developing a very simple page but a real application will need to be hosted elsewhere.

&nbsp;

### Set up a web server
If you are familiar with setting up your own server for hosting web pages please add `src/samples/templatedLink.html` and `src/sample/templatedLink.js` to your server and then skip to the next step.

&nbsp;

Otherwise, you can use the Chrome Web Server to set up a localhost on your machine by following these steps:
- Install the [Chrome Web Server]({{site.data.developers.webServerForChrome}}){:target="_blank"} from the Chrome Web Store using your Chrome browser.
- After installing, launch it by navigating to `chrome://apps` in your Chrome browser, and clicking on the icon for the Chrome Web Server.
- After the application is launched, click the **choose folder** button and select the `src` folder of the Verse Developer Web Extension.
- Toggle the **Web Server: STARTED** button to stop, then restart the web server. Once the server is started (indicated by a blue color on the button), you can access sample html files by clicking on the link provided under the **Web Server URL(s)** section, or by typing that address into the browser.

&nbsp;

![Load Unpacked Extension]({{ site.url }}{{ site.baseurl }}/assets/gifs/chrome_web_server.gif)

&nbsp;

The web page you will use in this step is the templatedLink.html.

&nbsp;

### Edit applications.json
For this step we are going to remove the application we worked on in the previous steps and add a new one. Edit the `applications.json` file so that it contains the following content:

&nbsp;

{% highlight pre %}
[
  {
    "name": "Templated Link Sample",
    "title": "Templated Link Sample",
    "description": "This samples demonstrates using the templated link extension point",
    "extensions": [
      {
        "name": "Person Templated Link",
        "type": "com.ibm.appreg.ext.templatedLink",
        "object": "com.ibm.appreg.object.person",
        "payload": {
          "text": "Templated Link Action",
          "title": "Templated Link Action",
          "href": "http://127.0.0.1:8887/samples/templatedLink.html?searchFor=${profile.primaryEmail}"
        }
      }
    ],
    "services": [
      "Verse"
    ]
  }
]
{% endhighlight %}

&nbsp;

### Test it out
- Now try it out in Verse: first **reload the extension and then reload Verse** to pick up your latest code changes.
- Hover over a People bubble, and click on the **i** icon to bring up the business card.
- Click on the **arrow** button located at the right bottom part of the business card to turn the card around.
- At the back of the business card you will see a new link called **Person Templated Link**.
- Click on the **Person Templated Link** link. This will load the associated web page in a new tab and will display the email address of the person whose business card was opened.

&nbsp;

![Load Unpacked Extension]({{ site.url }}{{ site.baseurl }}/assets/gifs/person_templated_link.gif)

&nbsp;

### How it works
- This step introduces a new extension point with the type `com.ibm.appreg.ext.templatedLink`
- A templated link is used to invoke a web application and data is passed is parameters in the URL query string
- Parameters are specified using the `${<parameter>}` notation where the `parameter` is a json path relative the the context data
- The location of the web application is specified using the `href` property
- If the protocol used by the web application is http or https then it is opened in a new browser tab, otherwise it is opened in a hidden iframe
