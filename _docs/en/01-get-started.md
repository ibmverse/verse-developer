---
title: Verse Get Started
lang: en
pagename: get-started
---

## Get Started
This tutorial will get you started writing an application for Verse. There is much more detailed documentation available [here](#ibm-verse-extensibility), but it’s not required to complete the tutorials.

&nbsp;

### What is the Verse Developer browser extension?
The Verse Developer browser extension is a tool for developers who are adding customised capabilities to HCL Verse. The tool allows an application to be registered with HCL Verse, where each application contains a set of customised capabilities. One or more applications can be registered using the tool. Each application can contain one or more extensions. In this tutoiral we will have a look at 2 of the possible types of extensions, templated links and widgets. To get a full list of the extension points supported by HCL Verse please go [here](#verse-extension-points).

{:.table .table-striped}
|                     Name              |                       Usage                     |
| ------------------------------------- | ----------------------------------------------- |
| [Templated Link](#templated-link-comibmappregexttemplatedlink)      |    type = com.ibm.appreg.ext.templatedLink      |
| [Widget](#widget-comibmverseextwidget)                     |    type = com.ibm.verse.ext.widget              |

As you will see in this tutorial extensions can be contributed to the following parts of the HCL Verse user interface:

- Business Card
- Mail Compose View
- Mail Read View

&nbsp;

### What you are going to build
This tutorial starts with a sample application for you to add functionality to the Business Card in Verse. Then you will write another application that adds functionality to both the Mail Compose and Mail Read views.

&nbsp;

### What you’ll learn
- How to add extensions into the Verse UI for your application.
- How to transfer data from Verse to your application.

&nbsp;

### What you’ll need
- Google Chrome or Firefox (minimum version 49.0) browser
- [Web Server for Chrome]({{site.data.developers.webServerForChrome}}){:target="_blank"} (alternatively, you can also use FireFox Thimble, or any other web server)
- The Verse Developer Browser Extension source code
- A text editor
- Basic knowledge of HTML, CSS, JavaScript, and Chrome DevTools
- Estimated time: 40 min


&nbsp; &nbsp;

This tutorial gets you started on building an application for Verse. It does not go into the details of the API and different concepts. If you want to learn more, you can refer to the [Documentation](#ibm-verse-extensibility) section, section at the end of the tutorial, but the readings are not required to finish this tutorial.

&nbsp;

**Note:** The changes you make during the tutorial will only be applied to the Chrome browser that has the extension installed. To let other people test your Application, you will need to share the edited extension with them and let them install it on their Chrome browsers too. IBM will be providing an Application Registry to allow you to deploy your application in production.