import {Router, Request, Response, NextFunction} from 'express'
import { getAllGames as getAllGamesStrapi, getSingleGame as getSingleGameStrapi } from '#modules/strapi'
import { filterCategory, filterGroup, filterMaterial, filterPlayerAmount } from '#modules/filters'
import { apiError, ErrorTypes } from '#modules/errors'
import { RequestError } from 'Responses'

const games: Router = Router()

games
	.get('/', getAllGames)
	.get('/:slug', getSingleGame)

export default games


function getAllGames(req: Request, res: Response, next: NextFunction) {
	getAllGamesStrapi().then((gameData) => {
		const { category, material, targetGroup, minimumPlayers } = req.query
	
		try {
			const filteredCategory = filterCategory(gameData, category)
			const filteredMaterial = filterMaterial(filteredCategory, material)
			const filteredGroup = filterGroup(filteredMaterial, targetGroup)
			const filteredPlayers = filterPlayerAmount(filteredGroup, minimumPlayers)

			return res.json(filteredPlayers)
		} catch(error: apiError | unknown) {
			if(error instanceof apiError) {
				switch(error.type){
				case ErrorTypes.filter: 
					return res.status(400).json(error)
				default: 
					return res.status(500).json(error)
				}
			} else next(new apiError())
		}
	}).catch(() => next(new apiError()))
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