class MenuScreen extends Phaser.Scene {
    constructor(){
        super ({key:"MenuScreen"});
    }

    preload() {
        this.load.image('menuScreen','assets/images/Menu.jpg');
        this.load.image('levO','assets/images/RainingFlames.png');
        this.load.image('levT','assets/images/KeyPositioning.png');
    }

    create(){

        let backGround = this.add.image(0,0,'menuScreen').setOrigin(0);
        let lvOB = this.add.image(200,125,'levO');
        let lvTB = this.add.image(200,175,'levT');

        lvOB.setInteractive();
        lvTB.setInteractive();
        lvOB.on('pointerup', () => {
            this.scene.start('LevelOne')
        });
        lvTB.on('pointerup', () => {
            this.scene.start('LevelTwo')
        });
    }
}