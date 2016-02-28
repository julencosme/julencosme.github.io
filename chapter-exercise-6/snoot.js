/*   JavaScript 6th Edition
 *   Chapter 6
 *   Chapter case

 *   Snoot Flowers
 *   functions
 *   Author:  Julen D. Cosme
 *   Date:    28 February 2016

 *   Filename: snoot.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();

// declare to track form validity
var formValidity = true;

/* set up node building blocks for selection list of days */
function setupDays() {
  var dates = document.getElementById("delivDy").getElementsByTagName("option");

  // add 29th
  twentyNine.appendChild(dates[28].cloneNode(true));

  // add 29th & 30th
  thirty.appendChild(dates[28].cloneNode(true));
  thirty.appendChild(dates[29].cloneNode(true));

  // add 29th, 30th, & 31st
  thirtyOne.appendChild(dates[28].cloneNode(true));
  thirtyOne.appendChild(dates[29].cloneNode(true));
  thirtyOne.appendChild(dates[30].cloneNode(true));
}


function updateDays() {
  var deliveryDay = document.getElementById("delivDy");
  var dates = deliveryDay.getElementsByTagName("option");
  var deliveryMonth = document.getElementById("delivMo");
  var deliveryYear = document.getElementById("delivYr");
  var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;

  // remove child with index of 28 (29th) until this index is empty
  while (dates[28]) {
    deliveryDay.removeChild(dates[28]);
  }

  // set value of selection lists from -1 to 0 to allow leap year test

  // if no year is selected, choose default year to determine length of February
  if (deliveryYear.selectedIndex === -1) {
    deliveryYear.selectedIndex = 0;
  }

  // if leap year, February has 29 days
  if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2018") {
    deliveryDay.appendChild(twentyNine.cloneNode(true));
  } else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth ===  "11") { // select months with 30 days
    deliveryDay.appendChild(thirty.cloneNode(true));
  } else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") { // select months with 31 days
    deliveryDay.appendChild(thirtyOne.cloneNode(true));
  }
}


/* remove default values and formatting from state and delivery date selection lists */
function removeSelectDefaults() {
  // references all select elements in Document
  var emptyBoxes = document.getElementsByTagName("select");

  // reset select elements
  for (var i = 0; i < emptyBoxes.length; i++) {
    emptyBoxes[i].selectedIndex = -1;
  }
}


/* remove fallback placeholder text */
function zeroPlaceholder() {
  var messageBox = document.getElementById("customText");
  messageBox.style.color = "black";
  if (messageBox.value === messageBox.placeholder) {
    messageBox.value = "";
  }
}


/* restore placeholder text if box contains no user entry */
function checkPlaceholder() {
  var messageBox = document.getElementById("customText");

  // check if textarea empty; assign placeholder is case of blur
  if (messageBox.value === "") {
    messageBox.style.color = "rgb(178,184,183)";
    messageBox.value = messageBox.placeholder;
  }
}


/* generate placeholders for IE8 */
function generatePlaceholder() {
  if (!Modernizr.input.placeholder) {
    var messageBox = document.getElementById("customText");
    messageBox.value = messageBox.placeholder;
    messageBox.style.color = "rgb(178,184,183)";

    // create event listener to call zeroPlaceholder() function
    if (messageBox.addEventListener) {
      messageBox.addEventListener("focus", zeroPlaceholder, false);
      messageBox.addEventListener("blur", checkPlaceholder, false);
    } else if (messageBox.attachEvent) {
      messageBox.attachEvent("onfoucs", zeroPlaceholder);
      messageBox.attachEvent("onblur", checkPlaceholder);
    }
  }
}


/* automatically check Custom message box if user makes entry in customText box */
function autocheckCustom() {
  // if user entry in textarea, check Custom check box
  var messageBox = document.getElementById("customText");
  if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) {
    document.getElementById("custom").checked = "checked";
  }
}

/* copy values for Billing Address fields to Delivery Address fields */
function copyBillingAddress() {
  var billingInputElements = document.querySelectorAll("#billingAddress input");
  var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");

  // run function in case "same as billing address" text box checked
  if (document.getElementById("sameAddr").checked) {
    for (var i = 0; i < billingInputElements.length; i++) {

      // use i + 1 whereas Delivery Address elements prepended by unique check box
      deliveryInputElements[i + 1].value = billingInputElements[i].value;
    }
    document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;
  } else {
    for (var j = 0; j < billingInputElements.length; j++) {
      deliveryInputElements[j + 1].value = "";
    }
    document.querySelector("#deliveryAddress select").selectedIndex = -1;
  }
}


