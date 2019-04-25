class LevelOne extends Phaser.Scene {
constructor(){
    super ({key:"LevelOne"});
}


preload(){
  this.load.spritesheet('background','assets/images/BGF.png',{frameWidth: 400, frameHeight: 300});
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

 create () {
  score = 0;

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
  let backgroundImage = this.anims.create({
    key: 'backgroundSprite',
    frames: this.anims.generateFrameNumbers('background'),
    frameRate: 1.5,
    repeat: -1
  });

  let playerDie = this.anims.create({
    key: 'die',
    frames: this.anims.generateFrameNumbers('sorloDie'),
    frameRate: 12,
    repeat:0
  })
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
  });
    let zombie2Attacking = this.anims.create({
      key: 'zomb2Attack',
      frames: this.anims.generateFrameNumbers('zombie2Attack'),
      frameRate: 12,
      repeat: 0
    });
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
  });
    let zombie2Walking = this.anims.create({
    key: 'zomb2Walk',
    frames: this.anims.generateFrameNumbers('zombie2Walk'),
    frameRate:8,
    repeat: -1
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
    frameRate: 16,
    repeat: 1

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


    
  let platform = this.physics.add.staticGroup();
  platform.create(200,286).setScale(18,1).refreshBody();

  let backdrop = this.add.sprite(200,150,'backgroundSprite');
     backdrop.play('backgroundSprite');

     scoreText = this.add.text(150,20, 'Score: 0', {fontSize: '16px', fill: '#000'});

  player = this.physics.add.sprite(125,225,'sorloWalk').setSize(43,70);

  this.time.addEvent({
    delay: 1000,
    loop: true,
    callback: function()
      {
        score+= 1;
        scoreText.setText('Score: '+ score)
      }
    });

  this.time.addEvent({
    delay: 2500,
    loop: true,
    callback: function()
      {
        let zombie = zombies.get(350,225)
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
      let zombieM = zombiesM.get(350,225)
      zombieM.play('zomb2Walk');
      zombieM.setActive(true);
      zombieM.body.setCircle(25)
      zombieM.setOffset(0,20);
    }
  });

  player.setBounce(0.2);
  this.physics.add.collider(player, platform);
  this.input.on('pointerdown', (event) => {
    if(fireCounter === 0){
       fire = this.physics.add.sprite(event.x,event.y,'blaze')
       fire.body.setCircle(5);
       fire.setOffset(5,20)
      fireCounter++;
      fire.play('blaze');
      if (event.x < 125){
        player.play('castInverted');
      }else{
      player.play('cast');
      }
      player.anims.chain('walk');

      this.physics.add.overlap(fire,zombies,function(){ zombDeath = true; fireCounter=0; fire.destroy();  },null,this);
      this.physics.add.overlap(fire,zombiesM,function(){ zombMDeath = true; fireCounter=0; fire.destroy();   },null,this);
      this.physics.add.overlap(fire, platform, function(fire, platform){  fire.destroy(); 
        fireCounter=0;}, null, this);
      fire.on('animationcomplete', function(animation,frame){
        fire.destroy();
        fireCounter=0;
        });
    }

  });


  if(playerAlive === true){
    this.physics.add.overlap(zombies, player, function(){
    playerDead=true;
    playerAlive= false;
     }, null,this);
    }
    if(playerAlive===true){
      this.physics.add.overlap(zombiesM, player, function(){
      playerDead=true;
      playerAlive= false;
       }, null,this);
      }
    this.physics.add.collider(zombies,platform);
    this.physics.add.collider(zombiesM,platform);
  let jumpKey = this.input.keyboard.addKey('SPACE');
  jumpKey.on('down',function(event){
    if(player.y > 150){
    player.setVelocityY(-200);
    player.play('jump');
    }
    player.on('animationcomplete', function(animation,frame){
      if (animation.key === 'jump'){
      player.play('walk');
    }
    })
  })
  player.play('walk');

}

update() {
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

if(playerDead===true && playerAlive === false){
player.play('die');
playerDead=false;
player.setSize(43,68);
player.setOffset(10,10);
setTimeout( ()=>{
  playerAlive = true;
  this.scene.start('MenuScreen');
},1000)
}
}
}
