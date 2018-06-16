/*  JavaScript 6th Edition
 *   Chapter 3
 *   Chapter case
 *   Tipton Turbines
 *   Variables and functions
 *   Author:  Julen D. Cosme
 *   Date:    26 January 2016
 *   Filename: tt.js
 */

// global variables
// array lists each of the days comprising a calendar week
var daysOfWeek =
 ["Sunday", "Monday", "Tuesday",
  "Wednesday", "Thursday", "Friday", "Saturday"];
// array lists opponents for each of the 31 days in calendar
var opponents =
 ["Lightning", "Combines", "Combines", "Combines",
  "Lightning", "Lightning", "Lightning", "Lightning",
  "Barn Raisers", "Barn Raisers", "Barn Raisers",
  "Sodbusters", "Sodbusters", "Sodbusters",
  "Sodbusters", "(off)", "River Riders",
  "River Riders", "River Riders", "Big Dippers",
  "Big Dippers", "Big Dippers", "(off)",
  "Sodbusters", "Sodbusters", "Sodbusters",
  "Combines", "Combines", "Combines", "(off)",
  "(off)"];
// array lists whether team is playing away or at home
var gameLocation =
 ["away", "away", "away", "away", "home", "home",
  "home", "home", "home", "home", "home", "away",
  "away", "away", "away", "", "away", "away", "away",
  "away", "away", "away", "", "home", "home", "home",
  "home", "home", "home", "", ""];

// function to place days of week in header row
function addColumnHeaders() {
  var i = 0;
  while (i < 7) {
    document.getElementsByTagName("th")[i].innerHTML = daysOfWeek[i];
    i++;
  }
}

// function to place day of month value in first <p> element
function addCalendarDates() {
  var i = 1;
  var paragraphs = "";
  do {
    var tableCell = document.getElementById("08-" + i);
    // store values as array in paragraphs variable
    paragraphs = tableCell.getElementsByTagName("p");
    // assign value of counter variable as content for first paragraph (numbered 0) of which id is "08-i"; place value 1 in cell representing fist day of month
    paragraphs[0].innerHTML = i;
    // increment counter variable
    i++;
  } while (i <= 31); // limit loop to number of days in month of August (i.e., 31)
}

// function to place opponents and game location values in second <p> element within each table data cell that has an id
function addGameInfo() {
  var paragraphs = "";
  for (var i = 0; i < 31; i++) {
    var date = i + 1;
    var tableCell = document.getElementById("08-" + date);
    paragraphs = tableCell.getElementsByTagName("p");
    /*  if (gameLocation[i] === "away") {
        // set content of second paragraph in current cell equal to "@"
        paragraphs[1].innerHTML = "@ ";
      }
      if (gameLocation[i] === "home") {
        paragraphs[1].innerHTML = "vs ";
      } */
    /*  if (gameLocation === "away") {
        paragraphs[1].innerHTML = "@ ";
      }
      else {
        if (gameLocation[i] === "home") {
          paragraphs[1].innerHTML = "vs ";
        }
      } */
    switch (gameLocation[i]) {
      case "away":
        paragraphs[1].innerHTML = "@ ";
        break;
      case "home":
        paragraphs[1].innerHTML = "vs ";
        break;
    }
    /* use += to concatenate name of opposing team to existing content; were it = instead, would overwrite existing opponent team value */
    paragraphs[1].innerHTML += opponents[i];
  }
}

// function to populate calendar
function setUpPage() {
  addColumnHeaders();
  addCalendarDates();
  addGameInfo();
}

// runs setUpPage() function when page loads
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
} // implement else if construction to accommodate IE8 (event listeners not supported)
  else if (window.attachEvent) {
   window.attachEvent("onload", setUpPage);
}