/* validate address fieldsets */
function validateAddress(fieldsetId) {
  var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
  var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
  var fieldsetValidity = true;
  var elementCount = inputElements.length;
  var currentElement;

  try {

    for (var i = 0; i < elementCount; i++) {

      // validate all input elements in fieldset
      currentElement = inputElements[i];

      if (currentElement.value === "") {
        currentElement.style.background = "rgb(255,233,233)";
        fieldsetValidity = false;
      } else {
        currentElement.style.background = "white";
      }
    }

    currentElement = document.querySelector("#" + fieldsetId + " select");
    // validate state select element
    if (currentElement.selectedIndex === -1) {
      currentElement.style.border = "1px solid red";
      fieldsetValidity = false;
    } else {
      currentElement.style.border = "";
    }

    // throw appropriate message based on current fieldset
    if (fieldsetValidity === false) {
      if (fieldsetId === "billingAddress") {
        throw "Please complete all Billing Address information.";
      } else {
        throw "Please complete all Delivery Address information.";
      }
    } else {
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
    }
  }

  catch(msg) {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = msg;
    formValidity = false;
  }
}


/* validate delivery date fieldset */
function validateDeliveryDate() {
  var selectElements = document.querySelectorAll("#deliveryDate select");
  var errorDiv = document.querySelector("#deliveryDate .errorMessage");
  var fieldsetValidity = true;
  var elementCount = selectElements.length;
  var currentElement;

  try {

    for (var i = 0; i < elementCount; i++) {
      currentElement = selectElements[i];

      if (currentElement.selectedIndex === -1) {
        currentElement.style.border = "1px solid red";
        fieldsetValidity = false;
      } else {
        currentElement.style.border = "";
      }
    }

    if (fieldsetValidity === false) {
      throw "Please specify a delivery date.";
    } else {
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
    }
  }

  catch(msg) {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = msg;
    formValidity = false;
  }
}

/* validate payment fieldset */
function validatePayment() {
  var errorDiv = document.querySelector("#paymentInfo .errorMessage");
  var fieldsetValidity = true;
  var ccNumElement = document.getElementById("ccNum");
  var selectElements = document.querySelectorAll("#paymentInfo select");
  var elementCount = selectElements.length;
  var cvvElement = document.getElementById("cvv");
  var cards = document.getElementsByName("PaymentType");
  var currentElement;

  try {

    // verify that a card is selected
    if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
      for (i = 0; i < 4; i++) {
        cards[i].style.outline = "1px solid red";
      }
      fieldsetValidity = false;
    } else {
      for (i = 0; i < 4; i++) {
        cards[i].style.outline = "";
      }
    }

    // verify that a card number has been entered
    if (ccNumElement.value === "") {
      ccNumElement.style.background = "rgb(255,233,233)";
      fieldsetValidity = false;
    } else {
      ccNumElement.style.background = "white";
    }

    // verify that a month and year have been selected
    for (var i = 0; i < elementCount; i++) {
      currentElement = selectElements[i];
      if (currentElement.selectedIndex === -1) {
        currentElement.style.border = "1px solid red";
        fieldsetValidity = false;
      } else {
        currentElement.style.border = "";
      }
    }

    // verify that a cvv value has been entered
    if (cvvElement.value === "") {
      cvvElement.style.background = "rgb(255,233,233)";
      fieldsetValidity = false;
    } else {
      cvvElement.style.background = "white";
    }

    // check if any field is blank
    if (!fieldsetValidity) {
      throw "Please complete all payment information.";
    } else {
      errorDiv.style.display = "none";
    }
  }

  // catch statement
  catch(msg) {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = msg;
    formValidity = false;
  }
}


/* validate message fieldset */
function validateMessage() {
  var errorDiv = document.querySelector("#message .errorMessage");
  var msgBox = document.getElementById("customText");

  try {
    if (document.getElementById("custom").checked && ((msgBox.value === "") || (msgBox.value === msgBox.placeholder))) {

      // custom checked but message box empty
      throw "Please enter your message text.";

    } else {
      errorDiv.style.display = "none";
      msgBox.style.background = "white";
    }
  }

  catch(msg) {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = msg;
    msgBox.style.background = "rgb(255,233,233)";
    formValidity = false;
  }
}

