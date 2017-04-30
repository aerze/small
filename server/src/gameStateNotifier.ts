import SocketMessage from './socketMessage'

export default class GameStateNotifier {
	private server: SocketIO.Server

	constructor(server: SocketIO.Server) {
		this.server = server
	}

	public notifyPlayingUsers(code: string, message: string, content: Object) {
	  this.server.in(code).emit(message, {
	  	...content
	  })
	}

}
