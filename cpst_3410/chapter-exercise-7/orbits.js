/*   JavaScript 6th Edition
 *   Chapter 7
 *   Chapter case

 *   Outer Orbits
 *   Author: Julen D. Cosme
 *   Date:   09 March 2016

 *   Filename: orbits.js
 */

"use strict"; // interpret contents in JavaScript strict mode

// declare global variable to track date user is viewing or has selected
var dateObject = new Date();
var countdown;
var ticket = {
  passengersOnTicket: 0,
  passengers: {},
  calcCost: updateTotalCost
};

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
  } else if(month === 1) { //Feb
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

  // repeatedly update countdown (every 1000 milliseconds) to simulate digital timer
  countdown = setInterval(updateCountdown, 1000);
  document.getElementById("countdownSection").style.display = "block";
  document.getElementById("ticket").style.display = "block";

  // set value of date property to ticket object with local formatting
  ticket.date = dateObject.toLocaleDateString();

  document.getElementById("selectedDate").innerHTML = ticket.date;
  document.getElementById("dateSection").style.display = "block";
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

// update total cost
function updateTotalCost() {
  // this keyword references object that called the function where statement is located
  var totalCost = this.passengersOnTicket * 250000;
  var monthlyCost = totalCost / 60;
  // use toFixed() Number method to store monthlyCost value with no decimal places
  var shortMonthlyCost = monthlyCost.toFixed(0);
  // print single payment amount
  document.getElementById("singleLabel").innerHTML = "Single payment of $" + totalCost.toLocaleString();
  // print monthly payment amount
  document.getElementById("multipleLabel").innerHTML = "60 monthly payments of $" + shortMonthlyCost.toLocaleString();
}

// implement countdown function
function updateCountdown() {
  var dateToday = new Date();
  // store value of user's current date/time
  var dateFrom = Date.UTC(dateToday.getFullYear(),
                          dateToday.getMonth(),
                          dateToday.getDate(),
                          dateToday.getHours(),
                          dateToday.getMinutes(),
                          dateToday.getSeconds());
  // store value user-selected date and constant time (i.e., all launches at 8:00 pm, or  UTC 19:00)
  var dateTo = Date.UTC(dateObject.getFullYear(),
                        dateObject.getMonth(),
                        dateObject.getDate(),
                        19, 0, 0);
  // check if time remaining will be less than 0 on next update;
  // use clearInterval() method to clear interval referenced by countdown variable
  if ((dateTo - dateFrom) < 1000) { // time will be less than 0 when setInterval next runs
    clearInterval(countdown);
    document.getElementById("countdownSection").style.display = "none";
  }

  // days
  // calculate difference in days, abstracted from default values (in milliseconds);
  // return value rounded to the next lowest integer via Math.floor() method;
  // allot for 86400000 milliseconds / day
  var daysUntil = Math.floor((dateTo - dateFrom) / 86400000);
  // write value to page
  document.getElementById("countdown").innerHTML = daysUntil;

  // hours
  // employ modulus operator to determine remainder from calculating number of days
  // divide fractional day by 3600000 (number of microseconds in an hour);
  // employ Math.floor() method to return whole number portion of result;
  var fractionalDay = (dateTo - dateFrom) % 86400000;
  var hoursUntil = Math.floor(fractionalDay / 3600000);
  // check if number of minutes is a single digit;
  // prepend 0 to any singular digits;
  if (hoursUntil < 10) {
    hoursUntil = "0" + hoursUntil;
  }
  // append hoursUntil value to existing days value in countdown element;
  // prepend with colon to represent format of digital clocks
  document.getElementById("countdown").innerHTML += ":" + hoursUntil;

  // minutes
  var fractionalHour = fractionalDay % 3600000;
  // account for 60000 microseconds in minute
  var minutesUntil = Math.floor(fractionalHour / 60000);
  if (minutesUntil < 10) {
    minutesUntil = "0" + minutesUntil;
  }
  document.getElementById("countdown").innerHTML += ":" + minutesUntil;

  // seconds
  var fractionalMinute = fractionalHour % 60000;
  // account for 1000 microseconds in a second
  var secondsUntil = Math.floor(fractionalMinute / 1000);
  if (secondsUntil < 10) {
    secondsUntil = "0" + secondsUntil;
  }
  document.getElementById("countdown").innerHTML += ":" + secondsUntil;
}

function registerName() {
  var passengerList = document.getElementById("passengers");
  var passengerName = document.createElement("li");
  var newFnameProp;
  var newLnameProp;

  // increments passengersOnTicket counter property by 1
  ticket.passengersOnTicket += 1;
  newFnameProp = "fname" + ticket.passengersOnTicket;
  newLnameProp = "lname" + ticket.passengersOnTicket;

  // add first + last names to ticket as new properties
  ticket.passengers[newFnameProp] = document.getElementById("fname").value;
  ticket.passengers[newLnameProp] = document.getElementById("lname").value;

  // add entered name to passenger list in ticket section
  passengerName.innerHTML = ticket.passengers[newFnameProp] + " " + ticket.passengers[newLnameProp];
  passengerList.appendChild(passengerName);

  // clear first and last name from form
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";

  // display ticket and passengers section
  document.getElementById("ticket").style.display = "block";
  document.getElementById("passengersSection").style.display = "block";

  // return focus to First Name field to facilitate entry of another passenger name
  document.getElementById("fname").focus();

  // call calcCost() method
  ticket.calcCost();
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
  var nameButton = document.getElementById("addName");
  if (nameButton.addEventListener) {
    nameButton.addEventListener("click", registerName, false);
  } else if (nameButton.attachEvent) {
    nameButton.attachEvent("onclick", registerName);
  }
}

// invoke createEventListeners() on page load; use else if for IE8 compatibility
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}
