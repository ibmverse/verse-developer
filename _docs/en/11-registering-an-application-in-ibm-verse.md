---
title: Registering an Application in IBM Verse
lang: en
pagename: registering-an-application-in-ibm-verse
---

## Registering an Application in IBM Verse
For development purposes you can use the [IBM Verse Developer Extension for Google Chrome]({{site.data.developers.developerChromeExtension}}){:target="_blank"} to register an application. There is a [tutorial](#get-started) to get you started.
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
    "name": "application one",
    ...
  },
  {
    "name": "application two",
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
- `name` The name of your application. This **must** be unique.
- `title` The title of your application.
- `description` The description of your application.
- `extensions` An array of of extension definitions. See below for the properties of this object.
- `services` Describes which services the extension is deployed to. `"Verse"` is the only supported value.

&nbsp;

### Extension Properties
There are different required and optional properties for different extensions, please refer to [Verse Extension Points](#verse-extension-points).

### Deploy application on Verse on-Cloud
To add an application to Verse on-Cloud, you need to register it using the IBM App Registry. You can refer to this guide [Managing extensions for Verse]({{site.data.developers.appregistryGuide}}){:target="_blank"} for details.

### Deploy application on Verse on-Premise
To add an application to Verse on-Premise, Verse supports two approaches to deploy your applications/extensions to end users:
- Deploying extensions using the built-in endpoint
- Deploying extensions using a custom endpoint

#### Deploying extensions using the built-in endpoint

Verse On-Premises implemented a built-in endpoint to serve the application's JSON data from a local file or an HTTP hosted file. If storing the applications JSON data as a static file works for you, this is the way to go.

Two data providers are implemented in the built-in endpoint:
- <b>Local file data provider</b>: Serves the applications JSON data from a local file on the Domino server. This allows you to deploy extensions without dependency on another server. The path of the file can be specified using a `notes.ini` parameter `VOP_Extensibility_Applications_Json_FilePath`.
- <b>HTTP data provider</b>: Serves the applications JSON data from an HTTP hosted file. This allows you to deploy `applications.json` to a centralized HTTP server. The HTTP URL of the file can be specified using `notes.ini` parameter `VOP_Extensibility_Applications_Json_URL`.

The `notes.ini` parameter `VOP_Extensibility_Data_Provider_Name` controls which data provider to use, either `localFileProvider` or `httpDataProvider`. By default, if none is specified, `localFileProvider` will be used. In either case, the data provider will periodically check the source applications.json file for updates, so you don't have to restart the server after a new version of `applications.json` is deployed.

To use the local file data provider:
1. Make sure `notes.ini` parameter `VOP_Extensibility_Data_Provider_Name` is either clear or set to localFileProvider.
2. Deploy `applications.json` to the Domino server.
3. Make sure notes.ini parameter `VOP_Extensibility_Applications_Json_FilePath` is set to the file path of `applications.json`. For example:
{% highlight pre %}
VOP_Extensibility_Applications_Json_FilePath=D:\data\applications.json
{% endhighlight %}

To use the HTTP data provider:
1. Make sure notes.ini parameter `VOP_Extensibility_Data_Provider_Name` is set to httpDataProvider.
{% highlight pre %}
VOP_Extensibility_Data_Provider_Name=httpDataProvider
{% endhighlight %}
2. Deploy applications.json to the HTTP server.
3. Make sure notes.ini parameter `VOP_Extensibility_Applications_Json_URL` is set to the HTTP URL of applications.json. For example:
{% highlight pre %}
VOP_Extensibility_Applications_Json_URL=https://files.renovations.com/vop/applications.json
{% endhighlight %}

#### Deploying extensions using a custom endpoint
If you would like to serve the applications.json data dynamically using code, you can specify a custom endpoint (which you implement) to do so. The HTTP URL of the custom endpoint can be specified using notes.ini parameter `VOP_Extensibility_Endpoint_URL`. For example:
{% highlight pre %}
VOP_Extensibility_Endpoint_URL=https://rest.renovations.com/vop/appregistry/services/Verse/applications
{% endhighlight %}

The custom endpoint MUST return the same response format as IBM Connections Appregistry API (see [Retrieving a list of all extensions]({{site.data.developers.RetrievingApplications}}){:target="_blank"}), otherwise, Verse will not be able to correctly parse the response and get the extensions. You can see the response format below. In the <b>items</b>, it contains all of your registered applications/extensions.
![Format for items list](/assets/img/items.png)

#### Summary of related notes.ini parameters
The following table lists related notes.ini parameters that you can use based on your specific needs. You can find each parameter's description, allowed value, and its default value in the table.

{:.table .table-striped}
|  Parameter name |    Description   |  Allowed value  |	Default value  |
| ----------------| ---------------- | ----------------| ----------------|
|VOP_Extensibility_Endpoint_URL	|HTTP URL of the custom endpoint.|	HTTP URL (must be https)	| |
|VOP_Extensibility_Data_Provider_Name |	Which data provider to use when the built-in endpoint is being used.| 	localFileProvider or httpDataProvider	|localFileProvider|
|VOP_Extensibility_Applications_Json_FilePath|	File path of applications.json when LocalFileDataProvider is being used.	|Absolution file path	| {domino_data_directory}/vop/applications.json|
|VOP_Extensibility_Applications_Json_URL	|HTTP URL of applications.json when httpDataProvider is being used.|	HTTP URL (http or https)| |
