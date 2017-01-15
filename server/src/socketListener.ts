import Game from './game'
import db from './db'
import { findGame, removeGame } from './utilities'

export default function socketListener(io: SocketIO.Server) {

  io.on('connection', (socket) => {
    let currentGame: Game | undefined
    let username: string = "noname"

    socket.on('create game', (data) => {
      username = data.username
      currentGame = createGame(username, socket)
    })

    socket.on('join game', (data) => {
      username = data.username
      if (currentGame) leaveGame(username, currentGame, socket, io)
      currentGame = joinGame(username, data.code, socket, io)
    })

    socket.on('disconnect', () => {
      leaveGame(username, currentGame, socket, io)
    })
  })
}

function createGame(playerName: string, socket: SocketIO.Socket): Game {
  const game = new Game(playerName)
  socket.emit('game created', game.code)
  socket.join(game.code)
  db.games.push(game)
  return game
}

function joinGame(playerName: string,
                  code: string,
                  socket: SocketIO.Socket,
                  server: SocketIO.Server): Game | undefined {
  const game = findGame(code, db.games)
  if (game) {
    game.addPlayer(playerName)
    socket.join(code)
    server.in(code).emit('current users', game.players)
    return game
  }
  else {
    socket.emit('game does not exist', code)
    return undefined
  }
}

function leaveGame(playerName: string,
                   game: Game | undefined,
                   socket: SocketIO.Socket,
                   server: SocketIO.Server): void {
  if (game) {
    game.removePlayer(playerName)
    socket.leave(game.code)

    if (game.players.length === 0) removeGame(game, db.games)
    else server.in(game.code).emit('current users', game.players)
  }
}
