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
    create: create
  }
};

let game = new Phaser.Game(config);

function preload() {
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
  let playerJump = this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('sorloJump'),
    frameRate:3,
    repeat: 0
  });

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

  let player = this.physics.add.sprite(125,225,'sorloWalk');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, platform);

  this.input.on('pointerdown', (event) => {
    let fire = this.add.sprite(event.x,event.y,'blaze');
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
}
