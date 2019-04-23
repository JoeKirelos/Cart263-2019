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
  this.load.spritesheet('zom2Death','assets/images/zom2death.png',{frameWidth: 60, frameHeight: 68});
  this.load.spritesheet('zombie2Attack','assets/images/zom2Attack.png',{frameWidth: 46, frameHeight: 64});
  this.load.spritesheet('zombie2Walk','assets/images/zomb2Walk.png',{frameWidth:43, frameHeight:68});
  this.load.spritesheet('zomDeath','assets/images/zomdeath.png',{frameWidth: 60, frameHeight: 68});
  this.load.spritesheet('zombieAttack','assets/images/zombAttack.png',{frameWidth: 49, frameHeight: 68});
  this.load.spritesheet('zombieWalk','assets/images/zombWalk.png',{frameWidth:43, frameHeight:68});
}

 create () {
   
  zombies = this.physics.add.group({
    defaultKey: 'zombie',
    createCallback: function (zombie){
      zombieM.setName('zombie'+this.getLength());
    }
  });

  zombiesM = this.physics.add.group({
    defaultKey: 'zombieM',
    createCallback: function (zombieM){
      zombieM.setName('zombieM'+this.getLength());
    }
  });

  let zombieDeath = this.anims.create({
    key: 'zombieDie',
    frames : this.anims.generateFrameNumbers('zomDeath'),
    frameRate: 16,
    repeat: 0
  });
    let zombie2Death = this.anims.create({
      key: 'zombie2Die',
      frames : this.anims.generateFrameNumbers('zom2Death'),
      frameRate: 16,
      repeat: 0
    });
    let zombieWalking = this.anims.create({
      key: 'zombWalk',
      frames: this.anims.generateFrameNumbers('zombieWalk'),
      frameRate:8,
      repeat: -1
    });
      let zombie2Walking = this.anims.create({
      key: 'zomb2Walk',
      frames: this.anims.generateFrameNumbers('zombie2Walk'),
      frameRate:8,
      repeat: -1
    });

    let zombieAttacking = this.anims.create({
      key: 'zombAttack',
      frames: this.anims.generateFrameNumbers('zombieAttack'),
      frameRate: 12,
      repeat: 0
    });
      let zombie2Attacking = this.anims.create({
        key: 'zomb2Attack',
        frames: this.anims.generateFrameNumbers('zombie2Attack'),
        frameRate: 12,
        repeat: 0
      });

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
  platform.create(200,286).setScale(18,1).refreshBody();

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

this.time.addEvent({
  delay: 2500,
  loop: true,
  callback: function()
    { let zomSpawn = Math.floor(Math.random()*2)*400;
      let zombie = zombies.get(zomSpawn,225);
      if(zombie.x < 200){
        zombie.flipX= true;
        zombie.setVelocityX(120)
      }
      else if(zombie.x > 200){
        zombie.setVelocityX(-120)
      }
      zombie.play('zombWalk');
      zombie.setActive(true);
      zombie.body.setCircle(25)
      zombie.setOffset(0,20);
    }
});

this.time.addEvent({
  delay: 3250,
  loop: true,
  callback: function(){
    let zomMSpawn = Math.floor(Math.random()*2)*400;
    let zombieM = zombiesM.get(zomMSpawn,225);
    if(zombieM.x < 200){
      zombieM.flipX= true;
      zombieM.setVelocityX(120)
    }else if(zombieM.x > 200){
      incVal = -1;
      zombieM.setVelocityX(-120)
    }
    zombieM.play('zomb2Walk');
    zombieM.setActive(true);
    zombieM.body.setCircle(25)
    zombieM.setOffset(0,20);
  }
});

this.physics.add.collider(zombies,platform);
this.physics.add.collider(zombiesM,platform);

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
update() {
//   Phaser.Actions.IncX(zombies.getChildren(), incVal)
//   zombies.children.iterate(function(zombie){
//     if(zombie.x === 175 && zombDeath === false){
//       zombie.play('zombAttack')
//       zombie.anims.chain('zombWalk')
//     }
// });
// Phaser.Actions.IncX(zombiesM.getChildren(), incVal)
// zombiesM.children.iterate(function(zombieM){
//   if(zombMDeath=== false && zombieM.x === 200){
//     zombieM.play('zomb2Attack')
//     zombieM.anims.chain('zomb2Walk')
//   }
// });
}
}
