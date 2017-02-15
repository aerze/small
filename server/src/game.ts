import Player from './player'
import MetaResult from './metaResult'

export default class Game {
	public code: string
	public players: Array<Player> = []
	private metaResults: Array<MetaResult> = []
	private minisToPlay: Array<string> = []

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

	public startGame() {
		this.metaResults = this.players.map(player =>
			( { id: player.id, score: 0 } )
		)
		this.minisToPlay = ["clicker", "clicker", "clicker"]
		return this.startMini()
	}

	public startMini() : string | undefined {
		return this.minisToPlay.pop()
	}

}
