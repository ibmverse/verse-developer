---
title: IBM Verse Container
lang: en
---

## IBM Verse Container
IBM Verse Container allows applications to contribute or remove UI at specific locations within the container. Path and Object are the ways the container provides the ability to target a location.

&nbsp;

### Path
IBM Verse allows extensionss to contribute or remove UI at specific locations in Verse. A `path` is one way the container provides the ability to target a location. Here is an example of 2 supported `paths`:
- `mail.read` - allows application developers to contribute an action under more actions button when viewing an existing email
- `mail.compose` - allows application developers to contribute an action under more actions button when composing a new email


&nbsp;

### Object
Another way for a container to allow extensions to target locations is by an `object`type. IBM Verse also supports an extension to add a button on Person object. For example, an extension is contributed to the bizcard cards which has a person object. Here is an example of a supported `object`:
- Person (type = com.ibm.appreg.object.person)