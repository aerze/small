import * as Phaser from 'phaser'

export class TimerText extends Phaser.Text {

  constructor(game: Phaser.Game) {
    super(game, game.world.centerX, game.world.height - 85, '', {})
    this.game = game
    this.anchor.setTo(0.5)

    this.font = 'Nunito'
    this.fontSize = 60
    this.fill = '#23993f'

    game.add.existing(this);
  }
}
