---
title: Extensibility Concepts
lang: en
---

## Extensibility Concepts
This section introduces extensibility concepts and terminology that is used throughout this document.
- Application: A third-party web application that contributes new functionality to IBM Verse. An application can contribute one or more new features to different parts of the IBM Verse UI.
- Extension: A feature that contributes to a specific part of IBM Verse. For example, an extension that adds a button or link to the Verse UI which, when clicked, opens a new browser window containing a third-party web application. The URL of the application is registered with Verse and the application opens in a separate window. The application has access to Verse data through cross-document messaging or URL query string parameters.
- `applications.json`: This file contains the details of your application: where in the Verse UI your extensions will appear, how your application communicates with Verse, etc. See the `applications.json` [section](#registering-an-application-in-ibm-verse) for more information.