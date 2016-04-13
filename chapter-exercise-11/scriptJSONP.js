/*  JavaScript 6th Edition
    Chapter 11
    Chapter case

    Whole Spectrum Energy Solutions
    Author: Julen D. Cosme
    Date:   12 April 2016

    Filename: script.js
*/


// interpret contents in strict mode
"use strict";


// global variables
var selectedCity = "Tucson, AZ";
var weatherReport;
// use to track if existing HTTP request is open; and thereby
// reuse existing request rather than opening more than one (slow)
var httpRequest = false;


function getRequestObject() {
  try {
    // instantiate XHR object and assign value of httpRequest variable
    httpRequest = new XMLHttpRequest();
  }
  catch (requestError) {
    document.querySelector("p.error").innerHTML = "Forecast is not supported by your browser.";
    document.querySelector("p.error").style.display = "block";
    return false;
  }
  // if no error thrown, return httpRequest object to statement that called getRequestObject() function
  return httpRequest;
}


function getWeather(evt) {
  // declare local variables
  var latitude;
  var longitude;

  // write innerHTML to event target when page has finished loading
  if (evt.type !== "load") {
     if (evt.target) {
        selectedCity = evt.target.innerHTML;
     } else if (evt.srcElement) {
        selectedCity = evt.srcElement.innerHTML;
     }
  }

  // set latitude/longitude values for selected city
  if (selectedCity === "Tucson, AZ") {
     latitude = 37.7577;
     longitude = -122.4376;
  } else if (selectedCity === "Chicago, IL") {
     latitude = 41.8337329;
     longitude = -87.7321555;
  } else if (selectedCity === "Montreal, QC") {
     latitude = 45.5601062;
     longitude = -73.7120832;
  }

  // specify API using request information + callback query string
  var url = "https://api.forecast.io/forecast/63b7b74bc3f72a4bc39ce10f3e09a644/" + latitude + "," + longitude + "?callback=getForecast";

  // create new script element as document fragment
  var script = document.createElement("script");
  // assign id value of jsonp
  script.id = "jsonp";
  // assign src value of equal to url
  script.src = url;
  // add script element to Document
  document.body.appendChild(script);
}

// serve as callback function for JSON-P request
function getForecast(forecast) { // accept single parameter forecast, which is
                                 // the data returned from FORECAST.IO service
  // use try/finally construct to call fillWeather() with forecast data
  try {
    fillWeather(forecast);
  }
  // only on success of calling fillWeather(forecast),
  // remove script added by getWeather(), keeping code clean
  finally {
    var script = document.getElementById("jsonp");
    script.parentNode.removeChild(script);
  }
}


// process forecast data received from XHR object
function fillWeather(weatherReport) {

  // instantiate days
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  // fetch time property for first data array in object, which references forecast for current day
  var dateValue = new Date(weatherReport.daily.data[0].time);
  var dayOfWeek = dateValue.getDay();
  var rows = document.querySelectorAll("section.week table tbody tr");

  document.querySelector("section.week table caption").innerHTML = selectedCity;

  // iterate through table's three columns (i.e., day of week, power icon, power percentage value)
  for (var i = 0; i < rows.length; i++) {
    var firstCell =  rows[i].getElementsByTagName("td")[0];
    var secondCell = rows[i].getElementsByTagName("td")[1];
    var thirdCell =  rows[i].getElementsByTagName("td")[2];

    // assign to first column dayOfWeek
    firstCell.innerHTML = days[dayOfWeek];

    // if Sunday: Sunday, else increment by day
    if (dayOfWeek + 1 === 7) {
      dayOfWeek = 0;
    } else {
      dayOfWeek++
    }

    // assign cloudCover from a fraction converted to an integer (percentage)
    var sun = Math.round((1 - weatherReport.daily.data[i].cloudCover) * 100, 0);

    // assign sun color as per cloud cover percentage
    if (sun > 90) {
      secondCell.style.color = "rgb(255,171,0)";
    } else if (sun > 80 && sun <= 90) {
      secondCell.style.color = "rgb(255,179,25)";
    } else if (sun > 70 && sun <= 80) {
      secondCell.style.color = "rgb(255,188,51)";
    } else if (sun > 60 && sun <= 70) {
      secondCell.style.color = "rgb(255,196,77)";
    } else if (sun > 50 && sun <= 60) {
      secondCell.style.color = "rgb(255,205,102)";
    } else if (sun > 40 && sun <= 50) {
      secondCell.style.color = "rgb(255,213,128)";
    } else if (sun > 30 && sun <= 40) {
      secondCell.style.color = "rgb(255,221,153)";
    } else if (sun > 20 && sun <= 30) {
      secondCell.style.color = "rgb(255,230,179)";
    } else if (sun > 10 && sun <= 20) {
      secondCell.style.color = "rgb(255,238,204)";
    } else if (sun <= 10) {
      secondCell.style.color = "rgb(255,247,230)";
    }

    // set font-size for secondCell
    secondCell.style.fontSize = "2.5em";

    // write sun value (percentage)
    thirdCell.innerHTML = sun + "%";

    // display table caption
    document.querySelector("section.week table caption").style.display = "block";
    // display table sections
    document.querySelector("section.week table").style.display = "inline-block";
    // display http://forecast.io credit
    document.querySelector("section.week p.credit").style.display = "block";
  }
}


// iterate through section list of locations; listen for click-events
var locations = document.querySelectorAll("section ul li");
for (var i = 0; i < locations.length; i++) {
   if (locations[i].addEventListener) {
      locations[i].addEventListener("click", getWeather, false);
   } else if (locations[i].attachEvent) {
      locations[i].attachEvent("onclick", getWeather);
   }
}

// getWeather() on window load
if (window.addEventListener) {
   window.addEventListener("load", getWeather, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", getWeather);
}