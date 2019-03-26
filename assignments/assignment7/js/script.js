"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

let frequencies = [783.99,880.00,932.33,1046.50,1174.66,1244.51,1396.91];
let kick;
let snare;
let hihat;
let synth;
let mix = 0.5;
let gain = 0.4;
let pattern = ['x','xo','o','*','x','xo','o','*'];
let patternIndex = 0;
let counter = 0;
let synthRandom = 0;
let ringModulator = new Pizzicato.Effects.RingModulator({
    speed: 30,
    distortion: 1,
    mix: mix
});
let dubDelay = new Pizzicato.Effects.DubDelay({
    feedback: 0.6,
    time: 0.7,
    mix: 0.5,
    cutoff: 700
});
let pingPongDelay = new Pizzicato.Effects.PingPongDelay({
    feedback: 0.6,
    time: 0.4,
    mix: mix
});
let distortion = new Pizzicato.Effects.Distortion({
    gain: gain
});
function preload() {

}


// setup()
//
// Description of setup

function setup() {
  synth = new Pizzicato.Sound({
      source: 'wave'
  });
  kick = new Pizzicato.Sound('assets/sounds/kick.wav');
  snare = new Pizzicato.Sound('assets/sounds/snare.wav');
  hihat = new Pizzicato.Sound('assets/sounds/hihat.wav');
  synthRandom = floor(random(10,20));
    synth.addEffect(pingPongDelay);
    hihat.addEffect(dubDelay);
    snare.addEffect(ringModulator);
    kick.addEffect(distortion);
}

function playNote() {
  mix = Math.random();
  let i = floor(random(frequencies.length));
  synth.frequency = frequencies[i];
  synth.play();
  synthRandom+=floor(random(5));
  if (synthRandom/10 % 1 === 0 ){
    synth.stop();
  };
  setTimeout(playNote,floor(random(300,1200)));
}


function mousePressed() {
  if (counter === 0){
  setTimeout(playNote,500);
  setTimeout(playDrum,250);
  counter++;
}
}

function playDrum() {
  let symbols = pattern[patternIndex];
  if (symbols.indexOf('x')!== -1){
    kick.play();
  }if (symbols.indexOf('o')!== -1){
    snare.play();
  }if (symbols.indexOf('*')!== -1){
    hihat.play();
  };
  patternIndex++;
  if (patternIndex === pattern.length){
    patternIndex = 0;
  }
  gain = Math.random();
    setTimeout(playDrum,250);
}
