import * as Phaser from 'phaser'

import SmallGame from '../../game'
import MiniState from '../MiniState'

import ArcadeButton from '../../components/ArcadeButton'
import Grabber from '../../components/Grabber'
import Ball from '../../components/Ball'

export default class CatchMini extends MiniState {
  public game: SmallGame

  public arcadeButton: ArcadeButton
  public grabber: Grabber
  public ball: Ball

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
    Grabber.preload(this.game);
    Ball.preload(this.game);
  }

  public create() {
    const { height, width, centerX, centerY } = this.game.world
    super.create()

    this.arcadeButton = new ArcadeButton(this.game, 200, height - 150)
    this.grabber = new Grabber(this.game, width, 200)
    this.grabber.anchor.set(1, 1)
    this.add.existing(this.arcadeButton)
    this.add.existing(this.grabber);

    this.arcadeButton.onInputDown = () => {
      this.grabber.open()
    }

    this.arcadeButton.onInputUp = () => {
      this.grabber.close()
    }

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
