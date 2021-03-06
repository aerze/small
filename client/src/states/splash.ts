import * as Phaser from 'phaser'
import {centerGameObjects} from '../utils'

export class SplashState extends Phaser.State {
  public loaderBg: Phaser.Sprite
  public loaderBar: Phaser.Sprite

  public init () {}

  public preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    // load your assets
    this.load.bitmapFont('rudiment', 'assets/fonts/rudiment_801.png', 'assets/fonts/rudiment_801.fnt')

    this.load.image('mushroom', 'assets/images/mushroom2.png')

    this.load.image('clickable', 'assets/images/clickable.png')

    this.load.image('timerBar', './assets/images/loader-bar.png')
  }

  public create () {
    this.game.state.start('Menu')
  }

}
