/*  JavaScript 6th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: Julen D. Cosme
    Date:   04 April 2015

    Filename: script.js
*/


// interpret contents in strict mode
"use strict";


// declare global variables for setup page
var zIndexCounter;
var pos = [];
var origin;


// perform setup tasks when page first loads
function setUpPage() {
  document.querySelector("nav ul li:first-of-type").addEventListener("click", loadSetup, false);
  document.querySelector("nav ul li:last-of-type").addEventListener("click", loadDirections, false);

  // set value of zIndexCounter and add event listeners to furniture objects
  var movableItems = document.querySelectorAll("#room div");

  // assign z-index value against total movableItems
  zIndexCounter = movableItems.length + 1;

  // implement event listeners for startDrag()
  for (var i = 0; i < movableItems.length; i++) {

    // add prefixed and non-prefixed versions for pointer-item event listeners
    movableItems[i].addEventListener("mspointerdown", startDrag, false);
    movableItems[i].addEventListener("mspointerdown", startDrag, false);

    // add event listeners for mouse events else touch events
    if (movableItems[i].addEventListener) {
      // add event listener for mouse
      movableItems[i].addEventListener("mousedown", startDrag, false);
      // add event listener for touch
      movableItems[i].addEventListener("touchstart", startDrag, false);
    } else if (movableItems[i].attachEvent) {
      // only mouse events supported by IE8
      movableItems[i].attachEvent("onmousedown", startDrag);
    }
  }

  // add support for pointer events

  // disable IE10+ interface gestures
  // test for changes
  movableItems[i].style.msTouchAction = "none";
  movableItems[i].style.TouchAction = "none";

}


// configure page to display Setup content
function loadSetup() {
  document.querySelector("nav ul li:first-of-type").className = "current";
  document.querySelector("nav ul li:last-of-type").className = "";
  document.getElementById("setup").style.display = "block";
  document.getElementById("location").style.display = "none";
  location.search = "";
}


// configure page to display Directions content
function loadDirections(string) {
  document.querySelector("nav ul li:first-of-type").className = "";
  document.querySelector("nav ul li:last-of-type").className = "current";
  document.getElementById("setup").style.display = "none";
  document.getElementById("location").style.display = "block";
}


// add event listeners and move object when user starts dragging
function startDrag(evt) {
  // set z-index counter so next selected element is on top of others
  this.style.zIndex = zIndexCounter;

  // increment z-index counter so next selected element is on top of others
  zIndexCounter++;

  if (evt.type !== "mousedown") {

    //prevent touch actions from triggering OS interface gestures
    evt.preventDefault();

    // add moveDrag() event listeners for touch/pointer events
    this.addEventListener("touchmove", moveDrag, false);
    this.addEventListener("mspointermove", moveDrag, false);
    this.addEventListener("pointermove", moveDrag, false);

    // add removeTouchListener() event listener for touch/pointer events
    this.addEventListener("touchend", removeTouchListener, false);
    this.addEventListener("mspointerup", removeTouchListener, false);
    this.addEventListener("pointerup", removeTouchListener, false);

  } else {
    // add event listeners for mouse events
    this.addEventListener("mousemove", moveDrag, false);
    this.addEventListener("mouseup", removeDragListener, false);
  }

  // calculate offset position from origin
  pos = [this.offsetLeft,this.offsetTop];
  origin = getCoords(evt);
}


// calculate new location of dragged object
function moveDrag(evt) {
  var currentPos = getCoords(evt);
  var deltaX = currentPos[0] - origin[0];
  var deltaY = currentPos[1] - origin[1];
  this.style.left = (pos[0] + deltaX) + "px";
  this.style.top = (pos[1] + deltaY) + "px";
}


// identify location of object
function getCoords(evt) {
  var coords = [];

  // determine if evt parameter has targetTouches property
  // determine if targetTouches property has length value
  if (evt.targetTouches && evt.targetTouches.length) {
    var thisTouch = evt.targetTouches[0];
    coords[0] = thisTouch.clientX;
    coords[1] = thisTouch.clientY;
  } else {
    coords[0] = evt.clientX;
    coords[1] = evt.clientY;
  }
  return coords;
}


// remove mouse event listeners when dragging ends
function removeDragListener() {
  this.removeEventListener("mousemove", moveDrag, false);
  this.removeEventListener("mouseup", removeDragListener, false);
}


// remove touch/pointer event listeners when dragging ends
function removeTouchListener() {
  this.removeEventListener("touchmove", moveDrag, false);
  this.removeEventListener("mspointermove", moveDrag, false);
  this.removeEventListener("pointermove", moveDrag, false);
  this.removeEventListener("touchend", removeTouchListener, false);
  this.removeEventListener("mspointerup", removeTouchListener, false);
  this.removeEventListener("pointerup", removeTouchListener, false);
}


// run setUpPage() function when page finishes loading
window.addEventListener("load", setUpPage, false);
