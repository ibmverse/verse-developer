## 3. Add Mail Read Action

In this section, you will add an action button to the Mail Read View. Different from the last section, instead of registering it as a new application in `applications.json`, we will put it inside the application we added in the previous section, alongside the extension for the Mail Compose View.


### Edit applications.json
1. Open `src/applications.json` in your text editor.

2. Append the following object into the `extensions` belonging to the app with `app_id`: `com.ibm.verselabs.actions.sample.mail`, and save the file:
  ```JavaScript
  {
    "type": "com.ibm.verse.action",
    "ext_id": "com.ibm.verselabs.action.sample.mailRead",
    "name": "Mail Read Action Sample",
    "payload": {},
    "path": "mail.read",
    "title": "Mail Read Action"
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

Congratulations! You have successfully added an action button to the Mail Read View, and registered it as a new extension for the Mail Read application we created in the last section.


### How it works
In the last section, you have learned how to add a new app with a new extension to `applications.json`: You append the new app object into the array in `applications.json`. In this section, you have learned how to add multiple extensions into the same app registered with `applications.json`: you append the new extension into the `extensions` array of the specific app.

Configuration for the Mail Read extension you just added in the current section is quite similar to the Mail Compose extension you added in the previous section.

In the Mail Read extension, for the property `path`, instead of setting it to `mail.compose`, you are setting it to `mail.read`. This indicates the action button should be located in the Mail Read View.
