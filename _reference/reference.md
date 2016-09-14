---
[//]: # (Copyright IBM Corp. 2016.  All Rights Reserved.)

layout: reference
title:  "Verse Extensibility Documentation"
categories: refernece_reference
---

# {{page.title}}

* [Introduction to IBM Verse Extensibility](#introduction-to-ibm-verse-extensibility)
* [Extensibility Concepts](#extensibility-concepts)
* [Verse Action Extensions](#verse-action-extensions)
* [Registering an Application in IBM Verse](#registering-an-application-in-ibm-verse)
* [Sending and Receiving Data](#sending-and-receiving-data)
* [Verse API Data](#verse-api-data)
* [Editing the Manifest](#editing-the-manifest)
* [Troubleshooting](#troubleshooting)

## Introduction to IBM Verse Extensibility

Verse Extensibility allows you to integrate your own web applications with IBM Verse. 
This is achieved by registering your application with Verse, your application can declare one 
or more extensions which will enhance Verse with some new functionality. An example of an extension
point that Verse supports are action extensions. An action extension is typically displayed as a 
button or link in the Verse User Interface (UI) which when clicked triggers some logic in your application. 
An extension can declare it requires specific data from Verse and when it is activated Verse will send it that data 
e.g. if you add a link to a Verse business card your extension can be configured to receive the email address of the person when the link is clicked.

## Extensibility Concepts  
This section introduces extensibility concepts and terminology that is used throughout this document.

* Application: A third party web application which contributes new functionality to IBM Verse. 
  This application can contribute one or more new features to different parts of the IBM Verse user interface.
  The URL of the application is registered with Verse and the application will be opened in a separate window.
  The application will have access to Verse data through cross document messaging or URL query string parameters.

* Extension: A feature which is contributed to a specific part of iBM Verse e.g. 
  an action extension contributes a button or link to the Verse user interface which when clicked opens a 
  new browser window containing a third party web application.
  
* Applications.json: This file will contain the details of your application, where in the Verse UI your extensions
  will appear and other details such as how your application will communicate with Verse. See the 
  applications.json [section](#registering-an-application-in-ibm-verse) for more information.

## Verse Action Extensions
Verse supports extensions in various places in the Verse UI. For example, the mail compose view, the mail read view and the business card.
The "mail.compose" action extension will add an additional action to the more actions button when composing a mail. 
When an extension is clicked, they will open your application in a new window and Verse will send the relevant information to your application.
For example if you add a mail.read action extension Verse will send information such as the mail subject, body, recipients, date etc. 
See [here](#action-extensions) for the full reference of extensions points.
    
## Registering an Application in IBM Verse
To add an extension to Verse, you need to register your extension using the IBM App registry. For development purposes
you can use the [Verse developer Chrome extension](https://git.swg.usma.ibm.com/IBM-Verse/verse-developer-chrome-ext).

### Your Application
You will need to provide the URL to your application. This URL will be loaded in a new window once an action extension is clicked in the Verse UI.
The page that is loaded will need to have some Javascript that listens for a window message event. This message event will contain a context object.
This context object will contain the relevant information from Verse for your extension. When using the Chrome extension you will need to add the URL of your application and the extension actions to the applications.json file.
The Chrome extension will use the extension definitions from the applications.json file and register them with Verse.

### applications.json File Structure
The applications.json file contains a list of Application definitions in JSON format 
```
[
  {
    "app_id": "com.ibm.verse.actions.sample1",
    ...
  },
  {
    "app_id": "com.ibm.verse.actions.sample2",
    ...
  }
]
```
The following sections detail the properties of the application definitions.

### Application Properties
An application definition contains the following properties:
* `app_id`: Unique identifier for the application. This is required and we recommend you use a com.companyName format.
* `name`: The name of your application. This is required and must be unique.
* `url`: This is the URL of your application. This is required.
* `extensions`: An array of of extension definitions. This is required. See below for the sub properties of this object.
* `Payload`: Describes the method of communication between Verse and the application as well as display options 
             for the new window. This is required.
* `Services`: Describes which services the extension is deployed to. "Verse" is the only supported value.

### Extension Properties
An extension definition contains the following properties:
* `ext_id`: The ID of the action extension. This must be unique and is required.
* `type`: The type property indicates the type of extension being configured (for example, com.ibm.verse.action specifies an action contribution). This is required.
* `name`:The name of the action extension in the UI. This must be unique and is required.
* `payload`: The payload property indicates optional properties of the extension. This is reuqired but it's value may be empty.
* `object`: The object property indicates that the extension displays in a view which provides the specific object.
            Using the person value specifies that the extension displays in a view which provides the person object. 
            For example, if the business card view provides the person data type, then the action contribution will be shown on the business card view.
            This property is optional if you are using the path property.
* `path:`:The path property is used to display an action extension in the mail compose view or the mail read view. Valid values are 
        "mail.read" OR "mail.compose". This property is optional if you are using the object property. 
* `title`: The title of your action extension. this is the text that will appear in the Verse UI. This is required.

### Paylod Properties
* `features`: The features property indicates which Verse API is called by the application. The list of features is an array and is enclosed in [ ] square brackets. Currently, the only accepted value is core which indicates that the Verse core API 
* `renderParams`: This is an object that contains properties on how the application window is displayed. This object is passed to ```window.open()``` see [here](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) for a complete list of properties.

### Sample applications.json
See here 

## Sending and Receiving Data

This page will describe how Verse will send data to your application and how your application
can communicate with the Verse window. Verse uses cross document messaging or url query string parameters to communicate
with your application. Both methods are described below. 
   
### Passing data in a URL
Your application can receive data from Verse through URL Query String parameters. This works by adding query string 
parameters to the URL specified in the applications.json file. Valid parameters are described in the [Verse API Data](#verse-api-data) section.
For Example I have created an extension for the business card and I want the name of the user from the business card
to be send to my application. In the applications.json file I specify the following URL.
``` https://MyCompany.com/extension.html?username=<profile.name> ```
In the example above profile.name is a variable which will be substituted with the correct name.
In your application you retrieve the query string parameters as normal. 
  
### Passing data through cross-document messaging
If your web application cannot support receiving the data from url request, you can use cross-document messaging instead. To use this method, you must
add the features property to the manifest with the value of ``` ["core"] ``` so that your web application can communicate with Verse.
You can see an example of this in the [applications.json file](#registering-an-application-in-ibm-verse). In your application code you must
send a ``` "com.ibm.verse.application.loaded" ``` message back to the Verse window, this lets Verse know your web application is ready to 
receive the data from Verse. If you have a reference to the Verse window you can do this at the beginning of your code.
If you do not have a reference to the Verse window you can wait for the message
``` "com.ibm.verse.ping.application.loaded" ``` 
The source of this message will be the Verse window, now you can send Verse the following message to indicate your application is ready.
``` "com.ibm.verse.application.loaded" ```  
In order to handle messages from Verse, your web application needs to register an event listener by using 
```JavaScript
 window.addEventListener("message", function(event) {
  //handle message event code
 }); 
 ```
See [here](../samples/actions.html) for the complete code source of a sample application that demonstrates the concepts described in this section.

## Verse API Data

When an action extension in the Verse UI is clicked it will open a new window and post relevant Verse information to the new window.
This information is known as the context object. The context object is sent from the Verse window using the window.postMessage function.
The context object will be contained in the message event object.
This page will show the full structure of the different context objects that are sent by Verse.
Depending on the action extension the information in the context object will be different, for example adding a mailRead action extension will send 
information relating to the mail like the title, subject body etc where as the the business card action extension will send the persons name, 
email, phone etc.

### Parsing the Verse API Data
The message event will contain an object called data and this will contain an object called verseApiData
The first thing you should do here is to check the actionId property and make sure it matches the "ext_id" in your application.json.
This will ensure you don't run your code for every message event. Below is some example code to do this. 
  ```JavaScript
  window.addEventListener("message", function(event) {
    if(event.data.verseApiData.actionId === "com.ibm.verse.action.sample.person") {
      var verseData = event.data.verseApiData.context;
    }
  }
  ```
In the code sample above, inside the if statement you can see that the information we need from Verse is stored in the context property.
The value of the verseData variable will be different depending on the extension. In the sections below the structure of each 
of the different context objects are outlined. Click the action extension name to see the full output of the data that will 
be sent by Verse.

#### Action Extensions
* [mail.compose:](#mail-compose) This will appear when composing a new mail under the "more actions" button. 
* [mail.read:](#mail-read-view) This will appear when viewing an existing mail under the "more actions" button.
* [person:](#business-card) This will appear on the back of the business card. 


#### Mail Compose
``` 
{
    "body": "",
    "contextId: "",
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
    "contextId: "",
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
If the URL you use to access Verse is specific to your company, you will need to add this URL to the manifest file.
To do this open the manifest.json file with a text editor. You will need to add your Verse URL to the "matches" key.
You need to add a "*" to the end of the URL so the extension will load when using url parameters or page links.
After you modify this file you will need to reload the Chrome extension and refresh Verse.
Note: Make sure to put a comma after the URL before your URL and make sure there are no trailing commas as shown below.
 ```JavaScript  
  "matches": [
      "https://mail.notes.na.collabserv.com/vers*",
      "https://mail.notes.ap.collabserv.com/vers*",
      "https://mail.notes.ce.collabserv.com/vers*",
      "https://<Insert-URL>/verse*"
    ]
 ```

## Troubleshooting 

This section will describe some common issues you may experience as well as providing information on how to 
debug your application. 

### The chrome developer extension will not load
If you are experiencing problems loading the chrome developer extension as an unpacked extension 
this is most likely an issue with the manifest.json or applications.json file. When you edit these 
files make sure you have no trailing commas in the JSON, missing quotation marks, syntax erros etc.

### The chrome extension loads but your extensions do not appear in Verse.
If your extensions are not appearing in the Verse UI make sure you have specified 
the correct path and object properties in the [applications.json](#registering-an-application-in-ibm-verse).
Also make sure that you have added the URL you use to access Verse to the manifest file, see 
[here](#editing-the-manifest) to read more on editing the manifest.

### Debugging your application.
Your application opens in a new window but is not working as expected or does not appear to have
received any data from Verse. This may be an issue with the applications.json file. If you are using 
cross document messaging check that you have specified the value ["core"] for the payload.features
property. If you are using URL query string parameters, check that the variables you added to your URL
are valid and correspond to properties in the Verse api data [section](#verse-api-data). 

If you are still having problems you will need to debug your application 
code using the browser developer tools. However, since Verse will open your application in a new window
which immediately executes your code you will have no time to open the developer tools and set break points.
The simplest solution to this is to add an ```JavaScript alert()``` followed by a ```Javascript debugger; ``` statement.
When the new window opens and your application code starts to execute, the alert will appear and will pause the execution
of your code until the alert is dismissed. Before dismissing the alert, open the developer tools. Now dismiss the alert and 
the the code will pause at your debugger statement. You should inspect the message event listeners and make sure
that they are receiving the correct data from Verse. You should also check that you are sending the 
```com.ibm.verse.application.loaded``` message to the Verse window to indicate your application is ready to receive data from the Verse window.
See [here](#sending-and-receiving-data) for more information on communicating with the Verse window. 


  

 
