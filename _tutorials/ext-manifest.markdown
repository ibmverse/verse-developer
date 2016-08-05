---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Working with the manifest file"
categories:
---

## {{page.title}}  


The manifest file contains configuration settings that describe the properties of a Verse extension, in [JSON format][2]. The [Verse Developer Chrome Extension][1] includes a sample manifest called __widget.json__.


The following example shows the manifest for an action contribution. The manifest is defined as an array and is contained with a pair of `[ ]` square brackets. Within the array, each extension is described as an object and is enclosed within `{ }` curly braces.

```
[
  {
    "app_id": "com.ibm.verse.ext.sample",
    "name": "Widget example",
    "url": "https://yourcompany/verseext.html",
      
    "extensions": [
      {
        "type": "com.ibm.verse.action",
        "ext_id": "com.ibm.verse.ext.sample.action",
        "name": "Extension example",
        "payload": {},
        "path": "mail.read",
        "title": "Extension sample"
      }
    ],

    "payload": {
      "features": [
        "core"
      ],
      "preferences": [
        {
          "name": "subject ",
          "value": "subject "
        },
        {
          "name": "body",
          "value": "body"
        }
      ],
      "renderParams": {
        "width": "900",
        "height": "700"
      }
    },

    "services": [
      "Verse
    ]
  }
]
```

In the manifest, the following general properties describe a Verse extension:

The __app_id__ property specifies a unique string that servers as the identifier for the widget associated with this extension; this property is required, and the value must not contain blank spaces and it must be unique among all registered widgets within the organization.

The __name__ property specifies the name of the widget. This property is required, and its value must be unique among all registered widgets within the organization.

The __url__ property specifies the location of the web application page that loads when the extension is activated by a user.

The __extensions__ property lists the set of properties that describe the extension type and context:

* The __type__ property indicates the type of extension being configured (com.ibm.verse.action specifies an action contribution). This property is required.

* The __ext_id__ property is a unique string that identifies the action contribution configured within the current __extensions__ settings. This property is required, and its value must unique among all registered extensions within the organization.

* The __name__ property is a unique string that identifies the action contribution configured within the current __extensions__ settings. This property is required, and its value must unique among all registered extensions within the organization.

* The __payload__ property indicates the other optional properties of extension. This property is required, but its value can be empty.

* The __path__ property indicates that the action contribution displays in the mail view, and uses two additional sub-properties to indicate the specific mail view: 
   
    * __mail.read__ indicates that the action contribution displays in the mail read view.
    * __mail.compose__ indicates that the action contribution displays in the mail compose view.

* The __dataType__ property indicates that the action contribution displays in a view which provides the specific dataType.

    * The __person__ value specifies that the action contribution displays in a view which provides __person__ dataType. For example, the business card view provides the __person__ data type, then the action contribution will be shown on the business card view.

* The __title__ property is a string that is displayed as both the caption and the tool tip string of the action button.

The __payload__ property lists the set of properties that describe the widget's rendering parameters, preferences and features:

* The __features__ property indicates which Verse API is called by the widget. The list of features is an array and is enclosed in `[ ]` square brackets. Currently, the only accepted value is __core__ which indicates that the Verse core API will send context data to the web application through [cross-document messaging][5].

* The __preferences__ property specifies what data is sent to the associated web application as URL parameters, and where that data resides within the context data. The list of preferences is an array and is enclosed in `[ ]` square brackets.

* The __renderParams__ property specifies the size of the new window where the web application displays.

The __services__ property indicates which service the widget is contributed to. The list of services is an array and is enclosed in `[ ]` square brackets. Since the widget is contributed to Verse by default, therefore, the only accepted value is __Verse__ which indicates that the widget is contributed to Verse.


__Notes:__

* All property names and values are case sensitive, must be enclosed in quotation marks (" "), and must be spelled as shown in the example. 
* You can include both a __preferences__ property and a __features__ property in the manifest. 
* Only one property between __path__ and __dataType__ can be chosen as a single extension definition. These two properties can't be used at the same time to define the same extension.

* To understand how Verse send data to the web application, see [Sending data to a web application][4].


[1]: {{site.verse-developer-chrome-ext}}
[2]: http://json.org
[3]: {{site.baseurl}}/tutorials/ext-action-contribution.html
[4]: {{site.baseurl}}/tutorials/ext-send-data-to-app.html
[5]: https://html.spec.whatwg.org/multipage/comms.html#web-messaging
