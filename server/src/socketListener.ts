import Game from './game'
import Player from './player'
import { findGame, removeGame, createPlayer, createGame as createGameInDb } from './db'

export default function socketListener(io: SocketIO.Server) {

  io.on('connection', (socket) => {
    let game: Game | undefined
    let player: Player | undefined

    socket.on('create game', (data) => {
      player = createPlayer(data.player.name, data.player.icon)
      game = createGame(player, socket)
    })

    socket.on('join game', (data) => {
      player = createPlayer(data.player.name, data.player.icon)
      if (game) leaveGame(player, game, socket, io)
      game = joinGame(player, data.game.code, socket, io)
    })

    socket.on('disconnect', () => {
      if (player && game) leaveGame(player, game, socket, io)
    })
  })
}

function createGame(player: Player, socket: SocketIO.Socket): Game {
  const game = createGameInDb(player)
  socket.emit('create game successful', {
    player: player,
    game: game
  })
  socket.join(game.code)
  return game
}

function joinGame(player: Player,
  code: string,
  socket: SocketIO.Socket,
  server: SocketIO.Server): Game | undefined {
  const game = findGame(code)
  if (game) {
    game.addPlayer(player)
    socket.join(code)
    socket.emit('join game successful', {
      player: player,
      game: game
    })
    server.in(code).emit('player connected', { game: game })
    return game
  }
  else {
    socket.emit('join game failed', {
      error: 'that game does not exist'
    })
    return undefined
  }
}

function leaveGame(player: Player,
  game: Game | undefined,
  socket: SocketIO.Socket,
  server: SocketIO.Server): void {
  if (game) {
    game.removePlayer(player)
    socket.leave(game.code)

    if (game.players.length === 0) removeGame(game)
    else server.in(game.code).emit('player disconnected', {
      game: game
    })
  }
}
