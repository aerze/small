import * as Phaser from 'phaser'

interface OnClickCallback {
    (n: Clickable): void
}

export class Clickable extends Phaser.Sprite {
  private emitter: Phaser.Particles.Arcade.Emitter
  private emitterCallback: Phaser.SignalBinding

  constructor(game: Phaser.Game, x: number, y: number, onClick: OnClickCallback, context: Phaser.State) {
    super(game, x, y, 'clickable')
    this.emitter = game.add.emitter(x, y, 100)
    this.emitter.makeParticles('clickable', [0], 100, true, true)
    this.emitter.maxParticleSpeed.setTo(1000, -1000)
    this.emitter.minParticleSpeed.setTo(-1000, 1000)
    this.emitter.angularDrag = 30
    this.emitter.maxParticleScale = 0.5
    this.emitter.minParticleScale = 0.5
    this.emitter.gravity = 200
    this.emitter.bounce.setTo(0.8, 0.8)

    this.game = game
    this.anchor.setTo(0.5)

    this.inputEnabled = true
    this.events.onInputDown.add(onClick, context)



    game.add.existing(this)
  }

  public fireEmitter() {
    this.emitter.start(true, Phaser.Timer.SECOND * 2, null, 1, true)
  }

  public enableEmitter() {
    this.emitterCallback = this.events.onInputDown.add(this.fireEmitter, this)
  }

  public disableEmitter() {
    this.emitterCallback.detach()
  }
}
