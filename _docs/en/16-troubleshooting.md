---
title: Troubleshooting
lang: en
---

## Troubleshooting
This section describes some common issues you might experience and provides information on how to debug your application.

&nbsp;

### The Chrome Developer Extension will not load
If you are experiencing problems loading the Chrome Developer Extension as an unpacked extension, this is most likely an issue with the `manifest.json` or `applications.json` files. When you edit these files, ensure that they are well-formed with no trailing commas, no missing quotation marks, no syntax errors, etc.

&nbsp;

### The Chrome Developer Extension loads, but your extensions do not appear in Verse
If your extensions are not appearing in the Verse UI, make sure that you have specified the correct path and object properties in the [applications.json](#registering-an-application-in-ibm-verse). Also ensure that you have added the URL that you use to access Verse to the manifest file. See [here](#how-to-install) to read more on editing the manifest.

&nbsp;

### Debugging your application
Your application opens in a new window but is not working as expected, or does not appear to have received any data from Verse.

This might be an issue with the `applications.json` file. If you are using URL query string parameters, verify that the variables you added to your URL are valid and correspond to properties in the Verse API data [section](#verse-api-data). If you are using cross-document messaging, verify that you have specified the value `["core"]` for the `payload.features` property.

If you are still having problems, you will need to debug your application code using the browser developer tools. Since Verse opens your application in a new window that immediately executes your code, you will not have enough time to open the developer tools and set break points.

The simplest solution to this is to add an `alert();` followed by a `debugger;` statement.

When the new window opens and your application code starts to execute, the alert will appear and will pause the execution of your code until the alert is dismissed. Before dismissing the alert, open the developer tools. Now dismiss the alert and the the code will pause at your debugger statement.

Inspect the message event listeners and make sure that they are receiving the correct data from Verse. Verify that you are sending the `com.ibm.verse.application.loaded` message to the Verse window to indicate that your application is ready to receive data.

See [here](#sending-and-receiving-data) for more information on communicating with the Verse window.