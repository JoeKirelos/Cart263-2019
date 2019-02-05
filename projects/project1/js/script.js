"use strict";

/*****************

Sisyphus was here
Joe K

This is a sisphean experience
meant to emulate the sisphean struggle with a determined goal but no way to achieve said goal

******************/
let x;
let c;
let insults = [];
$(document).ready(setup);

function setup(){
  insults.push("Were you dropped on your head as a kid ? come on!");
  insults.push("How hard can it be it's only 3 words, a whole game awaits");
  insults.push("Oh my Zeus, do you even want to play this game ?");
  insults.push("the only 'r' you'll get is the one in 'restart' ;)");
  insults.push(":)");
  insults.push("can you repeat that?");
  setInterval(update,200);

}

function update(){
  c = Math.floor(Math.random()*Math.floor(7));
  let x = $('input').val();
  if(x==="Sisyphus Was Here"){
    $("#insult").text("Foolish, you think Zeus would let Sisyphus get any assistance on his quest! Try Again!")
    $('input').val("");
  }else{
  for(let i=0; i<x.length; i++){
    if (x.substring(i,i+1)==="r"){
      $("div").after(function(){
        return "<p>" + insults[c] + "</p>"
      });
      $('input').val("");
    }
  }
}
}
