import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import games from '#routes/games'
import auth from '#routes/auth'
import cors from 'cors'
import { handleErrors } from '#modules/errors'

const api = express()

api
	.use(cors())
	.use(express.json())
	.use('/games', games)
	.use('/auth', auth)
	.use((req: Request, res: Response) => res.status(404).send('Not found'))
	.use(handleErrors)

export default api