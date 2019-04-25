//define menu screen class and have it be phaser's scene
//create its constructor and give it a name so that general script can call it
class MenuScreen extends Phaser.Scene {
    constructor(){
        super ({key:"MenuScreen"});
    }
    //preload()
    //
    //loads the background the level titles to be called later
    preload() {
        this.load.image('menuScreen','assets/images/Menu.jpg');
        this.load.image('levO','assets/images/RainingFlames.png');
        this.load.image('levT','assets/images/KeyPositioning.png');
    }
    //create()
    //
    //creates the objects on screen
    create(){
        //variable to hold the background
        let backGround = this.add.image(0,0,'menuScreen').setOrigin(0);
        //variables to hold the buttons for levels one and two
        let lvOB = this.add.image(200,125,'levO');
        let lvTB = this.add.image(200,175,'levT');

        //make the variables interactive so that the levels start on click
        lvOB.setInteractive();
        lvTB.setInteractive();
        //check for pointer up and then call the proper scene 
        lvOB.on('pointerup', () => {
            this.scene.start('LevelOne')
        });
        lvTB.on('pointerup', () => {
            this.scene.start('LevelTwo')
        });
    }
}