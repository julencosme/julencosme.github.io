/*   JavaScript 6th Edition
 *   Chapter 12
 *   Hands-on Project 12-3

 *   Author:  Julen D. Cosme
 *   Date:    23 April 2016

 *   Filename: script.js
 */

"use strict";

// validate form
function validateForm(event) {

  /* comment out
  if (event.preventDefault) {
    event.preventDefault(); // prevent form from submitting
  } else {
    event.returnValue = false; // prevent form from submitting in IE8
  }
  */

  // prevent default
  event.preventDefault();

  var formValidity = true; // reset value for revalidation
  var inputElements = document.querySelectorAll("#contactinfo input");
  //  var errorDiv = document.getElementById("errorText");
  var elementCount = inputElements.length;

  try {

    for (var i = 0; i < elementCount; i++) {

      // validate all input elements in fieldset
      if (inputElements[i].value === "") {
        inputElements[i].style.background = "rgb(255,233,233)";
        formValidity = false;
      } else {
        inputElements[i].style.background = "";
      }
    }

    if (formValidity === false) {
      throw "Please complete all fields.";
    }

    /* comment out; supplant with following jQuery statements
    errorDiv.style.display = "none";
    errorDiv.innerHTML = "";
    */
    $("#errorText").hide();
    $("#errorText").html("");
  }

  catch(msg) {
    /* comment out; supplant with following jQuery statements
    errorDiv.style.display = "block";
    errorDiv.innerHTML = msg;
    */
    $("#errorText").show();
    $("#errorText").html(msg);
  }

  // checks if value of formValidity variable true
  if (formValidity === true) {
    /* comment out; supplant with following jQuery statement
    document.getElementsByTagName("form")[0].submit();
    */
    $("form").submit();
  }
}

// create event listeners
var button = document.getElementById("submitBtn");
if (button.addEventListener) {
  button.addEventListener("click", validateForm, false);
} else if (button.attachEvent) {
  button.attachEvent("onclick", validateForm);
}
