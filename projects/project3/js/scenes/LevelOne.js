//define level one class and have it be phaser's scene
//create its constructor and give it a name so that general script can call it
class LevelOne extends Phaser.Scene {
  constructor(){
      super ({key:"LevelOne"});
  }

  //preload()
  //
  //loads the sprites this level will use before the game starts
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
    let backgroundImage = this.anims.create({
      key: 'backgroundSprite',
      frames: this.anims.generateFrameNumbers('background'),
      frameRate: 1.5,
      repeat: -1
    });
    //player death animation
    let playerDie = this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNumbers('sorloDie'),
      frameRate: 12,
      repeat:0
    })
    //female zombie attacking animation
    let zombieAttacking = this.anims.create({
      key: 'zombAttack',
      frames: this.anims.generateFrameNumbers('zombieAttack'),
      frameRate: 12,
      repeat: 0
    });
    //male zombie attacking animation
    let zombie2Attacking = this.anims.create({
      key: 'zomb2Attack',
      frames: this.anims.generateFrameNumbers('zombie2Attack'),
      frameRate: 12,
      repeat: 0
    });
    //player jumping animation 
    let playerJump = this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('sorloJump'),
      frameRate:3,
      repeat: 0
    });
    //female zombie walking animation 
    let zombieWalking = this.anims.create({
      key: 'zombWalk',
      frames: this.anims.generateFrameNumbers('zombieWalk'),
      frameRate:8,
      repeat: -1
    });
    //male zombie walking animation 
    let zombie2Walking = this.anims.create({
      key: 'zomb2Walk',
      frames: this.anims.generateFrameNumbers('zombie2Walk'),
      frameRate:8,
      repeat: -1
    });
    //player casting fire animation
    let playerCast = this.anims.create({
      key: 'cast',
      frames: this.anims.generateFrameNumbers('sorloCast'),
      frameRate: 8,
      repeat:0
    });
    //player casting fire backwards animation, this was before i figured out there was a flip property
    let playerCastInverted = this.anims.create({
      key: 'castInverted',
      frames: this.anims.generateFrameNumbers('sorloBackCast'),
      frameRate: 8,
      repeat: 0
    });
    //player walking animation
    let playerWalk = this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('sorloWalk'),
      frameRate: 4,
      repeat: -1
    });
    //fire animation
    let fire = this.anims.create({
      key: 'blaze',
      frames: this.anims.generateFrameNumbers('fire'),
      frameRate: 16,
      repeat: 1
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


    //create a physics platform object give it a size that covers most of the screen
    let platform = this.physics.add.staticGroup();
    platform.create(200,286).setScale(18,1).refreshBody();
    
    //hold the sprite for the background 
    let backdrop = this.add.sprite(200,150,'backgroundSprite');
    //play background sprite
    backdrop.play('backgroundSprite');

    //create the score text after the background sprite is done so that the score appears on top of it
    scoreText = this.add.text(150,20, 'Score: 0', {fontSize: '16px', fill: '#000'});

    //create a physics sprite to hold the player and have it animate player walking since this is endless running
    player = this.physics.add.sprite(125,225,'sorloWalk').setSize(43,70);

    //increase the socre by one every second and update the text to display it (this is the phaser equivalent of a setInterval)
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: function()
        {
          score+= 1;
          scoreText.setText('Score: '+ score)
        }
      });


    //every two and a half seconds create a new female zombie and place it at the edge of the screen
    this.time.addEvent({
      delay: 2500,
      loop: true,
      callback: function(){
        let zombie = zombies.get(400,225);
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

    //every three and a quarter seconds create a new male zombie and place it at the edge of the screen
    this.time.addEvent({
      delay: 3250,
      loop: true,
      callback: function(){
        let zombieM = zombiesM.get(350,225)
        //give it the male zombie walking animation 
        zombieM.play('zomb2Walk');
        //the rest is similar to the function above
        zombieM.setActive(true);
        zombieM.body.setCircle(25)
        zombieM.setOffset(0,20);
      }
    });

    //add a player collision with the platform
    this.physics.add.collider(player, platform);
    // run a function on pointer down
    this.input.on('pointerdown', (event) => {
      //if the fire counter is zero
      if(fireCounter === 0){
        //create a new physics sprite on the clicked position
        fire = this.physics.add.sprite(event.x,event.y,'blaze');
        //give the fire hitbox a circular hitbox for same reason as the zombie
        //since it interacts better with the fire as the square hitboxes break when they overlap on their corners
        fire.body.setCircle(5);
        ///offset it to center the circular hitbox around the sprite
        fire.setOffset(5,20);
        //increase the fire counter by one
        fireCounter++;
        //play the fire animation 
        fire.play('blaze');
        //if the click was behind the player's position
        if (event.x < 125){
          //play the inverted cast animation
          player.play('castInverted');
        }else{
        //if it was anywhere else just play the normal cast animation
        player.play('cast');
        }
        //chain the walk animation (which means once the cast animation is over it plays the walk animation right after)
        player.anims.chain('walk');

        //create an overlap between fire and zombies (both male and female)
        //once an overlap happens set zombie death animation to true
        // set the fire counter back to zero and destroy the fire
        this.physics.add.overlap(fire,zombies,function(){ zombDeath = true; fireCounter=0; fire.destroy();  },null,this);
        this.physics.add.overlap(fire,zombiesM,function(){ zombMDeath = true; fireCounter=0; fire.destroy();   },null,this);
        //once the fire reaches the floor it dies and resets the counter to zero ( so it's a raining fire version )
        this.physics.add.overlap(fire, platform, function(fire, platform){  fire.destroy(); 
          fireCounter=0;}, null, this);
        //once the animation ends the fire dies and the counter is reset to zero
        fire.on('animationcomplete', function(animation,frame){
          fire.destroy();
          fireCounter=0;
          });
      }
      //this function makes it so that there is only one fire on the screen at any point
      // but the moment the fire interacts with anything or the animation ends the fire disappears
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
    //create a collider between zombies and platform so that they don't fall off screen
    this.physics.add.collider(zombies,platform);
    this.physics.add.collider(zombiesM,platform);
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
      // this allows the player to jump twice but no more, 
      player.on('animationcomplete', function(animation,frame){
        if (animation.key === 'jump'){
          //on animation complete play walk
          player.play('walk');
        }
      });
    });
    //if the button is not pressed play walk
    player.play('walk');

  }
  //update()
  //
  //runs on refresh
  update() {
    //get all of the children of the zombie group
    zombies.children.iterate(function(zombie){
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
    });
    //incriment all the zombies' x by -1 (make them walk towards the left of the screen)
    Phaser.Actions.IncX(zombies.getChildren(), -1);
    //get all of the children of the zombie group
    zombies.children.iterate(function(zombie){
      //if the zombie is near the player's position and the zombie isn't dead, play attack then chain walk
      if(zombie.x === 175 && zombDeath === false){
        zombie.play('zombAttack');
        zombie.anims.chain('zombWalk');
      }
    });
    //applies all the same stuff from the female zombies group to the male 
   zombiesM.children.iterate(function(zombieM){
      if(zombMDeath === true){
       //the only difference is that the male zombies take a little more time to wind up the attack so the x position for the male zombie to attack is 25 pixels sooner
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
        zombieM.play('zomb2Attack');
        zombieM.anims.chain('zomb2Walk');
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
