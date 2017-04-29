import Game from './game'
import Player from './player'
import GameStateNotifier from './gameStateNotifier'

let games: Game[] = []
let players: Player[] = []

const db = {
  games,
  players
}

export function findGame(code: string): Game | undefined {
  return db.games.find(g => g.code === code)
}

export function createGame(player: Player, notifier: GameStateNotifier): Game {
  const game = new Game(player, generateGameCode(), notifier)
  db.games.push(game)
  return game
}

export function removeGame(game: Game): void {
  const gameIndex = db.games.indexOf(game)
  if (gameIndex !== -1) db.games.splice(gameIndex, 1)
}

export function createPlayer(name: string, icon: string): Player {
  const player = new Player(name, icon, generatePlayerId())
  db.players.push(player)
  return player
}

function generatePlayerId(): number {
  return db.players.length
}

function generateGameCode(): string {
  // TODO: Don't return a duplicate code
  return Math.random().toString(36).slice(2, 6).toUpperCase()
}
