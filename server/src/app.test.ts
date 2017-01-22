import App from './app'
import Game from './game'
import Player from './player'
import db from './db'

import * as sio from 'socket.io-client'

const baseUrl = 'http://localhost:8080'

describe('basic integration tests', () => {

	let app = new App()
	app.start(8080, () => {
		console.log("started express server")
	})

	afterAll(() => {
		app.stop(() => console.log("closing express server"))
	})

	it('can create a game and get 4 character code', function (done) {
		const socket = sio(baseUrl)
		socket.once('connect', () => {
			socket.emit('create game', {
				player: {
					name: 'user1',
					icon: 'icon1'
				}
			})
			socket.addEventListener('create game successful', (result) => {
				socket.disconnect()
				expect(result.game.code.length).toBe(4)
				done()
			})
		})
	})

	it('get current users after joining', function (done) {
		//Create game and user
		const user1 = new Player('user1', 'icon1')
		const game = new Game(user1)
		db.games.push(game)

		const joinParams = {
			player: {
				name: 'user2',
				icon: 'icon2'
			},
			game: {
				code: game.code
			}
		}

		const joinerSocket = sio(baseUrl)
		joinerSocket.once('connect', () => {
			joinerSocket.emit('join game', joinParams)
			joinerSocket.addEventListener('join game successful', (response) => {
				joinerSocket.disconnect()
				expect(response.game.players.length).toBe(2)
				done()
			})
		})
	})

	it('get all players when a player joins the game', function (done) {
		const user1 = sio(baseUrl)
		const user2 = sio(baseUrl)

		user1.once('connect', () => {
			user1.emit('create game', {
				player: {
					name: 'user1',
					icon: 'icon1'
				}
			})
			user1.addEventListener('create game successful', (response) => {
				const user2JoinParams = {
					player: {
						name: 'user2',
						icon: 'icon2'
					},
					game: {
						code: response.game.code
					}
				}
				user2.emit('join game', user2JoinParams)
			})

			user1.addEventListener('player connected', (response) => {
				user1.disconnect()
				user2.disconnect()
				expect(response.game.players.length).toBe(2)
				done()
			})
		})
	})

})

