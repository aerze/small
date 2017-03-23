import * as Phaser from 'phaser'
import * as WebFont from 'webfontloader'

export class BootState extends Phaser.State {
  public  stage: Phaser.Stage
  private fontsReady: boolean

  public init () {
    location.hash = ''
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  public preload () {
    WebFont.load({
      google: {
        families: ['Nunito']
      },
      active: this.fontsLoaded
    })

    const text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      'loading fonts',
      { font: '16px Arial', fill: '#dddddd', align: 'center' }
    )

    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  public render () {
    if (this.fontsReady) {
      this.game.state.start('Splash')
    }
  }

  public fontsLoaded () {
    this.fontsReady = true
  }

}
