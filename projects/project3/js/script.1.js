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
  type: Phaser.AUTO,
  //canvas size is 400 by 300
  width: 400,
  height: 300,
  //physics type with gravity strength of 300
  physics : {
    default: 'arcade',
    arcade : {
      gravity : { y : 300},
      debug: false
    }
  },
  //scene functions, (the scene is in this script file so not calling another script)
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

//variables
// create the game
let game = new Phaser.Game(config);
//a variable to hold whether the zombie is dead or not
let zombieDead = false;
let zombie2Dead = false;
//a counter for how many flames are on screen
let fireCounter = 0;
//a counter to hold how many times the zombie attacks
let zomAttkCounter = 0;
let zom2AttkCounter = 0;
//a variable to hold zombies and their sprites
let zombie;

let zombie2;
//a variable to hold the player and the sprites
let player;
// a variable to signify an interaction between player and zombie
let interaction = false;

//function preload()
//
//preloads all the spritesheets
function preload() {
  this.load.spritesheet('zom2Death','assets/images/zom2death.png',{frameWidth: 60, frameHeight: 68});
  this.load.spritesheet('zombie2Attack','assets/images/zom2Attack.png',{frameWidth: 46, frameHeight: 64});
  this.load.spritesheet('zombie2Walk','assets/images/zomb2Walk.png',{frameWidth:43, frameHeight:68});
  this.load.spritesheet('zomDeath','assets/images/zomdeath.png',{frameWidth: 60, frameHeight: 68});
  this.load.spritesheet('zombieAttack','assets/images/zomAttack.png',{frameWidth: 46, frameHeight: 64});
  this.load.spritesheet('zombieWalk','assets/images/zombWalk.png',{frameWidth:43, frameHeight:68});
  this.load.spritesheet('sorloJump','assets/images/sorloJump.png',{frameWidth: 70, frameHeight: 70});
  this.load.spritesheet('tiles','assets/images/tiles.png', {frameWidth : 400, frameHeight: 34});
  this.load.spritesheet('sorloBackCast','assets/images/sorloBackCast.png', {frameWidth: 70, frameHeight: 70 });
  this.load.spritesheet('fire', 'assets/images/fireF.png', { frameWidth: 20, frameHeight: 33 });
  this.load.spritesheet('sorloWalk', 'assets/images/sorloWalk.png', { frameWidth: 70, frameHeight: 70 });
  this.load.spritesheet('sorloCast','assets/images/sorloCast.png', { frameWidth: 70, frameHeight: 70 });
}

