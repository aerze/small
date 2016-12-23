import * as Phaser from 'phaser'
import { TimerText } from '../texts/timerText'
import { TimerBar } from '../images/timerBar'

const GAME_DURATION = Phaser.Timer.SECOND * 10

export class TimerGroup extends Phaser.Group {
  bar: TimerBar
  text: TimerText
  
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
    this.text = new TimerText(game)

    this.onGameStart = onGameStart
    this.onGameEnd = onGameEnd
    this.context = context

    this.readyTimer = game.time.create()
    this.readyTimerEvent = this.readyTimer.add(Phaser.Timer.SECOND * 3, this.handleGameStart, this)

    this.gameTimer = game.time.create()
    this.gameTimerEvent = this.gameTimer.add(GAME_DURATION, this.handleGameEnd, this)

    this.readyTimer.start();
  }

  update() {
    const seconds = (Math.floor(this.gameTimer.seconds * 100) / 100);
    this.text.setText(seconds.toFixed(2));
    this.bar.setPercent(100 - (seconds * 10))
  }

  handleGameStart() {
    this.onGameStart.bind(this.context)()
    this.gameTimer.start()
  }

  handleGameEnd() {
    this.onGameEnd.bind(this.context)()
    this.text.destroy()
    this.bar.destroy()
  }
}