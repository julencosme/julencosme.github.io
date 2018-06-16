/*
 *  JavaScript 6th Edition
 *  Chapter 7
 *  Hands-on Project 7-4
 *
 *  Author: Julen D. Cosme
 *  Date:   13 March 2016
 *
 *  Filename: script.js
 */

// interpret contents in strict mode
"use strict";

// declare global variables
var delivInfo = {};
var delivSummary = document.getElementById("deliverTo");

// add value of each input field to the delivInfo object as a property value
function processDeliveryInfo() {
  var prop;

  // store the value of the nameinput field in the name property of the delivInfo object
  delivInfo.name = document.getElementById("nameinput").value;
  // store the addrinput field in the addr property
  delivInfo.addr = document.getElementById("addrinput").value;
  // store the cityinput field in the city property
  delivInfo.city = document.getElementById("cityinput").value;
  // store the emailinput field in the email property
  delivInfo.email = document.getElementById("emailinput").value;
  // store the phoneinput field in the phone property
  delivInfo.phone = document.getElementById("phoneinput").value;

  // enumerate through object properties and render view via HTML
  for (prop in delivInfo) {
    delivSummary.innerHTML += "<p>" + delivInfo[prop] + "</p>";
    delivSummary.style.display = "block";
  }
}

function previewOrder() {
  processDeliveryInfo();
  document.querySelector("section").style.display = "block";
}

// create event listeners
function createEventListeners() {
  var previewButton = document.getElementById("previewBtn");
  if (previewButton.addEventListener) {
    previewButton.addEventListener("click", previewOrder, false);
  } else if (previewButton.attachEvent) {
    previewButton.attachEvent("onclick", previewOrder);
  }
}

// invoke createEventListeners() on page load; use else if for IE8 compatibility
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}