/* validate create account fieldset */
function validateCreateAccount() {
  var errorDiv = document.querySelector("#createAccount .errorMessage");
  var usernameElement = document.getElementById("username");
  var pass1Element = document.getElementById("pass1");
  var pass2Element = document.getElementById("pass2");
  var passwordMismatch = false;
  var invColor = "rgb(255, 233, 233)";

  try {

    // reset styles to valid state
    usernameElement.style.background = "";
    pass1Element.style.background = "";
    pass2Element.style.background = "";
    errorDiv.style.display = "none";

    // all fields are filled
    if ((usernameElement.value !== "" && pass1Element.value !== "" && pass2Element.value !== "")) {

      // passwords do not match
      if (pass1Element.value !== pass2Element.value) {
        passwordMismatch = true;
        throw "Passwords entered do not match; please reenter.";
      }
    }

    if (!(usernameElement.value === "" && pass1Element.value === "" && pass2Element.value === "")) {
      // not all fields are blank
      throw "Please complete all fields to create an account.";
    }
  }

  catch(msg) {
    errorDiv.innerHTML = msg;
    errorDiv.style.display = "block";

    if (passwordMismatch) {
      usernameElement.style.background = "";
      pass1Element.style.background = invColor;
      pass2Element.style.background = invColor;
    } else {

      if (usernameElement.value === "") {
        usernameElement.style.background = invColor;
      }

      if (pass1Element.value === "") {
        pass1Element.style.background = invColor;
      }

      if (pass2Element.value === "") {
        pass2Element.style.background = invColor;
      }
    }
    formValidity = false;
  }
}


/* validate number fields for older browsers */
function validateNumbers() {
  var ccNotNum;
  var cvvNotNum;
  var ccNumElement = document.getElementById("ccNum");
  var cvvElement = document.getElementById("cvv");
  var ccNumErrMsg = document.getElementById("ccNumErrorMessage");
  var cvvErrMsg = document.getElementById("cvvErrorMessage");

  try {

    if (isNaN(cvvElement.value) || cvvElement.value === "") {
      ccvNotNum = true;
    } else { // cvv value is a number
      cvvElement.style.background = "";
      cvvErrMsg.style.display = "none";
    }

    if (ccNotNum || cvvNotNum) {
      throw "must contain numbers only.";
    }
  }

  catch(msg) {

    if (ccNotNum) {
      ccNumElement.style.background = "rgb(255,233,233)";
      ccNumErrMsg.style.display = "block";
      ccNumErrMsg.innerHTML = "The card number " + msg;
    }

    if (cvvNotNum) {
      cvvElement.style.background = "rgb(255,233,233)";
      cvvErrMsg.style.display = "block";
      cvvErrMsg.innerHTML = "The cvv number " + msg;
    }

    formValidity = false;
  }
}


/* validate form */
function validateForm(evt) {
  if (evt.preventDefault) {
    evt.preventDefault();     // prevent form from submitting
  } else {
    evt.returnValue = false;  // prevent form from submitting in IE8
  }

  // reset for revalidation
  formValidity = true;
  validateAddress("billingAddress");
  validateAddress("deliveryAddress");
  validateDeliveryDate();
  validatePayment();
  validateMessage();
  validateCreateAccount();
  validateNumbers();

  if (formValidity === true) {
    document.getElementById("errorText").innerHTML = "";
    document.getElementById("errorText").style.display = "none";
    document.getElementsByTagName("form")[0].submit();
  } else {
    document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order.";
    document.getElementById("errorText").style.display = "block";
    scroll(0, 0);
  }
}


/* create event listeners */
function createEventListeners() {

  // update days as per deliveryMonth value selected
  var deliveryMonth = document.getElementById("delivMo");
  if (deliveryMonth.addEventListener) {
    deliveryMonth.addEventListener("change", updateDays, false);
  } else if (deliveryMonth.attachEvent) {
    deliveryMonth.attachEvent("onchange", updateDays);
  }

  // instantiate deliveryYear after deliveryMonth to pass leap year test
  var deliveryYear = document.getElementById("delivYr");
  if (deliveryYear.addEventListener) {
    deliveryYear.addEventListener("change", updateDays, false);
  } else if (deliveryYear.attachEvent) {
    deliveryYear.attachEvent("onchange", updateDays);
  }

  // call autoCheckCustom() function whenever user leaves textarea
  var messageBox = document.getElementById("customText");
  if (messageBox.addEventListener) {
    messageBox.addEventListener("blur", autocheckCustom, false);
  } else if (messageBox.attachEvent) {
    messageBox.attachEvent("onblur", autocheckCustom);
  }

  // create event listener for copyBillingAddress() function
  var same = document.getElementById("sameAddr");
  if (same.addEventListener) {
    same.addEventListener("click", copyBillingAddress, false);
  } else if (same.attachEvent) {
    same.attachEvent("onclick", copyBillingAddress);
  }

  // triggers validateForm() function
  var form = document.getElementsByTagName("form")[0];
  if (form.addEventListener) {
    form.addEventListener("submit", validateForm, false);
  } else if (form.attachEvent) {
    form.attachEvent("onsubmit", validateForm);
  }
}

/* initialize form configuration functions */
function setUpPage() {
  removeSelectDefaults();
  setupDays();
  createEventListeners();
  generatePlaceholder();
}

/* execute setup function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", setUpPage);
}
