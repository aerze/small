import * as Phaser from 'phaser';
import SmallGame from '../game';
import { MenuItem } from '../texts/menuItem'
import { centerGameObjects } from '../utils'

const GAMELIST = ['MiniState', 'ClickerMini']

export class MenuState extends Phaser.State {
  public menuItems: Array<MenuItem>
  public game: SmallGame

  public init() {
    this.menuItems = []
  }

  public preload() {
    this.load.bitmapFont('rudiment', 'assets/fonts/rudiment_801.png', 'assets/fonts/rudiment_801.fnt')
  }

  public create() {
    GAMELIST.forEach((name, index) => {
      const menuItem = new MenuItem(this.game, 100, (index + 1) * 100, name,
        () => { this.game.router.start(name) }
      )

      this.menuItems.push(menuItem)
    })
  }

  public render() {}
}