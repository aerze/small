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
    this.clientSocket.emit('create game', { player })
    return this.createEventPromise('create game')
      .then((data: CreateGameResponse) => {
        this.storeGame(data)
        return data
      })
  }

  /**
   * Creates a promise for the expected event response
   */
  private createEventPromise(eventName: string): Promise<Object> {
    return new Promise((resolve, reject) => {
      const fireReject = () => reject(new Error(`${eventName} failed`))
      const fireResolve = res => resolve(res)

      setTimeout(fireReject, this.TIMEOUT)
      this.clientSocket.on(`${eventName} successful`, fireResolve)
    })
  }

  private storeGame({ game, player }: CreateGameResponse) {
    this.serverGame = game
    this.serverPlayer = player
  }
}
