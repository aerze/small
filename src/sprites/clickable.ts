import * as Phaser from 'phaser'

interface OnClickCallback {
    (n: Clickable): void;   
}

export class Clickable extends Phaser.Sprite {

  constructor(game: Phaser.Game, x: number, y: number, onClick: OnClickCallback, context: Phaser.State) {
    super(game, x, y, 'clickable')

    this.game = game
    this.anchor.setTo(0.5)

    this.inputEnabled = true
    this.events.onInputDown.add(onClick, context)

    game.add.existing(this);
  }
}