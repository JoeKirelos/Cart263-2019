"use strict";

/*****************

Sisyphus was here
Joe K

This is a sisphean experience
meant to emulate the sisphean struggle with a determined goal but no way to achieve said goal

******************/
let x;

$(document).ready(setup);

function setup(){
setInterval(update,200);
}

function update(){
  let x = $('input').val();
  if(x==="sisyphus was here"){
    $("#insult").text("cheater")
  }
  for(let i=0; i<x.length; i++){
    if (x.substring(i,i+1)==="r"){
      $('input').val("");
      $("#insult").text("dumbass");
    }
  }
}
