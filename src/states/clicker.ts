import * as Phaser from 'phaser';
import { Clickable } from '../sprites/clickable'
import { ScoreText } from '../texts/scoreText'
import { EndScreen } from '../groups/endScreen'

import { TimerText } from '../texts/timerText'
import { TimerBar } from '../images/timerBar'
import { TimerGroup } from '../groups/timerGroup'

import { centerGameObjects } from '../utils'

export class ClickerGame extends Phaser.State {
  clickable: Clickable
  timerGroup: TimerGroup
  endScreen: EndScreen
  scoreText: ScoreText
  score: number
  active: boolean

  startTimer: Phaser.Timer
  gameTimer: Phaser.Timer


  init() {
    this.score = 0
  }

  preload() {
    this.load.image('clickable', 'assets/images/clickable.png')
    this.load.image('timerBar', './assets/images/loader-bar.png')
  }

  create() {
    this.physics.startSystem(Phaser.Physics.P2JS)
    this.setupGameObjects()
  }

  update() {}

  render() {}

  setupGameObjects() {
    const { centerX, centerY, height } = this.game.world
    this.clickable = new Clickable(this.game, centerX, centerY, this.handleClick, this )
    this.scoreText = new ScoreText(this.game, '0')
    this.timerGroup = new TimerGroup(this.game, this.handleGameStart, this.handleGameEnd, this)
    this.endScreen = new EndScreen(this.game)
    // const test = this.game.add.text(100, 100, this.game.world.width.toString(), {})
  }

  handleGameStart() {
    this.active = true
  }

  handleGameEnd() {
    this.active = false
    this.showEndScreen()
  }

  handleClick() {
    if (!this.active) return
    this.score += 1
    this.scoreText.setText(this.score.toString())
  }

  showEndScreen() {
    this.scoreText.setText('');
    this.endScreen.show(this.score)
  }
}