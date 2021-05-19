import {Router, Request, Response} from 'express'
import { games } from '#mock/games'

const games = Router()

games
	.get('/games', (req: Request, res: Response) => res.json(games))