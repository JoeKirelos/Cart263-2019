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
let config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  physics : {
    default: 'arcade',
    arcade : {
      gravity : { y : 300},
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
let secCounter = 0;
let game = new Phaser.Game(config);
let zSpeed = 20;
let zombie;
let player;
let interaction = false;
let counter = 0;
function preload() {
  this.load.spritesheet('zombieAttack','assets/images/zombieAttack1.png',{frameWidth: 70, frameHeight: 70});
  this.load.spritesheet('zombieWalk','assets/images/zombieWalk.png',{frameWidth:70, frameHeight:70});
  this.load.spritesheet('sorloJump','assets/images/sorloJump.png',{frameWidth: 70, frameHeight: 70});
  this.load.spritesheet('tiles','assets/images/tiles.png', {frameWidth : 400, frameHeight: 34});
  this.load.spritesheet('sorloBackCast','assets/images/sorloBackCast.png', {frameWidth: 70, frameHeight: 70 });
  this.load.spritesheet('fire', 'assets/images/fire2.png', { frameWidth: 50, frameHeight: 50 });
  this.load.spritesheet('sorloWalk', 'assets/images/sorloWalk.png', { frameWidth: 70, frameHeight: 70 });
  this.load.spritesheet('sorloCast','assets/images/sorloCast.png', { frameWidth: 70, frameHeight: 70 });
}

function create () {
  let groundImage = this.anims.create({
    key: 'ground',
    frames: this.anims.generateFrameNumbers('tiles'),
    frameRate: 3,
    repeat: -1
  });

  let zombieAttacking = this.anims.create({
    key: 'zombAttack',
    frames: this.anims.generateFrameNumbers('zombieAttack'),
    frameRate: 12,
    repeat: 1
  })
  let playerJump = this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('sorloJump'),
    frameRate:3,
    repeat: 0
  });

  let zombieWalking = this.anims.create({
    key: 'zombWalk',
    frames: this.anims.generateFrameNumbers('zombieWalk'),
    frameRate:8,
    repeat: -1
  })

  let playerCast = this.anims.create({
    key: 'cast',
    frames: this.anims.generateFrameNumbers('sorloCast'),
    frameRate: 8,
    repeat:0
  });

  let playerCastInverted = this.anims.create({
    key: 'castInverted',
    frames: this.anims.generateFrameNumbers('sorloBackCast'),
    frameRate: 8,
    repeat: 0
  });

  let playerWalk = this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('sorloWalk'),
    frameRate: 4,
    repeat: -1
  });

  let fire = this.anims.create({
    key: 'blaze',
    frames: this.anims.generateFrameNumbers('fire'),
    frameRate: 4,
    repeat: 0

  });

  let platform = this.physics.add.staticGroup();

    platform.create(200,286,'tiles').setScale(1).refreshBody();

  let road = this.add.sprite(200,286,'tiles');

  road.play('ground');

  player = this.physics.add.sprite(125,225,'sorloWalk');
  zombie = this.physics.add.sprite(380,225,'zombieWalk');

if(interaction === true){
  console.log('int')
  zombie.play('zombAttack');
}else{
  zombie.play('zombWalk');
}
  zombie.setBounce(0.2);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, platform);
  this.physics.add.collider(zombie, platform);
  this.physics.add.collider(zombie,fire);
 


  this.input.on('pointerdown', (event) => {
    let fire = this.physics.add.sprite(event.x,event.y,'blaze');
    this.physics.add.collider(fire,platform);
    fire.on('animationcomplete', function(animation,frame){
      fire.destroy();
    });
      fire.play('blaze');
    if (event.x < 125){
      player.play('castInverted');
    }else{
    player.play('cast');
    }
    player.anims.chain('walk')
  });
  let jumpKey = this.input.keyboard.addKey('SPACE');
  jumpKey.on('down',function(event){
    player.setVelocityY(-200);
    player.play('jump');
    player.on('animationcomplete', function(animation,frame){
      if (animation.key === 'jump'){
      player.play('walk');
    }
    })
  })
  player.play('walk');
  zombie.setVelocityX(-80);
}

 function update () {
   if (zombie.x-50<player.x && counter === 0){
    zombSpeed(zombie);
   }if(zombie.x<player.x && counter === 0){
    zombie.anims.chain('zombWalk');
   }else if(zombie.x-30<player.x && counter === 0 && zombie.y === player.y){
    this.physics.add.overlap(player, zombie, attacked, null, this);
    counter++;
   }
   zombie.anims.chain('zombWalk');
}

function attacked (player, zombie)
{
    player.disableBody(true, true);
    console.log(zombie.body.velocity.x);
}

function zombSpeed (zombie){
  if(secCounter === 0){
    zombie.play('zombAttack');
    console.log(zombie.body.velocity.x);
    // zombie.setVelocityX(-40); 
    secCounter++;
  }
}