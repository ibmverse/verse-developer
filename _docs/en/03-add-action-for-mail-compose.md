---
title: Add Action for Mail Compose
lang: en
pagename: add-action-for-mail-compose
---

## Add Action for Mail Compose
In this section, you will add a new action which appear in the toolbar displayed when composing a mail i.e. Mail Compose view. When the user clicks on this action, the same external application will be opened. This extension point is very useful in cases where you want to display information relevant to a mail a user is currently composing e.g. you could use it to trigger the Watson Tone Analyser to provide the user with data on the tone of the mail before they send it.

&nbsp;

### Edit applications.json
- Open `src/applications.json` in your text editor.
- Append the following object into the actions array in `applications.json`, and save the file.

  ⚠️ Don’t forget to add a comma `,` at the end of the preceding action before adding this one.
{% highlight pre %}
{
  "id": "com.ibm.verse.ext.mail.compose.action",
  "path": "mail.compose",
  "text": "Mail Compose Action",
  "title": "Mail Compose Action",
  "location": "window",
  "renderParams": {
    "width": "900",
    "height": "500"
  }
}
{% endhighlight %}

  - Your file `applications.json` should now look like this:
{% highlight pre %}
[
  {
    "id": "com.ibm.verse.sample.app.widget",
    "name": "Widget Samples",
    "title": "Widget Sampled",
    "description": "This samples demonstrates using the widget extension point",
    "extensions": [
      {
        "id": "com.ibm.verse.sample.ext.widget",
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
              "text": "Person Widget Action",
              "title": "Person Widget Action",
              "location": "window",
              "renderParams": {
                "width": "900",
                "height": "500"
              }
            },
            {
              "id": "com.ibm.verse.ext.mail.compose.action",
              "path": "mail.compose",
              "text": "Mail Compose Action",
              "title": "Mail Compose Action",
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

&nbsp;

### Reload the extension and Verse
**Every time** you make a change to the extension code, you need to **reload the extension** first, then **reload Verse**, so that your browser and Verse will pick up your latest changes.
- To reload the extension in Chrome, open your Chrome browser, go to `chrome://extensions`, find the IBM Verse Developer Browser Extension, and click **Reload**.
- In the pop-up Mail Compose view, click on the **More actions** button.
- In the drop-down menu, click **Mail Compose Action**. This will bring up the web application you just registered with the browser extension, with information related to the Mail Compose view passed on from Verse.

&nbsp;

![Load Unpacked Extension]({{ site.url }}{{ site.baseurl }}/assets/gifs/mail_compose_action.gif)

Congratulations! You successfully added a button to the Mail Compose view, and registered the relevant application with Verse.

&nbsp;

### How it works
- This action uses the `path` property to specify were it is displayed in the Verse UI
- Using `mail.compose` as the path will cause the action to be displayed in the toolbar in the mail compose window
- The action will also be available when replying to or forwarding a mail
- The action is always displayed in the overflow menu of the toolbar