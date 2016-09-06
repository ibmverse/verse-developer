# Your First Application for Verse

## 1. Introduction

### What is Verse Developer Extension for Google Chrome

Verse Developer Extension for Google Chrome allows you to extend Verse's functionality by sending data from Verse to your external application. You can have multiple applications registered within the Verse Developer Extension, each with their own `app_id`, and each of this application can have multiple Verse extensions, each with its own `ext_id`. The Verse Developer Extension currently supports adding UI buttons into the following parts in the Verse interface:
* Business Card (bizCard) View
* Mail Compose View
* Mail Read View

### What you are going to build
By following this tutorial, you are going to start with some pre-written sample code which adds functionality to the Business Card (bizCard) in Verse. You will then add another application for Verse which will add functionality to the Mail Compose View and the Mail Read View.

### What you'll learn
* How to add action buttons into the Verse UI for your application.
* How to transfer data from Verse to your application.

### What you'll need
* Chrome browser
* [Web Server for Chrome][1] (alternatively, you can also use FireFox Thimble, or your own web server of choice, including localhost)
* The Verse Developer Chrome Extension source code
* A text editor
* Basic knowledge of HTML, CSS, JavaScript, and Chrome DevTools

This tutorial focuses on getting you started on building an application for Verse. It does not go into the details of the API and different concepts. If you need to learn more, you can refer to the __Further Readings__ section at the end of each step of the tutorial, but they are not required to finish this tutorial.

Beware that the changes you made during the tutorial will only be applied to the Chrome browser that has the extension installed. To let other people use your application, you will need to share the edited extension with them and let them install it on their Chrome browsers too.


[1]: https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb
