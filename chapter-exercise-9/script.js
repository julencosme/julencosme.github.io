/*   JavaScript 6th Edition
 *   Chapter 9
 *   Chapter case
 *
 *   Eating Well in Season
 *   Author: Julen D. Cosme
 *   Date:   01 April 2016
 *
 *   Filename: script.js
 */

// interpret document content in strict mode
"use strict";

// delete cookies when order.htm opens
function clearCookies() {

  // creates variable containing the cookie string
  var cookieString = document.cookie;
  // create array containing each cookie as a separate element
  var cookieArray = cookieString.split("; ");
  // declare date object set to the current date
  var expiresDate = new Date();

  // set expiresDate to a date in the past
  expiresDate.setDate(expiresDate.getDate() - 7);

  // recreate each cookie in arra, appending expiry attribute via expresDate value
  for (var i = 0; i < cookieArray.length; i++) {
    document.cookie = cookieArray[i] + "; expires=" + expiresDate.toUTCString();
  }
}

if (window.addEventListener) {
  window.addEventListener("load", clearCookies, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", clearCookies);
}