import express, { ErrorRequestHandler, Request, Response } from 'express'
import games from '#routes/games'
import cors from 'cors'

const api = express()

api
	.use(cors())
	.use('/games', games)
	.use((req: Request, res: Response) => res.status(404).send('Not found'))
	.use((err: ErrorRequestHandler, req: Request, res: Response) => res.status(500).json(err))

export default api