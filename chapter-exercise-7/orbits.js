/*   JavaScript 6th Edition
 *   Chapter 7
 *   Chapter case

 *   Outer Orbits
 *   Author: Julen D. Cosme
 *   Date:   16 February 2016

 *   Filename: orbits.js
 */

"use strict"; // interpret contents in JavaScript strict mode

// declare global variable to track date user is viewing or has selected
var dateObject = new Date();

function displayCalendar(whichMonth) {
  var date;
  var dateToday = new Date();
  var dayOfWeek;
  var daysInMonth;
  var dateCells;
  var captionValue;
  var month;
  var year;
  var monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // enable user navigation of previous/next months using buttons in calendar widget
  if (whichMonth === -1) {
    dateObject.setMonth(dateObject.getMonth() - 1);
  } else if (whichMonth === 1) {
    dateObject.setMonth(dateObject.getMonth() + 1);
  }

  // set variable values
  // set numerical values for month, date, and year
  month = dateObject.getMonth();
  year = dateObject.getFullYear();
  dateObject.setDate(1);
  // set alphabetical value for day
  dayOfWeek = dateObject.getDay();
  // set values for alphabetical month + full numerical year
  captionValue = monthArray[month] + " " + year;
  // write values for alphabetical month + full numerical year
  document.querySelector("#cal table caption").innerHTML = captionValue;

  if (month === 0 || month === 2 || month === 4 ||
    month === 6 || month === 7 || month === 9 ||
    month === 11) { // Jan, Mar, May, Jul, Aug, Oct, Dec
    daysInMonth = 31;
  }
  else if(month === 1) { //Feb
    if (year % 4 === 0) { // leap year test
      if (year % 100 === 0) {
        // year ending in 00 not a leap year unless divisible by 400
        if (year % 400 === 0) {
          daysInMonth = 29;
        } else {
          daysInMonth = 28;
        }
      } else {
        daysInMonth = 29;
      }
    } else {
      daysInMonth = 28;
    }
  } else { // Apr, Jun, Sep, Nov
    daysInMonth = 30;
  }

  // clear any existing table contents
  dateCells = document.getElementsByTagName("td");
  for (var i = 0; i < dateCells.length; i++) {
    // clear existing table dates
    dateCells[i].innerHTML = "";
    dateCells[i].className = "";
  }

  // populate calendar table cells with new dates
  for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) {
    // add dates to days cells
    dateCells[i].innerHTML = dateObject.getDate();
    dateCells[i].className = "date";
    if (dateToday < dateObject) {
      dateCells[i].className = "futuredate";
    }
    date = dateObject.getDate() + 1;
    dateObject.setDate(date);
  }
  // reset month to month shown
  dateObject.setMonth(dateObject.getMonth() - 1);
  // display calendar if it is not already visible
  document.getElementById("cal").style.display = "block";
}

// examine date on calendar selected by user;
// verify date selected is not in the past;
// set value of field to date selected;
function selectDate(event) { // takes single parameter 'event' and stores event that triggers it
  if (event === undefined) { // get caller element in IE8
    event = window.event;
  }
  // target attribute of event represents element that created event
  var callerElement = event.target || event.srcElement;
  if (callerElement.innerHTML === "") {
    // cell contains no date, so do not close calendar
    document.getElementById("cal").style.display = "block";
    return false;
  }
  // set date portion of dateObject variable to contents of user-selected cell
  dateObject.setDate(callerElement.innerHTML);
  var fullDateToday = new Date();
  var dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
  var selectedDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
  if (selectedDate <= dateToday) {
    document.getElementById("cal").style.display = "block";
    return false;
  }
  document.getElementById("tripDate").value = dateObject.toLocaleDateString();
  hideCalendar();
}

// hide calendar
function hideCalendar() {
  document.getElementById("cal").style.display = "none";
}

// navigate to previous calendar month
function prevMo() {
  displayCalendar(-1);
}

// navigate to next calendar month
function nextMo() {
  displayCalendar(1);
}

// create event listeners
function createEventListeners() {
  var dateField = document.getElementById("tripDate");
  if (dateField.addEventListener) {
    dateField.addEventListener("click", displayCalendar, false);
  } else if (dateField.attachEvent) {
    dateField.attachEvent("onclick", displayCalendar);
  }
  var dateCells = document.getElementsByTagName("td");
  if (dateCells[0].addEventListener) {
    for (var i = 0; i < dateCells.length; i++) {
      dateCells[i].addEventListener("click", selectDate, false);
    }
  } else if (dateCells[0].attachEvent) {
    for (var i = 0; i < dateCells.length; i++) {
      dateCells[i].attachEvent("onclick", selectDate);
    }
  }
  var closeButton = document.getElementById("close");
  if (closeButton.addEventListener) {
    closeButton.addEventListener("click", hideCalendar, false);
  } else if (hideCalendar.attachEvent) {
    closeButton.attachEvent("onclick", hideCalendar);
  }
  var prevLink = document.getElementById("prev");
  var nextLink = document.getElementById("next");
  if (prevLink.addEventListener) {
    prevLink.addEventListener("click", prevMo, false);
    nextLink.addEventListener("click", nextMo, false);
  } else if (prevLink.attachEvent) {
    prevLink.attachEvent("onclick", prevMo);
    nextLink.attachEvent("onclick", nextMo);
  }
}

// invoke createEventListeners() on page load; use else if for IE8 compatibility
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}
