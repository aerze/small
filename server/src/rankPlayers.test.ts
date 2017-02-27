import rankPlayers from './rankPlayers'

describe('can calculate mini results', () => {
	it('can rank clickers from highest score to lowest', function() {
		let results = [
			{
				id: 1,
				score: 100,
				time: 10
			},
			{
				id: 2,
				score: 500,
				time: 30
			},
			{
				id: 3,
				score: 300,
				time: 50
			}
		]

		const clickerResults = rankPlayers(results, "clicker")
		expect(clickerResults[0].id).toBe(2)
		expect(clickerResults[1].id).toBe(3)
		expect(clickerResults[2].id).toBe(1)
	})
	it('can rank catchers from highest score to lowest based on time', function() {
		let results = [
			{
				id: 1,
				score: 0,
				time: 25
			},
			{
				id: 2,
				score: 0,
				time: 10
			},
			{
				id: 3,
				score: 0,
				time: 5
			}
		]

		const catcherResults = rankPlayers(results, "catcher")
		expect(catcherResults[0].id).toBe(3)
		expect(catcherResults[1].id).toBe(2)
		expect(catcherResults[2].id).toBe(1)
	})
})
