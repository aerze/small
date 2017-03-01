import Player from './player'
import MetaResult from './metaResult'
import MiniResult from './miniResult'
import Mini from './mini'

export default class Game {

  public code: string
  public players: Player[] = []
  private metaRanking: MetaResult[] = []
  private minisToPlay: Mini[] = []
  private currentMini?: Mini

  constructor(creator: Player, code: string) {
    this.code = code
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
  // TODO: Returning mini completion state in the return statement is not ideal
  public playerReportsMiniScore(miniResult: MiniResult) {
    if (this.currentMini) {
      this.currentMini.addResult(miniResult)
      if (this.currentMini.isMiniComplete()) return true
    }
    return false
  }

  public completeMini() {
    const miniRanking = this.currentMini ? this.currentMini.getResults() : this.emptyMiniResults()
    this.metaRanking = this.metaRanking.map(metaResult => metaResult.id === miniRanking[0].id ?
                                                          { ...metaResult, score: metaResult.score + 1} :
                                                          metaResult)
    return {
      miniRanking,
      metaRanking: this.metaRanking
    }
  }

  // TODO: This seems like a null object pattern hack to get around the not null check on current mini
  private emptyMiniResults() {
    return this.players.map(player => {
      return { id: player.id, score: 0, time: 0 }
    })
  }

}
