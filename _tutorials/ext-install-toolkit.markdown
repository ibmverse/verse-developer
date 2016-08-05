---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Installing the Verse Developer Chrome Extension"
categories: 
---

## {{page.title}}  

You can use the Verse Developer Chrome Extension toolkit to register extensions locally for testing. Extensions registered with the Verse Developer Chrome Extension are available only on your computer, with the Google Chrome browser; the extensions cannot be accessed from other devices.

Before proceeding to the tutorials, complete the following steps to set up your development environment.

1. Install the Google Chrome browser.

2. Download the [Verse Developer Chrome Extension][1] toolkit to your local file system and extract it to a temporary location.

3. Add your organization's Verse URL to the toolkit's __manifest.json__ file :

  a) Open the __manifest.json__ file for editing (located in the /src directory of the extracted kit).

  b) Append your organization's Verse URL to the __matches__ property, following the pattern shown in the sample manifest. Be sure to append a comma (,) at the end of the URL before your new URL, to delimit them.

  The following example shows the URL for the Renovations company's Verse URL appended to the matches property in the kit's manifest.json file:

  Original list:
  ```
    "matches": [
      "https://mail.notes.na.collabserv.com/vers*",
      "https://mail.notes.ap.collabserv.com/vers*",
      "https://mail.notes.ce.collabserv.com/vers*"
    ],
  ```

  Revised list:
  ```
    "matches": [
      "https://mail.notes.na.collabserv.com/vers*",
      "https://mail.notes.ap.collabserv.com/vers*",
      "https://mail.notes.ce.collabserv.com/vers*",
      "https://renovations.com/vers*"
    ],
  ```

  c) Save and close the file.

4. Start the Chrome browser, and type chrome://extensions/ in the address bar.

5. On the extensions page, select __Developer mode__. 

6. Click __Load unpacked extension__ and select the /src directory of the extracted kit.

7. Verify that the "IBM Verse Widget Registry Extension" is __Enabled__.

Your environment is now ready for developing Verse extensions.

__Note:__ In addition to the __manifest.json__ (containing a set of pre-configured extensions), the kit includes a manifest file called __widget.json__ that you will use in the tutorials that follow.


[1]: {{site.verse-developer-chrome-ext}}
