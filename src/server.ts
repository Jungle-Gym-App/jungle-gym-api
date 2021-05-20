import express, { ErrorRequestHandler, Request, Response } from 'express'
import { games } from '#mock/games'
import cors from 'cors'

const api = express()

api	
	.use(cors())
	.get('/games', (req: Request, res: Response) => res.json(games))
	.use((req: Request, res: Response) => res.status(404).send('Not found'))
	.use((err: ErrorRequestHandler, req: Request, res: Response) => res.status(500).send('Not found'))

export default api