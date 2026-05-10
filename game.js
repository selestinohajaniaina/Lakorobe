import Phaser from 'phaser'
import StartupScene from './scenes/StartupScene.js'
import GameScene from './scenes/GameScene.js'
import TutorielScene from './scenes/TutorielScene.js'
import CultiveScene from './scenes/CultuveScene.js'

new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#80E300',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [StartupScene, TutorielScene, GameScene, CultiveScene]
})
