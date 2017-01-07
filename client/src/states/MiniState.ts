import * as Phaser from 'phaser'

import SmallGame from '../game'
import { EndScreen } from '../groups/endScreen'
import { CENTER, CrayonText, CrayonTextConfig, LEFT, RIGHT } from '../texts/CrayonText'

export default class MiniState extends Phaser.State {
  public game: SmallGame
  public scoreText: CrayonText
  public points: number
  public active: boolean
  public inactive: boolean
  public DEBUG: boolean
  // END SCREEN STUFF
  public endScreen: EndScreen

  // TIMER STUFF
  public countdownTimer: Phaser.Timer
  public countdownTimerText: CrayonText
  public countdownTimerEnd: Phaser.TimerEvent
  public gameTimer: Phaser.Timer
  public gameTimerText: CrayonText
  public gameTimerEnd: Phaser.TimerEvent

  protected GAME_TIMER_SECONDS: number
  protected COUNTDOWN_TIMER_SECONDS: number

  private GAME_TIMER_MILLISECONDS: number
  private COUNTDOWN_TIMER_MILLISECONDS: number

  constructor(game: SmallGame) {
    super()
    this.game = game

    this.GAME_TIMER_SECONDS = 5
    this.COUNTDOWN_TIMER_SECONDS = 3

  }

  public init() {
    this.points = 0
    this.GAME_TIMER_MILLISECONDS = Phaser.Timer.SECOND * this.GAME_TIMER_SECONDS
    this.COUNTDOWN_TIMER_MILLISECONDS = Phaser.Timer.SECOND * this.COUNTDOWN_TIMER_SECONDS
  }

  public preload() {
    this.load.bitmapFont('rudiment', 'assets/fonts/rudiment_801.png', 'assets/fonts/rudiment_801.fnt')
  }

  public create() {
    this.createEndScreen()
    this.createTimers()
    this.createScoreText()
    if (this.DEBUG) {
      this.createDebug()
    }
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
    this.gameTimerEnd = this.gameTimer.add(this.GAME_TIMER_MILLISECONDS, this.handleGameEnd, this)

    this.countdownTimer = this.game.time.create()
    this.countdownTimerEnd = this.countdownTimer.add(this.COUNTDOWN_TIMER_MILLISECONDS, this.handleGameStart, this)

    this.countdownTimerText.setText(this.COUNTDOWN_TIMER_SECONDS.toFixed(0))
    this.countdownTimer.start();

  }

  public update() {
    const countdownSeconds = this.COUNTDOWN_TIMER_SECONDS - Math.floor(this.countdownTimer.seconds)
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

  private createDebug() {
    const { width, height } = this.game.world
    const debugText = this.game.debug.text(`${width}/${height}`, width - 100, 20, 'blue')
    console.log(debugText)
  }

}
