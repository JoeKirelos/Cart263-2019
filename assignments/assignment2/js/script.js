"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let player;
let food;
const playerMaxSize = 90;
const playerSizeLoss = 1;
const foodMinSize = 30;
const foodMaxSize = 60;
const foodVelocity = 5;
let fruits = [];

// setup()
//
// Description of setup

function setup() {
createCanvas(800,600);
player = new Player(width/2,height/2,playerMaxSize,"#ffffff",playerSizeLoss);
for( let i=0 ; i<4 ; i++){
  fruits.push(new Food(random(width),random(height),"#f00",random(-foodVelocity,foodVelocity),random(-foodVelocity,foodVelocity),foodMinSize,foodMaxSize));
}

noCursor();
}


// draw()
//
// Description of draw()

function draw() {
background(0);
for(var i=0; i<4; i++){
fruits[i].update();
fruits[i].display();
}
player.update();
player.display();
for(let i=0; i<4; i++){
if(player.overlap(fruits[i])){
  player.eat(fruits[i]);
  fruits[i].reset();
}
}
}
