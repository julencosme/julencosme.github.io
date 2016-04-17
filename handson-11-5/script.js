/*  JavaScript 6th Edition
    Chapter 11
    Hands-on Project 11-5

    Author: Julen D. Cosme
    Date:   17 April 2016

    Filename: script.js
*/


// interpret content in strict mode
"use strict";


// use to track if existing HTTP request is open
var httpRequest = false;

// use to track country selected by user
var countrySel;


// instantiate reusable XHR object
function getRequestObject() {
  try {
    httpRequest = new XMLHttpRequest();
  }

  // render visible hidden elements if exception when attempting Ajax
  catch (requestError) {
    // display city & state fields and labels for manual input
    document.getElementById("zipset").style.visibility = "visible";
    document.getElementById("csset").style.visibility = "visible";

    // remove event listeners so additional input is ignored
    var germany = document.getElementById("germany");
    var us = document.getElementById("us");
    var zip = doucment.getElementById("zip").value;

    // expand functionality so ZIP field displayed with City/State
    // in case of no browser support for Ajax
    if (zip.addEventListener) {
      germany.removeEventListener("click", checkButtons, false);
      us.removeEventListener("click", checkButtons, false);
      zip.removeEventListener("keyup", checkInput, false);
    } else if (zip.attachEvent) {
      germany.detachEvent("onclick", checkButtons);
      us.detachEvent("onclick", checkButtons);
      zip.detachEvent("onkeyup", checkInput);
    }
    return false;
  }

  // if no error thrown, return httpRequest object to statement that called getRequestObject() function
  return httpRequest;
}


// determine which button between US and Germany has been selected;
// assign checked radio value to corresponding variable
function checkButtons() {
  var germany = document.getElementById("germany");
  var us = document.getElementById("us");
  if (germany.checked || us.checked) {
    document.getElementById("zipset").style.visibility = "visible";
    if (germany.checked) {
      countrySel = "de";
      // default on us
    } else {
      countrySel = "us";
    }
  }
}


// on user-input of five digits in ZIP field, call getLocation() function
function checkInput() {
  var zip = document.getElementById("zip").value;
  if (zip.length === 5) {
    getLocation();
    // else clear manual city/state fields assuming deleted user-entry
  } else {
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
  }
}


// getLocation() function
function getLocation() {

  // instantiate local variable(s)
  var zip = document.getElementById("zip").value;

  // fire instantiation of new XHR object
  if (!httpRequest) {
    httpRequest = getRequestObject();
  }

  // abide typical workflow re: ECMAScript 5 HTTP Request
  httpRequest.abort();
  // URL referenced in lieu of PHP file; API supports CORS
  httpRequest.open("get","http://api.zippopotam.us/" + countrySel + "/" + zip, true);
  httpRequest.send();
  httpRequest.onreadystatechange = displayData;
}


// display data
function displayData() {
  if (httpRequest.readyState === 4 && httpRequest.status === 200) {

    // service returns JSON object (nested array named 0), which contains places object;
    var resultData = JSON.parse(httpRequest.responseText);
    var city = document.getElementById("city");
    var state = document.getElementById("state");

    // each element of the array is an object property;
    // the property names requiring reference contain space, and therefore;
    // use bracket notation rather than dot notation when referencing
    city.value = resultData.places[0]["place name"];
    state.value = resultData.places[0]["state abbreviation"];

    // assigns values returned by the service to the city and state fields, and then makes fields visible
    document.getElementById("zip").blur();
    document.getElementById("csset").style.visibility = "visible";
  }
}


// create event listeners re: selected country options
var germany = document.getElementById("germany");
var us = document.getElementById("us");
if (us.addEventListener) {
  germany.addEventListener("click", checkButtons, false);
  us.addEventListener("click", checkButtons, false);
} else if (us.attachEvent) {
  germany.attachEvent("onclick", checkButtons);
  us.attachEvent("onclick", checkButtons);
}


// create event listeners re: ZIP code field
var zip = document.getElementById("zip");
// fire keyup event when user releases key on keyboard
if (zip.addEventListener) {
  zip.addEventListener("keyup", checkInput, false);
} else if (zip.attachEvent) {
  zip.attachEvent("onkeyup", checkInput);
}