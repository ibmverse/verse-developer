---
[//]: # (Copyright IBM Corp. 2016, 2017.  All Rights Reserved.)

layout: reference
title:  "Verse Extensibility Documentation"
categories: reference
---

# {{page.title}}

### Contents

* [Introduction to IBM Verse Extensibility](#introduction-to-ibm-verse-extensibility)
* [Extensibility Concepts](#extensibility-concepts)
* [Verse Extension Points](#verse-extension-points)
* [Registering an Application in IBM Verse](#registering-an-application-in-ibm-verse)
* [Sending and Receiving Data](#sending-and-receiving-data)
* [Verse API Data](#verse-api-data)
* [Editing the Manifest](#editing-the-manifest)
* [Security](#security)
* [Troubleshooting](#troubleshooting)

## Introduction to IBM Verse Extensibility

Verse Extensibility allows you to integrate your own web applications with IBM Verse, by registering your application with it. Your application can declare one or more extensions, which will enhance Verse with new functionality.

For example, one of the extension points that Verse supports is a templated link extension. A templated link extension is displayed as a link in the Verse User Interface (UI) which, when clicked, opens a URL to a third party web application.

An extension can declare that it requires specific data from Verse, and when the extension is activated, Verse will send this data to it. For example, if you add a templated link to a Verse business card, your extension can be configured to receive the email address of the person included in the link URL.

## Extensibility Concepts  
This section introduces extensibility concepts and terminology that is used throughout this document.

* Application: A third-party web application that contributes new functionality to IBM Verse.
  An application can contribute one or more new features to different parts of the IBM Verse UI.

* Extension: A feature that contributes to a specific part of IBM Verse. For example, an extension that adds a button or link to the Verse UI which, when clicked, opens a new browser window containing a third-party web application.
The URL of the application is registered with Verse and the application opens in a separate window.
The application has access to Verse data through cross-document messaging or URL query string parameters.

* `applications.json`: This file contains the details of your application: where in the Verse UI your extensions will appear, how your application communicates with Verse, etc. See the `applications.json` [section](#registering-an-application-in-ibm-verse) for more information.

## IBM Verse Container

IBM Verse Container allows applications to contribute or remove UI at specific locations within the container. Path and Object are the ways the container provides the ability to target a location.

### Path

IBM Verse allows extensionss to contribute or remove UI at specific locations in Verse. A `path` is one way the container provides the ability to target a location. Here is an example of 2 supported `path`s:

  * `mail.read` - allows application developers to contribute an action under more actions button when viewing an existing email
  * `mail.compose` - allows application developers to contribute an action under more actions button when composing a new email


### Object

Another way for a container to allow extensions to target locations is by an `object` type. IBM Verse also supports an extension to add a button on Person object. For example, an extension is contributed to the bizcard cards which has a person object. Here is an example of a supported `object`

  * Person (type = com.ibm.appreg.object.person)


## Verse Extension Points
IBM Verse supports the general extension points defined by appregistry, like the Simple Link and Templated Link. Besides that, Verse also supports to contribute a Widget extension to add some Widget Actions to Verse UI page. For example, a widget can contribute an action to More Actions… menu in toolbar when composing/viewing a message, or contribute an action to Verse business card.

For a simple and templated link type extension, it will be rendered as a plain link on the Verse UI. Therefore, when a link type extension clicks, it will be open in a new tab/window.

Simple Link and Templated Link extensions provide an easy way to contribute clickable UI artifacts that result in the opening of a webpage in a new tab/window.

However, Widget Action's inside of Widget's allow those same kinds of clickable UI artifacts to trigger programmatic logic inside of widgets, which are like mini web applications that can respond to that input.

Here is the full list of extension points that Verse supports.

* [com.ibm.appreg.ext.simpleLink](#simple-link-comibmappregextsimplelink)
* [com.ibm.appreg.ext.templatedLink](#templated-link-comibmappregexttemplatedlink)
* [com.ibm.verse.ext.widget](#widget-comibmverseextwidget)
* [com.ibm.verse.ext.namePicker](#name-picker-comibmverseextnamepicker)
* [com.ibm.verse.ext.beforeOnSend](#before-on-send-comibmverseextbeforeonsend)
* [com.ibm.verse.ext.liveText](#live-text-comibmverseextlivetext)

### Simple Link (com.ibm.appreg.ext.simpleLink)

A Simple Link extension adds a clickable URL link to the Verse UI.

#### Required Properties for a Simple Link

* {string} `text` The text for the link
* {string} `href` The link location

#### Optional Properties for a Simple Link

* {string} `icon` An icon to use when rendering the link. The only value format supported for this property is a data-uri with a base64 encoded payload.
* {string} `alt` Alt text for the link.

#### Example Simple Link

```json
  {
    "type": "com.ibm.appreg.ext.simpleLink",
    "object": "com.ibm.appreg.object.person",
    "payload": {
      "text": "Click this sample link!",
      "href": "https://sample.com/simple-link-target.html",
      "icon": "data:image/png;base64,..."  
    }
  }
```

### Templated Link (com.ibm.appreg.ext.templatedLink)

A Templated Link extension adds a clickable URL link to the Verse UI including the option to configure the extension to receive data from Verse encoded in the URL.

Templating Syntax

Values contained within the extension that have text of the format ${property} will be replaced with the value keyed by 'property' from the context of the bound object.

Templating Syntax of plural-fields

Values contained within the extension that have text of the format ${property.type} will be replaced with the value within the plural-field keyed by 'property' which has the type 'type' from the context of the bound object.

If there are multiple values within the plural-field keyed by 'property' that have type 'type', preference will be given to the value of type 'type' that is "primary". If there is no "primary" within the set of plural-field values of type 'type', it is up to the Container's discretion to determine which value is returned.

If no .type is specified and the specified 'property' keys a plural-field value, the primary entry of the plural-field will serve as the replacement value.

EX: emails is a plural field

```
  {
    emails: [
      {
        type: 'work',
        primary: false,
        value: altwork@DOMAIN.COM
      },{
        type: 'home',
        primary: false,
        value: home@DOMAIN.COM
      },{
        type: 'home',
        primary: true,
        value: primaryhome@DOMAIN.COM
      },{
        type: 'work',
        primary: false,
        value: work@DOMAIN.COM
      }
    ]
  }
```

```
${emails} -> primaryhome@DOMAIN.COM      //The primary value
${emails.work} -> altwork@DOMAIN.COM     //The first occurrence of type "work" (container's disgression)
${emails.home} -> primaryhome@DOMAIN.COM //The primary value for type "home" (primary is of type "home")
```

#### Required Properties for a Templated Link

* {string} `text` The text for the link
* {string} `href` The link location. Verse will take care to URL encode values replaced in the href property.

#### Optional Properties for a Templated Link

* {string} `icon` An icon to use when rendering the link. The only value format supported for this property is a data-uri with a base64 encoded payload.
* {string} `alt` Alt text for the link.
* {string} `locator` A hint for container where to render the link within the UI representation of the binding object. Verse currently does not use the `locator` property.

#### Example Templated Link

```json
  {
    "type": "com.ibm.appreg.ext.templatedLink",
    "object": "com.ibm.appreg.object.person",
    "payload": {
      "text": "Look up ${displayName} in the directory!",
      "href": "https://sample.com/simple-link-target.html?user=${emails.work}",
      "icon": "data:image/png;base64,...",
      "locator": "profile"
    }
  }
```

### Widget (com.ibm.verse.ext.widget)

A Widget extension associates a third party web application with Verse by opening a new browser window/tab or embedding the application using an `iframe` within the Verse UI. A widget extension may contribute multiple Widget Actions to the Verse UI.

All of actions in the widget will share the same url. When Widget Action is clicked, the application opened by the widget’s url will be rendered on the different place based on the action’s location.

Widget Definition

The definition of a widget MAY contains 1 or multiple Widget Actions. The Widget Actions can be also dynamically added to a widget.

#### Required Properties for a Widget

* {string} `url` The widget’s url, when the action in the widget is clicked, the widget will open the url on the place specified by the action’s location.
* {array} `actions` An array of Widget Actions. This property identifies the contributed Widget Actions by this widget.

#### Optional Properties for a Widget

* {array} `features` An array of string. The property is used to specify what features provided by the container are used by this application. Each feature maps to a set of APIs provided by the container. If the application needs to use certain APIs, it needs to add the corresponding feature to this property. The supported features are listed below.
  * core - that means the widget needs to communicate with Verse page via cross document messaging.

#### Example Widget

In this sample, a widget contains two actions, one action is contributed under 'more actions' button when viewing an existing email and the second action is contributed under 'more actions' button when composing a new email. When the actions are clicked, the widget will be rendered on the new window which width and height are both 800px.

```json
  {
    "type": "com.ibm.verse.ext.widget",
    "payload": {
      "url": "https://sample.com/widget.html",
      "features": ["core"],
      "actions": [
        {
          "id": "com.ibm.verse.widget.action.mailRead1",
          "path": "mail.read",
          "text": "Click this action",
          "icon": "data:image/png;base64,...",
          "location": "window",
          "renderParams": {
            "width": "800",
            "height": "800"
          }
        },
        {
          "id": "com.ibm.verse.widget.action.mailCompose1",
          "path": "mail.compose",
          "text": "Click this action",
          "icon": "data:image/png;base64,...",
          "location": "window",
          "renderParams": {
            "width": "800",
            "height": "800"
          }
        }
      ]
    }
  }
```

#### Widget Action

A widget action is a UI component which will be contributed to Verse page. An action MUST be contained in a widget extension, it can’t be directly added into `Application`s extensions array.

When a contributed action is clicked, the widget will be rendered in a different place based on the `location` value.

#### Required Properties for a Widget Action

* {string} `id` The id for the action.
* {string} `text` The text for the action.
* {string} `path`|`object` The path identifies where the action is contributed. All of supported paths are listed here. The object states which data type the action is contributed. All of supported objects are listed here.

#### Optional Properties for a Widget Action

* {string} `icon` An icon to use when rendering the action. Containers MAY choose to not honor this attribute for any reason, for example: if it would be inappropriate to render an icon in the `location` it was contributed to. The preferred format for the icon is a data-uri.
* {string} `alt` Alt text for the action.
* {object} `location` The property is used to specify where to render the widget. The acceptable values can be "window", "tab" or "embedded".
  * window - the widget will be open in the new window. We can use renderParams to specify the new window’s size.
  * tab - the widget will be open in the new tab.
  * embedded - the widget will be open inside an iframe. This value is only supported for Mail Compose actions.
* {object} `renderParams` The property is used to specify the window size when the application is open in a new window. The renderParams property contains width and height properties which are used to specify the new window’s width/height accordingly. This property is only valid if the location’s value is ‘window’.

#### Example Widget Action
```json
  {
    "id": "com.ibm.verse.widget.action.mailCompose",
    "path": "com.ibm.verse.path.mailCompose",
    "text": "Click this action",
    "icon": "data:image/png;base64,...",
    "location": "window | tab | embedded",
    "renderParams": {
      "width": "800",
      "height": "600"
    }
  }
```

### Name Picker (com.ibm.verse.ext.namePicker)
The Name Picker extension point allows the integration of a custom UI for selecting addresses when sending an email. When a custom name picker is contributed to Verse, the ‘To’ label in the UI for composing a mail will be rendered as a link. On clicking the link, the name-picker will be rendered inside of the mail compose view. The user can select names using the name pickerand these will be added to whichever of ‘To’, ‘Cc’ or ‘Bcc’ input fields is currently selected.


#### Required Properties for a Name Picker

* {string} `id` The id for the custom name picker.
* {string} `url` The widget’s url, when the __To__ link is clicked, a new iframe will open in the mail compose view pointing to this URL. The resource at the URL must display a UI allowing the user to add names to the email.

#### Example Name Picker
```json
  {
    "id": "com.ibm.verse.custom.name.picker",
    "name": "Custom name picker",
    "title": "Name Picker",
    "description": "Custom name picker on mail compose",
    "extensions": [
      {
        "type": "com.ibm.verse.ext.namePicker",
        "ext_id": "com.ibm.verse.namepicker.sample.compose",
        "has": "custom-name-picker",
        "name": "Custom name picker in mail compose",
        "url": "${extensionPath}/custom-name-picker/index.html",
        "title": "Add Contact"
      }
    ],
    "payload": {},
    "services": [
      "Verse"
    ]
  }

```

### Before On Send (com.ibm.verse.ext.beforeOnSend)
The Before On Send extension point allows third party logic to be invoked which can validate the content of an email. The extension can either display a UI e.g. to warn the user about something in the mail or can allow the mail to be sent. By default if an extension displays a UI with a warning the user can decide to send the mail anyway by clicking the send button again.

An optional property called `disableSend` is provided to control the send button behavior. By default `disableSend` is set as false, which means that send button will always be enabled and the user can send the message even if the extension displays a warning. If `disableSend` is set as true, when the user clicks the send button it becomes disabled while the extension is loading and validating the mail. There are a number of options available to the extension:

* If it determines the mail is OK to send it can allow it to be sent without any further action from the user.
* If it wants to display a warning to the user but still allow them to send the mail it can display a UI and re-enable the send button.
* If it wants to block the user from sending the mail it can display a UI and leave the send button disabled.
* In case the external application fails to load, the ‘Send’ button will be automatically re-enabled and a message will be displayed to the user warning them that there is risk associated with sending the mail because the extension to which validates mails cannot be loaded.

#### Required Properties for a Before On Send

* {string} `id` The id for the custom name picker.
* {string} `url` The widget’s url, when the Send button is clicked, the URL is opened in a hidden iframe.

#### Example Before On Send
```json
  {
    "id": "com.ibm.verse.app.beforeOnSend",
    "name": "Hook Before Send Sample",
    "title": "Hook Before Send Sample",
    "description": "Sample that shows how to check for a credit card number in mail being sent",
    "extensions": [
      {
        "type": "com.ibm.verse.ext.beforeOnSend",
        "ext_id": "com.ibm.verse.ext.sample.beforeOnSend",
        "name": "Hook Before Send Extension",
        "title": "Hook Before Send Extension",
        "url": "${extensionPath}/hook-before-send/index.html"
      }
    ],
    "services": [
      "Verse"
    ]
  }

```

### Live Text (com.ibm.verse.ext.liveText)
The Live Text extension point recognizes defined patterns of data in email, and displays the information with an underline. Clicking the live text displays a menu of custom actions; for example, to open a web application or start a chat. The pattern and the corresponding actions are defined in an extension that is added to Verse.

Note: For a tutorial on creating Live Text extensions in Verse, see [Live Text Extension Tutorial][11]. For instructions on exporting Live Text widgets from Notes so you can import them into Verse, see [Exporting a Live Text Widget from IBM Notes][12]

#### Required Properties for Extensions  
* __{string}__ `text` The text for the Live Text action.   
* __{string}__ `href` The Live Text link location. Use ${groupNumber} to define a variable in the href. The groupNumber is the group number of regular expression defined in recognizer. When execute a Live Text action, the ${groupNumber} will be replaced with text recognized by the groupNumber group.  
* __{string}__ `recognizer` A regular expression in string form, not a regex literal, to recognize the specified text pattern as Live Text.  

#### Optional Properties for Extensions  
* __{string}__ `alt` Alt text for Live Text action.  
* __{string}__ `location` This property specifies where to open the Live Text extension. The acceptable values can be `window` or `tab`.  
    * `window` - The Live Text extension will be opened in the new window. We can use renderParams to specify the new window’s size. If renderParams is not provided, a default renderParams will be used.
    * `tab` - The Live Text extension will be opened in the new tab.
* __{object}__ `renderParams` This property specifies the window size when the extension is open in a new window. The renderParams property contains `width` and `height` properties, which are used to specify the new window’s width/height accordingly. This property is only valid if the `location`’s value is `window`.

#### Example Live Text extension
```json
  {
    "name": "Live Text Widget Sample application",
    "title": "Live Text Widget Sample",
    "description": "The sample shows how to contribute a live text extension in Verse",
    "extensions": [
      {
        "name": "Live Text Widget Sample extension",
        "ext_id": "com.ibm.verse.livetext.sample",
        "type": "com.ibm.verse.ext.liveText",
        "payload": {
          "text": "Live Text Widget Action",
          "href": "${extensionPath}/${1}/sample1.html?tel=${2}",
          "recognizer": "Path:([a-z].*), Tel:([0-9]{8}).*",
          "location": "window",
          "renderParams": {
            "width": "800",
            "height": "600"
          }
        }
      }
    ],
    "payload": {},
    "services": [
      "Verse"
    ]
  }
```

The ${extensionPath} in above example is only a path var of this repository. You need to use absolute path in your own extensions if your extension page is not in this repository.

The `ext_id` property is only required when you import extension json in Appregistry. It is not a required property for this extension point or Verse.

## Registering an Application in IBM Verse
To add an application to Verse, you need to register it using the IBM App Registry. For development purposes
you can use the [IBM Verse Developer Extension for Google Chrome][4]{:target="_blank"}. There is a [tutorial](../tutorials/tutorial_verse_developer.html){:target="_blank"} to get you started.

### Your Application
You will need to provide Verse with the URL to your web application. Once an extension is clicked in the Verse UI, the URL will be loaded in a new window. If cross-document messaging is configured, the initial web page can use JavaScript to listen for a window message event containing a context object after it loads. This object has information from Verse for your extension, as specified in the `applications.json` file.

When using the Chrome extension, you will need to add the URL of your application and the extension(s) to the `applications.json` file. The Chrome extension will use the extension definitions from this file and register them with Verse.

### File structure of `applications.json`

The `applications.json` file contains a list of Application definitions in JSON format

```javascript
  [
    {
      "id": "com.ibm.verse.actions.sample1",
      ...
    },
    {
      "id": "com.ibm.verse.actions.sample2",
      ...
    }
  ]
```

Here are three different samples of valid `applications.json`:

* [Sample 1][1]{:target="_blank"}
* [Sample 2][2]{:target="_blank"}
* [Sample 3][3]{:target="_blank"}

### Application Properties

An application definition __must__ contain the following properties:

* `id` The __unique__ identifier for the application, using the form: com.companyName.
* `name` The name of your application. This must be __unique__.
* `title` The title of your application.
* `description` The description of your application.
* `extensions` An array of of extension definitions. See below for the properties of this object.
* `services` Describes which services the extension is deployed to. `"Verse"` is the only supported value.

### Extension Properties

An extension definition __must__ contain the following properties. __Only one of `object` or `path` is required__:

* `id` The ID of the action extension. This must be __unique__.
* `type` The type of extension being configured (for example, `com.ibm.verse.action` specifies an action contribution).
* `name` The name of the action extension in the UI. This must be __unique__.
* `payload` The payload property indicates optional properties of the extension. _The `payload` property is required, but its value can be empty_.
* `object` The object property indicates that the extension displays in a view that provides the specified object.  
Using the person value specifies that the extension displays in a view that provides the person object.  
For example, if the business card view provides the person data type, then the extension contribution will be shown on the business card view.  
_This property is not required if you are using the `path` property._
* `path` The path property displays an extension in the mail compose view or the mail read view. Valid values are `"mail.read"` or `"mail.compose"`. *This property is not required if you are using the `object` property.*

### Payload Properties

* `features` This property indicates which Verse API is called by the application. The list of features is an array, enclosed in square brackets. Currently, the only accepted value is `["core"]`, which indicates that you are invoking the Verse core API.
* `renderParams` This is an object that contains properties on how the application window is displayed. This object is passed to `window.open()`. See [here][6]{:target="_blank"} for a complete list of properties.

## Sending and Receiving Data

Verse supports both URL query string parameters and/or cross-document messaging to communicate with your application. Both methods are described below.

### Passing data in a URL

Your application can receive data from Verse through URL query string parameters, which are added to the URL specified in the `applications.json` file. Valid parameters are described in the [Verse API Data](#verse-api-data) section.

For example, to send the name of a user from a business card extension to your application, specify the following URL in the `applications.json` file: `https://<your-domain-here>/extension.html?username=<profile.name>`. `profile.name` is a variable that contains the user's name.

In your application, you retrieve the URL query string parameters as usual.

### Passing data through cross-document messaging

If your web application cannot support receiving data from a URL request, you can use cross-document messaging instead. To use this method, you must add the features property to the manifest with the value of `["core"]` so that your web application can communicate with Verse.

In your application code, you must send a `"com.ibm.verse.application.loaded"` message back to the Verse window, so that Verse knows your web application is ready to receive data. If you have a reference to the Verse window, you can do this at the beginning of your code; otherwise wait for the message `"com.ibm.verse.ping.application.loaded"` because the source of this message will be the Verse window.

To handle messages from Verse, your web application needs to register an event listener by using

```javascript
  window.addEventListener("message", function(event) {
    // handle message event code
  });
```

See [here][5]{:target="_blank"} for the complete code source of a sample application that demonstrates the concepts described in this section. Please be aware that this example lacks certain security implementations for simplicity. To make it more secure for your own purpose, please refer to the [Security](#security) section, which includes suggested security implementations when using cross-document messaging.


## Verse API Data

Verse is able to send data to your application using what's known as a context object. It is passed in the message event object of the `window.postMessage` function. This section shows the structure of the different context objects that are sent by Verse.

The information contained in the context object depends on the action extension used. For example, adding a mailRead action extension sends information relating to the selected mail: title, subject, body, etc. Adding a business card action extension sends the person's name, email, phone, etc.

### Parsing the Verse API Data

The message event received by your application contains an object called `data`, which has an object called `verseApiData`. You will need to check that the `actionId` property of the `verseApiData` object matches the extension `id` in your `application.json` file. This will ensure that you only run your code for the correct message events.

For example:

```javascript
  window.addEventListener("message", function(event) {
    if (event.data.verseApiData.actionId === "com.ibm.verse.action.sample.person") {
      var verseData = event.data.verseApiData.context;
    }
  }
```

In the code example above, you can see that the information that you need from Verse is stored in the context property, which you can check with the if statement. The value of the verseData variable depends on which extension is used.

In the sections below, the structure of each of the different context objects is outlined.

#### Widget Extensions

* [mail.compose:](#mail-compose) This appears when composing a new mail under the `more actions` button.
* [mail.read:](#mail-read-view) This appears when viewing an existing mail under the `more actions` button.
* [person:](#business-card) This appears on the back of the business card.


#### Mail Compose

```
  {
    "body": "",
    "contextId": "",
    "id": "",
    "recipientCC": [
      {
	"displayName": "",
	"emailAddress": ""
      }
    ],
    "recipientTo": [
      {
	"displayName": "",
	"emailAddress": ""
      }
    ],
    "subject": ""
  }
```

#### Mail Read View

```
  {
    "body": "",
    "contextId": "",
    "id": "",
    "recipientCC": [
      {
        "displayName": "",
        "emailAddress": ""
      }
    ],
    "recipientTo": [
      {
        "displayName": "",
        "emailAddress": ""
      }
    ],
    "sender": {
      "displayName": "",
      "emailAddress": ""
    },
    "subject": "",
    "timeSent": ""
  }
```

#### Business Card

```
  {
    "currentUser": {
      "company": "",
      "displayName": "",
      "fax": "",
      "id": "",
      "jobTitle": "",
      "mobilePhone": "",
      "name": {
	"displayName": "",
	"displayType": "",
	"familyName": "",
	"formatted": "",
	"givenName": "",
	"honorificPrefix": "",
	"honorificSuffix": "",
	"middleName": ""
      },
      "network": "",
      "orgId": "",
      "photo": "",
      "photoUrl": "",
      "primaryAddress": "",
      "primaryEmail": "",
      "primaryPhone": "",
      "status": "",
      "tags": "",
      "website": ""
    },
    "profile": {
      "company": "",
      "displayName": "",
      "fax": "",
      "id": "",
      "jobTitle": "",
      "mobilePhone": "",
      "name": {
	"displayName": "",
	"displaytype": "",
	"familyName": "",
	"formatted": "",
	"givenName": "",
	"honorificPrefix": "",
	"honorificSuffix": "",
	"middleName": ""
      },
      "network": "",
      "orgId": "",
      "photo": "",
      "photoUrl": "",
      "primaryAddress": "",
      "primaryEmail": "",
      "primaryPhone": "",
      "status": "",
      "tags": "",
      "website": ""
    }
  }
```

## Editing The Manifest

If the URL that you use to access Verse is specific to your company, you need to add it to the `manifest.json` file. You can follow our tutorial on [how to update manifest.json][7]{:target="_blank"}.

After you modify this file, you will need to reload the Chrome extension and refresh Verse to pick up your latest changes.


## Security

As your website is using cross-document messaging to communicate with Verse, it can be vulnerable to cross-site scripting attack unless certain security implementations are followed carefully. Here are three tips to make your application less vulnerable.

### When receiving message, always verify origin of the message.

In this [sample HTML page][5]{:target="_blank"}, we did not verify origin of the message as we need to make sure the page works with any domain for demoing purpose. However, in a production environment, immediately after the line:

```window.addEventListener("message", function(event) {```

you should add the following code to check the origin of the message and prevent the rest of the JavaScript code from executing if the message origin does not match your Verse domain:

```javascript
if (event.origin !== "<your-Verse-domain-here>"){
  return;
}
```

### When sending message, always specify `targetOrigin`.
`targetOrigin` provides control over where messages are sent. Your application needs to specify `targetOrigin` so that it will not end up sending sensitive information to malicious site.

In this [sample HTML page][5]{:target="_blank"}, when posting message from the sample page back to Verse, we are specifying the `targetOrigin` to be the origin of the previous event we received (`event.origin`), instead of using a wild card `*`:

`event.source.postMessage(loaded_message, event.origin);`

If you have verified origin of the message by implementing the suggestion in the previous tip, you can be sure that `event.origin` here would be your Verse domain.

### Always validate the messages being passed.
This includes trying to use `innerText` or `textContent` instead of `innerHTML` when inserting data value into the DOM so as to avoid malicious code being inserted and executed.

__It is the responsibility of the extension developer to ensure data received is treated appropriately.__ For example, with the [HTML sample page][5]{:target="_blank"}, if it used `insertAdjacentHTML` instead of `innerText` to display the stringified JSON data from the user's side and a mail subject contained the following line (either in the Mail Compose View or Mail Read View) then when the extension is triggered, a button would be added onto the application's HTML page, which when clicked, will show an alert:

`</div><button onclick='alert()'>Click me!</button><div>`

This is a proof of concept to show how malicious users can take advantage of this vulnerability to execute their own script.

To learn more about cross-site scripting attack, please refer to the [OWASP site][10]{:target="_blank"}.

On the extension side, Google Chrome has also given some suggestion on how to make your Chrome extension more secure. Please refer to their documentation on [Content Security Policy][8]{:target="_blank"} and [Cross-Origin XHR][9]{:target="_blank"} for details.


## Troubleshooting

This section describes some common issues you might experience and provides information on how to debug your application.

### The Chrome Developer Extension will not load

If you are experiencing problems loading the Chrome Developer Extension as an unpacked extension, this is most likely an issue with the `manifest.json` or `applications.json` files. When you edit these files, ensure that they are well-formed with no trailing commas, no missing quotation marks, no syntax errors, etc.

### The Chrome Developer Extension loads, but your extensions do not appear in Verse

If your extensions are not appearing in the Verse UI, make sure that you have specified the correct path and object properties in the [`applications.json`](#registering-an-application-in-ibm-verse). Also ensure that you have added the URL that you use to access Verse to the manifest file. See [here][7]{:target="_blank"} to read more on editing the manifest.

### Debugging your application

Your application opens in a new window but is not working as expected, or does not appear to have received any data from Verse.

This might be an issue with the `applications.json` file. If you are using URL query string parameters, verify that the variables you added to your URL are valid and correspond to properties in the Verse API data [section](#verse-api-data).
If you are using cross-document messaging, verify that you have specified the value `["core"]` for the `payload.features` property.

If you are still having problems, you will need to debug your application code using the browser developer tools. Since Verse opens your application in a new window that immediately executes your code, you will not have enough time to open the developer tools and set break points.

The simplest solution to this is to add an `alert();` followed by a `debugger;` statement.

When the new window opens and your application code starts to execute, the alert will appear and will pause the execution of your code until the alert is dismissed. Before dismissing the alert, open the developer tools. Now dismiss the alert and the the code will pause at your debugger statement.

Inspect the message event listeners and make sure that they are receiving the correct data from Verse. Verify that you are sending the `com.ibm.verse.application.loaded` message to the Verse window to indicate that your application is ready to receive data.

See [here](#sending-and-receiving-data) for more information on communicating with the Verse window.


[1]: {{site.verse-developer-chrome-ext}}/blob/master/src/applications.json
[2]: {{site.verse-developer-chrome-ext}}/blob/master/tutorial_getting_started/step3/applications.json
[3]: {{site.verse-developer-chrome-ext}}/blob/master/tutorial_getting_started/step4/applications.json
[4]: {{site.verse-developer-chrome-ext}}
[5]: {{site.verse-developer-chrome-ext}}/blob/master/src/samples/actions.html
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Window/open
[7]: ../tutorials/tutorial_verse_developer.html#update-manifestjson
[8]: https://developer.chrome.com/extensions/contentSecurityPolicy
[9]: https://developer.chrome.com/extensions/xhr
[10]: https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)
[11]: ../tutorials/tutorial_live_text.html
[12]: https://www.ibm.com/developerworks/lotus/documentation/notes_live_text_widget_export_plugin/index.html