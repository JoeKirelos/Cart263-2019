/*****************

Project 3
Joe

prototype for a side scrolling endless runner game with 2 different tests for the gameplay

assets used
sorlo by doudoulolita
https://opengameart.org/content/sorlo-ultimate-smash-friends
fire by Chromaeleon
https://opengameart.org/content/2d-pixel-fire-sprite-strip
the remaining ones didn't have specific names for either the sprites or creators, or simply didn't require a reference
******************/

//creating phaser configuration
let config = {
  // set phaser as a canvas
  type: Phaser.CANVAS,
  // attribute it to its parent so its position can be controlled from within the css
  parent:'phase',
  //set width and height
  width: 400,
  height: 300,
  //give it physics from phaser's library
  physics : {
    default: 'arcade',
    arcade : {
      gravity : { y : 300},
      debug: true
    }
  },
  // give it the scenes to run
  scene: [ MenuScreen, LevelOne, LevelTwo ]
};
// create the game using config
let game = new Phaser.Game(config);
// hold the global game variables
// variable to check if the zombie is dead (both male and female zombies)
let zombDeath = false;
let zombMDeath = false;
// variable to hold the zombie groups (both male and female zombies)
let zombies;
let zombiesM;
// counter to keep track of the fire
let fireCounter = 0;
// variable to hold the player's sprite and physics
let player;
// variable to hold the fire's sprite and physics
let fire;
// variables to hold both the player being dead or alive, helps avoid complications with zombie overlapp and game reset
let playerDead = false;
let playerAlive = true;
// variable to hold the score and the text for it
let score = 0;
let scoreText;
