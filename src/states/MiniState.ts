import * as Phaser from 'phaser'

import { TimerGroup } from '../groups/timerGroup'
import SmallGame from '../game'

export default class MiniState extends Phaser.State {
  timers: TimerGroup

  score: number
  other: number
  game: SmallGame

  constructor() {
    super()
    this.other = 5
  }

  init() {
    console.log('MiniState.init')
    this.score = 0
  }

  preload() {
    this.load.image('timerBar', './assets/images/loader-bar.png')
  }

  create() {
    const { centerX, centerY, height } = this.game.world
    this.timers = new TimerGroup(this.game, this.handleGameStart, this.handleGameEnd, this)
  }

  handleGameStart() {

  }

  handleGameEnd() {

  }
}