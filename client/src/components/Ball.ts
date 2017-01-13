import * as Phaser from 'phaser'
import SmallGame from '../game'

export default class Ball extends Phaser.Sprite {

  public static preload(game: SmallGame): void {
    game.load.spritesheet('ball', 'assets/images/ball-sheet.png', 48, 48, 4, 0, 0)
  }

  public game: SmallGame

  constructor(game: SmallGame, x: number, y: number) {
    super(game, x, y, 'ball', 0)
    this.game = game

    this.animations.add('spin', [0, 1, 2, 3], 20, true)
  }
}