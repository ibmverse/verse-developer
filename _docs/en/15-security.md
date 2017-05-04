---
title: Security
lang: en
---

## Security
As your website is using cross-document messaging to communicate with Verse, it can be vulnerable to cross-site scripting attack unless certain security implementations are followed carefully. Here are three tips to make your application less vulnerable.

&nbsp;

### When receiving message, always verify origin of the message
In this [sample HTML page]({{site.data.developers.sampleActionApp}}){:target="_blank"}, we did not verify origin of the message as we need to make sure the page works with any domain for demoing purpose. However, in a production environment, immediately after the line:
{% highlight pre %}
window.addEventListener("message", function(event) {
{% endhighlight %}

&nbsp;

you should add the following code to check the origin of the message and prevent the rest of the JavaScript code from executing if the message origin does not match your Verse domain:

{% highlight pre %}
if (event.origin !== "<your-Verse-domain-here>"){
  return;
}
{% endhighlight %}

&nbsp;

### When sending message, always specify targetOrigin
`targetOrigin` provides control over where messages are sent. Your application needs to specify `targetOrigin` so that it will not end up sending sensitive information to malicious site.

In this [sample HTML page]({{site.data.developers.sampleActionApp}}){:target="_blank"}, when posting message from the sample page back to Verse, we are specifying the `targetOrigin` to be the origin of the previous event we received (`event.origin`), instead of using a wild card *:
{% highlight pre %}
event.source.postMessage(loaded_message, event.origin);
{% endhighlight %}

&nbsp;

If you have verified origin of the message by implementing the suggestion in the previous tip, you can be sure that `event.origin` here would be your Verse domain.

&nbsp;

### Always validate the messages being passed
This includes trying to use `innerText` or `textContent` instead of `innerHTML` when inserting data value into the DOM so as to avoid malicious code being inserted and executed.

**It is the responsibility of the extension developer to ensure data received is treated appropriately**. For example, with the [HTML sample page]({{site.data.developers.sampleActionApp}}){:target="_blank"}, if it used `insertAdjacentHTML` instead of `innerText` to display the stringified JSON data from the user’s side and a mail subject contained the following line (either in the Mail Compose View or Mail Read View) then when the extension is triggered, a button would be added onto the application’s HTML page, which when clicked, will show an alert:
{% highlight pre %}
</div><button onclick='alert()'>Click me!</button><div>
{% endhighlight %}

This is a proof of concept to show how malicious users can take advantage of this vulnerability to execute their own script.

To learn more about cross-site scripting attack, please refer to the [OWASP site]({{site.data.developers.owaspSite}}){:target="_blank"}.

On the extension side, Google Chrome has also given some suggestion on how to make your Chrome extension more secure. Please refer to their documentation on [Content Security Policy]({{site.data.developers.contentSecurityPolicy}}){:target="_blank"} and [Cross-Origin XHR]({{site.data.developers.crossOriginXhr}}){:target="_blank"} for details.