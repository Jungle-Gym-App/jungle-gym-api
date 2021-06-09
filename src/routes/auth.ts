import {Router, Request, Response, NextFunction } from 'express'
import { user } from '#mock/user'
import { v4 as uuidv4 } from 'uuid'
import { apiError, ErrorTypes } from '#modules/errors'
import sessionDB from '#modules/session/sessionDB'
import { Session, SessionStatus } from '#modules/session/session'

const auth: Router = Router()


auth
	.post('/token', handleTokenRequest)
	.post('/revoke', handleTokenRevocation)

export default auth 


async function handleTokenRequest(req: Request, res: Response, next: NextFunction) {
	const { username, password } = req.body

	// check session 
	if(!sessionDB) return next(new apiError('SessionDB offline', ErrorTypes.general))

	// check login information
	if(username !== user.username || password !== user.password) return next(new apiError('Wrong username or password', ErrorTypes.login))

	// create a token, create expire
	const accessToken = uuidv4()
	const currentDateTime = Date.now()
	const expiresIn = 1800000
	const expireDate = new Date(currentDateTime + expiresIn)

	const session: Session = {
		'status': SessionStatus.active,
		'access_token': accessToken,
		'expires_in': expiresIn ,
		'expires_on': expireDate.toLocaleString(undefined, {timeZone: 'Europe/Amsterdam'})
	}

	try {
		await sessionDB.hmset(accessToken, session)
	} catch (error) {
		console.log(error)
		return next(new apiError('SessionDB error', ErrorTypes.general))
	}

	return res.json(session)
}

async function handleTokenRevocation(req: Request, res: Response, next: NextFunction) {
	
	const accessToken = req.get('Authorization')?.split(' ')[1]

	console.log(accessToken)

	if(!sessionDB) return next(new apiError('SessionDB offline', ErrorTypes.general)) 
	// the server should try to hold de revocation an try on its on later.

	if(!accessToken)return next(new apiError('No access token', ErrorTypes.token))

	try {
		const session = await sessionDB.hgetall(accessToken)
		session.status = SessionStatus.revoked

		await sessionDB.hset(accessToken, 'status', SessionStatus.revoked)
		await sessionDB.expire(accessToken, 600)

		return res.json(session)


	} catch(error) {
		return next(new apiError('SessionDB error', ErrorTypes.general))
	}

}

