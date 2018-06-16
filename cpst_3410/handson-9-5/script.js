/*   JavaScript 6th Edition
 *   Chapter 9
 *   Hands-On Project 9-5
 *
 *   Author: Julen D. Cosme
 *   Date:   03 April 2016
 *
 *   Filename: script.js
 */


// interpret document contents in strict mode
"use strict";


/* comment out in pursuance of Web Storage
// extrapolate value from usernameinput
function processCookie() {
  var expiresDate = new Date();
  if (document.getElementById("rememberinput").checked) {
    expiresDate.setMinutes(expiresDate.getMinutes() + 2);
    document.cookie = "username=" + document.getElementById("usernameinput").value + "; expires=" + expiresDate.toUTCString();
  } else {
    expiresDate.setDate(expiresDate.getDate() - 7);
    document.cookie = "username=null; expires=" + expiresDate.toUTCString();
  }
}
*/

/* comment out in pursuance of Web Storage
// extrapolate data from username field and store to cookie
function populateInfo() {
  if (document.cookie) {
    var uname = document.cookie;
    uname = uname.substring(uname.lastIndexOf("=") + 1);
    document.getElementById("usernameinput").value = uname;
  }
}
*/


function processStorage() {
  // add if statement to check whether value of #rememberinput is checked
  if (document.getElementById("rememberinput").checked === true) {
    // add name-value pair to sessionStorage property
    sessionStorage.username = document.getElementById("usernameinput").value;
  }
}


function populateInfo() {

  // add if statement for use of condition sessionStorage.username
  // run the following statement provided condition true
  if (sessionStorage.username) {
    document.getElementById("usernameinput").value = sessionStorage.username;
  }
}


// handle form submission , storing value to cookie
function handleSubmit(evt) {
  // prevent default
  if (evt.preventDefault) {
    evt.preventDefault();
  } else {
    evt.returnValue = false;
  }
  // invoke processCookie()
  // processCookie();
  processStorage();
  // submit form
  document.getElementsByTagName("form")[0].submit();
}


// catalog event listeners
function createEventListener() {
  var loginForm = document.getElementsByTagName("form")[0];
  if (loginForm.addEventListener) {
    loginForm.addEventListener("submit", handleSubmit, false);
  } else if (loginForm.attachEvent) {
    loginForm.attachEvent("onsubmit", handleSubmit);
  }
}


// load scripts
function setUpPage() {
  populateInfo();
  createEventListener();
}


// add event listener for window load
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", setUpPage);
}