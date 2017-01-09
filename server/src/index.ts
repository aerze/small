import * as http from 'http'
import * as sio from 'socket.io'

import App from './app'

const app = new App().app
const port = 8080

const server = http.createServer(app)

//Setup Socket.IO
//Trying things here before extracting out to another class
const io = sio(server)

let numberOfClients: number = 0
io.on('connection', (socket) => {

  console.log(`Clients connected: ${++numberOfClients}`)
  socket.on('disconnect', () => {
    console.log(`Clients connected: ${--numberOfClients}`)
  })
})

server.listen(port)
server.on('listening', () => {
  const address = server.address()
  console.log(`listening on port ${address.port}`)
})

