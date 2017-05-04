---
title: Registering an Application in IBM Verse
lang: en
---

## Registering an Application in IBM Verse
To add an application to Verse, you need to register it using the IBM App Registry. For development purposes you can use the [IBM Verse Developer Extension for Google Chrome]({{site.data.developers.developerChromeExtension}}){:target="_blank"}. There is a [tutorial](#get-started) to get you started.

&nbsp;

### Your Application
You will need to provide Verse with the URL to your web application. Once an extension is clicked in the Verse UI, the URL will be loaded in a new window. If cross-document messaging is configured, the initial web page can use JavaScript to listen for a window message event containing a context object after it loads. This object has information from Verse for your extension, as specified in the `applications.json` file.

When using the Chrome extension, you will need to add the URL of your application and the extension(s) to the `applications.json` file. The Chrome extension will use the extension definitions from this file and register them with Verse.

&nbsp;

### File structure of applications.json
The `applications.json` file contains a list of Application definitions in JSON format
{% highlight pre %}
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
{% endhighlight %}

&nbsp;

Here are three different samples of valid `applications.json`:

- [Sample 1]({{site.data.developers.sample1}}){:target="_blank"}

- [Sample 2]({{site.data.developers.sample2}}){:target="_blank"}

- [Sample 3]({{site.data.developers.sample3}}){:target="_blank"}

&nbsp;

### Application Properties
An application definition **must** contain the following properties:
- `id` The **unique** identifier for the application, using the form: com.companyName.
- `name` The name of your application. This **must** be unique.
- `title` The title of your application.
- `description` The description of your application.
- `extensions` An array of of extension definitions. See below for the properties of this object.
- `services` Describes which services the extension is deployed to. `"Verse"` is the only supported value.

&nbsp;

### Extension Properties
An extension definition **must** contain the following properties. **Only one of `object` or `path` is required**:
- `id` The ID of the action extension. This must be **unique**.
- `type` The type of extension being configured (for example, `com.ibm.verse.action` specifies an action contribution).
- `name` The name of the action extension in the UI. This must be **unique**.
- `payload` The payload property indicates optional properties of the extension. *The `payload` property is required, but its value can be empty*.
- `object` The object property indicates that the extension displays in a view that provides the specified object. Using the person value specifies that the extension displays in a view that provides the person object. For example, if the business card view provides the person data type, then the extension contribution will be shown on the business card view. *This property is not required if you are using the `path` property*.
- `path` The path property displays an extension in the mail compose view or the mail read view. Valid values are `mail.read` or `mail.compose`. *This property is not required if you are using the `object` property*.

&nbsp;

### Payload Properties
- `features` This property indicates which Verse API is called by the application. The list of features is an array, enclosed in square brackets. Currently, the only accepted value is `["core"]`, which indicates that you are invoking the Verse core API.
- `renderParams` This is an object that contains properties on how the application window is displayed. This object is passed to `window.open()`. See [here]({{site.data.developers.mozillaWindowApi}}){:target="_blank"} for a complete list of properties.