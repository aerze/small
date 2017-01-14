import * as Phaser from 'phaser'
import SmallGame from '../game'

export default class Claw extends Phaser.Group {

  public static preload(game: SmallGame): void {
    game.load.image('claw', 'assets/images/claw.png')
  }

  public topClaw: Phaser.Sprite
  public botClaw: Phaser.Sprite
  public game: SmallGame

  constructor(game: SmallGame, x: number, y: number) {
    super(game, null, 'CLAW')
    this.game = game

    const w = 66
    const h = 33
    const s = 2

    this.topClaw = new Phaser.Sprite(game, w * s, h * s, 'claw')
    this.topClaw.scale.setTo(s, s)
    this.topClaw.anchor.setTo(1, 1)

    this.botClaw = new Phaser.Sprite(game, w * s, h * s, 'claw')
    this.botClaw.scale.setTo(s, -s)
    this.botClaw.anchor.setTo(1, 1)

    this.add(this.topClaw)
    this.add(this.botClaw)

    console.log(this.topClaw.rotation)
    console.log(this.botClaw.rotation)
  }

  public open() {
    this.topClaw.rotation = 45
    this.botClaw.rotation = -45
  }

  public close() {
    this.topClaw.rotation = 0
    this.botClaw.rotation = 0
  }
}
