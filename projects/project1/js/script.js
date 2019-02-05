"use strict";

/*****************

Sisyphus was here
Joe K

This is a sisphean experience
meant to emulate the sisphean struggle with a determined goal but no way to achieve said goal

******************/
let x;
let c;
let b;
let count = 0;
let insults1 = [];
let insults2 = [];
$(document).ready(setup);

function setup(){
  insults1.push("Were you dropped on your head as a kid ? come on!");
  insults1.push("How hard can it be it's only 3 words, a whole game awaits");
  insults1.push("Oh my Zeus, do you even want to play this game ?");
  insults2.push("the only 'r' you'll get is the one in 'restart' ;)");
  insults2.push(":)");
  insults2.push("can you RRepeat that?");
  setInterval(update,50);
  $('input').on("keyup",function(event){
    let z = event.which;
    if(z===13){
      if(x==="Sisyphus Was Here" || x==="sisyphus was here" || x==="Sisyphus was her"){
        $('#insults').prepend(`<p>Foolish, you think Zeus would let Sisyphus get any assistance on his quest! Try Again!</p>`);
        resetNCount();
    }else{
      $('#insults').prepend(`<p>${insults1[b]}</p>`);
      resetNCount();
    }
  }
});
}


function update(){
  c = Math.floor(Math.random()*insults2.length);
  b = Math.floor(Math.random()*insults1.length);
  x = $('input').val();
  if(x==="Sisyphus Was Her" || x==="sisyphus was her" || x==="Sisyphus was her"){
    $('#insults').prepend(`<p>${insults2[c]}</p>`);
    resetNCount();
  }
}

function resetNCount(){
  $('input').val("");
  let padding = parseInt($('.banner').css('padding-top'));
  console.log(padding);
  padding+=50;
  if(padding>=600){
    padding=600;
  }
  $('.banner').css('padding-top',padding+"px");
  count++;
  if (count===5){
    $('.hiddenAD').removeClass("hiddenAD").addClass("dialogue");
  }else if (count>5){
    $('.dialogue').removeClass("dialogue").addClass("hiddenAD");
    count = 0;
  }
  $('.dialogue').dialog();
}
