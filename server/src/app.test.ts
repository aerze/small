import App from './app'
import * as sio from 'socket.io-client'
import 'jest'

// Was trying to test socket in here, but app would never open the server socket
// Not sure how to fix this...

// const app = new App()


describe('basic socket test', () => {

	// beforeEach((done) => {
	// 	app.start(8080)
	// 	done()
	// })

	test('can detect a connected client', (done) => {
		// const client = sio("http://localhost:8080")

		// client.once("connect", () => {
		// 	expect(app.connectedClients).toBe(0)
		// 	client.disconnect()
		// 	done()
		// })
		// done()
		// app.stop()
	})
})

