document.getElementById("query-str").innerHTML = "Query String for Person Action Sample"
  + "<hr><pre>" + window.location.search + "</pre>";

var href = window.location.href;
console.log("window location href" + href);

if (href.startsWith("chrome")) {
  alert("Your web page has been opened in a hidden iframe. Query String for Person Action Sample: " + window.location.search);
}
