import * as http from 'http'

import App from './app'

const app = new App().app
const port = 8080

const server = http.createServer(app)
server.listen(port)
server.on('listening', () => {
  const address = server.address()
  console.log(`listening on port ${address.port}`)
})