//function create()
//
//creates and handles the animations and movements
function create () {
  //create an animation for the ground, loads the sprite image sets the framerate and the repeat time
  let groundImage = this.anims.create({
    key: 'ground',
    frames: this.anims.generateFrameNumbers('tiles'),
    frameRate: 3,
    repeat: -1
  });
  //create an animation for the zombie's attack animation, loads the sprite image sets the framerate and the repeat time
  let zombieAttacking = this.anims.create({
    key: 'zombAttack',
    frames: this.anims.generateFrameNumbers('zombieAttack'),
    frameRate: 12,
    repeat: 0
  });
    //create an animation for the zombie's attack animation, loads the sprite image sets the framerate and the repeat time
    let zombie2Attacking = this.anims.create({
      key: 'zomb2Attack',
      frames: this.anims.generateFrameNumbers('zombie2Attack'),
      frameRate: 12,
      repeat: 0
    });
  //create an animation for the player's jump animation, loads the sprite image sets the framerate and the repeat time
  let playerJump = this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('sorloJump'),
    frameRate:3,
    repeat: 0
  });
  //create an animation for the zombie walking animation, loads the sprite image sets the framerate and the repeat time
  let zombieWalking = this.anims.create({
    key: 'zombWalk',
    frames: this.anims.generateFrameNumbers('zombieWalk'),
    frameRate:8,
    repeat: -1
  })
   //create an animation for the zombie walking animation, loads the sprite image sets the framerate and the repeat time
   let zombie2Walking = this.anims.create({
    key: 'zomb2Walk',
    frames: this.anims.generateFrameNumbers('zombie2Walk'),
    frameRate:8,
    repeat: -1
  })
  //create an animation for the player casting animation, loads the sprite image sets the framerate and the repeat time
  let playerCast = this.anims.create({
    key: 'cast',
    frames: this.anims.generateFrameNumbers('sorloCast'),
    frameRate: 8,
    repeat:0
  });
  //create an animation for the player casting backwards animation, loads the sprite image sets the framerate and the repeat time
  let playerCastInverted = this.anims.create({
    key: 'castInverted',
    frames: this.anims.generateFrameNumbers('sorloBackCast'),
    frameRate: 8,
    repeat: 0
  });
  //create an animation for the player walking animation, loads the sprite image sets the framerate and the repeat time
  let playerWalk = this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('sorloWalk'),
    frameRate: 4,
    repeat: -1
  });
  //create an animation for the fire, loads the sprite image sets the framerate and the repeat time
  let fire = this.anims.create({
    key: 'blaze',
    frames: this.anims.generateFrameNumbers('fire'),
    frameRate: 16,
    repeat: 1

  });
  //create an animation for the zombie's death animation, loads the sprite image sets the framerate and the repeat time
  let zombieDeath = this.anims.create({
    key: 'zombieDie',
    frames : this.anims.generateFrameNumbers('zomDeath'),
    frameRate: 16,
    repeat: 0
  });
    //create an animation for the zombie's death animation, loads the sprite image sets the framerate and the repeat time
    let zombie2Death = this.anims.create({
      key: 'zombie2Die',
      frames : this.anims.generateFrameNumbers('zom2Death'),
      frameRate: 16,
      repeat: 0
    });

  //add a platform and give it physics, making it a static object
  let platform = this.physics.add.staticGroup();
  platform.create(200,286,'tiles').setScale(1).refreshBody();

  //animate the ground, give it its sprite 
  let road = this.add.sprite(200,286,'tiles');
  road.play('ground');
  //create a physics sprite for the player walking
  player = this.physics.add.sprite(125,225,'sorloWalk').setSize(43,70);
  //create a physics sprite for the zombie walking and add it to zombie array using push()
  zombie = this.physics.add.sprite(380,225,'zombieWalk').setSize(30,60).setOffset(0,10);
  zombie2 = this.physics.add.sprite(330,225,'zombie2Walk').setSize(30,60).setOffset(0,10);
  //play the zombie walk animation
  zombie.play('zombWalk');
  zombie2.play('zomb2Walk');
  //give the zombie a speed towards the left of the screen
  zombie.setVelocityX(-80);
  zombie2.setVelocityX(-80);
  //give the player a bounce against the platform
  player.setBounce(0.2);
  //create a collider between player and platform
  this.physics.add.collider(player, platform);
  //create a collider between zombie and platform
  this.physics.add.collider(zombie, platform);
  this.physics.add.collider(zombie2, platform);
  //when mouse pointer is clicked call this function
  this.input.on('pointerdown', (event) => {
    //if fire counter is 0 
    if(fireCounter === 0){
      //create a physics object for the fire sprite
      let fire = this.physics.add.sprite(event.x,event.y,'blaze').setSize(16,33).setOffset(0,0);
      //increase the counter by 1 so that the player can't create fire again
      fireCounter++;
      //play the fire's animation
      fire.play('blaze');
      //if the mouse is clicked behind the player
      if (event.x < 125){
        //use the cast backwards animation (have the player character turn around to cast)
        player.play('castInverted');
      }else{
        //if the mouse is clicked in front of the player use the normal cast animation
      player.play('cast');
      }
      //once the player finishes the cast animation play the player walk animation
      player.anims.chain('walk');
      //create an overlap between zombie and fire when triggered call the zombDie function
      this.physics.add.overlap(fire, zombie, zombDie, null, this);
      //create an overlap between fire and platform when they collide delete the fire and reduce the fire counter so that the player can cast another fire
      this.physics.add.overlap(fire, platform, function(fire, platform){  fire.disableBody(true, true); 
        fireCounter--;}, null, this);
        //once the fire animation ends kill the fire and reset the counter
      fire.on('animationcomplete', function(animation,frame){
        fire.disableBody(true,true);
        fireCounter--;
        });
    }
  });

  //create a jumpkey assign it to space so when it's played
  let jumpKey = this.input.keyboard.addKey('SPACE');
  jumpKey.on('down',function(event){
    //change the player's velocity on the Y axis to allow him to jump
    player.setVelocityY(-200);
    //play the player jump animation
    player.play('jump');
    //once the player's jump animation ends 
    player.on('animationcomplete', function(animation,frame){
      if (animation.key === 'jump'){
        //play the player walk animation
      player.play('walk');
    }
    })
  })
  //if none of the buttons are pressed simply play the player walk animation
  player.play('walk');

}

