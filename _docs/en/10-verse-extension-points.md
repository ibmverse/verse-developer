---
title: Verse Extension Points
lang: en
pagename: verse-extension-points
---

## Verse Extension Points
HCL Verse supports the general extension points defined by appregistry, like the Simple Link and Templated Link. Besides that, Verse also supports to contribute a Widget extension to add some Widget Actions to Verse UI page. For example, a widget can contribute an action to More Actions… menu in toolbar when composing/viewing a message, or contribute an action to Verse business card.

For a simple and templated link type extension, it will be rendered as a plain link on the Verse UI. Therefore, when a link type extension clicks, it will be open in a new tab/window.

Simple Link and Templated Link extensions provide an easy way to contribute clickable UI artifacts that result in the opening of a webpage in a new tab/window.

However, Widget Action’s inside of Widget’s allow those same kinds of clickable UI artifacts to trigger programmatic logic inside of widgets, which are like mini web applications that can respond to that input.

Here is the full list of extension points that Verse supports. Note that only an absolute link is supported in an extension.

- [com.ibm.appreg.ext.simpleLink](#simple-link-comibmappregextsimplelink)

- [com.ibm.appreg.ext.templatedLink](#templated-link-comibmappregexttemplatedlink)

- [com.ibm.verse.ext.widget](#widget-comibmverseextwidget)

- [com.ibm.verse.ext.namePicker](#name-picker-comibmverseextnamepicker)

- [com.ibm.verse.ext.beforeOnSend](#before-on-send-comibmverseextbeforeonsend)

- [com.ibm.verse.ext.liveText](#live-text-comibmverseextlivetext)

- [com.ibm.action.link](#navigation-bar-extensions)

- [com.ibm.action.delete](#navigation-bar-extensions)

- [com.ibm.action.menu](#navigation-bar-extensions)

- [com.ibm.action.menu.link](#navigation-bar-extensions)

- [com.ibm.verse.ext.file](#third-party-file-repository-integration-comibmverseextfile)

- [com.ibm.verse.ext.css](#css-support-comibmverseextcss)

- [com.ibm.verse.ext.directorySearch](#directory-search-extension-comibmverseextdirectorysearch)

- [com.ibm.appreg.ext.enableSametime](#enable-sametime-comibmappregextenablesametime)
&nbsp;

### Verse Extension Points Offline Support
The following extension points are supported in offline mode as of Verse On-Premises 1.0.5. The extension points are also supported for Verse on-cloud.
- [com.ibm.action.link](#navigation-bar-extensions)

- [com.ibm.action.delete](#navigation-bar-extensions)

- [com.ibm.action.menu](#navigation-bar-extensions)

- [com.ibm.action.menu.link](#navigation-bar-extensions)

- [com.ibm.verse.ext.css](#css-support-comibmverseextcss)

&nbsp;

### Simple Link (com.ibm.appreg.ext.simpleLink)
A Simple Link extension adds a clickable URL link to the Verse UI.

&nbsp;

#### Required Properties for a Simple Link
- {string} `text` The text for the link
- {string} `href` The absolute link location.


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
- {string} `href` The absolute link location. Verse will take care to URL encode values replaced in the href property.

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
A Widget extension associates a third-party web application with Verse by opening a new browser window/tab or embedding the application using an `iframe` within the Verse UI. A widget extension may contribute multiple Widget Actions to the Verse UI.

All of actions in the widget will share the same url. When Widget Action is clicked, the application opened by the widget’s url will be rendered on the different place based on the action’s location.

&nbsp;

#### Widget Definition
The definition of a widget MAY contain 1 or multiple Widget Actions. The Widget Actions can also be dynamically added to a widget.

&nbsp;

#### Required Properties for a Widget
- {string} `url` The widget’s absolute url, when the action in the widget is clicked, the widget will open the url on the place specified by the action’s location.
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
- {string} `path` The path identifies where the action is contributed. The supported paths:
  - `com.ibm.verse.path.mailCompose`
  - `com.ibm.verse.path.mailRead`

&nbsp;

#### Optional Properties for a Widget Action
- {string} `icon` An icon to use when rendering the action. Containers MAY choose to not honor this attribute for any reason, for example: if it would be inappropriate to render an icon in the `location` it was contributed to. The preferred format for the icon is a data-uri.
- {string} `alt` Alt text for the action.
- {object} `location` The property is used to specify where to render the widget. The acceptable values can be **window**, **tab** or **embedded**.
  - window - the widget will be open in the new window. We can use renderParams to specify the new window’s size.
  - tab - the widget will be open in the new tab.
  - embedded - the widget will be open inside the component specified by `path`. This value is supported for both Mail Read and Mail Compose actions. It's introduced in Verse on-Premises 1.0.7 and available in Verse on-cloud as well.

- {object} `renderParams` The property is used to specify the window size when the application is open in a new window. The renderParams property contains width and height properties which are used to specify the new window’s width/height accordingly. This property is only valid if the location’s value is **window**.

- {array} `permissions` The property controls which sensitive information will be exposed in `verseApiData` [context](#verse-api-data) property. It's introduced in Verse on-Premises 1.0.4 and available in Verse on-cloud as well. The acceptable values can be **bcc** and **attachment**.
  - `bcc` - The `recipientBcc` property will be exposed in `verseApiData` [context](#verse-api-data) property if action `path` is `com.ibm.verse.path.mailCompose` or `com.ibm.verse.path.mailRead`.
  - `attachment` - The `attachments` property will be exposed in `verseApiData` [context](#verse-api-data) property if action `path` is `com.ibm.verse.path.mailCompose` or `com.ibm.verse.path.mailRead`.

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
  },
  "permissions": ["bcc", "attachment"]
}
{% endhighlight %}

&nbsp;
&nbsp;

### Name Picker (com.ibm.verse.ext.namePicker)
The Name Picker extension point allows the integration of a custom UI for selecting addresses when sending an email. When a custom name picker is contributed to Verse, the ‘To’ label in the UI for composing a mail will be rendered as a link. On clicking the link, the name-picker will be rendered inside of the mail compose view. The user can select names using the name picker then the selected names will be added to **To** **Cc** **Bcc** fields accordingly in mail compose view.

&nbsp;

#### Required Properties for a Name Picker
- {string} `url` The widget’s absolute url, when the **To** link is clicked, a new iframe will open in the mail compose view pointing to this URL. The resource at the URL must display a UI allowing the user to add names to the email.

&nbsp;

#### Example Name Picker
{% highlight pre %}
{
  "name": "Custom name picker",
  "title": "Name Picker",
  "description": "Custom name picker on mail compose",
  "extensions": [
    {
      "type": "com.ibm.verse.ext.namePicker",
      "name": "Custom name picker in mail compose",
      "title": "Add Contact",
      "payload": {
        "url": "${extensionPath}/custom-name-picker/index.html"
      }
    }
  ],
  "payload": {},
  "services": [
    "Verse"
  ]
}
{% endhighlight %}

&nbsp;

#### Response Message required from Name Picker to add recipients
There are two methods to add recipient(s) from the name picker. One is to add a single recipient to 
whichever of **To**, **Cc** or **Bcc** input fields is currently selected.
The other is to add recipients to **To**, **Cc** and **Bcc** input fields all together in one action. The second method is introduced in Verse on-Premises 1.0.4 and is available in Verse on-cloud as well.

&nbsp;

##### Method 1: Add single recipient from name picker to whichever of **To**, **Cc** or **Bcc** input fields is currently selected

&nbsp;

###### Required Properties
- {string} `verseApiType` The value must be `com.ibm.verse.add.contact`
- {string} `userEmail` The recipient email address

&nbsp;

###### Optional Property
- {string} `userName` The recipient name

&nbsp;

###### Example Response Message to add single recipient to currently selected input field

```
var userEmail = samantha@cn.ibm.com;
var userName = Samantha;
var emails_message = {
  verseApiType: "com.ibm.verse.add.contact",
  userEmail: userEmail,
  userName: userName
};
evt.source.postMessage(emails_message, evt.origin);
```

&nbsp;

##### Method 2: Add recipients from name picker to **To**, **Cc** and **Bcc** input fields all together in one action

&nbsp;

This method is introduced in Verse on-Premises 1.0.4 and is available in Verse on-cloud as well.

&nbsp;

###### Required Properties
- {string} `verseApiType` The value must be `com.ibm.verse.add.contact`

&nbsp;

###### Optional Property
- {array} `recipientTo` An array of `Recipient`s to be added to To field.
- {array} `recipientCC` An array of `Recipient`s to be added to Cc field.
- {array} `recipientBcc` An array of `Recipient`s to be added to Bcc field.

&nbsp;

**Note** that the response message must have at least one of `recipientTo`, `recipientCC` or `recipientBcc` property.

&nbsp;

The `Recipient` is a JSON object with following properties:

###### Required Property for Recipient
- {string} `userEmail` The recipient email address

&nbsp;

###### Optional Property for Recipient
- {string} `userName` The recipient name

&nbsp;

###### Example Response Message to add recipients from name picker to **To**, **Cc** and **Bcc** input fields in one action

```
var toArray = [ 
                { 
                  userEmail: a1@cn.ibm.com, 
                  userName:  a1
                }, 
                { 
                  userEmail: a2@cn.ibm.com, 
                  userName:  a2
                },
                { 
                  userEmail: a3@cn.ibm.com, 
                  userName:  a3
                }
              ];

var ccArray = [ 
                { 
                  userEmail: b1@cn.ibm.com, 
                  userName:  b1
                },
                { 
                  userEmail: b2@cn.ibm.com, 
                  userName:  b2
                }
              ];

var bccArray = [
                 { 
                   userEmail: c1@cn.ibm.com, 
                   userName:  c1
                 }
               ];

var emails_message = {
  verseApiType: "com.ibm.verse.add.contact",
  recipientTo: toArray,
  recipientCC: ccArray,
  recipientBcc: bccArray
};
evt.source.postMessage(emails_message, evt.origin);
```

&nbsp;
&nbsp;

### Before On Send (com.ibm.verse.ext.beforeOnSend)
The Before On Send extension point allows third-party logic to be invoked which can validate the content of an email. The extension can either display a UI e.g. to warn the user about something in the mail or can allow the mail to be sent. By default if an extension displays a UI with a warning the user can decide to send the mail anyway by clicking the send button again.

An optional property called `disableSend` is provided to control the send button behavior. By default `disableSend` is set as false, which means that send button will always be enabled and the user can send the message even if the extension displays a warning. If `disableSend` is set as true, when the user clicks the send button it becomes disabled while the extension is loading and validating the mail. There are a number of options available to the extension:

- If it determines the mail is OK to send it can allow it to be sent without any further action from the user.
- If it wants to display a warning to the user but still allow them to send the mail it can display a UI and re-enable the send button.
- If it wants to block the user from sending the mail it can display a UI and leave the send button disabled.
- In case the external application fails to load, the ‘Send’ button will be automatically re-enabled and a message will be displayed to the user warning them that there is risk associated with sending the mail because the extension to which validates mails cannot be loaded.

&nbsp;

#### Required Properties for a Before On Send
- {string} `url` The widget’s absolute url, when the Send button is clicked, the URL is opened in a hidden iframe.

&nbsp;

#### Optional Properties for a Before On Send
- {boolean} `disableSend` By default `disableSend` is set as false, which means that ‘Send’ button will always be enabled and the user can send the message even if there is a warning. If `disableSend` is set as true, then ‘Send’ button will be disabled until the external application re-enables it by sending a message to Verse.  
- {array} `permissions` The property controls which sensitive information will be exposed in `verseApiData` [context](#verse-api-data) property. It's introduced in Verse on-Premises 1.0.4 and available in Verse on-cloud as well. The acceptable values can be **bcc** and **attachment**.  
  - `bcc` - The `recipientBcc` property will be exposed in `verseApiData` [context](#verse-api-data) property.  
  - `attachment` - The `attachments` property will be exposed in `verseApiData` [context](#verse-api-data) property.  

&nbsp;

#### Example Before On Send
{% highlight pre %}
{
  "name": "Hook Before Send Sample",
  "title": "Hook Before Send Sample",
  "description": "Sample that shows how to check for a credit card number in mail being sent",
  "extensions": [
    {
      "type": "com.ibm.verse.ext.beforeOnSend",
      "name": "Hook Before Send Extension",
      "title": "Hook Before Send Extension",
      "payload": {
        "url": "${extensionPath}/hook-before-send/index.html"
      }
      
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
Note: For a tutorial on creating Live Text extensions in Verse, see [Live Text Extension Tutorial](../tutorials#live-text-widget). For instructions on exporting Live Text widgets from Notes so you can import them into Verse, see [Exporting a Live Text Widget from HCL Notes]({{site.data.developers.exportingLiveTextWidget}}){:target="_blank"}

&nbsp;

#### Required Properties for a Live Text
- {string} `text` The text for the Live Text action.
- {string} `href` The Live Text absolute link location. Use ${groupNumber} to define a variable in the href. The groupNumber is the group number of regular expression defined in recognizer. When execute a Live Text action, the ${groupNumber} will be replaced with text recognized by the groupNumber group.
- {string} `recognizer` A regular expression in string form, not a regex literal, to recognize the specified text pattern as Live Text.

&nbsp;

#### Optional Properties for a Live Text
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

The ${extensionPath} in the previous example is only a path var of this repository. You need to use absolute path in your own extensions if your extension page is not in this repository.
&nbsp;
&nbsp;

### Navigation bar extensions

- com.ibm.action.link (available in Verse on-cloud, Verse On-Premises 1.0.4 and above)  

- com.ibm.action.delete (available in Verse on-cloud, Verse On-Premises 1.0.4 and above)  

- com.ibm.action.menu (available in Verse on-cloud, Verse On-Premises 1.0.5 and above)  

- com.ibm.action.menu.link (available in Verse on-cloud, Verse On-Premises 1.0.5 and above)  

You can customize the navigation bar by hiding default links and menus, and by adding custom links and menus.
You can refer to [Extending the navigation bar]({{site.data.developers.NavbarExtensionGuide}}){:target="_blank"} topic and its sub topics to take an overview of navigation bar extensibility and how to use these extensions. Note that only an absolute link is supported in an extension.  

**Security Tip:** `com.ibm.action.delete` extension can delete existing menu. `com.ibm.action.link` and `com.ibm.action.delete` extensions used together can modify existing menu. If the navigation bar extensions are contributed by external developer, administrator should check whether the extensions have any potential risk and control it when they deploy the exensions.

&nbsp;

#### Example Navigation bar extensions
The following extension illustrates how to customize the organization name and logo on the navigation bar.  
{% highlight pre %}
{
  "name": "Branding App",
  "title": "Branding App",
  "description": "Customize the organization name and logo on the navigation bar",
  "extensions": [
    {
      "type": "com.ibm.action.delete",
      "name": "Delete predefined organization",
      "path": ".org",
      "application": "Branding App",
      "title": "Delete predefined organization",
      "description": "Delete predefined organization"
    },
    {
      "type": "com.ibm.action.link",
      "name": "Company logo demo",
      "title": "Company logo demo",
      "description": "Customize organization logo",
      "path": "com.ibm.navbar.order.1000",
      "application": "Branding App",
      "payload": {
        "link": "http://www.brandingCompanyLogoDemo.com",
        "icon": "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0nY2hhdC1pbWFnZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBmaWxsPSd3aGl0ZScgdmlld0JveD0nMCAwIDIwIDIwJz48cGF0aCBjbGFzcz0nY2hhdC1pbWFnZS1vdXRsaW5lJyBkPSdNMTAgMEM1LjYgMCAyIDMuNiAyIDhjMCA0LjEgMy4xIDcuNCA3IDcuOVYyMGw2LjgtNi41QzE3LjEgMTIuMSAxOCAxMC4xIDE4IDhjMC00LjQtMy42LTgtOC04em01IDEyLjlsLTUgNC43VjE1Yy0zLjkgMC03LTMuMS03LTdzMy4xLTcgNy03IDcgMy4xIDcgN2MwIDEuOS0uOCAzLjYtMiA0Ljl6Jy8+PC9zdmc+",
        "window_features": "target=_blank"
      }
    },
    {
      "type": "com.ibm.action.link",
      "name": "Company Name Demo",
      "title": "Company Name Demo",
      "description": "Customize organization name",
      "path": "com.ibm.navbar.order.1500",
      "application": "Branding App",
      "payload": {
        "link": "http://www.brandingCompanyNameDemo.com/",
        "window_features": "target=_blank"
      }
    }
  ],
  "payload": {},
  "services": [
    "TopNavigationBar"
  ]
}
{% endhighlight %}

&nbsp;

The following extension illustrates how to delete the predefined More menu from the navigation bar.  
{% highlight pre %}
{
  "name": "Delete More menu app",
  "title": "Delete More menu app title",
  "description": "Delete More menu app description",
  "extensions": [
    {
      "type": "com.ibm.action.delete",
      "path": ".apps",
      "name": "Delete More menu extension",
      "application": "Delete More menu app",
      "title": "Delete More menu"
      "description": "Delete More menu description",
    }
  ],
  "payload": {},
  "services": [
    "TopNavigationBar"
  ]
}
{% endhighlight %}

&nbsp;

#### Deploy navigation bar extensions on Verse on-Premises
The navigation bar extensions can be deployed the same way as the other Verse extensions as of Verse On-Premises 1.0.4.
You can refer to [Deploy application on Verse on-Premises](#deploy-application-on-verse-on-cloud) to deploy the navigation bar extensions on Verse on-Premises.

#### Deploy navigation bar extensions on Verse on-Cloud
On Verse on-Cloud, you must register the navigation bar extensions using the IBM App Registry. You can refer to this guide [Managing extensions for Top Navigation Bar]({{site.data.developers.appregistryGuide}}){:target="_blank"} for details.

&nbsp;
&nbsp;

### Third-Party File Repository Integration (com.ibm.verse.ext.file)
The Third-Party File Repository extension point integrates a third-party file repository with HCL Verse. Users can choose files from a third-party file repository and add the file links into messages. It's only supported in Verse on-Premises 1.0.4 and above.

&nbsp;

#### Required Properties for a Third-Party File Repository Extension
- {string} `text` The name of the repository.
- {string} `url` The target absolute url to open the repository. Only `https` protocol is allowed in url, since Verse uses `https` protocol and [Cross-document Messaging](https://www.w3.org/TR/webmessaging/) is used to communicate between Verse and the file repository extension.
- {string} `icon` The icon for the repository. The only value format supported is a data-uri with a base64 encoded payload. For example: `"icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAGpJREFUOE+1k4EKgDAIRC36b/3z6kLJFUpOejAYQ293si3MvFMREdHdCQQqoN73rKpTxlxMC4BLpBrBg95NxV74QQ1De/LFQVSD89YMQBgBmPUsQuoAjbYi/ovgb80ctN9BO0JbYOo73xAdbuoHJPh854UAAAAASUVORK5CYII="`.

&nbsp;

#### Optional Properties for a Third-Party File Repository Extension
- {object} `renderParams` The window width and height when the repository is loaded in a new window. If not specified, the browser determines the new window width and height.

&nbsp;

#### Example Third-Party File Repository Extension
{% highlight pre %}
{
  "name": "Third-party file repository integration",
  "title": "Third-party file repository integration",
  "description": "Integrate third-party file repository in Verse",
  "extensions": [{
    "type": "com.ibm.verse.ext.file",
    "name": "Third-party file repository extension",
    "payload": {
      "text": "Third-Party File Repository",
      "url": "https://third-party-file-repo.com",
      "icon": "data:image/png;base64,...",
      "renderParams": {
        "width": "450",
        "height": "230"
      }
    }
  }],
  "services": [
    "Verse"
  ]
}
{% endhighlight %}

&nbsp;

#### Sending and Receiving Data between Verse and Third-Party File Repository Extension

Verse supports [Cross-document Messaging](https://www.w3.org/TR/webmessaging/) to communicate with your repository. The communication involves two steps:

&nbsp;

##### 1. Notify Verse that your repository application is ready to receive and send data.

When a user attempts to access your repository, Verse loads your repository application and pings it the message `com.ibm.verse.ping.application.loaded` to check whether your application is ready to receive data.
Your application needs to handle this message and send back a message `com.ibm.verse.application.loaded` to notify Verse that your application is ready to receive and send data.

Below is the sample code to handle Verse message and notify Verse your application is ready to receive and send data.
```
window.addEventListener('message', function(evt) {
  var verseApiType = evt && evt.data && evt.data.verseApiType;
  if (verseApiType === 'com.ibm.verse.ping.application.loaded') {
    evt.source.postMessage({
      verseApiType: 'com.ibm.verse.application.loaded'
    }, evt.origin);
  }
}, false);
```

Note that the Verse ping will time out in 30 seconds, so your application must send back the `com.ibm.verse.application.loaded message` as soon as possible once it is ready to receive data.

&nbsp;

##### 2. Send file or folder link information to Verse. 
After the user chooses files or folders in your repository application, your application sends the Add Links message to Verse to insert file or folder links into the message body via winodw.postMessage API.

The Add Links message structure is defined as below:
  ```
  {
    verseApiType: "com.ibm.verse.ext.file.add.links",
    links: [{
      url: "http://link-of-one-file",
      name: "HCL Verse Introduction.pdf"
    }, {
      url: "https://link-of-another-file",
      name: "HCL Products.ppt"
    }, {
      // more file or folder links
    }],
    closeWindow: true
  }
  ```

&nbsp;

###### Required Properties for Add Links message

- {string} `verseApiType` This property indicates the message type. Its value must be `com.ibm.verse.ext.file.add.links`

&nbsp;

###### Optional Properties for Add Links Message

- {array<object>} `links` It is an array of the file or folder links. Each link is a JSON object that contains `url` and `name` properties.
  - url - The url used to open a file or folder.
  - name - The display text of the link.
- {boolean} `closeWindow` This property tells Verse whether to close your third-party file repository application when Verse receives the Add Links message. The default value is false.

&nbsp;

#### Third-party file repository integration tutorial
For the tutorial of creating Third-Party File Repository extension in Verse, see [Third-Party File Repository Integration Tutorial](../tutorials#third-party-file-repository-integration).

&nbsp;
&nbsp;

### CSS Support (com.ibm.verse.ext.css)
The CSS extension point allows you to customize Verse UI using a standard CSS. Your style sheet is inserted as an internal style sheet in the Verse page.
The CSS extension point is introduced in Verse on-Premises 1.0.5 and is available in Verse on-cloud as well.  

**Security Tip:** the CSS provided by the extension is added 'as is', so administrator should check the CSS extension when they deploy it to understand and control the risks that come with that as appearance and to some degree behavior can be changed.

&nbsp;

#### Required Properties for a CSS Extension
- {string} `css` This property specifies the internal style sheet you want to apply to Verse.

&nbsp;

#### Example CSS Extensions
The following CSS extension illustrates how to change the background color of navigation bar.
{% highlight pre %}
{
  "name": "Customize navigation bar app",
  "title": "Customize navigation bar app",
  "description": "CSS extension to customize navigation bar",
  "extensions": [
    {
      "type": "com.ibm.verse.ext.css",
      "name": "Customize navigation bar",
      "description": "Change the background color of navigation bar",
      "payload": {
        "css": ".ics-scbanner {background-color:green!important;}"
      }
    }
  ],
  "services": [
    "Verse"
  ]
}
{% endhighlight %}

&nbsp;

The following CSS extension illustrates how to hide all Calendar elements.
{% highlight pre %}
{
  "name": "Hide Calendar elements app",
  "title": "Hide Calendar elements app",
  "description": "Hide Calendar elements",
  "extensions": [
    {
      "type": "com.ibm.verse.ext.css",
      "name": "Hide Calendar elements",
      "description": "CSS extension to hide calendar elements",
      "payload": {
        "css": ".calendar-Container, .calendar-settings-section-tab, .settings-section.calendar-settings-section, .action.accept, .action.decline, .action.tentative, .action.respond, .action.pim-check-calendar.icon, .action.pim-create-meeting.icon {display:none!important;} .itm-closed .seq-mcv {height: calc(100% - 70px)!important;} .seq-mcv {height: calc(100% - 86px - 54px) !important;}"
      }
    }
  ],
  "services": [
    "Verse"
  ]
}
{% endhighlight %}

&nbsp;
&nbsp;

### Directory Search Extension (com.ibm.verse.ext.directorySearch)
The directory search extension point allows you to contribute a custom directory search to find people in Verse. It is introduced in Verse on-Premises 1.0.7 and is available in Verse on-cloud as well.

&nbsp;

#### Required Properties for a Directory Search Extension
- {string} `url` The extension's absolute url. Only `https` protocol is allowed in url, since Verse uses `https` protocol and [Cross-document Messaging](https://www.w3.org/TR/webmessaging/) is used to communicate between Verse and the directory search extension.

&nbsp;

#### Optional Properties for a Directory Search Extension
- {boolean} `enableBuiltinDirectorySearch` This property controls whether the built-in directory search in Verse is also used. When the value is true, the built-in search is used and the results from the built-in search are combined with the results from the custom directory search. If enableBuiltinDirectorySearch is not specified or is set to false, the built-in search is not used.

&nbsp;

#### Example Directory Search Extension
{% highlight pre %}
  {
    "name": "Directory Search Extension Sample",
    "title": "Directory Search Extension Sample",
    "description": "This is a sample of directory search extension",
    "extensions": [
      {
        "type": "com.ibm.verse.ext.directorySearch",
        "payload": {
          "url": "${extensionPath}/custom-directory-search/index.html",
          "enableBuiltinDirectorySearch": false
        }
      }
    ],
    "services": ["Verse"]
  }
{% endhighlight %}

&nbsp;

#### Sending and Receiving Data between Verse and Directory Search Extension

Verse supports [Cross-document Messaging](https://www.w3.org/TR/webmessaging/) to communicate with your directory search extension. The communication involves below steps:

&nbsp;

##### 1. Notify Verse that your extension is ready to receive and send data.

Verse loads the extension and pings it the message `com.ibm.verse.ping.application.loaded` to check whether it is ready to receive data.

Your extension needs to handle this message and send back a message `com.ibm.verse.application.loaded` to notify Verse that your application is ready to receive and send data.

Below is the sample code to handle Verse message and notify Verse your extension is ready to receive and send data.

{% highlight pre %}
window.addEventListener('message', function(evt) {
  var verseApiType = evt && evt.data && evt.data.verseApiType;
  if (verseApiType === 'com.ibm.verse.ping.application.loaded') {
    evt.source.postMessage({
      verseApiType: 'com.ibm.verse.application.loaded'
    }, evt.origin);
  }
}, false);
{% endhighlight %}

&nbsp;

**Note** that the Verse ping will time out in 30 seconds, so your extension must send back the `com.ibm.verse.application.loaded message` as soon as possible once it is ready to receive data.

&nbsp;

##### 2. Verse sends the text to search to the directory search extension

After user types some characters and clicks 'Search Directory' button, Verse sends a message with the text to search to your extension. The message structure is defined as below:

{% highlight pre %}
{
  verseApiType: "com.ibm.verse.action.clicked",
  verseApiData: {
    actionId: "com.ibm.verse.ext.action.directorySearch",
    context: {
      searchString: "The text to search"
    }
  }
}
{% endhighlight %}

&nbsp;

##### 3. The directory search extension sends the search results to Verse.

When the directory search extension receives the message with the text to search from Verse, it does the search. After your extension finishes search, it should send the Search Results message to Verse via window.postMessage API.

The Search Results message structure is defined as below:

{% highlight pre %}
{
  verseApiType: "com.ibm.verse.ext.directorySearch.searchResults",
  returnCode: 0,
  result: [
    {
      emailAddress: "johnsmith@sample.com",
      notesAddress: "John Smith/UK/SAMPLE",
      displayName: "John Smith",
      forwardMailAddress: "johnsmith@sampleuk.com",
    },
    {
      emailAddress: "johnLi@sample.com",
      displayName: "John Li",
    },
   {
      notesAddress: "John Zhang/China/SAMPLE",
      displayName: "John Zhang",
    },
   {
     emailAddress: "john-wang@sample.com",
   }
  ]
}
{% endhighlight %}

&nbsp;

###### Required Properties for the Search Results message

- {string} `verseApiType` The value of this property must be 'com.ibm.verse.ext.directorySearch.searchResults'.
- {number} `returnCode` The property is the status code of your response, and the value could be:
  - 0: Success
  - 1: General error
  - 2: No network connection
  - 3: Server no response

&nbsp;

###### Optional Properties for the Search Results message

- {string} `result` The value should be an array of the search result items. Only when `returnCode` is 0, the value of `result` will be used. If the value of `result` is [] or the property is not specified, Verse will regard as no matches found. Each result item is a JSON object that contains below properties. At least one `emailAddress` or `notesAddress` is required; `displayName` and `forwardMailAddress` is optional.
  - {string} emailAddress: Email address
  - {string} notesAddress: Notes address
  - {string} displayName: Name to be displayed. Optional
  - {string} forwardMailAddress: Forward email address. Optional

&nbsp;

**Note** that the Verse directory search will time out in 1 minute, so your extension must send back the `com.ibm.verse.ext.action.directorySearch` message as soon as possible once it finishes searching.

Below is the sample code to handle the message from Verse and send the Search Results message to Verse.

{% highlight pre %}
document.onload = function() {
  document.addEventListener('message', function(evt) {
    var verseApiType = event && event.data && event.data.verseApiType;
    var verseWindow = event.source;
    if (verseApiType === 'com.ibm.verse.action.clicked') {
      var actionId = event.data.verseApiData && event.data.verseApiData.actionId;
      if ( actionId === 'com.ibm.verse.ext.action.directorySearch') {
        var searchString = event.data.verseApiData && event.data.verseApiData.context
          && event.data.verseApiData.context.searchString;
          // Do custom search
          var searchResult = someCustomSearchAPI(searchString);
          // Send message back to Verse
          var searchResultsMessage = {
            verseApiType: 'com.ibm.verse.ext.directorySearch.searchResults',
            returnCode: 0,
            result: searchResult,
          };
          verseWindow.postMessage(searchResultsMessage, evt.origin);
  });
}
{% endhighlight %}

&nbsp;

When Verse receives message from the directory search extension, Verse will check if it is a `com.ibm.verse.ext.directorySearch.searchResults` message. If so, Verse will process the results, and shows the results in the search panel.

&nbsp;

#### Directory Search Extension Tutorial
For the tutorial of creating a directory search extension in Verse, see [Directory Search Extension Tutorial](../tutorials#directory-search-extension).

&nbsp;
&nbsp;

### Enable Sametime (com.ibm.appreg.ext.enableSametime)
The Enable Sametime extension point allows you to enable Connection Cloud Chat in Verse when Webchat is disabled at the Organization level. It overrides the Administration panel setting to allow Sametime chat in Verse even if the Instant Messaging is disabled in the Administration panel.

&nbsp;

#### Example Enable Sametime Extension
{% highlight pre %}
  {
    "name": "Enable Sametime",
    "title": "Enable Sametime",
    "description": "This extension enables Sametime in Verse, overriding the Admin panel setting",
    "extensions": [
      {
        "name": "Enable Sametime",
        "type": "com.ibm.appreg.ext.enableSametime"
      }
    ],
    "services": [
      "Verse"
    ]
  }
{% endhighlight %}
