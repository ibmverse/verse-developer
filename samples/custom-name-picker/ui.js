// Add event handlers for select boxes and call the API to load new people
function addEventHandler(elem, eventType, handler) {
  if (elem.addEventListener) {
    elem.addEventListener (eventType, handler, false);
  } else if (elem.attachEvent) {
    elem.attachEvent ('on' + eventType, handler);
  }
}

var evt = "";
var called = 0;
(function() {
  window.addEventListener('message', function(event) {

      var people = [
        {
          "email" : "fadams@mailinator.com",
          "name" : "Frank Adams",
          "image" : "https://raw.githubusercontent.com/IBM-Design/icons/master/dist/png/object-based/person_128.png"
        },
        {
          "email" : "sdaryn@mailinator.com",
          "name" : "Samantha Daryn",
          "image" : "https://raw.githubusercontent.com/IBM-Design/icons/master/dist/png/object-based/person_128.png"
        },
        {
          "email" : "respinosa@mailinator.com",
          "name" : "Ron Espinosa",
          "image" : "https://raw.githubusercontent.com/IBM-Design/icons/master/dist/png/object-based/person_128.png"
        }
      ];

    var eventData = event.data;

    /**
     * Message from Verse to check whether your web application is ready.
     */
    if (eventData.verseApiType === 'com.ibm.verse.ping.application.loaded') {
      if (isValidOrigin(event.origin)) {
        var loaded_message = {
          verseApiType: 'com.ibm.verse.application.loaded'
        };
      }
      /**
       * Your application must send a message back to Verse
       * to identify that it's ready to receive data from Verse.
       */
      event.source.postMessage(loaded_message, event.origin);
      evt = event;
    }
    if(called === 0){
      for(var i = 0; i < people.length; i++){
        setContact(people[i]["email"], people[i]["name"], people[i]["image"]);
      }
    }
    called = called + 1;
  }, false);
})();


/** Verify we are listening to the right origin
 * @param {String} currentOrigin - The url which we should listen to
 * @return {Boolean} true if the origin is valid, false otherwise
 */
function isValidOrigin(currentOrigin) {
  var manifest = chrome.runtime.getManifest();
  var originsList = manifest.content_scripts[0].matches;
  for (var i = 0; i < originsList.length; i++) {
    if (originsList[i].indexOf(currentOrigin) !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * Build a contact list item and append it to the list
 * @param email {String} - person's email address
 * @param name {String} - person's name
 * @param image {String} - profile picture url
 */
function setContact(email, name, image) {
  var resultsList = document.getElementById("results-list");

  var liNode = document.createElement("li");

  var emailNode = document.createElement("div");
      emailNode.className = "user-email";

  var nameNode = document.createElement("div");
      nameNode.className = "user-name";

  var imgNode = document.createElement("img");
      imgNode.className = "user-avatar";

  var addBtnNode = document.createElement("div");
      addBtnNode.className = "add-contact";

  var textEmailNode = document.createTextNode(email);
  var textNameNode = document.createTextNode(name);
  var imgSrcNode = image;

  emailNode.appendChild(textEmailNode);
  nameNode.appendChild(textNameNode);
  imgNode.src = imgSrcNode;

  liNode.appendChild(imgNode);
  liNode.appendChild(nameNode);
  liNode.appendChild(emailNode);
  addBtnNode.innerHTML = '<svg class="notify-icons" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><polygon points="14,18.586 10.707,15.293 9.293,16.707 14,21.414 22.707,12.707 21.293,11.293 "/><path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4s12,5.383,12,12S22.617,28,16,28z"/></g></svg><svg class="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M7.5 0C3.4 0 0 3.4 0 7.5S3.4 15 7.5 15 15 11.6 15 7.5 11.6 0 7.5 0zm0 14C3.9 14 1 11.1 1 7.5S3.9 1 7.5 1 14 3.9 14 7.5 11.1 14 7.5 14z"></path><path d="M8 4H7v3H4v1h3v3h1V8h3V7H8"></path></svg><span>Add</span>';
  liNode.appendChild(addBtnNode);
  liNode.setAttribute("tabindex", "1");

  resultsList.appendChild(liNode);

  addEventHandler(addBtnNode, "click", function() {
    this.parentNode.classList.add("added-contact");
    var addBtn = this.querySelector("span");
    setTimeout(function() {
      addBtn.innerText = "Added";
    }, 300);

    var userEmail = this.parentNode.querySelector(".user-email").innerText;
    var userName = this.parentNode.querySelector(".user-name").innerText;
    var emails_message = {
      verseApiType: "com.ibm.verse.add.contact",
      userEmail: userEmail,
      userName: userName
    };
    evt.source.postMessage(emails_message, evt.origin);
  });
}
