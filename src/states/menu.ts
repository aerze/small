import * as Phaser from 'phaser';
import { MenuItem } from '../texts/menuItem'
import { centerGameObjects } from '../utils'
import SmallGame from '../game';

const GAMELIST = ['Clicker', 'ClickerMini']

export class MenuState extends Phaser.State {
  menuItems: Array<MenuItem>
  game: SmallGame

  init() {
    this.menuItems = []
  }

  preload() {
    GAMELIST.forEach((name, index) => {
      const menuItem = new MenuItem(this.game, 100, (index + 1) * 100, name,
        () => { this.game.router.start(name) }
      )

      this.menuItems.push(menuItem)
    })
    
    this.menuItems.push(
      new MenuItem(this.game, 100, 400, 'MiniState', () => {
        this.game.router.start('mini')
      })
    )
  }

  create() {}

  render() {}
}