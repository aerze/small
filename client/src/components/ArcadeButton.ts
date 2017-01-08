import * as Phaser from 'phaser'
import SmallGame from '../game'

export default class ArcadeButton extends Phaser.Sprite {

  public static preload(game: SmallGame): void {
    game.load.spritesheet('arcadeButton', 'assets/images/button-sheet.png', 40, 40, 2, 0, 0)
  }

  public game: SmallGame

  constructor(game: SmallGame, x: number, y: number) {
    super(game, x, y, 'arcadeButton', 0)
    this.game = game

    this.animations.add('press', [0, 1, 0], 10, false)
    this.events.onInputDown.add(this.handleInputDown, this)
    this.events.onInputUp.add(this.handleInputUp, this)
    this.scale.setTo(2, 2)
  }

  public onInputDown(): void {}
  public onInputUp(): void {}

  private handleInputDown(): void {
    this.frame = 1
    this.onInputDown()
  }

  private handleInputUp(): void {
    this.frame = 0
    this.onInputUp()
  }
}



    // const button = new Phaser.Sprite(this.game, 150, 150, 'arcadeButton', 0)
    // this.add.existing(button)
    // console.log(button)
