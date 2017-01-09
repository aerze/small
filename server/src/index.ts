import * as http from 'http'
import * as sio from 'socket.io'

import App from './app'

const app = new App().app
const port = 8080

const server = http.createServer(app)

//Setup Socket.IO
const io = sio(server)
io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => console.log('user disconnected'))
})

server.listen(port)
server.on('listening', () => {
  const address = server.address()
  console.log(`listening on port ${address.port}`)
})

