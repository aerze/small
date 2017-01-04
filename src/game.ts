/// <reference path="../typings/index.d.ts"/>
/// <reference path="../lib/phaser.d.ts"/>
import * as Phaser from 'phaser'

import { BootState } from './states/boot'
import { ClickerGame } from './states/clicker'
import { GameState } from './states/game'
import { MenuState } from './states/menu'
import ClickerMini from './states/mini/clicker'
import { SplashState } from './states/splash'
import { TapperGame } from './states/tapper'

import MiniState from './states/MiniState'

import Router from './router'

export default class SmallGame extends Phaser.Game {
  public router: Router

  constructor () {
    let width = document.documentElement.clientWidth > 768 ? 768 : document.documentElement.clientWidth
    let height = document.documentElement.clientHeight > 1024 ? 1024 : document.documentElement.clientHeight

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Menu', MenuState, false)
    this.state.add('Mini', MiniState, false)
    this.state.add('Clicker', ClickerGame, false)
    this.state.add('ClickerMini', ClickerMini, false)
    this.state.add('Tapper', TapperGame, false)

    this.router = new Router(this)

    console.log(Phaser.VERSION);
    this.state.start('Boot')
  }
}
