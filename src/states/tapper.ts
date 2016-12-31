import * as Phaser from 'phaser'
import { MenuItem } from '../texts/menuItem'
import { centerGameObjects } from '../utils'
import SmallGame from '../game'

const GAMELIST = ['Menu', 'Demo']

export class TapperGame extends Phaser.State {
  menuItems: Array<MenuItem>
  game: SmallGame

  init() {
    this.menuItems = [];
  }

  preload() {
    GAMELIST.forEach((name, index) => {
      const loadGame = () => {
        this.game.router.start(name)
      }

      this.menuItems.push(
        new MenuItem(this.game, 100, (index + 1) * 100, name, loadGame)
      )
    })
  }

  create() {}

  render() {}
}