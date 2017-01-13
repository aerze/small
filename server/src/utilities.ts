import Game from './game'

export const generateGameCode = () => {
	// TODO: Don't return a duplicate code
	return Math.random().toString(36).slice(2,6).toUpperCase()
}
