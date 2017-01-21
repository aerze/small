import { generatePlayerId } from './utilities'

export default class Player {
	public id: number
	public name: string
	public icon: string

	constructor(name: string, icon: string) {
		this.id = generatePlayerId()
		this.name = name
		this.icon = icon
	}

}
