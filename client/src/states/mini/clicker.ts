import * as Phaser from 'phaser'

import SmallGame from '../../game'
import { Clickable } from '../../sprites/clickable'
import MiniState from '../MiniState'

export default class ClickerMini extends MiniState {
  public game: SmallGame
  public clickable: Clickable

  constructor(game: SmallGame) {
    super(game)
  }

  public init() {
    super.init()
  }

  public preload() {
    super.preload()
    this.load.image('clickable', 'assets/images/clickable.png')
  }

  public create() {
    super.create()
    this.physics.startSystem(Phaser.Physics.ARCADE)

    const { centerX, centerY, height } = this.game.world

    this.clickable = new Clickable(this.game, centerX, centerY, this.handleClick, this)
  }

  public update() {
    super.update()
  }

  public onCountdownEnd() {
    this.clickable.enableEmitter()
  }

  public onGameEnd() {
    this.clickable.disableEmitter()
  }

  private handleClick() {
    if (this.inactive) return
    this.score += 1
  }
}
