import App from './app'
import * as sio from 'socket.io-client'
import 'jest'

// Was trying to test socket in here, but app would never open the server socket
// Not sure how to fix this...

describe('basic socket test', () => {

	let app = new App()
	app.start(8080, () => {
		console.log("started express server")
	})

	// Was trying to have server startup/teardown with every test but this was not working
	// beforeEach(function(done) {
	// 	app.start(8080, () => {
	// 		console.log("started")
	// 		done()
	// 	})
	// })

	// afterEach(function(done) {
	// 	app.stop(done)
	// })

	it('can create game with 4 character code', function(done) {
		const client = sio("http://localhost:8080")

		client.once("connect", () => {
			client.emit('create game')
			client.addEventListener('game created', (code) => {
				client.disconnect()
				expect(code.length).toBe(4)
				done()
			})
		})

	})
})

