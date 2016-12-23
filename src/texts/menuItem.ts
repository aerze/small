import * as Phaser from 'phaser'

interface OnClickCallback {
    (n: MenuItem): void;   
}

export class MenuItem extends Phaser.Text {

  constructor(game: Phaser.Game, x: number, y: number, text: string, onClick: OnClickCallback) {
    super(game, x, y, text, {})

    this.game = game
    this.anchor.setTo(0.5)

    this.font = 'Nunito'
    this.fontSize = 40
    this.fill = '#23993f'

    this.inputEnabled = true
    this.events.onInputDown.addOnce(onClick, this.game);

    game.add.existing(this);
  }
}
