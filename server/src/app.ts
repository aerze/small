import * as express from 'express'
import * as logger from 'morgan'
import * as http from 'http'
import * as path from 'path'
import * as sio from 'socket.io'
import Game from './game'

export default class App {
  private app: express.Application
  private io: SocketIO.Server
  private server: http.Server

  public connectedClients: number = 0


  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.io = sio(this.server)

    this.sockets(this.io)
    this.middleware(this.app)
    this.routes(this.app)
  }

  public start(port: number): void {
    this.server.listen(port)
    this.server.on('listening', () => {
      const address = this.server.address()
      console.log(`listening on port ${address.port}`)
    })
  }

  public stop(): void {
    this.server.close()
  }

  private middleware(app: express.Application): void {
    app.use(logger('dev'))
  }

  // Playing with Sockets here...
  // Once logic is working, probably move this to another module
  private sockets(io: SocketIO.Server): void {
    const games: Array<Game> = []

    io.on('connection', (socket) => {

      let currentGame: Game
      let name: string

      socket.on('create user', (username) => {
        name = username
      })

      socket.on('create game', (_) => {
        currentGame = new Game()
        currentGame.addPlayer(name)
        socket.join(currentGame.code)
        socket.emit('game created', currentGame.code)
      })

      socket.on('join game', (code) => {
        const gameToJoin = games.find(game => game.code === code)
        if (gameToJoin) {
          gameToJoin.addPlayer(name)
          socket.join(code)
          io.in(code).emit('user joined', name)
          io.in(code).emit('users in room', gameToJoin.players)
        }
        else socket.emit('game does not exist', code)
      })

      console.log(`Clients connected: ${++this.connectedClients}`)

      socket.on('disconnect', () => {
        if (name && currentGame) {
          currentGame.removePlayer(name)
          io.in(currentGame.code).emit('user left', name)
        }
        console.log(`Clients connected: ${--this.connectedClients}`)
      })
    })
  }

  private routes(app: express.Application) {
    const clientDir = path.join(__dirname, '../../client/public')
    app.use(express.static(clientDir))
  }
}
