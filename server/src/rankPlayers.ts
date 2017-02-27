import MiniResult from './miniResult'

// Takes game results and returns them in order of first place to last place
export default function rankPlayers(results: Array<MiniResult>, mini: string): Array<MiniResult> {
	switch (mini) {
		case "clicker":
			return rankClicker(results)
        case "catcher":
			return rankCatcher(results)
	}
	return results
}

// Clickers who hit the button the most times have the highest score
// Order the results from highest to lowest
function rankClicker(results: Array<MiniResult>) {
	return results.sort((a, b) => b.score - a.score)
}

// Catchers who caught in the least time did the best
function rankCatcher(results: Array<MiniResult>) {
	return results.sort((a, b) => a.time - b.time)
}
