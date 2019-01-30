"use strict";



let $spans;

let count=0;

$(document).ready(setup);

function setup() {
  $spans = $('.redacted');
  $spans.on('click',spanClicked);
  setInterval(update,500);
  $(".secret").on('mouseover',discovered);
};

function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

function update() {
  $spans.each(updateSpan);
}

function updateSpan() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
}

function discovered(){
  $(this).addClass("found");
  $(this).off("mouseover");
  count++;
  $("#secret-number").text(count);
  if(count===13){
    document.getElementById('win').style.opacity=1;
  }
}
