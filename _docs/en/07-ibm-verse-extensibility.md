---
title: HCL Verse Extensibility
lang: en
pagename: ibm-verse-extensibility
---

## HCL Verse Extensibility
Verse Extensibility allows you to integrate your own web applications with HCL Verse, by registering your application with it. Your application can declare one or more extensions, which will enhance Verse with new functionality.


For example, one of the extension points that Verse supports is a templated link extension. A templated link extension is displayed as a link in the Verse User Interface (UI) which, when clicked, opens a URL to a third party web application.


An extension can declare that it requires specific data from Verse, and when the extension is activated, Verse will send this data to it. For example, if you add a templated link to a Verse business card, your extension can be configured to receive the email address of the person included in the link URL.