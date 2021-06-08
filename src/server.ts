import express, { ErrorRequestHandler, Request, Response } from 'express'
import games from '#routes/games'
import auth from '#routes/auth'
import cors from 'cors'

const api = express()

api
	.use(cors())
	.use(express.json())
	.use('/games', games)
	.use('/auth', auth)
	.use((req: Request, res: Response) => res.status(404).send('Not found'))
	.use((err: ErrorRequestHandler, req: Request, res: Response) => res.status(500).json(err))

export default api