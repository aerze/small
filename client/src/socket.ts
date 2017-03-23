/// <reference path="./game.ts"/>

import * as sio from 'socket.io-client'
import SmallGame from './game'

import ServerPlayer from '../../server/src/player'
import ServerGame from '../../server/src/game'

interface CreateGameResponse {
  game: ServerGame
  player: ServerPlayer
}

export default class Socket {
  public clientSocket: SocketIOClient.Socket
  public serverGame: ServerGame
  public serverPlayer: ServerPlayer

  /** Seconds to wait for socket response in milliseconds */
  private TIMEOUT: number = 15

  constructor () {
    const clientSocket = sio()
    this.clientSocket = clientSocket
  }

  public createGame(player: ServerPlayer): Promise<CreateGameResponse> {
    return new Promise((resolve, reject) => {
      this.handleTimeout('CREATE_GAME_FAILED', reject)
      this.clientSocket.emit('create game', { player })
      this.clientSocket.on('create game successful', (res: CreateGameResponse) => {
        this.storeGame(res)
        resolve(res)
      })
    })
  }

  /**
   * Enforces a timeout by rejecting a promise
   */
  private handleTimeout(errorName: string, reject) {
    setTimeout(() => reject(new Error(errorName)), this.TIMEOUT)
  }

  private storeGame({ game, player }: CreateGameResponse) {
    this.serverGame = game
    this.serverPlayer = player
  }
}
