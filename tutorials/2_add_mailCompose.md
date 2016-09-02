## 3. Add Mail Compose Action

In this section, you will add an action button to the Mail Compose View, and register this new application with Verse.


### Edit widget.json
1. Open `src/widget.json` in your text editor.

2. Append the following object into the array in `widget.json`, and save the file:
  ```JavaScript
  {
    "app_id": "com.ibm.verselabs.actions.sample.mail",
    "name": "Mail Sample",
    "url": "https://git.swg.usma.ibm.com/pages/IBM-Verse/verse-developer-chrome-ext/samples/actions.html",

    "extensions": [
      {
        "type": "com.ibm.verse.action",
        "ext_id": "com.ibm.verselabs.action.sample.mailCompose",
        "name": "Mail Compose Action Sample",
        "payload": {},
        "path": "mail.compose",
        "title": "Mail Compose Action"
      }
    ],

    "payload": {
      "features": [
        "core"
      ],
      "renderParams": {
        "width": "900",
        "height": "500"
      }
    },

    "services": [
      "Verse"
    ]
  }

  ```


### Reload the extension and Verse
Every time you make a change to the extension code, you will have to reload the extension first, then reload Verse, so Chrome and Verse will pick up your latest changes.

To reload the extension, open your Chrome browser, go to `chrome://extensions`, find the IBM Verse Developer Extension for Google Chrome, and click __Reload__.
![reload extension](img/2_reload.png)


### Test it out
1. In the Verse UI, click the __Compose__ button.
![compose button](img/2_compose_action.png)

2. In the pop-up Mail Compose View, click on the __More actions__ button.
![more actions button](img/2_compose_more_action.png)

3. In the drop-down menu, click __Mail Compose Action__. This will bring up the external application you just registered with the Chrome extension, with information related to the Mail Compose View passed on from Verse.
![mail compose action button](img/2_mailcompose_action.png)

Congratulations! You have successfully added an action button to the Mail Compose View, and registered the relevant application with Verse.


### How it works
In this section, a new application with its own `app_id` is added into `widget.json` and thus registered with Verse. Under this new app, we add an extension with its own `ext_id`. It is also possible to add multiple extensions within the same app. We will give you an example in the next section.

You might have noticed that some of the properties in the newly added application are quite different from the previous bizCard application.

Under `extensions`, instead of using `object: "person"`, our new application uses `path: "mail.compose"`. This indicates the action button should be located in the Mail Compose View.

Under `payload`, instead of using `preferences`, the newly added extension uses `"features": ["core"]`. `preferences` is used to set the URL parameters, while `"features": ["core"]` indicates the application will be using cross-document messaging. This application will not be using URL to pass data from Verse, but will use cross-document messaging instead.


### Further readings:
1. [Working with the widget.json file][1]
2. [Sending data from Verse][2]
3. [Introduction to cross-document messaging][3]
4. [Adding multiple extensions][4]

[1]: {{site.baseurl}}/tutorials/ext-manifest.html
[2]: {{site.baseurl}}/tutorials/ext-send-data-to-app.html
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[4]: {{site.baseurl/tutorials/to_be_written.html}}
