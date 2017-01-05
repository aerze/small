import * as Phaser from 'phaser'

export class TimerBar extends Phaser.Image {

  constructor(game: Phaser.Game) {
    super(game, game.world.centerX, game.world.height - 50, 'timerBar')

    this.game = game
    this.anchor.setTo(0.5)
    this.tint = 0x23993F

    game.add.existing(this);
  }

  public setPercent(percent: number) {
    if (percent > 100) percent = 100
    if (percent < 0) percent = 0;
    this.scale.x = percent / 100
    // console.log(this.scale.x);
  }
}