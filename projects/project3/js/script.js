/*****************

prototype for project 3
Joe

prototype for a side scrolling endless runner game

assets used
sorlo by doudoulolita
https://opengameart.org/content/sorlo-ultimate-smash-friends
fire by Chromaeleon
https://opengameart.org/content/2d-pixel-fire-sprite-strip
******************/

//creating phaser configuration 
let config = {
  type: Phaser.CANVAS,
  parent:'phase',
  width: 400,
  height: 300,
  physics : {
    default: 'arcade',
    arcade : {
      gravity : { y : 300},
      debug: true
    }
  },
  scene: [ MenuScreen, LevelOne, LevelTwo ] 
};

let game = new Phaser.Game(config);
let restartBool = false;
let zombDeath = false;
let zombMDeath = false;
let zombies;
let zombiesM;
let fireCounter = 0;
let player;
let fire;
let playerDead= false;
let playerAlive = true;
let playerWalking = false;
let playerLeft = false;
let incVal = -1;
let score = 0;
let scoreText;
