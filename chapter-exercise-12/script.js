/*  JavaScript 6th Edition
    Chapter 12
    Chapter case

    Life on Rocks Wildlife Cruises

    Author: Julen D. Cosme
    Date:   23 April 2016

    Filename: script.js
*/


// select li elements comprising "ul.mainmenu";
// traverse through children, and add class name show to child elements
// $("ul.mainmenu li").children("ul").addClass("show");


// take single parameter (i.e., event), referencing event fired to call function
function display(event) {
  // $(event.currentTarget).children("ul").addClass("show");
  // $(event.currentTarget).children("ul").show();         // replace addClas("show") with show() method
  $(event.currentTarget).children("ul").slideDown("fast"); // implement slideDown() method over simple show()

}


// take single parameter (i.e., event), referencing event fired to call function
function hide(event) {
  // $(event.currentTarget).children("ul").removeClass("show");
  $(event.currentTarget).children("ul").hide() // replace removeClas("show") with hide() method
}


// 1. select all top-level li items
// 2. use hover method to specify code to fire in response to hover event
// 3. function takes two (2) arguments, referencing event handlers above (i.e, display, hide)
$("ul.mainmenu li").hover(display,hide);

