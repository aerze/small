import App from './app'
import Game from './game'
import db from './db'

import * as sio from 'socket.io-client'

const baseUrl = 'http://localhost:8080'

describe('basic integration tests', () => {

	let app = new App()
	app.start(8080, () => {
		console.log("started express server")
	})

	it('can create a game and get 4 character code', function(done) {
		const socket = sio(baseUrl)
		socket.once('connect', () => {
			socket.emit('create game', { username: 'user1' })
			socket.addEventListener('game created', (code) => {
				socket.disconnect()
				expect(code.length).toBe(4)
				done()
			})
		})
	})

	it('get current users after joining', function(done) {
		//Create game and user
		const game = new Game('user1')
		db.games.push(game)

		const joinParams = { username: 'joiner', code: game.code }

		const joinerSocket = sio(baseUrl)
		joinerSocket.once('connect', () => {
			joinerSocket.emit('join game', joinParams)
			joinerSocket.addEventListener('current users', (players) => {
				joinerSocket.disconnect()
				expect(players.length).toBe(2)
				done()
			})
		})
	})

	it('host gets current users when user joins', function(done) {
		const user1 = sio(baseUrl)
		const user2 = sio(baseUrl)

		user1.once('connect', () => {
			user1.emit('create game', { username: 'user1' })
			user1.addEventListener('game created', (code) => {
					user2.emit('join game', { username: 'user2', code: code })
			})

			user1.addEventListener('current users', (users) => {
				user1.disconnect()
				user2.disconnect()
				expect(users.length).toBe(2)
				done()
			})
		})
	})

	it('host gets current users after user leaves', function(done) {
		const user1 = sio(baseUrl)
		const user2 = sio(baseUrl)

		user1.once('connect', () => {
			user1.emit('create game', { username: 'user1' })
			user1.addEventListener('game created', (code) => {
					user2.emit('join game', { username: 'user2', code: code })
			})

			//User 2 connects and then disconnects
			user2.addEventListener('current users', () => {
				user2.disconnect()
			})

			//User 1 will get two current user calls
			//First, when the second users connects (two users)
			//Second, when the second user disconnects (one user)
			user1.addEventListener('current users', (users) => {
				if (users.length == 1) {
					expect(users.length).toBe(1)
					done()
				}
			})

		})
	})

})

