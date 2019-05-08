---
title: Navigation Bar Extension
lang: en
pagename: navigation-bar-extension
---

## {{page.title}}

This tutorial will get you started creating navigation bar extensions for Verse. This is a follow-on tutorial to [Your First Application for IBM Verse](../developers/#how-to-install)

There is much more detailed documentation available [here](../developers), but it's not required for completing the tutorial.

---

### Create Navigation Bar Extensions to Brand Verse

&nbsp;
&nbsp;

#### Edit applications.json
__1.__ Open `src/applications.json` in your text editor.

__2.__ Append the following object into the array in `applications.json`, and save the file. __Be sure to add a comma `,` at the end of the last object in applications.json before adding your own__.

```json
  {
    "extensions": [
      {
        "name": "Delete the default Org link",
        "type": "com.ibm.action.delete",
        "path": ".org",
        "title": "Delete the default Org link",
        "description": "This sample shows how to delete the default organization link",
        "applications": [
          "Branding App"
        ]
      },
      {
        "name": "New Company Name",
        "type": "com.ibm.action.link",
        "path": "com.ibm.navbar.order.1500",
        "title": "New Company Name",
        "description": "This sample shows how to add a new organization link",
        "payload": {
          "link": "http://www.ibm.com",
          "title": "New Company Name",
          "window_features": "target=_blank"
        }
      },
      {
        "name": "New Company logo",
        "type": "com.ibm.action.link",
        "title": "New Company Name",
        "path": "com.ibm.navbar.order.1000",
        "description": "This sample shows how to add a new organization logo",
        "payload": {
          "link": "http://www.ibm.com",
          "title": "New Company Name",
          "icon": "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0nY2hhdC1pbWFnZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBmaWxsPSd3aGl0ZScgdmlld0JveD0nMCAwIDIwIDIwJz48cGF0aCBjbGFzcz0nY2hhdC1pbWFnZS1vdXRsaW5lJyBkPSdNMTAgMEM1LjYgMCAyIDMuNiAyIDhjMCA0LjEgMy4xIDcuNCA3IDcuOVYyMGw2LjgtNi41QzE3LjEgMTIuMSAxOCAxMC4xIDE4IDhjMC00LjQtMy42LTgtOC04em01IDEyLjlsLTUgNC43VjE1Yy0zLjkgMC03LTMuMS03LTdzMy4xLTcgNy03IDcgMy4xIDcgN2MwIDEuOS0uOCAzLjYtMiA0Ljl6Jy8+PC9zdmc+",
          "window_features": "target=_blank"
        }
      }
    ],
    "title": "Branding App",
    "name": "Branding App",
    "description": "This sample shows how to brand Verse",
    "payload": {},
    "services": [
      "TopNavigationBar"
    ]
  }
```

__3.__ __Every time__ you change the extension code, __reload the extension__ then __reload Verse,__ so that the browser and Verse will pick up your latest changes.

For instructions on how to reload the extension click [here](../developers/#installing-to-chrome).

&nbsp;
&nbsp;

#### Test it out

The organization name is changed to `New Company Name` and a new logo is added on navigation bar.

![Navigation Bar Branding UI]({{ site.url }}{{ site.baseurl }}/assets/img/navbar-extension-branding.png)

Congratulations! You successfully configured navigation bar extensions with Verse.

&nbsp;
&nbsp;

#### How it works

* This step introduces two extension points, one with the type `com.ibm.action.delete`, the other with the type `com.ibm.action.link`.
* Three navigation bar extensions are configured. The extension with the type `com.ibm.action.delete` deletes the default Organization link. The extension with the type `com.ibm.action.link` adds a new Organization link. The extension with the type `com.ibm.action.link` adds a new logo on navigation bar.

&nbsp;
&nbsp;

### Create Cascading Menu On Navigation Bar

&nbsp;
&nbsp;

#### Edit applications.json
__1.__ Open `src/applications.json` in your text editor.

__2.__ Append the following object into the array in `applications.json`, and save the file. __Be sure to add a comma `,` at the end of the last object in applications.json before adding your own__.

```json
  {
    "extensions": [
      {
        "type": "com.ibm.action.menu",
        "path": "com.ibm.navbar.order.3500",
        "applications": [
          "News Menu"
        ],
        "name": "NewsMenuContainer",
        "description": "This sample shows how to contribute a menu container",
        "title": "News"
      },
      {
        "type": "com.ibm.action.menu.link",
        "path": "NewsMenuContainer.1",
        "applications": [
          "News Menu"
        ],
        "name": "News.CNN",
        "description": "This sample shows how to contribute a submenu",
        "payload": {
          "link": "http://cnn.com",
          "target":"_blank"
        },
        "title": "CNN"
      },
      {
        "type": "com.ibm.action.menu.link",
        "path": "NewsMenuContainer.2",
        "applications": [
          "News Menu"
        ],
        "name": "News.BBC",
        "description": "This sample shows how to contribute a submenu",
        "payload": {
          "link": "http://bbc.com/news",
          "target":"_blank"
        },
        "title": "BBC"
      }
    ],
    "title": "News Menu",
    "name": "News Menu",
    "description": "This sample shows how to contribute a cascading menu",
    "payload": {},
    "services": [
      "TopNavigationBar"
    ]
  }
```

__3.__ __Every time__ you change the extension code, __reload the extension__ then __reload Verse,__ so that the browser and Verse will pick up your latest changes.

For instructions on how to reload the extension click [here](../developers/#installing-to-chrome).

&nbsp;
&nbsp;

#### Test it out

A new menu `News` is added on navigation bar. It has two submenus `CNN` and `BCC`.

![Navigation Bar Cascading Menu UI]({{ site.url }}{{ site.baseurl }}/assets/img/navbar-extension-cascading-menu.png)

Congratulations! You successfully configured navigation bar extensions with Verse.

&nbsp;
&nbsp;

#### How it works

* This step introduces two extension points, one with the type `com.ibm.action.menu`, the other with the type `com.ibm.action.menu.link`.
* Three navigation bar extensions are configured into Verse. The extension with the type `com.ibm.action.menu` contributes a menu container on the top of navigation bar. The extensions with the type `com.ibm.action.menu.link` contribute two submenus within the menu container.

&nbsp;
&nbsp;

### Add Top-level Link And Delete Default Link On Navigation Bar

&nbsp;
&nbsp;

#### Edit applications.json
__1.__ Open `src/applications.json` in your text editor.

__2.__ Append the following object into the array in `applications.json`, and save the file. __Be sure to add a comma `,` at the end of the last object in applications.json before adding your own__.

```json
  {
    "extensions": [
      {
        "type": "com.ibm.action.link",
        "path": "com.ibm.navbar.order.10000",
        "applications": [
          "Narbar App"
        ],
        "name": "Sample Link 1",
        "description": "This sample shows how to add a top-level link",
        "payload": {
          "link": "http://www.ibm.com",
          "title": "Sample Link 1",
          "window_features": "target=_blank"
        },
        "title": "Sample Link 1"
      },
      {
        "type": "com.ibm.action.link",
        "path": "com.ibm.navbar.order.390000",
        "applications": [
          "Narbar App"
        ],
        "name": "Sample Link 2",
        "description": "This sample shows how to add a top-level link",
        "payload": {
          "link": "http://www.ibm.com",
          "title": "Sample Link 2",
          "window_features": "target=_blank"
        },
        "title": "Sample Link 2"
      },
      {
        "type": "com.ibm.action.delete",
        "path": ".mailnotebook",
        "applications": [
          "Navbar App"
        ],
        "name": "Delete Notebook link",
        "description": "This sample shows how to delete the Notebook link from the More menu",
        "title": "Delete Notebook Link"
      },
      {
        "type": "com.ibm.action.link",
        "path": "com.ibm.navbar.order.96001",
        "applications": [
          "Narbar App"
        ],
        "name": "Sample Link 3",
        "title": "Sample Link 3",
        "description": "This sample shows how to add a new link to More menu",
        "payload": {
          "link": "http://www.ibm.com",
          "title": "Sample Link 3",
          "window_features": "target=_blank"
        }
      }
    ],
    "title": "Navbar App",
    "name": "Navbar App",
    "description": "Navbar App",
    "payload": {},
    "services": [
      "TopNavigationBar"
    ]
  }
```

__3.__ __Every time__ you change the extension code, __reload the extension__ then __reload Verse,__ so that the browser and Verse will pick up your latest changes.

For instructions on how to reload the extension click [here](../developers/#installing-to-chrome).

&nbsp;
&nbsp;

#### Test it out

A top-level link `Sample Link 1` is added on the left part of navigation bar. A top-level link `Sample Link 2` is added on the right part of navigation bar.
The `Notebook` link is deleted from `More` menu. A new link `Sample Link 3` is added to `More` menu.

![Navigation Bar Add and Delete Link UI]({{ site.url }}{{ site.baseurl }}/assets/img/navbar-extension-add-delete-link.png)

Congratulations! You successfully configured navigation bar extensions with Verse.

&nbsp;
&nbsp;

#### How it works

* This step introduces two extension points, one with the type `com.ibm.action.link`, the other with the type `com.ibm.action.delete`.
* Four navigation bar extensions are configured into Verse. The extension with the type `com.ibm.action.link` add two top-level links `Sample Link 1` and `Sample Link 2` on navigation bar and a new link `Sample Link 3` to `More` menu. The extension with the type `com.ibm.action.delete` deletes the `Notebook` link from the `More` menu.
