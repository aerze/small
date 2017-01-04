import * as Phaser from 'phaser'

import SmallGame from '../game'
import { EndScreen } from '../groups/endScreen'
import { CENTER, CrayonText, CrayonTextConfig, LEFT, RIGHT } from '../texts/CrayonText'

const GAME_TIMER_SECONDS = 5
const GAME_TIMER_MILLISECONDS = Phaser.Timer.SECOND * GAME_TIMER_SECONDS

const COUNTDOWN_TIMER_SECONDS = 3
const COUNTDOWN_TIMER_MILLISECONDS = Phaser.Timer.SECOND * COUNTDOWN_TIMER_SECONDS

export default class MiniState extends Phaser.State {
  public game: SmallGame
  public points: number
  public scoreText: CrayonText
  public active: Boolean
  public inactive: Boolean
  // END SCREEN STUFF
  public endScreen: EndScreen

  // TIMER STUFF
  public countdownTimer: Phaser.Timer
  public countdownTimerText: CrayonText
  public countdownTimerEnd: Phaser.TimerEvent
  public gameTimer: Phaser.Timer
  public gameTimerText: CrayonText
  public gameTimerEnd: Phaser.TimerEvent

  constructor(game: SmallGame) {
    super()
    this.game = game
  }

  public init() {
    this.points = 0
  }

  // public preload() {
  // }

  public create() {
    this.createEndScreen()
    this.createTimers()
    this.createScoreText()
  }

  public createScoreText(): void {
    this.scoreText = new CrayonText(this.game, {
      align: RIGHT,
      fontsize: 40,
      x: this.game.world.width - 25,
      y: 25,
    })
    this.scoreText.anchor.setTo(1, 0)
  }

  public createEndScreen(): void {
    this.endScreen = new EndScreen(this.game)
  }

  public createTimers(): void {
    const { centerX, centerY } = this.game.world

    const GAME_TIMER_CONFIG: CrayonTextConfig = {
      align: LEFT,
      fontsize: 40,
      x: 25,
      y: 25,
    }

    const COUNTDOWN_TIMER_CONFIG: CrayonTextConfig = {
      align: CENTER,
      fontsize: 80,
      x: centerX,
      y: centerY - 125,
    }

    this.gameTimerText = new CrayonText(this.game, GAME_TIMER_CONFIG)
    this.gameTimerText.visible = false

    this.countdownTimerText = new CrayonText(this.game, COUNTDOWN_TIMER_CONFIG)
    this.countdownTimerText.anchor.setTo(0.5)

    this.gameTimer = this.game.time.create()
    this.gameTimerEnd = this.gameTimer.add(GAME_TIMER_MILLISECONDS, this.handleGameEnd, this)

    this.countdownTimer = this.game.time.create()
    this.countdownTimerEnd = this.countdownTimer.add(COUNTDOWN_TIMER_MILLISECONDS, this.handleGameStart, this)

    this.countdownTimerText.setText(COUNTDOWN_TIMER_SECONDS.toFixed(0))
    this.countdownTimer.start();

  }

  public update() {
    const countdownSeconds = COUNTDOWN_TIMER_SECONDS - Math.floor(this.countdownTimer.seconds)
    if (countdownSeconds > 0) this.countdownTimerText.setText(countdownSeconds.toFixed(0))
    else this.countdownTimerText.setText('')

    const gameSeconds = Math.floor(this.gameTimer.seconds * 100) / 100
    this.gameTimerText.setText(gameSeconds.toFixed(2))
  }

  public onCountdownEnd(): void {}
  public handleGameStart(): void {
    this.countdownTimer.destroy()
    this.countdownTimerText.destroy()

    this.active = true
    this.inactive = false
    this.gameTimer.start()
    this.gameTimerText.visible = true
    this.onCountdownEnd()
  }

  public onGameEnd(): void {}
  public handleGameEnd(): void {
    this.active = false
    this.inactive = true
    this.scoreText.destroy()
    this.gameTimer.destroy()
    this.gameTimerText.destroy()
    this.endScreen.show(this.score)

    this.onGameEnd()
  }

  public get score() {
    return this.points
  }
  public set score(v: number) {
    this.points = v
    this.scoreText.setText(this.points.toString())
  }

}
