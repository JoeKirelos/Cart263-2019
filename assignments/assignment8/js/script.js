/*****************

prototype for project 3
Joe

prototype for a side scrolling endless runner game

assets used sorlo by doudoulolita
https://opengameart.org/content/sorlo-ultimate-smash-friends
******************/
let config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  scene: {
    preload: preload,
    create: create
  }
};

let game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet('sorloWalk', 'assets/images/sorloWalk.png', { frameWidth: 70, frameHeight: 70 });
  this.load.spritesheet('sorloCast','assets/images/sorloCast.png', { frameWidth: 70, frameHeight: 70 });
  // this.load.image('bg','assets/images/bg.jpg');
  // this.load.image('circle','assets/images/circle.png');
}

function create () {
  // this.image = this.add.image(400,300,'bg');
  let playerCast = this.anims.create({
    key: 'cast',
    frames: this.anims.generateFrameNumbers('sorloCast'),
    frameRate: 6,
    repeat:0
  });
  let playerWalk = this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('sorloWalk'),
    frameRate: 4,
    repeat: 10000000000000
  });
  let sprite = this.add.sprite(125,225,'sorloWalk');

    this.input.on('pointerdown', function(event){
      sprite.play('cast');
      sprite.anims.chain('walk')
    });
    // this.input.on('pointerup', function(event){
    //   sprite.play('walk');
    // });
    sprite.play('walk');
}
