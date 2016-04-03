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
    var hiddenInputs = document.querySelectorAll("input[type=hidden]");

    queryData = queryData.substring(1, queryData.length);
    queryArray = queryData.split("&");

    for (var i = 0; i < queryArray.length; i++){
      hiddenInputs[i].value = queryArray[i].substring(queryArray[i].lastIndexOf("=") + 1);
    }
  }
}


// implement persistent cookies
function createCookies() {

  // select all pertinent form fields from which to store local data
  var formFields = document.querySelectorAll("input[type=hidden], input[type=radio], textarea");

  // instantiate today's date re: use for expiresDate
  var expiresDate = new Date();

  // set expiresDate variable to span one week from today
  expiresDate.setDate(expiresDate.getDate() + 7);

  // iterate through form data and recode for use in cookies
  for (var i = 0; i < formFields.length; i++) {
    var currentValue = decodeURIComponent(formFields[i].value);
    currentValue = currentValue.replace(/\+/g, " ");

    // specify expire date, i.e.,
    // add semicolon and space and text for specifying date stored in expiresDate
    document.cookie = formFields[i].name + "=" + currentValue + "; expires" + expiresDate.toUTCString();
  }
}


// event handler re: submit form
function handleSubmit(evt) {
  if (evt.preventDefault) {
    evt.preventDefault(); // prevent form from submitting
  } else {
    evt.returnValue = false; // prevent form from submitting in IE8
  }
  // create cookies based on completed form
  createCookies();
  // fire submit event on form
  document.getElementsByTagName("form")[0].submit();
}


// register event listeners
function createEventListeners() {

  // register handleSubmit()
  var form = document.getElementsByTagName("form")[0];
  if (form.addEventListener) {
    form.addEventListener("submit", handleSubmit, false)
  } else if (form.attachEvent) {
    form.attachEvent("onsubmit", handleSubmit)
  }
}


// assemble scripts
function setUpPage() {
  createEventListeners();
  populateInfo();
}


// run setUpPage() function on window load
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", setUpPage);
}