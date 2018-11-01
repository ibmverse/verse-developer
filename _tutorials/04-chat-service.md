---
title: Third-Party Chat Service Integration
lang: en
pagename: third-party-chat-service-integration
---

## {{page.title}}

This tutorial will get you started creating a third-party chat service extension for Verse.

There is much more detailed documentation available [here](../developers), but it's not required for completing the tutorial.


---

### Create Chat Service Extension

&nbsp;
&nbsp;

#### Edit applications.json
__1.__ Open `src/applications.json` in your text editor.

__2.__ Append the following object into the array in `applications.json`, and save the file. The object uses Jabber and WebEx as examples. __Be sure to add a comma `,` at the end of the last object in applications.json before adding your own__.

```json
  {
    "name": "Chat Service Integration Sample",
    "title": "Chat Service Integration Sample",
    "description": "This is a sample to integrate third-party chat service in Verse",
    "extensions": [
      {"type": "com.ibm.appreg.ext.disableSametime"},
      {"type": "com.ibm.appreg.ext.disableSTMeetings"},
      {
        "type": "com.ibm.appreg.ext.templatedLink",
        "object": "com.ibm.appreg.object.person",
        "payload": {
          "text": "Jabber Chat",
          "icon": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAbABsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9+z0rwD40f8FLfhZ8DtV1C11C+1zVl0WXyNVudF0mfULbSnBAKyyxjbuUkBlUsynggEV7T4/1a/0HwNrF7pVoL/U7SymmtLZs7Z5VQlFOOcFgM45x05r47+BPie5+EniTQNdj+OL+OPC8saWut6Hrd5FaGzLgRpcWqmONQqZOYAArADyxuUB/fybLYV6dSvVg5qNklFtNt+fLJLyva/Ru1j4viniCrgq9HCUJKDnducoqUYpW6c8G9/s8zXVJan1b8Ffjv4R/aI8D2/iPwXr1j4g0e5A23Fs+dpxnaynDK2CDhgDyK66vk/8AZ4j8PWf7dHiK9+G9pAnhfxHo7y+Ihbo0cY1COfckxVsFd3nOAoGCWcjo2PrAVzZ1l8MJiFCndJpStL4o36S818rqzsrnpcM5vUzHCOpWtzRk4txvySt9qN9eV3++4jdK+DviR/wTUv8A4yfHNms9P1z4e+CNOvnuIorXU4roahMAwSdYxIv2eMZJVBuOSTx2+8qKMqzvG5bOVTBT5XJWf/Dbel1p0sy8+4Yy7OYwhmEOZQbt033V1aSWz91q9le60PL/ANmD9k7wz+yt4au7PQftdxd6myPfXtzIXluim7bn6F3Pc5Y5J4x6gOKKK4cViq2Jqyr4iTlOW7e7PSy7LsNgMNHCYOHJTjsl9731bb1bererP//Z",
          "href": "xmpp://${emails}",
          "locator": "chat"
        }
      },
      {
        "type": "com.ibm.appreg.ext.templatedLink",
        "object": "com.ibm.appreg.object.person",
        "payload": {
          "text": "WebEx meeting",
          "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAARbSURBVEhL7ZZ7TJVlHMdfmsFqXRaLOYJic7OsQOBc4NxvhIhoDmfkFunQ8IgHsYwpSGCwnEoZt5kKyYhkGkoRIKFcLPvTP1picFx0mWlbzSFnh8vBc/n2ex9eqMN7jrxtzf7xuz3nOed5f8/7eX6X53kOh/9J98H3TJLAPmpueKGo6wR3yA7unQsIyW/HImsruKwTWJ9/DB7BTqoWBLvdboRXDoCrGwRXOYSoonO4QeN/UrtJ7bG1NYhKq0a05QjiMnbyUyQpCPgOLd+LP+jbQycmwB3/DROTLsDjBn36y0vN58J3P9HL1r6AsI2JmKL5Hv6Bzz1jE0CBwXcm8SN1YZ/8gqrvnUIIvawXhVMY4Lu+65fx6KZ4RG6XYZSW6GKrCqzAYI8XoV0OaE5eZtOliAd7fNMIz01ETIESy0vkfGEElQg8TS201QHuNJ9J6fIxihdP2eRY+nYylGVqpL9nodHA9AAee8G13sSY8EuqeI9dlN2YAgVii1RQV6iRWqWZS8V8icAxLbRdTlGl/Gu5qRidWFaogKxUBeMBLdLrdGj8tlp47i8RmGsbg6l5EP0/O4QRafJRpEwFq5DAe1uuQsoHWqw5psem5lTBwl8i8AMtv6NtxIXuq6NCdoJXpp/oBJEXa1lu9Qc0SKvRIbPRhM1tKwUDf4nAIfW/omd4HOeHHei2j2PKKw08TctMKFWy3Jrf12H1R0ZkNZvwRucKwcJfYo8bhgnsZODzw7dx8doYq/S77g0qIMPuNKjLtCy3adUGrGswIvszM7b1SAw1Vz2EMyOeOY9nFuDApPBcJDrh4JuCslQB7X4Ny23GEQOymozI+cKCnf1SwVVXsKToDHrst+egs+3SDzdm/P7nFqEB3R7y9l0NzJVarKwxIvNjM7JPmWDtsqBowCIY+ksEjjj4Fd0+vegfuiUCd9ud6LOPYkKw5eWkw1FdooB+vw6pH+pZbl9pMiPnbAryL5jw+ZVawdJfIjB/vXElF3GSrp754NnG10DfiAPXx31QlKihKVfCfEjP9u26BgteP21EXqcFbw5QYQWpTRGYP5kfLOhAWF5XQCjf+Gh8MziFRVnL8MTWeDxti2dF9fJxHTZ8asCGZjNs3UYU96VTJuimCyARmImuPy63HaGra9F9TRzyXqr2J7coEL7tRURtl2PJDgWe261E/N5kJJUZkHcuHYWXVP61ME8Bwfwqx6mPXlOPxWl16Bi5xWBfX51C8dkWPLIxDhFb5Ii0yvHMjiQ8+1YSEvZqkbwvCZu/NGBXn5ldiXfhBvGYXeR0KNDMiNR6RK46ipDM5Qh9NRYPZ8ciPCcRi60yRNtkzNu4QhWSKxKwtd0IW28SLdxJufWydwRTEPDf8ng8eDw1jv5ZPE9expOHFNY9KsgopLqDBmQc1eO1Rj2s7S+hoj1XmLWwFgTPappCp8pdgaW7NFCUq5FSa4TpsBbrm3Q43LGP2XhmdrkkSQb/17oPvkcC/gLPZ5Rn6HFpXQAAAABJRU5ErkJggg==",
          "href": "https://ibm.webex.com/join/${emails}",
          "locator": "meeting"
        }
      }
    ],
    "services": [
      "Verse"
    ]
  }
```

