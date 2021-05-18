import express, { ErrorRequestHandler, Request, Response } from 'express'
import { games } from '#mock/games'

const api = express()

api
	.get('/games', (req: Request, res: Response) => res.json(games))
	.use((req: Request, res: Response) => res.status(404).send('Not found'))
	.use((err: ErrorRequestHandler, req: Request, res: Response) => res.status(500).send('Not found'))

export default api