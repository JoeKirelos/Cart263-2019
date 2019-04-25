//define level two class and have it be phaser's scene
//create its constructor and give it a name so that general script can call it
class LevelTwo extends Phaser.Scene {
  constructor(){
    super ({key:"LevelTwo"});
  }


  //preload()
  //
  //loads the sprites this level will use before the game starts
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
    this.load.spritesheet('secFire','assets/images/secFire.png',{frameWidth:20, frameHeight:26});
  }

  //create()
  //
  //creates the objects on screen, runs once at the start of the game
 create () {
    //set score to zero once the game starts, so that if the level is started over or it's another level the score is rest
    score = 0;
    //create a group to hold the female zombies (this is phaser's equivalent of an array)
    //give them names cause they are people too :))
    zombies = this.physics.add.group({
      defaultKey: 'zombie',
      createCallback: function (zombie){
        zombie.setName('zombie'+this.getLength());
      }
    });
    //create a group to hold the male zombies
    //give them names cause they are people too :))
    zombiesM = this.physics.add.group({
      defaultKey: 'zombieM',
      createCallback: function (zombieM){
        zombieM.setName('zombieM'+this.getLength());
      }
    });
    // create all the animations for the sprites 
    // set their framerate and times for repeat 
    // background image animation

    //player death animation
    let playerDie = this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNumbers('sorloDie'),
      frameRate: 12,
      repeat:0
    })
    //fire animation
    let secFire = this.anims.create({
      key: 'fire',
      frames : this.anims.generateFrameNumbers('secFire'),
      frameRate: 18,
      repeat: 2
    });
    //female zombie death animation
    let zombieDeath = this.anims.create({
      key: 'zombieDie',
      frames : this.anims.generateFrameNumbers('zomDeath'),
      frameRate: 16,
      repeat: 0
    });
    //male zombie death animation
    let zombie2Death = this.anims.create({
      key: 'zombie2Die',
      frames : this.anims.generateFrameNumbers('zom2Death'),
      frameRate: 16,
      repeat: 0
    });
    //female zombie walk animation
    let zombieWalking = this.anims.create({
      key: 'zombWalk',
      frames: this.anims.generateFrameNumbers('zombieWalk'),
      frameRate:8,
      repeat: -1
    });
    //male zombie walk animation
    let zombie2Walking = this.anims.create({
      key: 'zomb2Walk',
      frames: this.anims.generateFrameNumbers('zombie2Walk'),
      frameRate:8,
      repeat: -1
    });
    //female zombie attack animation
    let zombieAttacking = this.anims.create({
      key: 'zombAttack',
      frames: this.anims.generateFrameNumbers('zombieAttack'),
      frameRate: 12,
      repeat: 0
    });
    //male zombie attack animation
    let zombie2Attacking = this.anims.create({
      key: 'zomb2Attack',
      frames: this.anims.generateFrameNumbers('zombie2Attack'),
      frameRate: 12,
      repeat: 0
    });
    //background image animation (except this one doesn't animate since this one is less of an endless runner and more of a defend yourself from onslaught)
    let backgroundImage = this.anims.create({
      key: 'backgroundSprite',
      frames: this.anims.generateFrameNumbers('background'),
      frameRate: 0,
      repeat: -1
    });
    //player cast animation
    let playerCast = this.anims.create({
      key: 'cast',
      frames: this.anims.generateFrameNumbers('sorloCast'),
      frameRate: 8,
      repeat:0
    });
    //player walk animation
    let playerWalk = this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('sorloWalk'),
      frameRate: 4,
      repeat: -1
    });
    //player idle animation
    let playerIdle = this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('sorloIdle'),
      frameRate: 3,
      repeat: -1
    });
    //player jump animation
    let playerJump = this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('sorloJump'),
      frameRate: 3,
      repeat: -1
    });

 
    //create a physics platform object give it a size that covers most of the screen
    let platform = this.physics.add.staticGroup();
    platform.create(200,286).setScale(18,1).refreshBody();
    //hold the sprite for the background 
    let backdrop = this.add.sprite(200,150,'backgroundSprite');
    //play background sprite
    backdrop.play('backgroundSprite');
    //create the score text after the background sprite is done so that the score appears on top of it
    scoreText = this.add.text(150,20, 'Score: 0', {fontSize: '16px', fill: '#000'});

    //create a physics sprite to hold the player and have it animate player idle since this is not an endless running
    player = this.physics.add.sprite(125,225,'sorloIdle').setSize(50,70);
    //add a player collision with the platform
    this.physics.add.collider(player, platform);

    // set the space key to be the jump key
    let jumpKey = this.input.keyboard.addKey('SPACE');
    //when it's down
    jumpKey.on('down',function(event){
      //if the player is below a certain point on screen
      if(player.y > 150){
        //give the player upwards velocity and play the jump animation
        player.setVelocityY(-200);
        player.play('jump');
      }
    }); // this allows the player to jump twice but no more, 

    //increase the socre by one every second and update the text to display it (this is the phaser equivalent of a setInterval)
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: function(){
        score+= 1;
        scoreText.setText('Score: '+ score);
      }
    });
    //every two and a half seconds create a new female zombie and place it at either of the edges of the screen
    this.time.addEvent({
      delay: 2500,
      loop: true,
      callback: function(){ 
        let zomSpawn = Math.floor(Math.random()*2)*400;
        let zombie = zombies.get(zomSpawn,225);
        //depending on which side the zombie is on flip its X and give it velocity towards the opposite side of the screen 
        if(zombie.x < 200){
          zombie.flipX= true;
          zombie.setVelocityX(120);
        }else if(zombie.x > 200){
          zombie.setVelocityX(-120);
        }
        //give it the zombie walking animation 
        zombie.play('zombWalk');
        //set active is routine with adding a new object to a phaser group
        zombie.setActive(true);
        //give it a circular hitbox, since it interacts better with the fire as the square hitboxes break when they overlap on their corners
        zombie.body.setCircle(25);
        //offset it to center the circular hitbox around the sprite
        zombie.setOffset(0,20);
      }
    });
    //every three and a quarter seconds create a new male zombie and place it at either of the edges of the screen
    this.time.addEvent({
      delay: 3250,
      loop: true,
      callback: function(){
        //everything else here is the same as for the female zombie
        let zomMSpawn = Math.floor(Math.random()*2)*400;
        let zombieM = zombiesM.get(zomMSpawn,225);
        if(zombieM.x < 200){
          zombieM.flipX= true;
          zombieM.setVelocityX(120);
        }else if(zombieM.x > 200){
          zombieM.setVelocityX(-120);
        }
        zombieM.play('zomb2Walk');
        zombieM.setActive(true);
        zombieM.body.setCircle(25);
        zombieM.setOffset(0,20);
      }
    });

    //create a collider between zombies and platform so that they don't fall off screen
    this.physics.add.collider(zombies,platform);
    this.physics.add.collider(zombiesM,platform);
    //check for input buttons "asd"
    this.input.keyboard.on('keyup', function(e){
      //if button is d
      if(e.key==='d'){
        //give the player 80 velocity on the X axis towards the right of the screen
        player.setVelocityX(80);
        //keep the sprite facing right
        player.flipX = false;
        //play the walk animation
        player.play('walk',true);
      }
      //if button is a
      if(e.key==='a'){
        //give the player 80 velocity on the X axis towards the left of the screen
        player.setVelocityX(-80);
        //flip the sprite to have it facing left
        player.flipX = true;
        //play the walk animation
        player.play('walk',true);
      }
      //if key is s 
      if(e.key==='s'){
        //stop the zombie's velocity
        player.setVelocityX(0);
        //play the player idle animation
        player.play('idle');
      }
    },this);
    //if no button is pressed play the player idle animation
    player.play('idle');
  
    //on mouse click
    this.input.on('pointerup', (event) => {
      //if fire counter is 0
      if(fireCounter === 0){
        //set it to one so this function runs only once and there is only 1 flame on the screen at a time
        fireCounter++;
        //if the player is in the air
        if(player.y < 200){
          //the flame is placed under the player
          fire = this.physics.add.sprite(player.x,235,'fire');
          //else place the sprite 75 pixels away from the player sprite, in the direction the player is looking
        } else if(player.flipX === true){
          fire = this.physics.add.sprite(player.x-75,235,'fire');
        } else if(player.flipX === false){
          fire = this.physics.add.sprite(player.x+75,235,'fire');
        }
        //add a collider between fire and platform so the fire remains in its spot once created
        this.physics.add.collider(fire,platform);
        //play the player cast animation (it will be in whichever direction the sprite is facing because of the flipX property)
        player.play('cast',true);
        //set the fire hitbox to a circular since it interacts better with the zombie as the square hitboxes break when they overlap on their corners
        fire.body.setCircle(8);
        //set an offset for the hitbox so it better centres around the fire better
        fire.setOffset(2,10);
        //create an overlap between fire and zombies (both male and female)
        //once an overlap happens set zombie death animation to true
        //set the fire counter back to zero and destroy the fire
        this.physics.add.overlap(fire,zombies,function(){ zombDeath = true; fireCounter=0; fire.destroy();  },null,this);
        this.physics.add.overlap(fire,zombiesM,function(){ zombMDeath = true; fireCounter=0; fire.destroy();   },null,this);
        //once the animation ends the fire dies and the counter is reset to zero
        fire.on('animationcomplete', (animation,frame)=>{
          fire.destroy();
          fireCounter =0;
        })
        //play the fire animation 
        fire.play('fire');
      }
    });

    //if the player is alive
    if(playerAlive === true){
      //create an overlap with zombies
      this.physics.add.overlap(zombies, player, function(){
      // set both the player variables to dead (make dead true and alive false)
      playerDead = true;
      playerAlive = false;
      }, null,this);
    }
    if(playerAlive===true){
      //create an overlap with male zombies
      this.physics.add.overlap(zombiesM, player, function(){
      // set both the player variables to dead (make dead true and alive false)
      playerDead = true;
      playerAlive = false;
      }, null,this);
    }
 }
  //update()
  //
  //runs on refresh
  update() {
    //get all of the children of the zombie group
    //if the zombie gotten is dead
    if(zombDeath === true){
      //and they are before passing half the screen
      if(zombie.x <200){
        //give their hitbox an offset backwards so that the player doesn't interact with it in the time it takes before it dies
        zombie.setOffset(-150,25);
        //if they are past half the screen
      }if(zombie.x >200){
          //give their hitbox an offset forwards so that the player doesn't interact with it in the time it takes before it dies
          zombie.setOffset(150,25);
      }
      //the reason the offset is added is so that since this plays the zombie death animation then waits till it's over to kill and hide the zombie then remove it from the group
      //play zombie death animation
      zombie.play('zombieDie');
      zombie.on('animationcomplete', function(animation,frame){
        //kill and hide, hides the sprite then disables the zombie from the group
        zombies.killAndHide(zombie);
        //removes it from the group to avoid cluttering the group
        zombies.remove(zombie);
      });
      //set zombie death to false to avoid chain killing all the zombies
      zombDeath = false;
    }
    //applies all the same stuff from the female zombies group to the male 
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
   //if the player death is true and alive is false (using two variables here because of them handles the zombie attack and the other handles the player death, that way the zombies don't chain kill the player (at least that's the plan))
   if(playerDead===true && playerAlive === false){
      // play the player death animation
      player.play('die');
      //set player dead to false so that this function doesn't call itself again
      playerDead=false;
      //change the size and offset of the collision box so that the player doesn't immediately fall offscreen
      player.setSize(43,68);
      player.setOffset(10,10);
      //set a time out
      //wait a second
      setTimeout( ()=>{
        //reset the player alive variable
        playerAlive = true;
        //send back to the menu screen
        this.scene.start('MenuScreen');
      },1000);
    }
  }
}

