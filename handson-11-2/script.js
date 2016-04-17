/*  JavaScript 6th Edition
   Chapter 11
   Hands-on Project 11-2

   Author: Julen D. Cosme
   Date:   16 April 2016

   Filename: script.js
*/


// interpret contents in strict mode
"use strict";


// declare global variables
var httpRequest = false;
var entry = "^IXIC"; // ? String variable (unspecified)


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


// prevent default for form submission, return instead getQuote() function
function stopSubmission(evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  } else {
    evt.returnValue = false;
  }
  getQuote();
}


// retrieve structured data object
function getQuote() {

  // store entry variable when available
  if (document.getElementsByTagName("input")[0].value) {
    entry = document.getElementsByTagName("input")[0].value;
  }

  // invoke creation of reusable HTTP object
  if (!httpRequest) {
    httpRequest = getRequestObject();
  }

  // structure GET request, referencing displayData() function on state change
  httpRequest.abort();
  httpRequest.open("get","StockCheck.php?t=" + entry, true);
  httpRequest.send();
  httpRequest.onreadystatechange = displayData;
}


// render view of object returned by getQuote() function
function displayData() {

  // only if server states and statuses do not return errors ...
  if (httpRequest.readyState === 4 && httpRequest.status === 200) {

      // store raw response data
      var stockResults = httpRequest.responseText;
      // parse String as Array, specifying comma as separator using RegEx
      var stockItems = stockResults.split(/,|\"/);

console.log(stockItems);

      // decrement through data comprising stockItems[] Array, offsetting for index of zero
      for (var i = stockItems.length - 1; i >= 0; i--) {
        if (stockItems[i] === "") {

          stockItems.splice(i, 1);
        }
      }

console.log(stockItems);

      // store DOM object article
      var articleEl = document.getElementsByTagName("article");

      // write to HTML values derived from parsed/indexed XHR object
      document.getElementById("ticker").innerHTML = stockItems[0];
      document.getElementById("openingPrice").innerHTML = stockItems[6];
      document.getElementById("lastTrade").innerHTML = stockItems[1];
      document.getElementById("lastTradeDT").innerHTML = stockItems[2] + ", " + stockItems[3];
      document.getElementById("change").innerHTML = stockItems[4];

      // convert Number to String, using toFixed() to specify decimal place of two; concatenate values
      document.getElementById("range").innerHTML = (stockItems[8] * 1).toFixed(2) + " &ndash;" + (stockItems[7] * 1).toFixed(2);
      // convert Number to locale-specific String
      document.getElementById("volume").innerHTML = (stockItems[9] * 1).toLocaleString();

      // store API URL + user fieldset entry
      var chartSrc = "http://ichart.yahoo.com/t?s=" + entry;

      // assign URL from which to fetch chart
      document.getElementById("chart").src = chartSrc;
      // assign inline style so as to effect display of chart in DOM
      document.getElementById("chart").style.display = "inline";
  }
}


// script styling of zebra-shaded rows comprising table
function formatTable() {
  // instantiate rows derived from HTML table
  var rows = document.getElementsByTagName("tr");
  // iterate alternately through rows; shading every other row comprising table
  for (var i = 0; i < rows.length; i = i + 2) {
    rows[i].style.background = "#9FE098";
  }
}


// create event listeners for functions + page load
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
  form.addEventListener("submit", stopSubmission, false);
  window.addEventListener("load", formatTable, false);
  window.addEventListener("load", getQuote, false);
} else if (form.attachEvent) {
  form.attachEvent("onsubmit", stopSubmission);
  window.attachEvent("onload", formatTable);
  window.attachEvent("onload", getQuote);
}