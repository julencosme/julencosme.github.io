/*   JavaScript 6th Edition
 *   Chapter 9
 *   Chapter case
 *
 *   Eating Well in Season
 *   Author: Julen D. Cosme
 *   Date:   01 April 2016
 *
 *   Filename: script3.js
 */


// interpret contents using strict mode
"use strict";


/* query string method

// use parseData() to read query strings
function parseData() {

  // convert encoded characters in query string with character equivalents
  var formData = decodeURIComponent(location.search);
  var formArray = [];
  var list = document.querySelector("div.results ul");

  // remove leading ? from query string and assign value to formData
  formData = formData.substring(1, formData.length);

  // replace each occurrence of + with a space
  while (formData.indexOf("+") !== -1) {
    formData = formData.replace("+", " ");
  }

  // convert remaining encoded characters in query string with character equivalents
  formData = decodeURIComponent(formData);

  // use split() method of String class to divide formData values at each "&"
  // store results as elements in formArray
  formArray = formData.split("&");

  // iterate via for loop to create a new li element
  // assign as innerHTML corresponding array elements
  // add each li element as child of ul element via list variable)
  for (var i = 0; i < formArray.length; i++){
    var newItem = document.createElement("li");
    newItem.innerHTML = formArray[i];
    list.appendChild(newItem);
  }
}
*/


// use parseData() to read stored cookies
function parseData() {

  // assign formData to document cookie
  var formData = document.cookie;
  // declare empty form array
  var formArray = [];
  // assign shorthand reference to unordered list
  var list = document.querySelector("div.results ul");

  // use split() method of String class to divide formData values at each "&"
  // store results as elements in formArray
  formArray = formData.split("; ");

  // iterate via for loop to create a new li element
  // assign as innerHTML corresponding array elements
  // add each li element as child of ul element via list variable)
  for (var i = 0; i < formArray.length; i++) {
    var newItem = document.createElement("li");
    newItem.innerHTML = formArray[i];
    list.appendChild(newItem);
  }
}


// invoke parseData() on page load
if (window.addEventListener) {
  window.addEventListener("load", parseData, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", parseData);
}






