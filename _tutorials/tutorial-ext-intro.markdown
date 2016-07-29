---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Introducing Verse extensions"
categories: 
---

## {{page.title}}  

An extension allows you to connect a web application into the IBM Verse user interface. Verse supports the following types of extensions:
* Action contribution: a widget (for example, a button) that you add directly to the Verse UI.
* LiveText: a specified string, contained in the body of a mail message, for which you define an action. 

### Requirements

To deploy your extension in Verse, you will need the following: 

__Web application:__  The app must be hosted on a server, provided by you or a third party, that the user can access from Verse. For security reasons, the web application's pages must be displayed in an iframe or a new browser window.

Verse supports the following methods for passing data to the web application:

* Attach the data directly to the URL as parameters that can be accessed by the web application.

* Pass the data through [cross-document messaging][3].

__Manifest file:__ a [JSON][1] file that contains configuration information about the extension. See [Working with the manifest file][2] for details.

### Terms

*Container* - 
The Verse page where extensions are surfaced for the user.

*Action contribution* - A UI-based extension that displays an action button at a one of several predefined locations on the Verse page.

*Extension* - A data structure containing properties that describe the behavior of an action contribution or of LiveText.

*Extension point* - A predefined location in the user interface where you can place a UI-based extension (in Verse, an action contribution).

*LiveText* - Text contained within the body of a mail message that displays highlighted and, when clicked, responds by opening a web application.

*Manifest file* - A JSON object containing widget properties and extension properties. The Verse Developer Chrome Extension toolkit contains a manifest file, called widget.json, that you will use for the tutorials.

*Widget* - A data structure that contains a URL pointing to a web application, plus additional properties that describe the behavior of that application.

For example: Suppose you want to be able to easily see what time it is in a contact's time zone. You can add a clock image to the business card view in Verse; clicking this "button" opens a web application (in a new window) where you can view clocks for your time zone and the selected contact's time zone. 

In this example:

* The *container* is the Verse page.

* The *extension point* is the business card view.

* The *action contribution*is the display of the clock (the button) on the Verse page.

* The *extension* describes how the clock button behaves when clicked (the clock is an action contribution).

* The *widget* points to the time-zone application and describes how it will be loaded in the browser.

* The *manifest file* contains the properties that describe the extension and the widget.

[1]: http://json.org
[2]: {{site.baseurl}}/tutorials/tutorial-ext-manifest.html
[3]: https://html.spec.whatwg.org/multipage/comms.html#web-messaging
