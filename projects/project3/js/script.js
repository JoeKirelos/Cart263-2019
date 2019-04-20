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
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let fireCounter = 0;
let secCounter = 0;
let game = new Phaser.Game(config);
let zSpeed = 20;
let zombie;
let player;
let interaction = false;
let counter = 0;
function preload() {
  this.load.spritesheet('zombieAttack','assets/images/zomAttack.png',{frameWidth: 46, frameHeight: 64});
  this.load.spritesheet('zombieWalk','assets/images/zombWalk.png',{frameWidth:43, frameHeight:68});
  this.load.spritesheet('sorloJump','assets/images/sorloJump.png',{frameWidth: 70, frameHeight: 70});
  this.load.spritesheet('tiles','assets/images/tiles.png', {frameWidth : 400, frameHeight: 34});
  this.load.spritesheet('sorloBackCast','assets/images/sorloBackCast.png', {frameWidth: 70, frameHeight: 70 });
  this.load.spritesheet('fire', 'assets/images/fireF.png', { frameWidth: 20, frameHeight: 33 });
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
    repeat: 0
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
    frameRate: 16,
    repeat: 1

  });

  let platform = this.physics.add.staticGroup();

    platform.create(200,286,'tiles').setScale(1).refreshBody();

  let road = this.add.sprite(200,286,'tiles');

  road.play('ground');
  player = this.physics.add.sprite(125,225,'sorloWalk').setSize(43,70);
  zombie = this.physics.add.sprite(380,225,'zombieWalk').setSize(30,68);
  zombie.play('zombWalk');

  zombie.setBounce(0.2);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, platform);
  this.physics.add.collider(zombie, platform);

  this.input.on('pointerdown', (event) => {
    if(fireCounter === 0){
      let fire = this.physics.add.sprite(event.x,event.y,'blaze').setSize(16,33).setOffset(0,0);
      fireCounter++;
      fire.play('blaze');
      if (event.x < 125){
        player.play('castInverted');
      }else{
      player.play('cast');
      }
      player.anims.chain('walk');
      this.physics.add.overlap(fire, zombie, function(fire, zombie){  zombie.disableBody(true, true);}, null, this);
      this.physics.add.overlap(fire, platform, function(fire, platform){  fire.disableBody(true, true); fireCounter--;}, null, this);
      fire.on('animationcomplete', function(animation,frame){
        console.log('fireded');
        fire.disableBody(true,true);
        fireCounter--;
        });
    }
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
    zombAttack(zombie);
   }if(zombie.x-30<player.x && counter === 0 && zombie.y-10 <= player.y+10){
    this.physics.add.overlap(player, zombie, function(player,zombie){ player.disableBody(true, true); }, null, this);
    counter++;
   }
}


function zombAttack (zombie){
  if(secCounter === 0){
    zombie.play('zombAttack');
    secCounter++;
    zombie.anims.chain('zombWalk');
  }
}
