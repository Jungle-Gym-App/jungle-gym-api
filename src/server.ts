import express, { NextFunction, Request, Response } from 'express'

import games from '#routes/games'
import auth from '#routes/auth'
import user from '#routes/user'

import cors from 'cors'
import { apiError, ErrorTypes, handleErrors } from '#modules/errors'
import { databaseStatus } from '#modules/database/database'
import { checkSession, retrieveSession } from '#modules/session/session'

const api = express()

api
	.use((req: Request, res: Response, next: NextFunction) => databaseStatus() ? next() : next('DB Offline') )
	.use(cors())
	.use(express.json())
	.use('/games', games)
	.use('/auth', auth)
	.use('/user', checkAccessToken, user)
	.use((req: Request, res: Response) => res.status(404).send('Not found'))
	.use(handleErrors)

export default api

async function checkAccessToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.get('Authorization')

	if(!authHeader) return next(new apiError('No access token found', ErrorTypes.token))

	const [ key, token ] = authHeader.split(' ')

	try {
		await checkSession(token)
		res.locals.session = await retrieveSession(token)
		if(res.locals.session.id) return next()
		else return next(new apiError('No user in session', ErrorTypes.session))
	} catch(error) {
		return next(error)
	}
}