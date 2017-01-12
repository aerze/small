import { generateGameCode } from './utilities'
export default class Game {
	public code: string
	public players: Array<string> = []

	constructor() {
		this.code = generateGameCode()
	}

	public addPlayer(playerToAdd) {
		this.players.push(playerToAdd)
	}

	public removePlayer(playerToRemove) {
		this.players.splice(this.players.findIndex(player => player === playerToRemove))
	}

}
