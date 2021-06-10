import {Router, Request, Response, NextFunction } from 'express'
import { user } from '#mock/user'
import { apiError, ErrorTypes } from '#modules/errors'
import { revokeSession, startNewSession } from '#modules/session/session'
import { findUserByUsername } from '#modules/database/database'

const auth: Router = Router()


auth
	.post('/token', handleTokenRequest)
	.post('/revoke', handleTokenRevocation)

export default auth 


async function handleTokenRequest(req: Request, res: Response, next: NextFunction) {
	const { username, password } = req.body

	if(!username || !password ) return next(new apiError('No username or password supplied', ErrorTypes.login))

	const user = await findUserByUsername(username)

	console.log(username, password, user)

	if(!user) return next(new apiError('No user found', ErrorTypes.login))
	
	if(user.username !== username || user.password !== password) return next(new apiError('Wrong username or password', ErrorTypes.login))

	try {
		const {id, ...session} = await startNewSession(user.id)
		return res.json(session)
	} catch(error) {
		return next(error)
	}
}

async function handleTokenRevocation(req: Request, res: Response, next: NextFunction) {
	const accessToken = req.get('Authorization')?.split(' ')[1]

	if(!accessToken)return next(new apiError('No access token', ErrorTypes.token))

	try {
		await revokeSession(accessToken)
		return res.status(200).send()
	} catch(error) {
		return next(error)
	}
}

