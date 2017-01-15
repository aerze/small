import Game from './game'

export function generateGameCode(): string {
	// TODO: Don't return a duplicate code
	return Math.random().toString(36).slice(2,6).toUpperCase()
}

export function findGame(code: string, games: Array<Game>): Game | undefined {
  return games.find(g => g.code === code)
}

export function removeGame(game: Game, games: Array<Game>): void {
	const gameIndex = games.indexOf(game)
	if (gameIndex != -1) games.splice(gameIndex, 1)
}
