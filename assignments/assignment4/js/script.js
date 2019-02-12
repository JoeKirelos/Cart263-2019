"use strict";

/*****************

Eat Up
Pippin Barr

Using jQuery UI's draggable and droppable methods to
feed a hungry mouth!

Sounds:
Buzzing: https://freesound.org/people/soundmary/sounds/194931/
Chewing: https://freesound.org/people/InspectorJ/sounds/412068/

******************/

// Sound effects for the experience
let buzzSFX = new Audio("assets/sounds/buzz.mp3");
let crunchSFX = new Audio("assets/sounds/crunch.wav");

// Variable to hold our two key elements
let $mouth;
let $fly;
let $cookie;

$(document).ready(setup);

function setup() {
  // Get the mouth element from the page
  $mouth = $('#mouth');
  $fly = $('#fly');
  $cookie = $('#cookie');
  buzzSFX.loop = true;
  buzzSFX.play();

  $cookie.draggable({ revert: "valid" });
  $fly.draggable({ revert: "invalid" });

  $mouth.droppable({
    accept: $fly,
    drop: function(event,ui) {
        ui.draggable.remove();
        $(this).attr('src','assets/images/mouth-closed.png');
        buzzSFX.pause();
        crunchSFX.play();
        setInterval(chew,250);
      }
  });
}



// chew()
//
// Swaps the mouth image between closed and open and plays the crunching SFX
function chew () {
  // We can use .attr() to check the value of an attribute to
  // In this case we check if the image is the open mouth
  if ($mouth.attr('src') === 'assets/images/mouth-open.png') {
    // If it is, we set the 'src' attribute to the closed mouth
    $mouth.attr('src','assets/images/mouth-closed.png');
    // and play the crunching
    crunchSFX.play();
  }
  else {
    // Otherwise the 'src' attribute must have been the closed mouth
    // so we swap it for the open mouth
    $mouth.attr('src','assets/images/mouth-open.png');
  }
}

function eww () {

}
