/*  JavaScript 6th Edition
    Chapter 12
    Hands-on Project 12-1

    Author: Julen D. Cosme
    Date:   23 April 2016

    Filename: script.js
*/


function display(event) {
  $(event.currentTarget).next().fadeIn("slow");
}


// create event listeners for h3 elements that call display() function when clicked
$("h3").click(display);