"use strict";

/*****************

automated momo challenge
Joe K

simulated chatbox with choices for what the player can say, allows the player to choose an option and depending on their choice, advances the dialogue.
will at one point talk to the player and ask for voice input from them.


******************/
// variables to hold mostly intigers
//this one keeps track of the progression of the conversation
let progression = 0;
//knife holes the knife song
let knife;
//volume modifier
let volMod = 0.03;
//this holds the data from json
let dat;

//call setup when the document is ready
$(document).ready(setup);

//function setup()
//
//this function runs once the document is ready
//attaches the song to knife variable
//set the initial choices for the player
//call functions when the buttons are clicked
function setup() {
  knife = new Audio("assets/sounds/knife.mp3");
  //call loadOptions when the json data is fully imported
  $.getJSON("js/data.json",loadOptions);
  $("#choice1").prop("value","Hi ?");
  $("#choice2").prop("value","Um, who's this ?");
  $("#choice3").prop("value","Hey what's up ?");
  //call buttonUpdate when any button is clicked
  $(".choices").on("click",buttonUpdate);
  //call the appropriate choice function when the button is clicked
  $("#choice1").on("click",choice1Clicked);
  $("#choice2").on("click",choice2Clicked);
  $("#choice3").on("click",choice3Clicked);
}
//function loadOptions(data)
//
//call this function when the json file is fully loaded
//pass the loaded data to it as an argument
function loadOptions(data){
  //store the json data in variable dat
  dat = data;
  //prepend the first message receieved (put hello at the start of the chat box)
  $("#log").prepend(`<p class="momo"> ${data.choicesA[progression]} </p>`);
}
//function choice1Clicked
//
//called whenever choice 1 is clicked
function choice1Clicked(){
  //initially hides all the choices
   $(".choices").hide();
   //sets a time out and call an anoonymous function
  setTimeout(function(){
    //if progression is less than 6 execute the following code
  if (progression<6){
    //call responsive voice have it whisper robotically the word jisatsu (suicide in japanese) (that goes up over time since vol mod increases)
    responsiveVoice.speak("Jisatsu","Japanese Female", {pitch: 0.2, volume:volMod , rate:0.2});
    //if progression is exactly 2 change the background to sunset
    if (progression===2){
        $("body").css("background","url(assets/images/sun.jpg");
    }
    //have momo's next message appear from the array in the json file based on the appropriate progression
    $("#log").append(`<p  class="momo">  ${dat.choicesA[progression]} </p>`);
  }
  //call optionsUpdate
  optionsUpdate();
  //set a time out between momo's message and showing the choices again
  setTimeout(function(){
    $(".choices").show();
    //the time out between momo's message and the choices reappearing is 1 second
  },1000);
  //the timeout between clicking a choice and momo's message appearing is 0.7 seconds
  },700);
}
//function choice2Clicked
//
//called whenever choice 2 is clicked
function choice2Clicked(){
  //initially hides all the choices
   $(".choices").hide();
   //sets a time out and call an anoonymous function
  setTimeout(function(){
    //if progression is less than 6 execute the following code
  if (progression<6){
    //call responsive voice have it whisper robotically the word jisatsu (suicide in japanese) (that goes up over time since vol mod increases)
  responsiveVoice.speak("Jisatsu","Japanese Female", {pitch: 0.2, volume: volMod , rate:0.2});
  //if progression is exactly 2 change the background to a whale particularly a blue whale
  if (progression===2){
      $("body").css("background","url(assets/images/whale.png)");
  }
  //append momo's message to the chatbox using the appropriate choice from the array inside json (based on progression)
  $("#log").append(`<p  class="momo">  ${dat.choicesB[progression]} </p>`);
}
//call optionsUpdate
optionsUpdate();
//set another time out then show the choices again
setTimeout(function(){
  $(".choices").show();
      //the time out between momo's message and the choices reappearing is 1 second
    },1000);
//the timeout between clicking a choice and momo's message appearing is 0.7 seconds
  },700);
}
//function choice3Clicked
//
//called whenever choice 3 is clicked
function choice3Clicked(){
  //init hide choices
  $(".choices").hide();
  //set a timeout then call an anonymous function
  setTimeout(function(){
    //if progression is less than 6 call the code bellow
    if (progression<6){
      //call responsive voice to robotically whisper the word jisatsu (suicie in japanese) (that goes up over time since vol mod increases)
      responsiveVoice.speak("Jisatsu","Japanese Female", {pitch: 0.2, volume: volMod , rate:0.2});
      //if the progression is at 2 change the background to a pink galaxy
      if (progression===2){
          $("body").css("background","url(assets/images/yume2.jpg");
      }
      //append momo's text based on the appropriate choice and progression
    $("#log").append(`<p  class="momo">  ${dat.choicesC[progression]} </p>`);
  }
  //call optionsUpdate
  optionsUpdate();
  //set a time out to show the choices again
  setTimeout(function(){
      $(".choices").show();
      //the time out for the options to appear after the message from momo is 1 second
    },1000);
    //the timeout for momo's message to appear after the choice is made is 0.7 seconds
  },700);
}
//function optionsUpdate()
//
//call this after momo's message is appended
//add new choices to each of the buttons based on progression
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
//function buttonUpdate()
//
//call this whenever a button is pressed
function buttonUpdate(){
  //increase progression by 1
  progression++;
  //increase the volume for the whisper so it gets louder and louder each time
  volMod= volMod+0.2;
  //if progression is less than 6 write the text inside the button as the player's message in the chat box
  if(progression < 6){
   $("#log").append(`<p class="player"> ${$(this).prop('value')}   </p>`);
   //if the progression is exactly 6
 } else if (progression === 6){
   //do the same (append the message)
   $("#log").append(`<p class="player"> ${$(this).prop('value')}   </p>`);
   //but also set the volume and time for the song and play it
    knife.volume=0.05;
    knife.currentTime=51.5;
    knife.play();
    //show the dialog box by removing it's hidden class and making it into a dialog
    $("#dialog").removeClass("hidden");
    $("#dialog").dialog();
    //add a class to momo's messages to change its font
    $(".momo").addClass("momo2");
  }
  //call talkPrimed
   talkPrimed();
}
//function talkPrimed()
//
//talkPrimed is called at the end of buttonUpdate
function talkPrimed(){
 //if progression is greater than 6
  if (progression >6){
    //if annyang is active
    if (annyang){
      //list of possible commands to be said to momo at this point (they are also written on the unclickable buttons at this point)
      var options = {
        //if any of the choices is said it calls hihi() (the end game function tho it can reset it if it's said multiple times)
       "What (the hell) is going on": hihi,
       "why are you doing this":hihi,
       "who are you":hihi
      }
      //add the commands to annyand then start it
      annyang.addCommands(options);
      annyang.start();
    }
  }
}
//function hihi()
//
//called if any of the annyand commands is used (the reason there is no choices here is because there is no reasoning at this level it's to show how a vulnerable person would feel in a situation like this)
function hihi(){
  //change the background image to momo
  $("body").css("background","url(assets/images/momo.jpg");
  //set a time out then call each of the following strings (creepy laughter)
    setTimeout(function(){
      $("#log").append("<p class='momo, momo2'> hihi </p>");
    },700);
    setTimeout(function(){
      $("#log").append("<p class='momo, momo2'> hihi </p>");
    },700);
    setTimeout(function(){
      $("#log").append("<p class='momo, momo2'> HAHAHAHAHAHA </p>");
      //call responsive voice and make it laugh creepily in a robotic voice (it's loud enough to not be a whisper anymore)
      responsiveVoice.speak("hahahahahahahahahaha","Japanese Female", {pitch: 0.2, volume: 0.5 , rate:1});
    },700);
    //set a time out of 1.4 seconds and call the next function haha()
    setTimeout(haha,1400);
}
//function haha()
//
//called at the end of the previous function hihi() (as this is a chain of the end)
function haha(){
  //set a time out before adding the following text from momo
  setTimeout(function(){
    $("#log").append("<p class='momo, momo2'> I wanna see you bleed. </p>");
    //creepy voice laughs more
    responsiveVoice.speak("hahahahahahahahahaha","Japanese Female", {pitch: 0.2, volume: 0.5, rate:1});
  },700);
  //set a time out of 1.4 seconds before running the next function blood()
  setTimeout(blood,1400);
}
//function blood()
//
//called at the end of the last function haha()
function blood(){
  //set a time out before appending the next message from momo
  setTimeout(function(){
    $("#log").append("<p class='momo, momo2'> Cut yourself for me </p>");
  },700);
  //set a time out of 1.4 seconds before starting the last function die()
  setTimeout(die,1400);
}
//function die()
//
//this function is called at the end of the last function blood()
function die(){
  //set a time out before appending the last message from momo
  setTimeout(function(){
    $("#log").append("<p class='momo, momo2'> Bleed and Die </p>");
    //have responsive voice say "die" in a robotic kinda memey way, it's frustrating but not too mean
    responsiveVoice.speak("die","Japanese Female", {pitch: 0.5, volume: 0.5, rate:1.2});
  },500);
  //set a timeout and repeat this function indefinitely 
  setTimeout(die,500);
}
