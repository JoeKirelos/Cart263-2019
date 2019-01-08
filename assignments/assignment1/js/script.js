"use strict";

let score = 0;

let avatar = {
  x: undefined,
  y: undefined,
  maxhp: 125,
  hp:125,
  size: 25,
  alive: true,
  color: "#f77fbe",
  hpGrowth: 45
}

let food = {
  x: undefined,
  y: undefined,
  size:50,
  color: "#e4007c"
}

function preload() {

}


function setup() {
createCanvas(600,600);
food.x= random(width);
food.y= random(height);
noCursor();
}


function draw() {
background("#000000");
updateAvatar();
displayAvatar();
displayFood();
collision();
endGame();
healthBar();
}

function updateAvatar(){
  if (avatar.hp>=0){
    avatar.x = mouseX;
    avatar.y = mouseY;
    avatar.hp = constrain(avatar.hp,0,avatar.maxhp);
    avatar.hp--;
  }else{
    avatar.alive= false;
  }
}

function displayAvatar(){
  push();
  noStroke();
  fill(avatar.color);
  ellipse(avatar.x,avatar.y,avatar.size,avatar.size);
  pop();
}

function displayFood(){
  push();
  noStroke();
  fill(food.color);
  ellipse(food.x,food.y,food.size,food.size);
}

function collision(){
  let distance = dist(avatar.x,avatar.y,food.x,food.y);
  if(distance < avatar.size/2+food.size/2){
    avatar.hp+= avatar.hpGrowth;
    food.x = random(width);
    food.y = random(height);
  }
}

function endGame(){
  if (avatar.alive === true){
    score++;
  }else if(avatar.alive === false){
    fill(255);
    textSize(32);
    let seconds = floor(score/60)
    text("You survived " +seconds + " seconds",20,50);
  }
}

function healthBar(){
  let hpWidth = map(avatar.hp,0,125,0,width);
  fill("#ff0000")
  rect(0,0,hpWidth,20);
}
