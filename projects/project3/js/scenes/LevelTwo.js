class LevelTwo extends Phaser.Scene {
constructor(){
    super ({key:"LevelTwo"});
}


preload(){
  this.load.spritesheet('sorloIdle','assets/images/sorloIdle.png',{frameWidth: 50, frameHeight: 70});
  this.load.spritesheet('background','assets/images/BGF.png',{frameWidth: 400, frameHeight: 300});
  this.load.spritesheet('sorloDie','assets/images/Sorlodie.png',{frameWidth: 80, frameHeight: 80});
  this.load.spritesheet('sorloJump','assets/images/sorloJump.png',{frameWidth: 70, frameHeight: 70});
  this.load.spritesheet('sorloWalk', 'assets/images/sorloWalk.png', { frameWidth: 70, frameHeight: 70 });
  this.load.spritesheet('sorloCast','assets/images/sorloCast.png', { frameWidth: 70, frameHeight: 70 });
}

 create () {
  let backgroundImage = this.anims.create({
    key: 'backgroundSprite',
    frames: this.anims.generateFrameNumbers('background'),
    frameRate: 0,
    repeat: -1
  });

  let playerWalk = this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('sorloWalk'),
    frameRate: 4,
    repeat: -1
  });

  let playerIdle = this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('sorloIdle'),
    frameRate: 3,
    repeat: -1
  });

  let playerJump = this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('sorloJump'),
    frameRate: 3,
    repeat: -1
  });

  let platform = this.physics.add.staticGroup();
  platform.create(200,286).setScale(13,1).refreshBody();

  let backdrop = this.add.sprite(200,150,'backgroundSprite');
  backdrop.play('backgroundSprite');

  player = this.physics.add.sprite(125,225,'sorloIdle').setSize(50,70);
  this.physics.add.collider(player, platform);

  let jumpKey = this.input.keyboard.addKey('SPACE');
  jumpKey.on('down',function(event){
    player.setVelocityY(-200);
    player.play('jump');
    setTimeout(()=>{
      player.play('idle');
    },1500);
});
this.input.keyboard.on('keydown', function(e){
  if(e.key==='d'){
    player.x+=3;
    player.flipX = false;
      
    player.play('walk',true) ;
  }
  if(e.key==='a'){
    player.x-=3;
    player.flipX = true;
    player.play('walk',true);
  }
  },this);
  this.input.keyboard.on('keyup', function(e){
    if(e.key==='d'){
      player.play('idle');
    }
    if(e.key==='a'){
      player.play('idle');
    }
    },this);
player.play('idle')
 }
// this.input.keyboard.on('keyup', function(e){
//   if(e.key==='d'){
//     playerWalking= false;
//   }
//   },this);
// }

update() {
}
}
