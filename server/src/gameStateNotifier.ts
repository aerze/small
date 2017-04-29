import SocketMessage from './socketMessage'

export default class GameStateNotifier {
	private server: SocketIO.Server

	constructor(server: SocketIO.Server) {
		this.server = server
	}

	public notifyPlayingUsers(code: string, socketMessage: SocketMessage) {
	  this.server.in(code).emit(socketMessage.message, {
	  	socketMessage
	  })
	}

}
