import {Router, Request, Response, NextFunction} from 'express'
import { games as gameData } from '#mock/games'
import { Game, Category } from '#models/game'
import { RequestError } from 'Responses'

const games: Router = Router()


games
	.get('/', getAllGames)
	.get('/:slug', getSingleGame)

export default games


function getAllGames(req: Request, res: Response, next: NextFunction) {
	const { category } = req.query

	try {
		const filteredCategory = filterCategory(gameData, category)
		return res.json(filteredCategory)
	} catch(error) {
		return res.status(error.status).json(error.body) 
	}

}

function getSingleGame(req: Request, res: Response) {
	const { slug } = req.params
	const error: RequestError = {
		status: 404,
		body: `Cannot find game with slug ${slug}`
	}

	const game = gameData.find((game) => game.slug === slug)

	if(game) return res.json(game)
	else return res.status(error.status).json(error.body)
}


function filterCategory(games: Game[], category: string | string[] | unknown) :Game[] {
	const error: RequestError = {
		status: 400,
		body: undefined
	}

	if(!category) return games
	else if(Array.isArray(category) && category.every(checkSyntax)) return games.filter((game) => category.includes(game.category))
	else if(typeof category === 'string' && checkSyntax(category)) return games.filter((game) => category === game.category)
	else throw error

	function checkSyntax(category: string) {
		switch (category) {
		case Category.bal:
		case Category.loop:
		case Category.reactie:
		case Category.tik:
			return true
		default: 
			error.body = `Received an invalid filter. Got: '${category}'`
			return false
		}
	}
}