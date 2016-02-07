/*   JavaScript 6th Edition
 *   Chapter 4
 *   Chapter case

 *   Tuba Farm Equipment
 *   Custom Error-Handling
 *   Author:  Julen D. Cosme
 *   Date:    06 February 2016

 *   Filename: custom-error-handling.js
 */

// Custom error-handling function
function processErrors (errMessage, errURL, errLineNum) {
  console.log("The file " + errURL + " generated the following error: " + errMessage + " on line " + errLineNum);
  return true;
}

// Event listener(s)
if (window.addEventListener) {
  window.addEventListener("error", processErrors, false);
} else if (window.attachEvent) {
  window.attachEvent("onerror", processErrors);
}