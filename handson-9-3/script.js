/*   JavaScript 6th Edition
 *   Chapter 9
 *   Hands-On Project 9-3
 *
 *   Author: Julen D. Cosme
 *   Date:   03 April 2016
 *
 *   Filename: script.js
 */


// interpret document contents in strict mode
"use strict";


// extrapolate value from usernameinput
function processCookie() {
  document.cookie = "username=" + document.getElementById("usernameinput").value;
}


// extrapolate data from username field and store to cookie
function populateInfo() {
  if (document.cookie) {
    var uname = document.cookie;
    uname = uname.substring(uname.lastIndexOf("=") + 1);
    document.getElementById("usernameinput").value = uname;
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
  processCookie();
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