import {Router, Request, Response, NextFunction} from 'express'
import { games as gameData } from '#mock/games'
import { filterCategory, filterMaterial } from '#modules/filters'
import { apiError, ErrorTypes } from '#modules/errors'
import { Category } from '#models/game'

const games: Router = Router()

games
	.get('/', getAllGames)

export default games


function getAllGames(req: Request, res: Response, next: NextFunction) {
	const { category, material, targetGroup } = req.query

	try {
		const filteredCategory = filterCategory(gameData, category)
		const filteredMaterial = filterMaterial(filteredCategory, material)


		return res.json(filteredMaterial)
	} catch(error: apiError | unknown) {
		console.log(error)
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
