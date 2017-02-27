import MiniResult from './miniResult'
import rankPlayers from './rankPlayers'

export default class Mini {
    public type: string
    private miniResults: Array<MiniResult> = []

    constructor(type: string) {
        this.type = type
    }

    public addResult(miniResult: MiniResult) {
        this.miniResults.push(miniResult)
    }

    public getResults() : Array<MiniResult> {
        return rankPlayers(this.miniResults, this.type)        
    }
}