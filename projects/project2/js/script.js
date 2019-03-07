"use strict";

/*****************

automated momo challenge
Joe K

simulated chatbox with choices for what the player can say, allows the player to choose an option and depending on their choice, advances the dialogue.
will at one point talk to the player and ask for voice input from them.


******************/

$(document).ready(setup);

let progression = 0;
let coherence = 0;

function setup() {
  $("#log").prepend('<p class="momo"> Hello ! </p>');
  $("#choice1").prop("value","Hi ?");
  $("#choice2").prop("value","Um, who's this ?");
  $("#choice3").prop("value","Hey what's up ?");
  $(".choices").on("click",buttonUpdate);
  $("#choice1").on("click",choice1Clicked);
  $("#choice2").on("click",choice2Clicked);
  $("#choice3").on("click",choice3Clicked);

}

function choice1Clicked(){
  if (progression === 1){
    $("#log").append('<p class="momo"> This is a little bleak should we brighten it up a little ? </p>');
  }else if (progression === 2){
    $("#log").append('<p class="momo"> Better ?</p>');
  }
optionsUpdate();
}

function choice2Clicked(){
  if (progression === 1){
    $("#log").append('<p class="momo"> A little hesitant are we ? well I understand, would you like me to make this a bit brighter for you ? </p>');
  }else if (progression === 2){
    $("#log").append('<p class="momo"> Does this break the ice a little ? </p>');
  }
optionsUpdate();
}

function choice3Clicked(){
  if (progression === 1){
    $("#log").append("<p class='momo'> You are friendly. Let's match the energy huh ?  </p>");
  }else if (progression === 2){
    $("#log").append('<p class="momo"> Bet ya this is fun eh ? </p>');
  }
optionsUpdate();
}

function optionsUpdate(){
  if (progression === 1){
    $("#choice1").prop("value","Sounds good ?");
    $("#choice2").prop("value","Sure I guess ?");
    $("#choice3").prop("value","Hell yeah !");
  }else if (progression === 2){
    $("#choice1").prop("value","oh ?");
    $("#choice2").prop("value","wow...");
    $("#choice3").prop("value","much better");
  }
}

function buttonUpdate(){
  progression++;
  let x =  $(this).attr('id');
   $("#log").append(`<p class="player"> ${$(this).prop('value')}   </p>`);
}
