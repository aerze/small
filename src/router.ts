/// <reference path="./game.ts"/>

import * as Phaser from 'phaser'
import SmallGame from './game';

export default class Router {
  public game: SmallGame
  public list: Array<string>

  constructor(game: SmallGame) {
    this.game = game
    this.list = []

    window.addEventListener('hashchange', (event) => {
      const hash = event.newURL.split('#')[1] || 'Menu'
      console.log('Router::', hash)
      this.list.push(hash)

      this.game.state.start(hash)
    })
  }

  public start(key: string, clearWorld?: boolean, clearCache?: boolean, args?: any[]) {
    location.hash = key
    console.log(this.list)
    // this.game.state.start(key, clearWorld, clearCache, args)
  }

  public restart(clearWorld: boolean, clearCache?: boolean) {
    this.game.state.restart(clearWorld, clearCache)
  }
}