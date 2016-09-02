## 3. Add an application for the Mail Read View

In this section, you will add an action button to the Mail Read View, and register this new application with Verse. This section is very similar to the last section.


### Edit widget.json
1. Open `src/widget.json` in your text editor.

2. Append the following object into the array in `widget.json`, after the Mail Compose application you just added in the previous section, and save the file:
  ```JavaScript
  {
    "app_id": "com.ibm.verselabs.actions.sample.mailRead",
    "name": "Mail Read Sample",
    "url": "https://yourcompany/mailReadSample.html",

    "extensions": [
      {
        "type": "com.ibm.verse.action",
        "ext_id": "com.ibm.verselabs.action.sample.mailRead",
        "name": "Mail Read Action Sample",
        "payload": {},
        "path": "mail.read",
        "title": "Mail Read Action"
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
As is explained in previous section, every time you make a change to the extension code, you will have to reload the extension from `chrome://extensions__`, then reload Verse, so Chrome and Verse will pick up your latest changes.


### Test it out
1. In the Verse UI, click open a mail to inspect it in the Mail Read View.

2. In the Mail Read View, click on the "More actions" button.
![more actions button](img/3_mailread_more.png)

3. In the drop-down menu, click "Mail Read Action". This will bring up the external application you just registered with the Chrome extension, with information related to the Mail Read View passed on from Verse.
![mail read action button](img/3_mailread_action.png)

Congratulations! You have successfully added an action button to the Mail Read View, and registered the relevant application with Verse.


### How does it work?
Configuration for the Mail Read extension you just added in the current section is quite similar to the Mail Compose extension you added in the previous section.

The only difference is that, for the property `path`, instead of setting it to `mail.compose`, you are setting it to `mail.read`. This indicates the action button should be located in the Mail Read View.
