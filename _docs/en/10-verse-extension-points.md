---
title: Verse Extension Points
lang: en
pagename: verse-extension-points
---

## Verse Extension Points
IBM Verse supports the general extension points defined by appregistry, like the Simple Link and Templated Link. Besides that, Verse also supports to contribute a Widget extension to add some Widget Actions to Verse UI page. For example, a widget can contribute an action to More Actions… menu in toolbar when composing/viewing a message, or contribute an action to Verse business card.

For a simple and templated link type extension, it will be rendered as a plain link on the Verse UI. Therefore, when a link type extension clicks, it will be open in a new tab/window.

Simple Link and Templated Link extensions provide an easy way to contribute clickable UI artifacts that result in the opening of a webpage in a new tab/window.

However, Widget Action’s inside of Widget’s allow those same kinds of clickable UI artifacts to trigger programmatic logic inside of widgets, which are like mini web applications that can respond to that input.

Here is the full list of extension points that Verse supports:

- [com.ibm.appreg.ext.simpleLink](#simple-link-comibmappregextsimplelink)

- [com.ibm.appreg.ext.templatedLink](#templated-link-comibmappregexttemplatedlink)

- [com.ibm.verse.ext.widget](#widget-comibmverseextwidget)

- [com.ibm.verse.ext.namePicker](#name-picker-comibmverseextnamepicker)

- [com.ibm.verse.ext.beforeOnSend](#before-on-send-comibmverseextbeforeonsend)

- [com.ibm.verse.ext.liveText](#live-text-comibmverseextlivetext)

&nbsp;

### Simple Link (com.ibm.appreg.ext.simpleLink)
A Simple Link extension adds a clickable URL link to the Verse UI.

&nbsp;

#### Required Properties for a Simple Link
- {string} `text` The text for the link
- {string} `href` The link location


&nbsp;

#### Optional Properties for a Simple Link
- {string} `icon` An icon to use when rendering the link. The only value format supported for this property is a data-uri with a base64 encoded payload.
- {string} `alt` Alt text for the link.

&nbsp;

#### Example Simple Link
{% highlight pre %}
{
  "type": "com.ibm.appreg.ext.simpleLink",
  "object": "com.ibm.appreg.object.person",
  "payload": {
    "text": "Click this sample link!",
    "href": "https://sample.com/simple-link-target.html",
    "icon": "data:image/png;base64,..."  
  }
}
{% endhighlight %}

&nbsp;
&nbsp;

### Templated Link (com.ibm.appreg.ext.templatedLink)
A Templated Link extension adds a clickable URL link to the Verse UI including the option to configure the extension to receive data from Verse encoded in the URL.

&nbsp;

#### Templating Syntax
Values contained within the extension that have text of the format ${property} will be replaced with the value keyed by `property` from the context of the bound object.

&nbsp;

#### Templating Syntax of plural-fields
Values contained within the extension that have text of the format ${property.type} will be replaced with the value within the plural-field keyed by `property` which has the type ‘type’ from the context of the bound object.

If there are multiple values within the plural-field keyed by `property` that have type `type`, preference will be given to the value of type `type` that is “primary”. If there is no “primary” within the set of plural-field values of type ‘type’, it is up to the Container’s discretion to determine which value is returned.

If no type is specified and the specified `property` keys a plural-field value, the primary entry of the plural-field will serve as the replacement value.

&nbsp;

EX: emails is a plural field
{% highlight pre %}
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
{% endhighlight %}

`${emails} -> primaryhome@DOMAIN.COM      //The primary value`

`${emails.work} -> altwork@DOMAIN.COM     //The first occurrence of type "work" (container's disgression)`

`${emails.home} -> primaryhome@DOMAIN.COM //The primary value for type "home" (primary is of type "home")`

&nbsp;

#### Required Properties for a Templated Link
- {string} `text` The text for the link
- {string} `href` The link location. Verse will take care to URL encode values replaced in the href property.

&nbsp;

#### Optional Properties for a Templated Link
- {string} `icon` An icon to use when rendering the link. The only value format supported for this property is a data-uri with a base64 encoded payload.
- {string} `alt` Alt text for the link.
- {string} `locator` A hint for container where to render the link within the UI representation of the binding object. Verse currently does not use the locator property.

&nbsp;

#### Example Templated Link
{% highlight pre %}
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
{% endhighlight %}

&nbsp;
&nbsp;

### Widget (com.ibm.verse.ext.widget)
A Widget extension associates a third party web application with Verse by opening a new browser window/tab or embedding the application using an `iframe` within the Verse UI. A widget extension may contribute multiple Widget Actions to the Verse UI.

All of actions in the widget will share the same url. When Widget Action is clicked, the application opened by the widget’s url will be rendered on the different place based on the action’s location.

&nbsp;

#### Widget Definition
The definition of a widget MAY contain 1 or multiple Widget Actions. The Widget Actions can also be dynamically added to a widget.

&nbsp;

#### Required Properties for a Widget
- {string} `url` The widget’s url, when the action in the widget is clicked, the widget will open the url on the place specified by the action’s location.
- {array} `actions` An array of Widget Actions. This property identifies the contributed Widget Actions by this widget.

&nbsp;

#### Optional Properties for a Widget
- {array} `features` An array of strings. The property is used to specify what features provided by the container are used by this application. Each feature maps to a set of APIs provided by the container. If the application needs to use certain APIs, it needs to add the corresponding feature to this property. The supported features are listed below.
  - core - that means the widget needs to communicate with Verse page via cross document messaging.

&nbsp;

#### Example Widget
In this sample, a widget contains two actions, one action is contributed under **More actions** button when viewing an existing email and the second action is contributed under **More actions** button when composing a new email. When the actions are clicked, the widget will be rendered on the new window which width and height are both 800px.

&nbsp;

{% highlight pre %}
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
{% endhighlight %}

&nbsp;

#### Widget Action
A widget action is a UI component which will be contributed to Verse page. An action MUST be contained in a widget extension, it can’t be directly added into `Applications` extensions array.

When a contributed action is clicked, the widget will be rendered in a different place based on the `location` value.

&nbsp;

#### Required Properties for a Widget Action
- {string} `id` The id for the action.
- {string} `text` The text for the action.
- {string} `path` The path identifies where the action is contributed. All of supported paths are listed here.

&nbsp;

#### Optional Properties for a Widget Action
- {string} `icon` An icon to use when rendering the action. Containers MAY choose to not honor this attribute for any reason, for example: if it would be inappropriate to render an icon in the `location` it was contributed to. The preferred format for the icon is a data-uri.
- {string} `alt` Alt text for the action.
- {object} `location` The property is used to specify where to render the widget. The acceptable values can be **window**, **tab** or **embedded**.
  - window - the widget will be open in the new window. We can use renderParams to specify the new window’s size.
  - tab - the widget will be open in the new tab.
  - embedded - the widget will be open inside an iframe. This value is only supported for Mail Compose actions.

- {object} `renderParams` The property is used to specify the window size when the application is open in a new window. The renderParams property contains width and height properties which are used to specify the new window’s width/height accordingly. This property is only valid if the location’s value is **window**.


&nbsp;

#### Example Widget Action
{% highlight pre %}
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
{% endhighlight %}

&nbsp;
&nbsp;

### Name Picker (com.ibm.verse.ext.namePicker)
The Name Picker extension point allows the integration of a custom UI for selecting addresses when sending an email. When a custom name picker is contributed to Verse, the ‘To’ label in the UI for composing a mail will be rendered as a link. On clicking the link, the name-picker will be rendered inside of the mail compose view. The user can select names using the name pickerand these will be added to whichever of **To**, **Cc** or **Bcc** input fields is currently selected.

&nbsp;

#### Required Properties for a Name Picker
- {string} `id` The id for the custom name picker.
- {string} `url` The widget’s url, when the **To** link is clicked, a new iframe will open in the mail compose view pointing to this URL. The resource at the URL must display a UI allowing the user to add names to the email.

&nbsp;

#### Example Name Picker
{% highlight pre %}
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
{% endhighlight %}

&nbsp;
&nbsp;

### Before On Send (com.ibm.verse.ext.beforeOnSend)
The Before On Send extension point allows third party logic to be invoked which can validate the content of an email. The extension can either display a UI e.g. to warn the user about something in the mail or can allow the mail to be sent. By default if an extension displays a UI with a warning the user can decide to send the mail anyway by clicking the send button again.

An optional property called `disableSend` is provided to control the send button behavior. By default `disableSend` is set as false, which means that send button will always be enabled and the user can send the message even if the extension displays a warning. If `disableSend` is set as true, when the user clicks the send button it becomes disabled while the extension is loading and validating the mail. There are a number of options available to the extension:

- If it determines the mail is OK to send it can allow it to be sent without any further action from the user.
- If it wants to display a warning to the user but still allow them to send the mail it can display a UI and re-enable the send button.
- If it wants to block the user from sending the mail it can display a UI and leave the send button disabled.
- In case the external application fails to load, the ‘Send’ button will be automatically re-enabled and a message will be displayed to the user warning them that there is risk associated with sending the mail because the extension to which validates mails cannot be loaded.

&nbsp;

#### Required Properties for a Before On Send
- {string} `id` The id for the custom name picker.
- {string} `url` The widget’s url, when the Send button is clicked, the URL is opened in a hidden iframe.

&nbsp;

#### Example Before On Send
{% highlight pre %}
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
{% endhighlight %}

&nbsp;
&nbsp;

### Live Text (com.ibm.verse.ext.liveText)
The Live Text extension point recognizes defined patterns of data in email, and displays the information with an underline. Clicking the live text displays a menu of custom actions; for example, to open a web application or start a chat. The pattern and the corresponding actions are defined in an extension that is added to Verse.

&nbsp;
Note: For a tutorial on creating Live Text extensions in Verse, see [Live Text Extension Tutorial](../tutorials#live-text-widget). For instructions on exporting Live Text widgets from Notes so you can import them into Verse, see [Exporting a Live Text Widget from IBM Notes]({{site.data.documentation.external.exportingLiveTextWidget}}){:target="_blank"}

&nbsp;

#### Required Properties for Extensions
- {string} `text` The text for the Live Text action.
- {string} `href` The Live Text link location. Use ${groupNumber} to define a variable in the href. The groupNumber is the group number of regular expression defined in recognizer. When execute a Live Text action, the ${groupNumber} will be replaced with text recognized by the groupNumber group.
- {string} `recognizer` A regular expression in string form, not a regex literal, to recognize the specified text pattern as Live Text.

&nbsp;

#### Optional Properties for Extensions
- {string} `alt` Alt text for Live Text action.
- {string} `location` This property specifies where to open the Live Text extension. The acceptable values can be `window` or `tab`.
  - `window` - The Live Text extension will be opened in the new window. We can use renderParams to specify the new window’s size. If renderParams is not provided, a default renderParams will be used.
  - `tab` - The Live Text extension will be opened in the new tab.
- {object} `renderParams` This property specifies the window size when the extension is open in a new window. The renderParams property contains `width` and `height` properties, which are used to specify the new window’s width/height accordingly. This property is only valid if the `location`’s value is `window`.

&nbsp;

#### Example Live Text extension
{% highlight pre %}
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
{% endhighlight %}

The ${extensionPath} in above example is only a path var of this repository. You need to use absolute path in their own extensions if their extension page is not in this repository.

The `ext_id` property is only required when you import extension json in Appregistry. It is not a required property for this extension point or Verse.