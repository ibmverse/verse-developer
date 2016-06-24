---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "Install Verse Developer Chrome Extension"
categories: 
---

### {{page.title}}  

#### For finishing each of the tutorial in this document, please follow the below steps to set up your development environment.

1. A Google Chrome browser is needed in your development environment.
2. Download the [Verse Developer Chrome Extension][1] to your local file system.
3. Check to see if your Verse URL match a item of the `matches` property in the __manifest.json__, if not, follow the below steps to add it.  
    3.1. Find the file of __manifest.json__ from the downloaded [Verse Developer Chrome Extension][1] in your local file system.  
    3.2. Open it with your editor  
    3.3. Check the items under `matches` property, if there's not a item matched your Verse URL, follow the pattern there to add yours as a new item. Let's say my Verse URL is "_https://mycompany.com/verse?_", I need to add a `,` at end of the last item of the `matches` property, and then add "_https://mycompany.com/vers*_" as the last item of the `matches` property.  
4. Launch the Chrome, and input `chrome://extensions/` in address bar.
5. Tick the checkbox of "Developer mode" from the right side panel and click on the `Load unpacked extension...` to load the downloaded [Verse Developer Chrome Extension][1] from your file system.  
6. Input the URL of your Verse page in the address bar and load Verse.
7. Till now, the Verse Developer Chrome Extension is installed and ready to use.
8. The __widget.json__ is the manifest file, which contains all the configurations of contributed Verse extensions. Under the same directory with __manifest.json__, you may also found the __widget.json__ file, most of our works for contributing Verse extensions is to compose in this file.  Please refer to [The manifest file][2] for details.

[1]: {{site.verse-developer-chrome-ext}}
[2]: {{site.baseurl}}/tutorials/tutorial-ext-manifest.html