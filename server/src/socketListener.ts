import Game from './game'

export default function socketListener(io: SocketIO.Server) {
	let connectedClients: number = 0
  const games: Array<Game> = []

  io.on('connection', (socket) => {

    let currentGame: Game | undefined
    let name: string = "unnamed player"

    socket.on('change name', (username) => {
      name = username
    })

    socket.on('create game', (_) => {
      currentGame = createGame(name, socket)
      games.push(currentGame)
    })

    socket.on('join game', (code) => {
      currentGame = findGame(code, games)
      if (currentGame) joinGame(name, currentGame, socket, io)
      else socket.emit('game does not exist', code)
    })

    console.log(`Clients connected: ${++connectedClients}`)

    socket.on('disconnect', () => {
      leaveGame(name, currentGame, io)
      console.log(`Clients connected: ${--connectedClients}`)
    })
  })
}

function createGame(playerName: string, socket: SocketIO.Socket): Game {
  const game = new Game()
  game.addPlayer(playerName)
  socket.join(game.code)
  socket.emit('game created', game.code)
  return game
}

function findGame(code: string, games: Array<Game>): Game | undefined {
  return games.find(g => g.code === code)
}

function joinGame(playerName: string,
                  game: Game,
                  socket: SocketIO.Socket,
                  server: SocketIO.Server): void {
  game.addPlayer(playerName)
  socket.join(game.code)
  server.in(game.code).emit('user joined', playerName)
  server.in(game.code).emit('current users', game.players)
}

function leaveGame(playerName: string, game: Game | undefined, server: SocketIO.Server): void {
  if (game) {
    game.removePlayer(playerName)
    server.in(game.code).emit('user left', playerName)
    server.in(game.code).emit('current users', game.players)
  }
}
