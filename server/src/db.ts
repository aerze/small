import Game from './game'
import Player from './player'

let games: Array<Game> = []
let players: Array<Player> = []

const db = {
	games,
	players
}

export default db
