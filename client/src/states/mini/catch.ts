import * as Phaser from 'phaser'

import SmallGame from '../../game'
import MiniState from '../MiniState'

import ArcadeButton from '../../components/ArcadeButton'

export default class CatchMini extends MiniState {
  public game: SmallGame

  public arcadeButton: ArcadeButton

  constructor(game: SmallGame) {
    super(game)
    this.GAME_TIMER_SECONDS = 3
  }

  public init() {
    super.init()
  }

  public preload() {
    super.preload()
    ArcadeButton.preload(this.game)
  }

  public create() {
    const { height } = this.game
    super.create()

    this.arcadeButton = new ArcadeButton(this.game, 200, height - 150)
    this.add.existing(this.arcadeButton)
  }

  public update() {
    super.update()
  }

  public onCountdownEnd() {
    this.arcadeButton.inputEnabled = true
  }

  public onGameEnd() {
    this.arcadeButton.inputEnabled = false
    this.arcadeButton.frame = 0
  }
}
