import * as Phaser from 'phaser'
import { CrayonText } from '../texts/CrayonText'
import { TimerBar } from '../images/timerBar'

const GAME_DURATION = Phaser.Timer.SECOND * 10
const COUNTDOWN_SECONDS = 3;
const COUNTDOWN_DURATION = Phaser.Timer.SECOND * COUNTDOWN_SECONDS;

export class TimerGroup extends Phaser.Group {
  bar: TimerBar
  timerText: CrayonText
  countdownText: CrayonText

  onGameStart: Function
  onGameEnd: Function
  context: Phaser.State

  readyTimer: Phaser.Timer
  gameTimer: Phaser.Timer 
  readyTimerEvent: Phaser.TimerEvent
  gameTimerEvent: Phaser.TimerEvent

  constructor(game: Phaser.Game, onGameStart: Function, onGameEnd: Function, context: Phaser.State) {
    super(game, game.world, 'TimerGroup')

    this.game = game

    this.bar = new TimerBar(game)
    this.timerText = new CrayonText(game, 25, 25)
    this.timerText.visible = false;

    this.countdownText = new CrayonText(game, game.world.centerX, game.world.centerY - 125, 80, 'center')
    this.countdownText.anchor.setTo(0.5)


    this.onGameStart = onGameStart
    this.onGameEnd = onGameEnd
    this.context = context

    this.readyTimer = game.time.create()
    this.readyTimerEvent = this.readyTimer.add(COUNTDOWN_DURATION, this.handleGameStart, this)
    this.countdownText.setText(Math.floor(COUNTDOWN_DURATION / 1000).toFixed())

    this.gameTimer = game.time.create()
    this.gameTimerEvent = this.gameTimer.add(GAME_DURATION, this.handleGameEnd, this)

    this.readyTimer.start();
  }

  update() {
    const countdownSeconds = COUNTDOWN_SECONDS - Math.floor(this.readyTimer.seconds)
    if (countdownSeconds > 0) this.countdownText.setText(countdownSeconds.toFixed())
    else this.countdownText.setText('');


    const timerSeconds = Math.floor(this.gameTimer.seconds * 100) / 100
    this.timerText.setText(timerSeconds.toFixed(2))
    this.bar.setPercent(100 - (timerSeconds * 10))
  }

  handleGameStart() {
    this.onGameStart.bind(this.context)()
    this.countdownText.destroy()
    this.gameTimer.start()
    this.timerText.visible = true;
  }

  handleGameEnd() {
    this.onGameEnd.bind(this.context)()
    this.timerText.destroy()
    this.bar.destroy()
  }
}