__3.__ __Every time__ you change the extension code, __reload the extension__ and then __reload Verse__ so that the changes are picked up.
For instructions on how to reload the extension click [here](../developers/#installing-to-chrome).

&nbsp;
&nbsp;

#### Test it out
1. Log in to Verse and hover on a Person bubble. The Sametime Chat service icon is replaced with the Jabber Chat icon. Click to launch Jabber Chat.
2. Open any business card. The Sametime meeting service icon is replaced with the WebEx meeting icon. Click to launch WebEx.

![Chat service GIF](gifs/chat_service.gif)

Congratulations! You successfully configured a Chat service extension with Verse.

&nbsp;
&nbsp;

#### How it works

1. The `applications.json` disables both Sametime Chat and meeting services via extension `com.ibm.appreg.ext.disableSametime`.
If only want to disable Sametime meeting service, you can use extension `com.ibm.appreg.ext.disableSTMeetings`.
2. Register a third-party Chat service via the following extension.
  ```
  {
    "type": "com.ibm.appreg.ext.templatedLink",
    "object": "com.ibm.appreg.object.person",
    "payload": {
      "text": "Jabber Chat",
      "icon": "data:image/jpeg;base64,...",
      "href": "xmpp://${emails}",
      "locator": "chat"
    }
  }
  ```
3. Register a third-party Meeting service via the following extension.
  ```
  {
    "type": "com.ibm.appreg.ext.templatedLink",
    "object": "com.ibm.appreg.object.person",
    "payload": {
      "text": "WebEx meeting",
      "icon": "data:image/png;base64,...",
      "href": "https://ibm.webex.com/join/${emails}",
      "locator": "meeting"
    }
  }
  ```
4. Click on the third-party chat or meeting icon to launch the chat or meeting service you registered.

Below are descriptions for the Third-party chat service extension.

##### Required Properties for a Chat Service extension

  - {string} `type` The acceptable value is `com.ibm.appreg.ext.simpleLink` or `com.ibm.appreg.ext.templatedLink`.
    - `com.ibm.appreg.ext.simpleLink` - It will use the registered `href` directly when contributing third-party chat in Verse. See more content in [Simple Link extenson](../developers/#simple-link-comibmappregextsimplelink).
    - `com.ibm.appreg.ext.templatedLink` - It will replace the variable defined in `href` with user's profile data. See more content in [Templated Link extension](../developers/#templated-link-comibmappregexttemplatedlink).
  - {string} `object` The value must be `com.ibm.appreg.object.person`, which indicates this extension is targeted to business card.
  - {string} `text` The name of the third-party Chat or Meeting service. It will be displayed as tooltip when user hovers on the third-party Chat or Meeting icon.
  - {string} `icon` The icon for third-party Chat or Meeting extension. The only value format supported for this property is a data-uri with a base64 encoded payload.
  - {string} `href` The URL to open third-party Chat or Meeting service.
  - {string} `locator` A hint for container where to render the extension within the UI representation of the binding object. The supported value is `chat` or `meeting`.
    - `chat` - Integrate third-party Chat service.
    - `meeting` - Integrate third-party Meeting service.

&nbsp;
&nbsp;

#### Disable Sametime only

If you want to disable Sametime but do not want to register other alternative chat service, you can just register `com.ibm.appreg.ext.disableSametime` extension.

If you just want to disable Sametime meeting but keep Sametime chat, you can just register `com.ibm.appreg.ext.disableSTMeetings` extension. Notes that, you could NOT replace Sametime meeting with third-party meeting extension under this condition.