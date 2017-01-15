import { generateGameCode } from './utilities'
export default class Game {
	public code: string
	public players: Array<string> = []

	constructor(creator: string) {
		this.code = generateGameCode()
		this.addPlayer(creator)
	}

	public addPlayer(playerToAdd) {
		this.players.push(playerToAdd)
	}

	public removePlayer(playerToRemove) {
		this.players.splice(this.players.findIndex(player => player === playerToRemove))
	}

}
