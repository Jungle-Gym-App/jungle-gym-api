import {Router, Request, Response, NextFunction} from 'express'
import { games as gameData } from '#mock/games'
import { filterCategory, filterGroup, filterMaterial, filterPlayerAmount } from '#modules/filters'
import { apiError, ErrorTypes } from '#modules/errors'
import { Category } from '#models/game'

const games: Router = Router()

games
	.get('/', getAllGames)

export default games


function getAllGames(req: Request, res: Response, next: NextFunction) {
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

}
