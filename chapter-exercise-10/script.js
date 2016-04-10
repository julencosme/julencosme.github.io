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
var waitForUser;

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

    // add support for pointer events
    // disable IE10+ interface gestures
    movableItems[i].style.msTouchAction = "none";
    movableItems[i].style.touchAction = "none";

    // add prefixed and non-prefixed versions for pointer-item event listeners
    movableItems[i].addEventListener("mspointerdown", startDrag, false);
    movableItems[i].addEventListener("pointerdown", startDrag, false);

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

//   geoTest();

  // to minimize data use, download map only if needed and not already downloaded
  if (typeof google !== 'object') {
    var script = document.createElement("script");
    // include callback invoking geoTest(), to load only after library has loaded
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCKESKlL3K4Oj96UKcSyvz-wgKj0zLvD0U&callback=geoTest"
    document.body.appendChild(script);
  }
}

// add request for geolocation information to app
function geoTest() {

  // handle non-response re: location query
  waitForUser = setTimeout(fail, 10000);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(createDirections, fail, {timeout: 10000});
  } else {
    fail();
  }
}


// call when geolocation request succeeds
function createDirections(position) {

  // kill waitForUser() if createDirections called successfully
  clearTimeout(waitForUser);

  // log device lat/long coordinates
  // console.log("Longitude: " + position.coords.longitude);
  // console.log("Latitude: " + position.coords.latitude);

  // use Google Maps API to display map centered on user location
  // store user latitude and longitude
  var currPosLat = position.coords.latitude;
  var currPosLng = position.coords.longitude;
  var mapOptions = {

    // center maps on device's geolocation
    // center: new google.maps.LatLng(currPosLat, currPosLng),

    // center map on downtown Columbus, Ohio
    center: new google.maps.LatLng(39.96118, -82.99879),
    zoom: 12
  };


  // initialize map instance
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}


function fail() {
  // console.log("Geolocation information not available or not authorized.");

  document.getElementById("map").innerHTML = "Unable to access your location.";
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
