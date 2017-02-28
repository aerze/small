export default class Player {
  public id: number
  public name: string
  public icon: string

  constructor(name: string, icon: string, id: number) {
    this.id = id
    this.name = name
    this.icon = icon
  }

}
