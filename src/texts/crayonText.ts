import * as Phaser from 'phaser'

export type Alignment = 'center' | 'left' | 'right'
export const CENTER: Alignment = 'center'
export const LEFT: Alignment = 'left'
export const RIGHT: Alignment = 'right'
export interface CrayonTextConfig {
  x: number
  y: number
  fontsize?: number
  align?: Alignment
  text?: string
}

export class CrayonText extends Phaser.BitmapText {
  constructor(game: Phaser.Game, config: CrayonTextConfig) {
    super(game, config.x, config.y, 'rudiment', config.text || '', config.fontsize || 40, config.align || 'left')
    this.game = game
    this.anchor.setTo(0)
    game.add.existing(this)
  }
}