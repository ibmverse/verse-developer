---
title: Verse API Data
lang: en
pagename: verse-api-data
---

## Verse API Data
Verse is able to send data to your application using what’s known as a context object. It is passed in the message event object of the `window.postMessage` function. This section shows the structure of the different context objects that are sent by Verse.

The information contained in the context object depends on the action extension used. For example, adding a mailRead action extension sends information relating to the selected mail: title, subject, body, etc. Adding a business card action extension sends the person’s name, email, phone, etc.

&nbsp;

### Parsing the Verse API Data
The message event received by your application contains an object called `data`, which has an object called `verseApiData`. You will need to check that the `actionId` property of the `verseApiData` object matches the extension `id` in your `application.json` file. This will ensure that you only run your code for the correct message events.

&nbsp;

For example:

{% highlight pre %}
window.addEventListener("message", function(event) {
  if (event.data.verseApiData.actionId === "com.ibm.verse.action.sample.person") {
    var verseData = event.data.verseApiData.context;
  }
}
{% endhighlight %}

In the code example above, you can see that the information that you need from Verse is stored in the context property, which you can check with the if statement. The value of the verseData variable depends on which extension is used.

In the sections below, the structure of each of the different context objects is outlined.

&nbsp;

### Widget Extensions
- [mail.compose](#mail-compose): This appears when composing a new mail under the more actions button.
- [mail.read](#mail-read): This appears when viewing an existing mail under the more actions button.
- [person](#person): This appears on the back of the business card.

&nbsp;

#### Mail Compose and Before On Send

&nbsp;

**Note** that `recipientBcc` and `attachments` properties are only available when they are enabled in `permissions` property of [widget action](#Optional-Properties-for-a-Widget-Action) or [Before On Send](#Optional-Properties-for-a-Before-On-Send) definition.

&nbsp;

The `attachments` property is an array of JSON objects. Each JSON object contains the following properties:
- {string} `name` attachment name
- {number} `size` the size of attachment in **Byte**
- {string} `assignedName` attachment assigned name in server
- {boolean} `selected` whether attachment is selected or not
- {boolean} `uploaded` whether attachment is uploaded to server or not

&nbsp;

{% highlight pre %}
{
  "attachments": [
    {
      "assignedName": "",
      "name": "",
      "size": "",
      "selected": "",
      "uploaded": "",
    }
  ],
  "body": "",
  "contextId": "",
  "id": "",
  "recipientBcc": [
    {
      "displayName": "",
      "emailAddress": ""
    }
  ],
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
{% endhighlight %}

&nbsp;

#### Mail Read

&nbsp;

- {Array} `attachments` - It's an array of JSON objects. Each JSON object contains the following properties:
  - {string} `name` attachment name
  - {number} `size` the size of attachment in **Byte**
  - {string} `assignedName` attachment assigned name in server
  - {boolean} `selected` whether attachment is selected or not
  - {boolean} `uploaded` whether attachment is uploaded to server or not
- {boolean} `isPreventCopy` - Whether the sender of a message marked it as "Prevent copying" (IBM Notes) or "Keep Private" (IBM iNotes). This property is introduced in Verse on-Premises 1.0.7 and available in Verse on-cloud as well.

&nbsp;

**Note** that `recipientBcc` and `attachments` properties are only available when they are enabled in `permissions` property of [widget action](#Optional-Properties-for-a-Widget-Action) definition.

&nbsp;

{% highlight pre %}
{
  "attachments": [
    {
      "assignedName": "",
      "name": "",
      "size": "",
      "selected": "",
      "uploaded": "",
    }
  ],
  "body": "",
  "contextId": "",
  "id": "",
  "isPreventCopy": "",
  "recipientBcc": [
    {
      "displayName": "",
      "emailAddress": ""
    }
  ],
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
{% endhighlight %}

&nbsp;

#### Person
{% highlight pre %}
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
{% endhighlight %}