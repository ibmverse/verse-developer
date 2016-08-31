## 3. Add an application for the Mail Read View

In this section, we will add an action button to the Mail Read View, and register this new application with Verse. This section is very similar to the last section.


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


### Reload the extension
Open your Chrome browser, go to `chrome://extensions`, find the IBM Verse Developer Extension for Google Chrome, and click `Reload`.
![reload extension](img/2_reload.png)


### Reload Verse and test it out
1. Navigate to your Verse URL. If you already have Verse open in your Chrome browser, you need to reload Verse to pick up your latest code changes in the extension.

2. In the Verse UI, click open a mail to inspect it in the Mail Read View.

3. In the Mail Read View, click on the "More actions" button.
![more actions button](img/3_mailread_more.png)

4. In the drop-down menu, click "Mail Read Action". This will bring up the external application you just registered with the Chrome extension, with information related to the Mail Read View passed on from Verse.
![mail read action button](img/3_mailread_action.png)

Congratulations! You have successfully added an action button to the Mail Read View, and registered the relevant application with Verse.


### How does it work?
Configuration for the Mail Read extension we just added in the current section is quite similar to the Mail Compose extension we added in the previous section.

The only difference is that, for the property `path`, instead of setting it to `mail.compose`, we are setting it to `mail.read`. This indicates the action button should be located in the Mail Read View.
