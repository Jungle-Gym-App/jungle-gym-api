import {Router, Request, Response, NextFunction } from 'express'
import { user } from '#mock/user'
import { apiError, ErrorTypes } from '#modules/errors'
=import { startNewSession } from '#modules/session/session'

const auth: Router = Router()


auth
	.post('/token', handleTokenRequest)
	// .post('/revoke', handleTokenRevocation)

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

// async function handleTokenRevocation(req: Request, res: Response, next: NextFunction) {
	
// 	const accessToken = req.get('Authorization')?.split(' ')[1]

// 	console.log(accessToken)

// 	if(!sessionDB) return next(new apiError('SessionDB offline', ErrorTypes.general)) 
// 	// the server should try to hold de revocation an try on its on later.

// 	if(!accessToken)return next(new apiError('No access token', ErrorTypes.token))

// 	try {
// 		const session = await sessionDB.hgetall(accessToken)
// 		session.status = SessionStatus.revoked

// 		await sessionDB.hset(accessToken, 'status', SessionStatus.revoked)
// 		await sessionDB.expire(accessToken, 600)

// 		return res.json(session)


// 	} catch(error) {
// 		return next(new apiError('SessionDB error', ErrorTypes.general))
// 	}

// }

