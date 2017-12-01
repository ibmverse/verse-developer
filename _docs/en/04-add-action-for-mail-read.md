---
title: Add Action for Mail Read
lang: en
pagename: add-action-for-mail-read
---

## Add Action for Mail Read
In this section, you will add an action which will display when the user is reading a mail i.e. the Mail Read view. When the user clicks on this action, the same external application will be opened. This extension point is very useful for cases where you want to transfer received mails from Verse to another application e.g. you could use this to post a mail to Watson Workspace.

&nbsp;

### Edit applications.json
- Open `src/applications.json` in your text editor.
- Append the mail read action object into the `com.ibm.verse.sample.ext.widget.mail.actions` extension belonging to the application with id: `com.ibm.verse.sample.app.widget`, and save the file.

  ⚠️ Don’t forget to add a comma `,` at the end of the preceding action object before adding your own.

{% highlight pre %}
{
  "id": "com.ibm.verse.ext.mail.read.action",
  "path": "mail.read",
  "text": "Mail Read Action",
  "title": "Mail Read Action",
  "location": "window",
  "renderParams": {
    "width": "900",
    "height": "500"
  }
}
{% endhighlight %}

Your file `applications.json` should look something like this:
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
            },
            {
              "id": "com.ibm.verse.ext.mail.read.action",
              "path": "mail.read",
              "text": "Mail Read Action",
              "title": "Mail Read Action",
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
As explained in the previous section, **every time** you make a change to the extension code, you need to **reload the extension** then **reload Verse**, so that the browser and Verse will pick up your latest changes.

### Test it out
- In the Mail Read view, click on the **More actions** button.
- In the drop-down menu, click **Mail Read Action**. This will bring up the web application you just registered with the browser extension, with information related to the Mail Read view passed on from Verse.

&nbsp;

![Load Unpacked Extension]({{ site.url }}{{ site.baseurl }}/assets/gifs/mail_read_action.gif)

Congratulations! You successfully added an action button to the Mail Read view, and registered it as a new extension for the Mail Read application that you created in the last section.

&nbsp;

### How it works
- This action also uses the `path` property to specify were it is displayed in the Verse UI
- Using `mail.read` as the path will cause the action to be displayed in the toolbar in the mail preview area
- The action is always displayed in the "More actions" dropdown menu of the toolbar
