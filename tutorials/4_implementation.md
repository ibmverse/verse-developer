## 3. Create new application implementation

In previous sections, you have learned how to register applications with Verse, and add action buttons to the Verse UI.

While registering those applications, in the `applications.json` file, we set the value of the `url` property to be the address of a sample web page we have set up for you. Now it is time for you to set up your own implementation.


### Create web page
In this step you are going to create an HTML page, which will pop up when the users click on the action buttons you added into Verse during the previous sections.

Create an empty folder on your laptop, then create a file called `index.html` inside the folder.

Open `index.html` in a text editor, copy and paste the following code into the file, then save.

```html
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Verse Developer Action Sample</title>

    <script>
      /**
       * Print out context structure for all the Action Samples
       */
      window.addEventListener("message", function(event) {
        console.log("========================message received: %O", event);
        var eventData = event.data;
        //Message from verse to check whether your web application is ready
        if (eventData.verseApiType == "com.ibm.verse.ping.widget.loaded") {
          var loaded_message = {
            verseApiType : "com.ibm.verse.widget.loaded"
          };
          //Your application must send a message back to Verse to identify that it's ready to receive data from Verse
          event.source.postMessage(loaded_message, event.origin);
        }

        // get context data sent from Verse and print it out in the context div
        if (eventData.verseApiType == "com.ibm.verse.action.clicked") {
          var actionData = eventData.verseApiData;
          var context = actionData.context;
          document.getElementById("context").innerHTML = actionData.actionId + "<hr><pre>"
           + JSON.stringify(context, null, 2) + "</pre><hr>";
        }
      }, false);

      /**
       * Retrieve data from URL in the Person Action Sample, and print it in the search_part div.
       */
      window.addEventListener("load", function(event) {
        var eventData = event.data;
        console.log("==========================event", event);
        console.log("========================location.search", window.location.search);
        document.getElementById("search_part").innerHTML = window.location.search;
      }, false);
    </script>
  </head>

  <body>
    <h1>Verse Developer Action Sample</h1>
    <div id="search_part"></div>
    <h2>Context Structure</h2>
    <div id="context"></div>
  </body>
</html>
```
This sample HTML will print out all the information sent from Verse for each of the action button added. In the case of the bizCard extension, it also prints out the query arguments appended to the URL. We have provided explanation of the code as comments inside this HTML file. We have also added some `console.log` to print out details of the event sent from Verse to the application. You can use the Chrome dev tool and open the console of the pop-up window to inspect the these event details.


### Set up a web server
You will need a place to host the web page you just created.

If you are familiar with setting up your own server for hosting web pages, or prefer to use some alternative solutions such as FireFox Thimble, feel free to skip to the next step [Edit applications.json to point to your new URL](#edit-widget.json-to-point-to-your-new-URL).

Otherwise, you can use the Chrome Web Server to set up a localhost on your machine by following these steps:

Install the Chrome Web Server from the [Chrome Web Store][1] using your Chrome browser.

After installing, you can launch it by navigating to `chrome://apps` in your Chrome browser, and click on the icon for the Chrome Web Server:

![Chrome web server](img/4_chrome_webServer.png)

After the app is launched, click the __choose folder__ button, select the folder where you put the `index.html` file you just made.
![choose folder](img/4_choose_folder.png)

In the __options__ section, check the option "Automatically show index.html"
![automatically show index.html](img/4_show_index.png)
This will allow you to use the Web Server URL shown in the section below without appending `/index.html` after the URL.

Afterwards, toggle the __Web Server: STARTED__ button to stop, then restart the web server. Once the server is started (indicated by a blue color on the button), you can access index.html by clicking on the link provided under the __Web Server URL(s)__ section, or by typing that address yourself into the browser. You shall see the web page you created in the previous step pops up in a separate window. There won't be much showing up on that page as you are not accessing it via Verse.
![server toggle button](img/4_toggle_server.png)


### Edit applications.json to point to your new URL
Open applications.json in a text editor. Change the value for all the `url` properties to the address where your index.html page is hosted. If you were following our tutorial to use the Web Server for Chrome app to set up the server, this will be the value provided by the app under the section __Web Server URL(s)__.


### Test it out
Now try it out in Verse. Don't forget to reload the extension, then Verse to pick up your latest code changes!

Try clicking the action buttons you added into Verse in previous steps, including the __Person Action__ button at the back of the bizCard, the __Mail Compose Action__ button in the Mail Compose View, and the __Mail Read Action__ in the Mail Read View. These actions will bring up in a separate window the web page you added in the previous section [Create web page](#create-web-page) and hosted at the URL you specified in `applications.json`.


### How it works
When users click on the action buttons in Verse added via the `applications.json` file, Verse open your application in a separate window, waited for your application to get ready, and send the relevant data to your application, hosted at the URL you specified in `applications.json`.

Now you have learned how to register your application with Verse, add action buttons to the Verse UI, and get Verse send data to your application, you can modify the sample HTML code we provided you in the previous section [Create web page](#create-web-page) to make your own application for Verse!


[1]: https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en
