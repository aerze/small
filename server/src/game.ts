import Player from './player'
import MetaResult from './metaResult'
import MiniResult from './miniResult'
import Mini from './mini'

export default class Game {
	public code: string
	public players: Array<Player> = []
	private metaResults: Array<MetaResult> = []
	private minisToPlay: Array<Mini> = []
	private currentMini: Mini | undefined

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
		//TODO: Randomly select which games to create
		this.minisToPlay = [new Mini("clicker"), new Mini("catcher"), new Mini("clicker")]
		return this.startNextMini()
	}

	public startNextMini() : Mini | undefined {
		this.currentMini = this.minisToPlay.pop()
		return this.currentMini
	}

	//Player reports their score
	//Check if they are the last player and if so complete the mini
	public playerReportsMiniScore(miniResult: MiniResult) {
		if (this.currentMini) {
			this.currentMini.addResult(miniResult)
		}
	}

}
