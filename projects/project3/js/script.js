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
      debug: true
    }
  },
  //scene functions, (the scene is in this script file so not calling another script)
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// create the game
let game = new Phaser.Game(config);

let restartBool = false;
// let zombieAttacking = 0;
let zombDeath = false;
let zombMDeath = false;
// let deathCounter = 0;
let zombies;
let zombiesM;
// let j = 0;
// let k =0;
let fireCounter = 0;
let player;
let incVal = -1;
// let interaction = false;
// let x = 0;
// let zombieOn = false;
let fire;
//function preload()
//
//preloads all the spritesheets
function preload() {
  this.load.spritesheet('sorloDie','assets/images/Sorlodie.png',{frameWidth: 80, frameHeight: 80});
  this.load.spritesheet('zom2Death','assets/images/zom2death.png',{frameWidth: 60, frameHeight: 68});
  this.load.spritesheet('zombie2Attack','assets/images/zom2Attack.png',{frameWidth: 46, frameHeight: 64});
  this.load.spritesheet('zombie2Walk','assets/images/zomb2Walk.png',{frameWidth:43, frameHeight:68});
  this.load.spritesheet('zomDeath','assets/images/zomdeath.png',{frameWidth: 60, frameHeight: 68});
  this.load.spritesheet('zombieAttack','assets/images/zombAttack.png',{frameWidth: 49, frameHeight: 68});
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
  zombies = this.physics.add.group({
    defaultKey: 'zombie',
    createCallback: function (zombie){
      zombie.setName('zombie'+this.getLength());
    }
  });
  zombiesM = this.physics.add.group({
    defaultKey: 'zombieM',
    createCallback: function (zombieM){
      zombieM.setName('zombieM'+this.getLength());
    }
  });
  let playerDie = this.anims.create({
    key: 'die',
    frames: this.anims.generateFrameNumbers('sorloDie'),
    frameRate: 8,
    repeat:0
  })
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
  });
    //create an animation for the zombie walking animation, loads the sprite image sets the framerate and the repeat time
    let zombie2Walking = this.anims.create({
    key: 'zomb2Walk',
    frames: this.anims.generateFrameNumbers('zombie2Walk'),
    frameRate:8,
    repeat: -1
  });
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

 
  this.time.addEvent({
    delay: 2500,
    loop: true,
    callback: addZombie
  });

  this.time.addEvent({
    delay: 3250,
    loop: true,
    callback: addZombieM
  });

  //give the player a bounce against the platform
  player.setBounce(0.2);
  //create a collider between player and platform
  this.physics.add.collider(player, platform);
  this.input.on('pointerdown', (event) => {
    //if fire counter is 0 
    if(fireCounter === 0){
      //create a physics object for the fire sprite
       fire = this.physics.add.sprite(event.x,event.y,'blaze')
       fire.body.setCircle(5);
       fire.setOffset(5,20)
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

      this.physics.add.overlap(fire,zombies,function(){ zombDeath = true; fireCounter=0; fire.destroy();  },null,this);
      this.physics.add.overlap(fire,zombiesM,function(){ zombMDeath = true; fireCounter=0; fire.destroy();   },null,this);
      //create an overlap between fire and platform when they collide delete the fire and reduce the fire counter so that the player can cast another fire
      this.physics.add.overlap(fire, platform, function(fire, platform){  fire.destroy(); 
        fireCounter=0;}, null, this);
        //once the fire animation ends kill the fire and reset the counter
      fire.on('animationcomplete', function(animation,frame){
        fire.destroy();
        fireCounter=0;
        });
    }

  });



    this.physics.add.overlap(zombies, player, playerDed, null,this);

    this.physics.add.collider(zombies,platform);
    this.physics.add.collider(zombiesM,platform);
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

function update() {
  // console.log(zombDeath)

  zombies.children.iterate(function(zombie){
    if(zombDeath === true){

      if(zombie.x <200){
      zombie.setOffset(-150,25);
      }if(zombie.x >200){
        zombie.setOffset(150,25);
        }
        zombie.play('zombieDie');
      zombie.on('animationcomplete', function(animation,frame){
      zombies.killAndHide(zombie)
      zombies.remove(zombie);
        });
      zombDeath = false;
    }
  });
  Phaser.Actions.IncX(zombies.getChildren(), -1)
  zombies.children.iterate(function(zombie){
    if(zombie.x === 175 && zombDeath === false){
      zombie.play('zombAttack')
      zombie.anims.chain('zombWalk')
    }
});
zombiesM.children.iterate(function(zombieM){
  if(zombMDeath === true){

    if(zombieM.x <200){
      zombieM.setOffset(-150,25);
      }if(zombieM.x >200){
        zombieM.setOffset(150,25);
        }
        zombieM.play('zombie2Die');
    zombieM.on('animationcomplete', function(animation,frame){
      zombiesM.killAndHide(zombieM);
      zombiesM.remove(zombieM);
      });
    zombMDeath = false;
  }
});
Phaser.Actions.IncX(zombiesM.getChildren(), -1)
zombiesM.children.iterate(function(zombieM){
  if(zombMDeath=== false && zombieM.x === 200){
    zombieM.play('zomb2Attack')
    zombieM.anims.chain('zomb2Walk')
  }
});
if(restartBool === true){
  restartBool = false;
  this.scene.restart(this);
}
}


function addZombie(){
  let zombie = zombies.get(350,225)
  zombie.play('zombWalk');
  zombie.setActive(true);
  zombie.body.setCircle(25)
  zombie.setOffset(0,20);
}

function addZombieM(){
  let zombieM = zombiesM.get(350,225)
  zombieM.play('zomb2Walk');
  zombieM.setActive(true);
  zombieM.body.setCircle(25)
  zombieM.setOffset(0,20);
}

function playerDed(){
  player.play('die');
  player.setSize(43,68);
  player.setOffset(10,10);
  setTimeout(function(){
    restartBool= true;
  },1200)
}

// // console.log(j)
//   if(zombieOn===true){
//     // console.log(j)
//     // console.log(zombies)
//     // console.log(zombies.x)
//     if(zombies.x === 100){
//       console.log('reading')
//       // zombAttack(zombies[j]);
//     }
//   }
// }

// function zombieDed(zombies){
//   zombies.play('zombieDie');
//   zombies.setVelocityX(-20);
//   setTimeout(() => {
//     zombies.disableBody(true,true);
//   },1500)
// }

// function zombie2Ded(zombies2){
//   zombies2.play('zombie2Die');
//   zombies2.setVelocityX(-20);
//   setTimeout(() => {
//     zombies2.disableBody(true,true);
//   },1500)
// }

// let zombieAttackStop = 0;
// function zombAttack(zombies,j){
//   if(zombieAttacking===zombieAttackStop){
//   zombies.play('zombAttack');
//   zombies.on('animationcomplete',function(animation,frame){
//     zombieAttackStop = zombieAttacking;
//     });
//     zombieAttacking++;
//   zombies.anims.chain('zombWalk');
// }
// }