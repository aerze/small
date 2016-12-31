import * as Phaser from 'phaser';
import { MenuItem } from '../texts/menuItem'
import { centerGameObjects } from '../utils'
import SmallGame from '../game';

const GAMELIST = ['Clicker', 'Tapper']

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
      new MenuItem(this.game, 100, 400, 'Login', () => {
        this.game.router.start('Tapper')
      })
    )
  }

  create() {}

  render() {}
}