//function update() 
//
//calls once per frame
 function update () {
   //checks if the zombieDead variable is  true
   if (zombieDead===true){
     //if it is disable the zombie body
     zombieDead = false;
     zombie.x = 380;
     zombie.setVelocityX(-80);
     zombie.play('zombWalk');
   }
   //if it isn't and the zombie is a certain distance from the player
   if (zombieDead === false &&zombie.x-50<player.x ){
     //call the zombie attack function
    zombAttack(zombie);
    //if the player's Y position is close to that of the zombies (ie if the player is not jumping)
   }if(zombieDead === false && zombie.x-30<player.x && zombie.y-10 <= player.y+10){
     //the player dies
    this.physics.add.overlap(player, zombie, function(player,zombie){ player.disableBody(true, true); }, null, this);
   }  if(zombie.x < 20){
    zombie.x = 380;
    zombie.setVelocityX(-80);
    zombie.play('zombWalk');
  }
  if (zombie2Dead===true){
    //if it is disable the zombie body
    zombie2Dead = false;
    zombie2.x = 380;
    zombie2.setVelocityX(-80);
    zombie2.play('zombWalk');
  }
  //if it isn't and the zombie is a certain distance from the player
  if (zombie2Dead === false &&zombie2.x-50<player.x ){
    //call the zombie attack function
   zomb2Attack(zombie2);
   //if the player's Y position is close to that of the zombies (ie if the player is not jumping)
  }if(zombie2Dead === false && zombie2.x-30<player.x && zombie2.y-10 <= player.y+10){
    //the player dies
   this.physics.add.overlap(player, zombie2, function(player,zombie2){ player.disableBody(true, true); }, null, this);
  }  if(zombie2.x < 20){
   zombie2.x = 380;
   zombie2.setVelocityX(-80);
   zombie2.play('zomb2Walk');
 }
}

//function zombAttack(zombie)
//
//a function to call the zombie attack animation and make it play only once, pass the zombie to it
function zombAttack (zombie){
  //if the zombie attack counter is 0 
  if(zomAttkCounter === 0){
    //play the zombie attack animation
    zombie.play('zombAttack');
    //increase the counter so that the attack animation doesn't play again
    zomAttkCounter++;
    //make the zombie walk after the attack animation ends
    zombie.anims.chain('zombWalk');
  }
}

function zomb2Attack (zombie){
  //if the zombie attack counter is 0 
  if(zom2AttkCounter === 0){
    //play the zombie attack animation
    zombie2.play('zomb2Attack');
    //increase the counter so that the attack animation doesn't play again
    zom2AttkCounter++;
    //make the zombie walk after the attack animation ends
    zombie2.anims.chain('zomb2Walk');
  }
}

//function zombDie(fire, zombie)
//
//a function to handle the zombie's death animation, pass the zombie and the fire to it
 function zombDie(fire, zombie){ 
   //play the zombie deah animation
    zombie.play('zombieDie');
    //slow the zombie down
    zombie.setVelocityX(-20);
    //wait a minute and then call the kill zombie function
      setTimeout(killZomb,1000);
}
// function killZomb
//
//set the zombieDead variable to true
function killZomb(){
  zombieDead = true;
}