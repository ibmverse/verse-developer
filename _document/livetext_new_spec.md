---
[//]: # (Copyright IBM Corp. 2017.  All Rights Reserved.)

layout: document
title:  "Live Text simple specification."
categories: verse_live_text
---

# {{page.title}}

Live Text feature enables users to configure automatically recognized patterns of data in email, and run custom defined actions against the recognized content and link to existing web applications.

Technically, Verse Live Text is also a kind of Verse extensibility. So a Live Text widget is also called a Live Text extension in Verse.

A Live Text extension configuration is stored in a json file, which complies with the Live Text Extension Definition below.

## Live Text Extension Definition
Verse Live Text is an extension point of IBM Verse.

### Properties defined by simple specification  

* __{string}__ `type`  must be "com.ibm.verse.ext.liveText"   
* __{object}__ `payload`  must contain following properties,   
    * __{string}__ `text` (__required__) The text for the Live Text action.   
    * __{string}__ `href` (__required__) The Live Text link location. Use ${groupNumber} to define a variable in the href. The groupNumber is the group number of regular expression defined in recognizer. When execute a Live Text action, the ${groupNumber} will be replaced with text recognized by the groupNumber group.  
    * __{string}__ `recognizer` (__required__) A regular expression in string form, not a regex literal, to recognize the specified text pattern as Live Text.  
    * __{string}__ `alt` (__optional__) Alt text for Live Text action.  
    * __{string}__ `location` (__optional__) This property specifies where to open the Live Text extension. The acceptable values can be `window` or `tab`.  
    * __{object}__ `renderParams` (__optional__) This property specifies the window size when the extension is open in a new window. The renderParams property contains `width` and `height` properties, which are used to specify the new window’s width/height accordingly. This property is only valid if the location’s value is window.

### Properties defined by complicated specification  
Live Text extension configuration can be created in IBM Notes client and then exported to a json format file by using the tool of Live Text Widget Export Plug-in. The tool will create a complicated json file which contains the Live Text configuration will be supported by Verse Live Text feature too.  We have no plan to introduce more details of the complicated specification in this document. 