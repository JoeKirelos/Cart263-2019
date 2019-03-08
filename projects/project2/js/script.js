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
let knife;
let volMod = 0.08;
function setup() {
  knife = new Audio("assets/sounds/knife.mp3");
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
  if (progression<=6){
    responsiveVoice.speak("Jisatsu","Japanese Female", {pitch: 0.2, volume:volMod , rate:0.2});
    if (progression === 1){
      $("#log").append('<p class="momo"> This is a little bleak should we brighten it up a little ? </p>');
    }else if (progression === 2){
      $("#log").append('<p class="momo"> Better ?</p>');
    }else if (progression === 3){
      $("#log").append('<p class="momo"> You like it ? So what brings you here ? </p>');
    }else if (progression === 4){
      $("#log").append('<p class="momo"> I do, have you heard of five finger fillet ? </p>');
    }else if (progression === 5){
      $("#log").append("<p class='momo'>  Yes let's play that game what do you say ? </p>");
    }
  }
  optionsUpdate();
}

function choice2Clicked(){
  if (progression<=6){
    responsiveVoice.speak("Jisatsu","Japanese Female", {pitch: 0.2, volume: volMod , rate:0.2});
    if (progression === 1){
      $("#log").append('<p class="momo"> A little hesitant are we ? well I understand, would you like me to make this a bit brighter for you ? </p>');
    }else if (progression === 2){
      $("#log").append('<p class="momo"> Does this break the ice a little ? </p>');
    }else if (progression === 3){
      $("#log").append('<p class="momo">Now, So what brings you here ? </p>');
    }else if (progression === 4){
      $("#log").append('<p class="momo"> It is, I got a game for you, have you heard of five finger fillet ? </p>');
    }else if (progression === 5){
      $("#log").append('<p class="momo">  There is a song that goes with it. the idea is to stab the space between your fingers, you will figure it out. </p>');
    }
  }
  optionsUpdate();
}

function choice3Clicked(){
  if (progression<=6){
    responsiveVoice.speak("Jisatsu","Japanese Female", {pitch: 0.2, volume: volMod , rate:0.2});
    if (progression === 1){
      $("#log").append("<p class='momo'> You are friendly. Let's match the energy huh ?  </p>");
    }else if (progression === 2){
      $("#log").append('<p class="momo"> Bet ya this is fun eh ? </p>');
    }else if (progression === 3){
      $("#log").append('<p class="momo"> Great! So what brings you here ? </p>');
    }else if (progression === 4){
      $("#log").append('<p class="momo">  I do, have you heard of five finger fillet ? </p>');
    }else if (progression === 5){
      $("#log").append("<p class='momo'>  Great let's play that then ? </p>");
    }
  }
  optionsUpdate();
}

function optionsUpdate(){
  if (progression === 1){
    $("#choice1").prop("value","Sounds good");
    $("#choice2").prop("value","Uh...Sure I guess ?");
    $("#choice3").prop("value","Hell yeah !");
  }else if (progression === 2){
    $("#choice1").prop("value","oh ?");
    $("#choice2").prop("value","wow...");
    $("#choice3").prop("value","much better");
  }else if (progression === 3){
    $("#choice1").prop("value","Well I heard you have a game for me");
    $("#choice2").prop("value","Umm, IDK, someone told me this is fun");
    $("#choice3").prop("value","You have a game for me dontcha ?");
  }else if (progression === 4){
    $("#choice1").prop("value","The knife game ?");
    $("#choice2").prop("value","No what's that ?");
    $("#choice3").prop("value","OOOH I love that game");
  }else if (progression === 5){
    $("#choice1").prop("value","Okay");
    $("#choice2").prop("value","uh sure I guess ?");
    $("#choice3").prop("value","NICE !");
  }else if (progression === 6){
    $("#choice1").prop("value","What the hell is going on ?");
    $("#choice2").prop("value","Who are you ?");
    $("#choice3").prop("value","why are you doing this");
  }
}

function buttonUpdate(){
  progression++;
  volMod= volMod+0.2;
  let x =  $(this).attr('id');
  if(progression < 6){
   $("#log").append(`<p class="player"> ${$(this).prop('value')}   </p>`);
 } else if (progression === 6){
      // knife.currentTime=51.5;
      // knife.play();
     $("#dialog").removeClass("hidden");
     $("#dialog").dialog();
     $(".momo").addClass("momo2");
   }
   talkPrimed();
}

function talkPrimed(){
  if (progression >=6){
    if (annyang){
      var options = { "What (the hell) is going on": hihi,
       "why are you doing this":hihi,
       "who are you":hihi
      }
      annyang.addCommands(options);
      annyang.start();
    }
  }
}
function hihi(){
  $("#log").append("<p class='momo, momo2'> hihi </p>");
}
