/*   JavaScript 6th Edition
 *   Chapter 9
 *   Chapter case
 *
 *   Eating Well in Season
 *   Author: Julen D. Cosme
 *   Date:   01 April 2016
 *
 *   Filename: script2.js
 */


// interpret document contents in strict mode
"use strict";


// declare global variables
var queryArray = [];


// parse and pass query string
function populateInfo() {
  if (location.search) {
    var queryData = location.search;
    queryData = queryData.substring(1, queryData.length);
    queryArray = queryData.split("&");
  }
}


// run populateInfo() function on window load
if (window.addEventListener) {
  window.addEventListener("load", populateInfo, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", populateInfo);
}