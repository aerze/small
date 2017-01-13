import * as Phaser from 'phaser'
import SmallGame from '../game'

export default class ArcadeButton extends Phaser.Sprite {

  public static preload(game: SmallGame): void {
    game.load.spritesheet('arcadeButton', 'assets/images/button-sheet.png', 100, 100, 3, 0, 0)
  }

  public game: SmallGame

  constructor(game: SmallGame, x: number, y: number) {
    super(game, x, y, 'arcadeButton', 0)
    this.game = game

    this.animations.add('press', [0, 1, 1, 2], 30, false)
    this.events.onInputDown.add(this.handleInputDown, this)
    this.events.onInputUp.add(this.handleInputUp, this)
  }

  public onInputDown(): void {}
  public onInputUp(): void {}

  private handleInputDown(): void {
    this.animations.play('press');
    this.onInputDown()
  }

  private handleInputUp(): void {
    this.animations.stop();
    this.frame = 0
    this.onInputUp()
  }
}
