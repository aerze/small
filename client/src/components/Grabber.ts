import * as Phaser from 'phaser'
import SmallGame from '../game'

export default class Grabber extends Phaser.Sprite {

  public static preload(game: SmallGame): void {
    game.load.spritesheet('grabber', 'assets/images/grabber-sheet.png', 100, 100, 2, 0, 0)
  }

  public game: SmallGame

  constructor(game: SmallGame, x: number, y: number) {
    super(game, x, y, 'grabber', 0)
    this.game = game
    this.scale.setTo(2, 2)
  }

  public open() {
    this.frame = 1;
  }

  public close() {
    this.frame = 0;
  }
}