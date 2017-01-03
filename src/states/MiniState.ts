import * as Phaser from 'phaser'

import { CrayonText, CrayonTextConfig, CENTER, LEFT } from '../texts/CrayonText'
import { EndScreen } from '../groups/endScreen'
import SmallGame from '../game'
    
const GAME_TIMER_SECONDS = 5
const GAME_TIMER_MILLISECONDS = Phaser.Timer.SECOND * GAME_TIMER_SECONDS

const COUNTDOWN_TIMER_SECONDS = 3
const COUNTDOWN_TIMER_MILLISECONDS = Phaser.Timer.SECOND * COUNTDOWN_TIMER_SECONDS

export default class MiniState extends Phaser.State {
  game: SmallGame
  // END SCREEN STUFF
  endScreen: EndScreen
  // gameOverText: Phaser.Text
  // backText: Phaser.Text
  // retryText: Phaser.Text
  // scoreText: Phaser.Text

  // TIMER STUFF
  countdownTimer: Phaser.Timer
  countdownTimerText: CrayonText
  countdownTimerEnd: Phaser.TimerEvent
  gameTimer: Phaser.Timer
  gameTimerText: CrayonText
  gameTimerEnd: Phaser.TimerEvent

  score: number

  constructor(game: SmallGame) {
    super()
    this.game = game
  }

  init() {
    this.score = 0
  }

  preload() {
  }

  create() {
    this.createEndScreen()
    this.createTimers()
  }

  createEndScreen(): void {
    this.endScreen = new EndScreen(this.game)
  }

  createTimers(): void {
    const { centerX, centerY } = this.game.world

    const GAME_TIMER_CONFIG: CrayonTextConfig = {
      x: 25,
      y: 25,
      fontsize: 40,
      align: LEFT
    }

    const COUNTDOWN_TIMER_CONFIG: CrayonTextConfig = {
      x: centerX,
      y: centerY - 125,
      fontsize: 80,
      align: CENTER
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

  update() {
    const countdownSeconds = COUNTDOWN_TIMER_SECONDS - Math.floor(this.countdownTimer.seconds)
    if (countdownSeconds > 0) this.countdownTimerText.setText(countdownSeconds.toFixed(0))
    else this.countdownTimerText.setText('')

    const gameSeconds = Math.floor(this.gameTimer.seconds * 100) / 100
    this.gameTimerText.setText(gameSeconds.toFixed(2))
  }

  onCountdownEnd(): void {}
  handleGameStart(): void {
    this.countdownTimer.destroy()
    this.countdownTimerText.destroy()

    this.gameTimer.start()
    this.gameTimerText.visible = true
    this.onCountdownEnd()
  }

  onGameEnd(): void {}
  handleGameEnd(): void {
    this.gameTimer.destroy()
    this.gameTimerText.destroy()
    this.endScreen.show(this.score)

    this.onGameEnd()
  }
}