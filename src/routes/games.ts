import {Router, Request, Response, NextFunction} from 'express'
import { getAllGames as getAllGamesStrapi, getSingleGame as getSingleGameStrapi } from '#modules/strapi'
import { filterCategory, filterGroup, filterMaterial, filterPlayerAmount } from '#modules/filters'
import { RequestError } from 'Responses'

const games: Router = Router()

games
	.get('/', getAllGames)
	.get('/:slug', getSingleGame)

export default games


function getAllGames(req: Request, res: Response, next: NextFunction) {
	getAllGamesStrapi().then((gameData) => {
		const { category, material, targetGroup, minimumPlayers } = req.query
	
		const filteredCategory = filterCategory(gameData, category)
		const filteredMaterial = filterMaterial(filteredCategory, material)
		const filteredGroup = filterGroup(filteredMaterial, targetGroup)
		const filteredPlayers = filterPlayerAmount(filteredGroup, minimumPlayers)

		return res.json(filteredPlayers)
	}).catch((error) => next(error))
}

function getSingleGame(req: Request, res: Response) {
	const { slug } = req.params
	const error: RequestError = {
		status: 404,
		body: `Cannot find game with slug ${slug}`
	}

	getSingleGameStrapi(slug)
		.then((game) => res.json(game) )
		.catch(() => res.status(error.status).json(error.body))

}