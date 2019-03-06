"use strict";

/*****************

automated momo challenge
Joe K

simulated chatbox with choices for what the player can say, allows the player to choose an option and depending on their choice, advances the dialogue.
will at one point talk to the player and ask for voice input from them.


******************/

$(document).ready(setup);



function setup() {
  $("#log").prepend('<p class="momo"> Hello ! </p>');
  $("#choice1").prop("value","Hi ?");
  $("#choice2").prop("value","Um, who's this ?");
  $("#choice3").prop("value","Hey what's up ?");
}
