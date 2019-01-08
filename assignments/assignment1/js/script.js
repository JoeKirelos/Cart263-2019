"use strict";
//joe's assignment 1

//score variable to hold the amount of time the player has survived in frames
let score = 0;

//object literal to hold the variables for the avatar its position, size and hp. whether it's alive or not, its color and the amount of hp it gains when it eats the food
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

//object literal to hold the variables for the food, its position, velocity size and color
let food = {
  x: undefined,
  y: undefined,
  vx:0,
  vy:0,
  size:50,
  color: "#e4007c"
}

//setup()
//
//function to start the program, it draws the canvas and decides a start position for the food
//disables the cursor
//and sets a timer on when the food starts moving
function setup() {
createCanvas(600,600);
food.x= random(width);
food.y= random(height);
setTimeout(foodSpeed,2000);
noCursor();
}

//draw()
//
//draws the background every frame to animate instead of draw on the canvas
//calls the other fucntions which handles the update and display of the avatar and the food
//handles collision, healthBar and the endgame condition
function draw() {
background("#000000");
updateAvatar();
displayAvatar();
displayFood();
collision();
endGame();
healthBar();
updateFood();
}
//updateAvatar()
//
//if the avatar is alive its position is set to the cursor so it moves with it
//constrains its hp to the max and drains its hp gradually
function updateAvatar(){
  if (avatar.hp>=0){
    avatar.x = mouseX;
    avatar.y = mouseY;
    avatar.hp = constrain(avatar.hp,0,avatar.maxhp);
    avatar.hp--;
  }else{
//if hp runs out avatar is "dead"
    avatar.alive= false;
  }
}
//displayAvatar
//
//remove the stroke, fill the avatar with the chosen color, a nice hue of pink
//and draws the avatar as an ellipse at its determined position(which is on top of the cursor)
//gives it its determined size
function displayAvatar(){
  push();
  noStroke();
  fill(avatar.color);
  ellipse(avatar.x,avatar.y,avatar.size,avatar.size);
  pop();
}
//displayFood()
//
//remove stroke, draw the food as an ellipse at food x and y using its determined size and color
function displayFood(){
  push();
  noStroke();
  fill(food.color);
  ellipse(food.x,food.y,food.size,food.size);
}
//collision()
//
//handles collision by measuring the distance between the avatar's x and y and those of the food and comparing them with the radii of each
//if the avatar is dead the collision is ignored
//on collision the food teleports to a random location to avoid the player sticking on top of it
function collision(){
  let distance = dist(avatar.x,avatar.y,food.x,food.y);
  if(avatar.alive===true){
  if(distance < avatar.size/2+food.size/2){
    avatar.hp+= avatar.hpGrowth;
    food.x = random(width);
    food.y = random(height);
  }
}
}

//endGame()
//
//handles the end of the game
//if the avatar is dead the score is converted from frames to second and a message is displayed showing how long the player survived
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
//healthBar()
//
//handles the health bar of the player
//maps the hp value of the player to the width of a rectangle at the top of the screen
function healthBar(){
  let hpWidth = map(avatar.hp,0,125,0,width);
  fill("#ff0000")
  rect(0,0,hpWidth,20);
}

//foodSpeed()
//
//sets a random speed for the food, changes every 2 seconds
function foodSpeed(){
  food.vx = random(-3,5);
  food.vy = random(-3,5);
  setTimeout(foodSpeed,2000);
}
//updateFood()
//
//make the food move based on its velocity, have it warp upon going off screen
function updateFood(){
  food.x += food.vx;
  food.y += food.vy;
  if (food.x>width){
    food.x-=width;
  }if (food.x<0){
    food.x+=width;
  }if (food.y>height){
    food.y-=height;
  }if (food.y<0){
    food.y+=height;
  }
}
