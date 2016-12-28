import * as Phaser from 'phaser'

export class CrayonText extends Phaser.BitmapText {
  constructor(game: Phaser.Game, x: number, y: number, fontsize?: number, align?: string) {
    super(game, x, y, 'rudiment', '', fontsize || 40, align || 'left')
    this.game = game
    this.anchor.setTo(0)
    game.add.existing(this)
  }
}