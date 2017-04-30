import Player from './player'
import MetaResult from './metaResult'
import MiniResult from './miniResult'
import Mini from './mini'
import GameStateNotifier from './gameStateNotifier'

/**
 * Tracks a full set of minigames played and all players
 * Can be seen as the "room" that players join
 */
export default class Game {

  /** Uniquely identifies the game for players to connect to */
  public code: string
  public players: Player[] = []
  /** Stores the rankings for all the games combined per player */
  private metaRanking: MetaResult[] = []
  private minisToPlay: Mini[] = []
  private currentMini?: Mini

  private gameStateNotifier: GameStateNotifier

  constructor(creator: Player, code: string, gameStateNotifier: GameStateNotifier) {
    this.code = code
    this.gameStateNotifier = gameStateNotifier
    this.addPlayer(creator)
  }

  public addPlayer(playerToAdd) {
    this.players.push(playerToAdd)
  }

  public removePlayer(playerToRemove) {
    this.players.splice(this.players.findIndex(player => player === playerToRemove))
  }

  public startGame() {
    this.metaRanking = this.players.map(player => ( { id: player.id, score: 0 } ) )
    // TODO: Randomly select which games to create
    this.minisToPlay = [new Mini('clicker', this.players.length),
                        new Mini('catcher', this.players.length),
                        new Mini('clicker', this.players.length)]
    return this.startNextMini()
  }

  public startNextMini(): Mini | undefined {
    this.currentMini = this.minisToPlay.pop()
    if (!this.currentMini) {
      // TODO: Put code to end game here
    }
    return this.currentMini
  }

  // Player reports their score
  // Check if they are the last player and if so complete the mini
  public reportMiniResult(miniResult: MiniResult) {
    if (this.currentMini) {
      this.currentMini.addResult(miniResult)
    }
    if (this.currentMini && this.currentMini.isMiniComplete()) this.completeMini()
  }

  private completeMini() {
    const miniRanking = this.currentMini ? this.currentMini.getResults() : this.emptyMiniResults()
    this.metaRanking = this.metaRanking.map(metaResult => metaResult.id === miniRanking[0].id ?
                                                          { ...metaResult, score: metaResult.score + 1} :
                                                          metaResult)

    this.gameStateNotifier.notifyPlayingUsers(this.code, 'mini complete',
      {
        miniRanking,
        metaRanking: this.metaRanking
      }
    )
  }

  private completeMeta() {
    this.gameStateNotifier.notifyPlayingUsers(this.code,
      'meta complete', { metaRanking: this.metaRanking }
    )
  }

  // TODO: This seems like a null object pattern hack to get around the not null check on current mini
  private emptyMiniResults() {
    return this.players.map(player => {
      return { id: player.id, score: 0, time: 0 }
    })
  }

}
