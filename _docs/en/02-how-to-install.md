---
title: How to Install
lang: en
pagename: how-to-install
---

## How to Install
In this section, you will install the default Verse Developer browser extension and make it work with Verse. This Verse Developer browser extension already has one sample application, which contains one extension.

&nbsp;

### Download source code for Verse Developer Extension
- Download the Verse Developer Browser Extension source code to your local file system by clicking [here]({{site.data.developers.verseDeveloperExtensionSource}}). Alternatively, you can fork the repository from here instead of downloading it.
- Extract the folder at a location convenient to you.
- After you have extracted the folder, locate the `src` folder. In this tutorial, you will modify the `manifest.json` and `applications.json` files from within the `src` folder.

&nbsp;

We have also provided a `tutorial_getting_started` folder which contains four subfolders: `step2`, `step3`, `step4`, and `step5`. These subfolders contain the completed version of the files modified in each step of this tutorial.

&nbsp;

### Update manifest.json
In the `src/manifest.json` file there is a `matches` property, which contains an array of URLs. The extension will only run if the URL visited by the user matches one of the URLs listed in this array. If the Verse URL you are using is not listed in this array, update the `manifest.json` file to include it:
- Open `src/manifest.json` file in a text editor.
- See if the value for the property `matches` contains the URL you will be using for Verse. The `*` at the end of a URL means matching 0 or more characters. We recommend adding the `*`.
- If your Verse URL is already there, proceed to the next step to install Verse Developer on either Google Chrome or Firefox. Otherwise, append the Verse URL you will be working with into the array as a string. **Don’t forget to add a comma `,` at the end of the preceding URL before adding your own.**

&nbsp;

In code snippet below shows the `manifest.json` edited to include the `https://mail.notes.collabservintegration.com/verse Verse URL`

{% highlight pre %}
{
  "name": "HCL Verse Developer Browser Extension",
  "version": "1.0.0",
  "manifest_version": 2,
  "applications": { "gecko": {"id": "verse_dev_extension@ibm.com", "strict_min_version": "45.0"} },
  "content_scripts": [ {
    "js": [ "contentscript.js"],
    "matches": [
      "https://mail.notes.na.collabserv.com/verse*",
      "https://mail.notes.ap.collabserv.com/verse*",
      "https://mail.notes.ce.collabserv.com/verse*"
    ],
    "run_at": "document_start"
  }],
  "web_accessible_resources": [
    "page.js",
    "applications.json",
    "samples/templatedLink.html",
    "samples/actions.html",
    "custom-name-picker/index.html",
    "hook-before-send/index.html"
  ]
}
{% endhighlight %}

&nbsp;

### Installing to Chrome
- Open your Google Chrome browser, and type in the address bar: `chrome://extensions`.
- Select **Developer mode**, (unpacked extensions can only be loaded in **Developer mode**.)
- Click the button **Load unpacked extension…**.
- In the pop-up file picker, select the `src` folder, which contains the `manifest.json` file.
- At this point, you should be able to see the HCL Verse Developer Browser Extension loaded into your `chrome://extensions` page.

![Load Unpacked Extension]({{ site.url }}{{ site.baseurl }}/assets/gifs/load_unpacked_extension.gif)

If you received an error related to `Failed to load extension from: ... Manifest file is missing or unreadable`, make sure you are loading the extension from the src folder, not its parent folder.

&nbsp;

### Installing to Firefox
- Open your Firefox browser, and type in the address bar: `about:debugging`.
- Select **Load Temporary Add-On**.
- In the pop-up file picker, select the `manifest.json` file inside the `src` folder.
- At this point, you should be able to see the HCL Verse Developer Browser Extension loaded into your `about:debugging` page.

![Load Unpacked Extension]({{ site.url }}{{ site.baseurl }}/assets/gifs/load_temporary_addon.gif)

&nbsp;

### Reload Verse and test it out
- **Reload Verse**, so that it will pick up the change you made to the extension.
- Hover over a People bubble, and click on the **i** icon to bring up the business card.
- Click on the **arrow** button located at the right bottom part of the business card to turn the card around.
- At the back of the business card you will see a new link called **Person Action**.
- Click on the **Person Action** link. This will load a web page in a popup window and display details of the messages that were sent from Verse to that page.

![Load Unpacked Extension]({{ site.url }}{{ site.baseurl }}/assets/gifs/person_action.gif)

&nbsp;

### How it works
If you have reached this step, congratulations! You successfully installed the Verse Developer Extension with one default application. But how does this all work?

&nbsp;

An external application is registered with Verse via the file `applications.json`
{% highlight pre %}
[
  {
    "name": "Widget Samples",
    "title": "Widget Sampled",
    "description": "This samples demonstrates using the widget extension point",
    "extensions": [
      {
        "name": "Person Action Sample",
        "type": "com.ibm.verse.ext.widget",
        "payload": {
          "url": "${extensionPath}/samples/actions.html",
          "features": [
            "core"
          ],
          "actions": [
            {
              "id": "com.ibm.verse.ext.person.action",
              "object": "com.ibm.appreg.object.person",
              "text": "Person Action",
              "title": "Person Action",
              "location": "window",
              "renderParams": {
                "width": "900",
                "height": "500"
              }
            }
          ]
        }
      }
    ],
    "services": [
      "Verse"
    ]
  }
]
{% endhighlight %}
- The external application has `id`, `name`, `title` and `description` properties which are self explanatory.
- The external application also declares a single extension of type `com.ibm.verse.ext.widget` which is used to integrate a third party web application.
- The web application location is specified in the `payload` object via the `url` property.
- For this sample the web application is a simple page which listens for messages from Verse and displays them.
- The web page is loaded from within the browser extension as a web accessible resource, hence the url beginning with `${extensionPath}`.
- The web application must also send a `com.ibm.verse.application.loaded` message to Verse to signal that it has successfully loaded.
- If the web application does not send a `com.ibm.verse.application.loaded` message to Verse within 30 seconds then Verse will display an error message to the user.
- The extension declares one action which is bound to the `com.ibm.appreg.object.person` object, which means it displays on the back of all Verse business cards.
- When this action is triggered it will open the associated web application in a new window which is 900 X 500 pixels in size.
- The web application receives a message when the action is clicked with a context object which contains data about the person whose business card the action was triggered from.

&nbsp;

To learn more about context objects and how they get sent, please refer to **Verse API data** and **Sending and receiving data from Verse** in the [HCL Verse Extensibility](#ibm-verse-extensibility) section at the end of the tutorial.

&nbsp;

In the next section, you will learn how to add further actions to the mail compose and mail read parts of the Verse UI.
