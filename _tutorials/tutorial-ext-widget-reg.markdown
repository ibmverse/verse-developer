---
[//]: # (Copyright IBM Corp. 2016  All Rights Reserved.)

layout: default
title:  "How to register widgets to Verse"
categories: 
---

### {{page.title}}  

The configurations of Verse extensions must be loaded and registered into Verse internal widget registry. The registered extensions will be rendered on Verse UI, and can be used by users.


In production environment, Verse extension are configured and enabled only by administrators. A administration interface which is Connections AppRegistry can be used by administrators to fulfill the job. The registered Verse extensions can be used by all users within an organization in different browsers.  

For a developer who is developing a widget needs a convenient way to register widgets into Verse for debugging, the [Widget Registry toolkit][2] can be used for this purpose. By this method, the registered extension can not be used by the other users in different machine. And only the Chrome browser is supported for this method. Please see [Install Widget Registry Toolkit][3] for how to get and use the toolkit.  



[1]: http://json.org
[2]: {{site.widget-reg-toolkit}}
[3]: {{site.baseurl}}/tutorials/tutorial-ext-install-toolkit.html