import * as Phaser from 'phaser';
import SmallGame from '../game'
import { Clickable } from '../sprites/clickable'
import { ScoreText } from '../texts/scoreText'
import { EndScreen } from '../groups/endScreen'

import { TimerGroup } from '../groups/timerGroup'

import { CrayonText } from '../texts/CrayonText'
import { centerGameObjects } from '../utils'

export class ClickerGame extends Phaser.State {
  game: SmallGame
  clickable: Clickable
  timerGroup: TimerGroup
  endScreen: EndScreen
  scoreText: CrayonText
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
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.setupGameObjects()
  }

  update() {}

  render() {}

  setupGameObjects() {
    const { centerX, centerY, height } = this.game.world
    this.clickable = new Clickable(this.game, centerX, centerY, this.handleClick, this)
    this.timerGroup = new TimerGroup(this.game, this.handleGameStart, this.handleGameEnd, this)
    this.endScreen = new EndScreen(this.game)
    this.scoreText = new CrayonText(this.game, this.game.world.width - 25, 25, 40, 'right')
    this.scoreText.anchor.setTo(1, 0)
    // const test = this.game.add.text(100, 100, this.game.world.width.toString(), {})
  }

  handleGameStart() {
    this.active = true
    this.clickable.enableEmitter()
  }

  handleGameEnd() {
    this.active = false
    this.clickable.disableEmitter();
    this.showEndScreen()
  }

  handleClick() {
    if (!this.active) return
    this.score += 1
    this.scoreText.setText(this.score.toString())
  }

  showEndScreen() {
    this.scoreText.setText('')
    this.endScreen.show(this.score)
  }
}