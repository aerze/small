import * as Phaser from 'phaser'

import SmallGame from '../../game'
import MiniState from '../MiniState'

export default class CatchMini extends MiniState {
  public game: SmallGame

  constructor(game: SmallGame) {
    super(game)
    this.GAME_TIMER_SECONDS = 3
    this.DEBUG = true
  }

  public init() {
    super.init()
  }

  public preload() {
    super.preload()
  }

  public create() {
    super.create()
  }

  public update() {
    super.update()
  }
}
