import * as express from 'express'
import * as logger from 'morgan'
import * as http from 'http'
import * as path from 'path'
import * as sio from 'socket.io'

export default class App {
  private app: express.Application
  private io: SocketIO.Server

  public connectedClients: number = 0
  public server: http.Server

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

  private sockets(io: SocketIO.Server): void {
    io.on('connection', (socket) => {

      console.log(`Clients connected: ${++this.connectedClients}`)
      socket.on('disconnect', () => {
        console.log(`Clients connected: ${--this.connectedClients}`)
      })
    })
  }

  private routes(app: express.Application) {
    const clientDir = path.join(__dirname, '../../client/public')
    app.use(express.static(clientDir))
  }
}
