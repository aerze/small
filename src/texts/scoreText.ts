import * as Phaser from 'phaser'

export class ScoreText extends Phaser.Text {

  constructor(game: Phaser.Game, text: string) {
    super(game, game.world.width - 50, 30, text, {})
    this.game = game
    this.anchor.setTo(1, 0)

    this.font = 'Nunito'
    this.fontSize = 60
    this.fill = '#23993f'

    game.add.existing(this);
  }
}
