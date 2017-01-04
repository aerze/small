import * as Phaser from 'phaser'
import SmallGame from '../game'

const style = {
  align: 'center',
  fill: '#23993f',
  font: 'Nunito',
  fontSize: 45,
}

export class EndScreen extends Phaser.Group {
  public gameOverText: Phaser.Text
  public backText: Phaser.Text
  public retryText: Phaser.Text
  public scoreText: Phaser.Text

  constructor(game: SmallGame) {
    super(game, game.world, 'EndScreen')
    const { width, height } = game.world
    this.game = game

    this.gameOverText = this.add(new Phaser.Text(game, width / 2, height / 2 - 300, 'Game Over', style))
    this.gameOverText.anchor.setTo(0.5, 0)

    this.scoreText = this.add(new Phaser.Text(game, width / 2, height / 2 - 240, '', style))
    this.scoreText.anchor.setTo(0.5, 0)

    this.backText = this.add(new Phaser.Text(game, width, height, 'Back', style))
    this.backText.anchor.setTo(1, 1)
    this.backText.inputEnabled = true
    this.backText.events.onInputUp.add(() => { game.router.start('Menu') })

    this.retryText = this.add(new Phaser.Text(game, 0, height, 'Try\nAgain', style))
    this.retryText.anchor.setTo(0, 1)
    this.retryText.inputEnabled = true
    this.retryText.events.onInputUp.add(() => { game.router.restart(true) })

    this.visible = false
  }

  public show(score?: number) {
    this.scoreText.setText(score.toString())
    this.visible = true
  }
}