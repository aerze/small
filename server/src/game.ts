import Player from './player'

export default class Game {
	public code: string
	public players: Array<Player> = []

	constructor(creator: Player, code: string) {
		this.code = code
		this.addPlayer(creator)
	}

	public addPlayer(playerToAdd) {
		this.players.push(playerToAdd)
	}

	public removePlayer(playerToRemove) {
		this.players.splice(this.players.findIndex(player => player === playerToRemove))
	}

}
