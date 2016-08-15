---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Installing the Verse Developer Extension for Google Chrome"
categories: 
---

## {{page.title}}  

You can use the IBM Verse Developer Extension for Google Chrome toolkit to register extensions locally for testing. Extensions registered with the Verse Developer Extension for Google Chrome are available only on your computer, with the Chrome browser; the extensions cannot be accessed from other devices.

Before proceeding to the tutorials, complete the following steps to set up your development environment.


1. Install the Google Chrome browser.
1. Download the [Verse Developer Extension for Google Chrome][1] toolkit to your local file system and extract it to a temporary location.
1. Add your organization's Verse URL to the toolkit's __manifest.json__ file :
    * Open the __manifest.json__ file for editing (located in the /src directory of the extracted kit).
    * Append your organization's Verse URL to the __matches__ property, following the pattern shown in the sample manifest. Be sure to append a comma (,) at the end of the URL before your new URL, to delimit them.
    
    The following example shows the URL for the Renovations company's Verse URL appended to the matches property in the kit's manifest.json file:  
    
    Original list:
    
    ```javascript
    "matches": [
      "https://mail.notes.na.collabserv.com/vers*",
      "https://mail.notes.ap.collabserv.com/vers*",
      "https://mail.notes.ce.collabserv.com/vers*"
    ],
    ```
    Revised list:
    
    ```javascript
    "matches": [
      "https://mail.notes.na.collabserv.com/vers*",
      "https://mail.notes.ap.collabserv.com/vers*",
      "https://mail.notes.ce.collabserv.com/vers*",
      "https://renovations.com/vers*"
    ],
    ```
    
    * Save and close the file.
    
1. Start the Chrome browser and type chrome://extensions/ in the address bar.
1. On the extensions page, select __Developer mode__. 
1. Click __Load unpacked extension__ and select the /src directory of the extracted kit.
1. Verify that the "IBM Verse Widget Registry Extension" is __Enabled__.

Your environment is now ready for developing Verse extensions.

__Note:__ In addition to the __manifest.json__ (containing a set of pre-configured extensions), the kit includes a manifest file called __widget.json__ that you will use in the tutorials that follow.


[1]: {{site.verse-developer-chrome-ext}}