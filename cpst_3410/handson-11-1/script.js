/*  JavaScript 6th Edition
    Chapter 11
    Hands-on Project 11-1

    Author: Julen D. Cosme
    Date:   13 April 2016

    Filename: script.js
*/


// interpret contents in strict mode
"use strict";


// declare global variables
var searchResults;
var httpRequest = false;


// instantiate reusable XHR object
function getRequestObject() {
  try {
    httpRequest = new XMLHttpRequest();
  }
  catch (requestError) {
    return false;
  }
  return httpRequest;
}


// construct processing for GET request
function getResults(evt) {

  // prevent default
  if (evt.preventDefault) {
    evt.preventDefault();
  } else {
    evt.returnValue = false;
  }

  var entry = document.getElementsByTagName("input")[0].value;

  if (!httpRequest) {
    httpRequest = getRequestObject();
  }

  httpRequest.abort();
  httpRequest.open("get","search.php?q=" + entry, true);
  httpRequest.send();
  httpRequest.onreadystatechange = displaySuggestions;
}


// construct processing for parsing and visualizing GET response
function displaySuggestions() {
  if (httpRequest.readyState === 4 && httpRequest.status === 200) {
    searchResults = JSON.parse(httpRequest.responseText);

    var items = searchResults.d.results;
    var articleEl = document.getElementsByTagName("article")[0];

    for (var i = 0; i < items.length; i++) {
      var newDiv = document.createElement("div");
      var head = document.createDocumentFragment();
      var newP1 = document.createElement("p");
      var newP2 = document.createElement("p");
      var newP3 = document.createElement("p");
      var newA = document.createElement("a");

      head.appendChild(newP1);

      newA.innerHTML = items[i].Title;
      newA.setAttribute("href", items[i].Url);

      newP1.appendChild(newA);
      newP1.className = "head";

      newP2.innerHTML = items[i].Url;
      newP2.className = "url";

      newP3.innerHTML = items[i].Description;

      newDiv.appendChild(head);
      newDiv.appendChild(newP2);
      newDiv.appendChild(newP3);

      articleEl.appendChild(newDiv);
    } // end for statement
  } // end if statement
} // end displaySuggestions()


// create event listeners
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
  form.addEventListener("submit", getResults, false);
} else if (form.attachEvent) {
  form.attachEvent("onsubmit", getResults);
}