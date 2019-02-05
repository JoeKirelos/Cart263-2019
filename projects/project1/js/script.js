"use strict";

/*****************

Sisyphus was here
Joe K

This is a sisphean experience
meant to emulate the sisphean struggle with a determined goal but no way to achieve said goal
the player is supposed to type the words "sisyphus was here" in a text box in order to access a bigger game, which doesn't really exist as it is impossible to type those words in the box
it shows the futility of trying by letting you type up but stopping you at the penultimate letter

******************/

// holding our variables here, for sound, arrays for insults and values for the arrays and the input
//textInput is a variable to hold the input value of what the player types in the input box
let textInput;
//randomFailing and randomNotTrying are variables to be used to randomly generate an insult from an array based on the condition
let randomNotTrying;
let randomFailing;
//count keeps track of how many times the player has messed up
let count = 0;
//an array to hold the insults if the player is not trying
let notTrying = [];
//an array to hold the insults if the player is trying and failing
let failing = [];
//an array to hold the sound for the ad popup
let bloop;
//when document is ready run setup
$(document).ready(setup);

//function setup()
//
//runs the things i need to have ran once
function setup(){
  //create a new audio to be placed inside variable bloop
  bloop = new Audio("assets/sounds/bloop.mp3");
  //pushing insults into both arrays
  notTrying.push("Were you dropped on your head as a kid ? come on!");
  notTrying.push("How hard can it be it's only 3 words, a whole game awaits");
  notTrying.push("Oh my Zeus, do you even want to play this game ?");
  failing.push("the only 'r' you'll get is the one in 'restart' ;)");
  failing.push(":)");
  failing.push("can you RRepeat that?");
  //setting an interval for how often the update function runs (every 50 miliseconds)
  setInterval(update,50);
  //tracks if the player hit enter
  $('input').on("keyup",function(event){
    let keyEntered = event.which;
    if(keyEntered===13){
      //if the player tried to copy paste the text they get a special insult
      if(textInput==="Sisyphus Was Here" || textInput==="sisyphus was here" || textInput==="Sisyphus was her"){
        $('#insults').prepend(`<p>Foolish, you think Zeus would let Sisyphus get any assistance on his quest! Try Again!</p>`);
        //after every attempt the player makes run resetNCount
        resetNCount();
    }else{
      //if the player hit enter but hadn't copy pasted (i.e. they tried to write something else) give them an insult from the not trying array.
      $('#insults').prepend(`<p>${notTrying[randomNotTrying]}</p>`);
      //after every attempt the player makes run resetNCount
      resetNCount();
    }
  }
});
}

//function update()
//
// runs every 50 miliseconds
function update(){
  //sets a random value for each of the arrays of insults
  randomFailing = Math.floor(Math.random()*failing.length);
  randomNotTrying = Math.floor(Math.random()*notTrying.length);
  //holds the input value of what is typed in the input box
  textInput = $('input').val();
  //if the player is attempting to type sisyphus was here it will stop them before they make it to the last e
  if(textInput==="Sisyphus Was Her" || textInput==="sisyphus was her" || textInput==="Sisyphus was her"){
    //taunt the player for failing to type it
    $('#insults').prepend(`<p>${failing[randomFailing]}</p>`);
    //after every attempt the player makes run resetNCount
    resetNCount();
  }
}
//function resetNcount()
//
//function that runs every time the player makes an attempt
function resetNCount(){
  //resets the content of the input box
  $('input').val("");
  //incrimentally increase the size of the image til it caps at 600px
  let padding = parseInt($('.banner').css('padding-top'));
  console.log(padding);
  padding+=50;
  if(padding>=600){
    padding=600;
  }
  $('.banner').css('padding-top',padding+"px");
  //keep count of how many tries the player has made up to 5
  count++;
  //once the count hits 5, show the ad and play the bloop sound then reset count
  if (count===5){
    bloop.play();
    //remove the hidden class off the div holding the ad and giving it the class of dialogue
    $('.hiddenAD').removeClass("hiddenAD").addClass("dialogue");
  }else if (count>5){
    //once it gets more than 5 reset the count and give the ad back its hidden fucntion
    $('.dialogue').removeClass("dialogue").addClass("hiddenAD");
    count = 0;
  }
  //make the div with class dialogue into a dialog box (which only happens once every 5-6 attempts)
  $('.dialogue').dialog();
}
