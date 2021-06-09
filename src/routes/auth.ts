import {Router, Request, Response, NextFunction } from 'express'
import { user } from '#mock/user'
import { apiError, ErrorTypes } from '#modules/errors'
import { revokeSession, startNewSession } from '#modules/session/session'

const auth: Router = Router()


auth
	.post('/token', handleTokenRequest)
	.post('/revoke', handleTokenRevocation)

export default auth 


async function handleTokenRequest(req: Request, res: Response, next: NextFunction) {
	const { username, password } = req.body

	// check login information -> should be checked in user DB instead of mock
	if(username !== user.username || password !== user.password) return next(new apiError('Wrong username or password', ErrorTypes.login))

	try {
		const session = await startNewSession()
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
		return res.status(200).json({})
	} catch(error) {
		return next(error)
	}
}

