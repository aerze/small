import MiniResult from './miniResult'
import rankPlayers from './rankPlayers'

export default class Mini {
    public type: string

    private miniResults: MiniResult[] = []
    private playerCount: number = 0

    constructor(type: string, playerCount: number) {
        this.type = type
        this.playerCount = playerCount
    }

    public addResult(miniResult: MiniResult) {
        this.miniResults.push(miniResult)
    }

    public getResults(): MiniResult[] {
        return rankPlayers(this.miniResults, this.type)
    }

    public isMiniComplete(): boolean {
        if (this.miniResults.length === this.playerCount) return true
        return false
    }
}